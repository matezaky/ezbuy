import React from 'react'
import { Button, View, KeyboardAvoidingView, Picker, Text, ScrollView, Platform} from 'react-native';
import LandingButton from '../components/LandingButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import i18n from '../i18n/index.js'
import { Header } from 'react-navigation-stack';
import PickerBox from '../components/PickerBox'
import db, {devDefautlState} from '../api.js'

let PayMethods = {
	items: [
		{label: i18n.t('point'), value: 'point'},
		{label: i18n.t('tranfer_coin'), value: 'cod'},
	],
	name: i18n.t('payment_method')
}

let discount = {
	items: [
		{label: '0', value: 0},
		{label: '10%', value: 10},
		{label: '20%', value: 20},
	],
	name: i18n.t('discount')
}

const orderInput= [
	{
			placeholder: i18n.t('prod_name'),
			name: 'product_name',
			textContentType: 'name',
	},
	{
			keyboardType:  'number-pad',
			placeholder: i18n.t('price'),
			name: 'price',
	},
	{
			keyboardType: 'number-pad',
			placeholder: i18n.t('qty'),
			name: 'qty',
	},
];

class OrderScreen extends React.Component {
	static navigationOptions = {
		headerTitle: i18n.t('quick_order'),
	};
	state = {
		loading: false,
		member_id: '',
		price: '',
		choose_discount: '',
		payment_method: '',
		product_name: '',
		qty: '',
	}
	componentDidMount() {
		if(__DEV__) {
			let def = devDefautlState.defaultOrder()
			for(let k in def) {
				this.setValue(k, def[k])
			}
		}
	}
	setValue(name, text) {
		this.setState({ [name]: text });
	}

	async handleCreateOrder() {
		if(!this.state.member_id) {
			this.setState({error: i18n.t('member_empty')})
		}
		if(!this.state.price || isNaN(this.state.price) || this.state.price < 0) {
			this.setState({error: i18n.t('price_invalid')})
		}

		if(!this.state.product_name) {
			this.setState({error: i18n.t('prodname_empty')})
		}

		if(!this.state.qty || isNaN(this.state.qty) || this.state.qty  < 0) {
			this.setState({error: i18n.t('qty_null')})
		}
		if(this.state.error) {
			alert(this.state.error)
			this.setState({error: ''})
			return
		}
		let body = {
			member_id: this.state.member_id,
			price: Number(this.state.price),
			product_name: this.state.product_name,
			payment_method: this.state.payment_method,
			qty: Number(this.state.qty),
			choose_discount: this.state.choose_discount,
		}
		this.setState({ loading: true })
		let data = await db.quickOrder(body)
		this.setState({ loading: false })
		if(data instanceof Error) {
			alert(i18n.t('app_error') + data.toString())
			return
		}
		if(data && data.error) {
			alert(i18n.t('order_fail') + data.msg)
			return
		} else {
			alert(i18n.t('order_ok'))
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
						<InputLabelGroup
								placeholder={i18n.t('id_mem') }
								autoCorrect={false}
								autoCapitalize={'none'}
								autoFocus={true}
								onChangeText={(text) =>
										this.setValue('member_id', text)
								}
								defaultValue={this.state.member_id}
								labelName={i18n.t('id_mem')}
								textContentType={"name"}
						/>
					<PickerBox items={PayMethods.items} name={PayMethods.name}
						onChange={value=>this.setValue('payment_method', value)}
						selectedValue={this.state.payment_method}/>


					{orderInput.map(
									(
											{
													name,
													placeholder,
													keyboardType,
													textContentType,
											},
											index,
									) => (
											<InputLabelGroup
													key={name}
													placeholder={placeholder}
													keyboardType={keyboardType}
													autoCorrect={false}
													onChangeText={(text) =>
															this.setValue(name, text, index)
													}
													defaultValue={this.state[name]}
													labelName={placeholder}
													textContentType={textContentType}
											/>
									),
							)}
						<PickerBox items={discount.items} name={discount.name}
						onChange={value=> this.setValue('choose_discount', value) }
						selectedValue={this.state.choose_discount}/>

						<LandingButton
										primary
										text={i18n.t('create_order')}
										margin={`15px 10px `}
										action={() => this.handleCreateOrder()}
								/>
					</ScrollView>

					{loading ? <LoadingOverlay loading={true} /> : null }
				</KeyboardAvoidingView>
		);
}
}
export default OrderScreen