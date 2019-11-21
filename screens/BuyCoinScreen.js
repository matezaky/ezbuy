import React from 'react'
import { Button, View, KeyboardAvoidingView, Picker, Text,
	TouchableWithoutFeedback,
	ScrollView, Platform} from 'react-native';
import LandingButton from '../components/LandingButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import i18n from '../i18n/index.js'
import Subtitle from '../components/Subtitle'
import { Header } from 'react-navigation-stack';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';
import styled from 'styled-components'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import db, {devDefautlState} from '../api.js'

var radio_props = [
  {label: i18n.t('transfer'), value: 'payment_transfer' },
  {label:  i18n.t('pay_cash'), value: 'payment_cash' },
  {label: i18n.t('pay_other'), value: 'payment_other' }
];

class BuyCoin extends React.Component {
	static navigationOptions = {
		headerTitle: i18n.t('buy_point'),
	};
	state = {
		loading: false,
		payment_method: 'payment_transfer',
		total: '100000',
	}
	componentDidMount() {
		if(__DEV__) {
			let def = devDefautlState.defaultBuyPoint()
			for(let k in def) {
				this.setValue(k, def[k])
			}
		}
	}
	async handleBuyPoint() {
		if(!this.state.total) {
			alert(i18n.t('point_fail'))
			return
		}
		this.setState({loading: true})
		let data = await db.buyPoints({
			total: this.state.total,
			payment_method: this.state.payment_method,
		})
		this.setState({loading: false})

		if(data instanceof Error) {
			alert(i18n.t('app_error') + data.toString())
			return
		}

		if(data && data.error) {
			alert(i18n.t('buy_point_fail') + data.msg)
		} else {
			alert(i18n.t('buy_point_oke'))
			setTimeout(() => this.props.navigation.navigate('Home'), 200)
		}

	}

	setValue(name, text) {
		this.setState({ [name]: text });
	}
	render() {
		const { loading } = this.state;

		return (
				<KeyboardAvoidingView
				keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
				behavior= {(Platform.OS === 'ios')? "padding" : null}
				style = {{ flex: 1 }}>
					<ScrollView>
						<InputLabelGroup
								placeholder={i18n.t('buy_point')}
								autoFocus={true}
								keyboardType={'numeric'}
								defaultValue={this.state.total}
								onChangeText={(text) =>
										this.setValue('total', text)
								}
								labelName={i18n.t('buy_point')}
								textContentType={'none'}
						/>
						<SubText>{i18n.t('min_point')}</SubText>
						<View style={{padding: 10}}>
							<RadioForm
								radio_props={radio_props}
								initial={0}
								onPress={(value) => {this.setState({payment_method: value})}}
							/>
						</View>

						<LandingButton
									primary
									text={i18n.t('buy')}
									margin={`15px 10px `}
									action={() => this.handleBuyPoint()}
								/>
					</ScrollView>

					{loading ?	<LoadingOverlay loading={true} /> : null }
				</KeyboardAvoidingView>
		);
}
}
export default BuyCoin

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
