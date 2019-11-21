import React from 'react'
import { Button, Text, View } from 'react-native';
import db, {devDefautlState} from '../api.js'
import LandingButton from '../components/LandingButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import i18n from '../i18n'
class OtpCodeScreen extends React.Component {
	state = {
		confirm_code : '',
		loading: false
	}

	componentDidMount() {
		if(__DEV__) {
			let def = devDefautlState.otpCode()
			for(let k in def) {
				this.setState({[k]: def[k]})
			}
		}
	}

	static navigationOptions = {
		headerTitle: i18n.t('comfirm_code'),
		headerBackTitle: null,
	};
	async handleConfirm() {
		let code = {
			confirm_code: Number(this.state.confirm_code)
		}
		this.setState({loading: true})

		let data = await db.confirmCode(code)
		this.setState({loading: false})

		if(data instanceof Error) {
			alert(i18n.t('app_error') + data.toString())
			return
		}

		if(data && data.error) {
			alert(i18n.t('comfirm_code_fail') + data.msg)
			return
		} else {
			alert(i18n.t('comfirm_code_oke'))

			this.props.navigation.navigate('Login')
		}
	}
	render() {
		const { loading } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
				 <InputLabelGroup
						placeholder={i18n.t('comfirm_code')}
						keyboardType={'numeric'}
						defaultValue={this.state.confirm_code}
						autoCorrect={false}
						onChangeText={(text) =>
								this.setState({confirm_code: text})
						}
						autoFocus={true}
				/>
					<LandingButton
						primary
						text={i18n.t('confirm')}
						margin={`15px 40px`}
						action={() => this.handleConfirm()}
					/>
					{loading ? <LoadingOverlay loading={true} /> : null}

      </View>
    );
  }
}
export default OtpCodeScreen