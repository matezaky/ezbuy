import React from 'react';
import styled from 'styled-components';
import { Alert, KeyboardAvoidingView, Picker, Text, ScrollView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import LandingButton from '../components/LandingButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import i18n from '../i18n/index.js'
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';
import PickerBox from '../components/PickerBox.js'
import db, {devDefautlState} from '../api';
const accountBasicInputs = [
    {
        placeholder: i18n.t('fullname'),
        name: 'full_name',
        autoCorrect: false,
        textContentType: 'name',
    },
    {
				keyboardType: 'numeric',
        placeholder: i18n.t('phone_number'),
        name: 'phone_number',
        autoCorrect: false,
        autoCapitalize: 'none',
        textContentType: 'telephoneNumber',
    },
];

const accountSecretInput = [

	{
			placeholder: i18n.t('password'),
			name: 'password',
			secureTextEntry: true,
			textContentType: 'password',
	},
	{
			placeholder: i18n.t('repassword'),
			name: 'confirm_password',
			secureTextEntry: true,
			textContentType: 'password',
	},
	{
		placeholder: i18n.t('refer_id'),
		name: 'ref_id',
		autoCorrect: false,
		textContentType: 'none',
	},
]

const pickerInput = {
	items: [
		{label: 'Lao', value: 116},
		{label: 'Việt Nam', value: 230},
	],
	name: i18n.t('nation')
}

const registerMethods = {
	items: [
		{label: 'Email', value: 'email'},
		{label: 'OTP', value: 'OTP'},
	],
	name:i18n.t('auth_method')
}
class CreateAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
						country_id: 230,
						full_name: '',
            phone_number: '',
						password: '',
						ref_id: '',
						email: '',
						auth_method: 'email',
						confirm_password: '',
            loading: false,
        };
    }
		componentDidMount() {
			if(__DEV__) {
				let def = devDefautlState.defaultCreateAcc()
				for(let k in def) {
					this.setValue(k, def[k])
				}
			}
		}
    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleCreateAccount = async () => {
        const { country_id,
					full_name,
					phone_number,
					password,
					ref_id,
					email,
					auth_method,
					confirm_password,
				} = this.state
				if(!full_name.trim()) {
					alert(i18n.t('fullname_null'))
					return
				}
				if(auth_method === 'email' && !email.trim()) {
					alert(i18n.t('email_invalid'))
					return
				}
				if(!password || password.length < 6) {
					alert(i18n.t('pw_invalid'))
					return
				}
				if(confirm_password !== password) {
					alert(i18n.t('pw_invalid2'))
					return
				}
        this.setState({ loading: true });

				let acc = {
					country_id,
					full_name,
					phone_number,
					password,
					ref_id,
					auth_method,
					confirm_password,
				}

				if(auth_method === 'email') {
					acc.email = email
				}

				let data = await db.createAccount(acc)
				
				this.setState({ loading: false });

				if(data instanceof Error) {
					alert(i18n.t('app_error') + data.toString())
					return
				}
				if(data && data.error) {
					alert(i18n.t('createacc_fail') + data.msg)
					return
				}
				if(auth_method === 'email') {
					alert(i18n.t('createacc_oke'))
					this.props.navigation.navigate('SignIn')
					return
				}
				this.props.navigation.navigate('OptCode')
    };

    static navigationOptions = {
        headerTitle: i18n.t('create_account'),
        headerBackTitle: null,
		}

    render() {
				const { loading, auth_method } = this.state;

        return (
						<KeyboardAvoidingView
							keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
							behavior= {(Platform.OS === 'ios')? "padding" : null}
							style = {{ flex: 1 }}>
							<ScrollView>
								<PickerBox items={pickerInput.items} name={pickerInput.name}
									selectedValue={this.state.country_id}
									onChange={value => this.setState({country_id: value})}/>
                {accountBasicInputs.map(
                    (
                        {
                            name,
                            placeholder,
                            keyboardType,
                            secureTextEntry,
                            autoCorrect,
                            autoCapitalize,
                            textContentType,
                        },
                        index,
                    ) => (
                        <InputLabelGroup
														key={name}
														isShowLabel={false}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            defaultValue={this.state[name]}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            autoFocus={index === 0}
                            onChangeText={(text) =>
                                this.setValue(name, text, index)
                            }
                            labelName={placeholder}
                            textContentType={textContentType}
                        />
                    ),
								)}
								<PickerBox items={registerMethods.items} name={registerMethods.name}
									selectedValue={this.state.auth_method}
									onChange={value => this.setState({auth_method: value}) }/>
								{auth_method == 'email'? <InputLabelGroup
										placeholder={i18n.t('email')}
										keyboardType={'email-address'}
										defaultValue={this.state.email}
										autoCorrect={false}
										autoCapitalize={'none'}
										onChangeText={(text) =>
											this.setState({email: text})
										}
										labelName={i18n.t('email')}
										textContentType={'emailAddress'}
								/> : null}
                {accountSecretInput.map(
                    (
                        {
                            name,
                            placeholder,
                            keyboardType,
                            secureTextEntry,
                            autoCorrect,
                            autoCapitalize,
                            textContentType,
                        },
                        index,
                    ) => (
                        <InputLabelGroup
														key={name}
														isShowLabel={false}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            defaultValue={this.state[name]}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
                            onChangeText={(text) =>
                                this.setValue(name, text, index)
                            }
                            labelName={placeholder}
                            textContentType={textContentType}
                        />
                    ),
								)}
								<SubText>{i18n.t('acc_note1')}</SubText>
								<SubText>{i18n.t('acc_note2')}</SubText>
								<SubText>{i18n.t('acc_note3')}</SubText>
								<LandingButton
                        white
												text={i18n.t('create_account')}
												margin={`15px 10px `}
												action={() => this.handleCreateAccount()}
                    />
							</ScrollView>

							{loading ?<LoadingOverlay loading={true} /> : null }
            </KeyboardAvoidingView>
        );
    }
}


export default CreateAccountScreen;
const RootView = styled.KeyboardAvoidingView`
		display: flex;
		flex-direction: row;
`;

const SubText = styled.Text`
		width: 100%;
    color: ${colors.darkGray};
		font-size: ${fontSizes.small}px;
    padding: ${spacing.tiny}px 0 ${spacing.tiny}px ${spacing.tiny}px;
`;

const PickerStyle = styled.Picker`
	height: 50px;
	width: 300px;
	flex: 3;
`;