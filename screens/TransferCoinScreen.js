import React from 'react'
import { Button, View, KeyboardAvoidingView, Picker, Text, ScrollView, Platform} from 'react-native';
import LandingButton from '../components/LandingButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import i18n from '../i18n/index.js'
import Subtitle from '../components/Subtitle'
import { Header } from 'react-navigation-stack';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';
import styled from 'styled-components'
import db, {devDefautlState} from '../api';

const transferInputs = [
	{
			placeholder: i18n.t('id_mem'),
			name: 'member_id',
			autoCorrect: false,
			textContentType: 'none',
	},
	{
			placeholder:i18n.t('total_point'),
			name: 'total',
			autoCorrect: false,
			textContentType: 'none',
	}
];

class TransferCoin extends React.Component {
	static navigationOptions = {
		headerTitle: i18n.t('tranfer_point'),
	};
	state = {
		loading: false,
		member_id: '918242186',
		total: '500',
		desc: ''
	}
	componentDidMount() {
		if(__DEV__) {
			let def = devDefautlState.defaultTransferPoint()
			for(let k in def) {
				this.setValue(k, def[k])
			}
		}
	}
	setValue(name, text) {
		this.setState({ [name]: text });
	}
	async handleTransferPoint() {
		if(!this.state.total) {
			alert(i18n.t('not_found_point'))
			return
		}
		if(!this.state.member_id) {
			alert(i18n.t('not_found_id'))
			return
		}
		this.setState({loading: true})
		let data = await db.transferPoints({
			total: this.state.total,
			member_id: this.state.member_id,
			desc: this.state.desc,
		})
		this.setState({loading: false})
		if(data instanceof Error) {
			alert(i18n.t('app_error') + data.toString())
			return
		}
		if(data && data.error) {
			alert(i18n.t('tranfer_fail') + data.msg)
		} else {
			alert(i18n.t('tranfer_oke'))
			this.props.navigation.navigate('Home')
		}
	}

	render() {
		const { loading } = this.state;

		return (
				<KeyboardAvoidingView
				keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
				behavior= {(Platform.OS === 'ios')? "padding" : null}
				style = {{ flex: 1 }}>
					<ScrollView>
					{transferInputs.map(
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
														isShowLabel={false}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            autoCorrect={autoCorrect}
                            autoCapitalize={autoCapitalize}
														autoFocus={index === 0}
														defaultValue={this.state[name]}
                            onChangeText={(text) =>
                                this.setValue(name, text, index)
                            }
                            labelName={placeholder}
                            textContentType={textContentType}
                        />
                    ),
								)}
						<SubText>Số điểm tối thiểu: 270.000 đ</SubText>
						<InputLabelGroup
								placeholder={i18n.t('des')}
								onChangeText={(text) =>
										this.setValue('desc', text)
								}
								numberOfLines={3}
								labelName={i18n.t('des')}
								textContentType={"none"}
						/>
						<LandingButton
									primary
									text={i18n.t('tranfer_point')}
									margin={`15px 10px `}
									action={() => this.handleTransferPoint()}
								/>
					</ScrollView>

				{loading ?	<LoadingOverlay loading={true} /> : null }
				</KeyboardAvoidingView>
		);
}
}
export default TransferCoin

const SubText = styled.Text`
		width: 100%;
    color: ${colors.darkGray};
		font-size: ${fontSizes.small}px;
    padding: ${spacing.tiny}px 0 ${spacing.tiny}px ${spacing.tiny}px;
`;
const TextInfo = styled.Text`
		width: 100%;
    color: ${colors.black};
		font-size: ${fontSizes.medium}px;
    padding: ${spacing.small}px ${spacing.small}px ${spacing.small}px ${spacing.large}px ;
`;
