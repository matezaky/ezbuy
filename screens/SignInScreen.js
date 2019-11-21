import React from 'react';
import styled from 'styled-components';
import { Alert, StatusBar, ScrollView } from 'react-native';
import LandingButton from '../components/LandingButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import i18n from '../i18n/index.js'
import db, {devDefautlState} from '../api'

const signInInputs = [
    {
        placeholder: i18n.t('phone_number'),
        name: 'user_id',
        autoCorrect: false,
        autoCapitalize: 'none',
        textContentType: 'none',
    },
    {
        placeholder: i18n.t('password'),
        name: 'password',
        secureTextEntry: true,
        textContentType: 'password',
    },
];

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            password: '',
            loading: false,
        };
    }

    componentDidMount() {
				if(__DEV__) {
					let def = devDefautlState.defaultSignIn()
					for(let k in def) {
						this.setValue(k, def[k])
					}
				}
        StatusBar.setBarStyle('light-content', true);
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleLogin = async () => {
				const { user_id, password } = this.state;
				this.setState({loading: true})
				let logined = await db.signIn(user_id, password)
				this.setState({loading: false})
				if(logined instanceof Error) {
					alert(i18n.t('login_error') + logined.toString())
					return
				}
				if(logined.error) {
					alert(i18n.t('login_fail') + logined.msg)
					return
				}
				this.props.navigation.navigate('App')
    };

    static navigationOptions = {
        headerTitle: i18n.t('sign_in'),
        headerBackTitle: null,
    };

    render() {
				const { loading } = this.state;
				console.log("loading", loading)
        return (
            <RootView>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    scrollEnabled={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {signInInputs.map(
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
                                key={index}
                                placeholder={placeholder}
																keyboardType={keyboardType}
																defaultValue={this.state[name]}
                                secureTextEntry={secureTextEntry}
                                autoCorrect={autoCorrect}
                                autoCapitalize={autoCapitalize}
                                onChangeText={(text) =>
                                    this.setValue(name, text, index)
																}
																isShowLabel={false}
                                labelName={placeholder}
                                textContentType={textContentType}
                                autoFocus={index === 0}
                            />
                        ),
										)}
										<LandingButton
                        primary
												text={i18n.t('sign_in')}
												margin={`15px 10px `}
												action={() => this.handleLogin()}
                    />
                </ScrollView>
								{loading ? <LoadingOverlay loading={true} /> : null}
            </RootView>
        );
    }
}

export default SignInScreen;

const RootView = styled.View`
    flex: 1;
`;
