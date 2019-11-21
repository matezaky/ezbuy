import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components'
import Subtitle from '../components/Subtitle'
import HomeMenuItem from '../components/HomeMenuItem'
import SearchBox from '../components/SearchBox'
import db from '../api.js'
import i18n from '../i18n/index.js'

const homeMenus = [
	{
		text: i18n.t('quick_order'),
		key: "order",
		icon: 'ios-cart'
	},
	{
		text: i18n.t('buy_point'),
		key: "buy_coin",
		icon: 'ios-add-circle-outline'
	},
	{
		text: i18n.t('tranfer_point'),
		key: "transfer_coin",
		icon: 'ios-swap'
	},
]
export default class HomeScreen extends React.Component {
	static navigationOptions = {
		headerTitle:i18n.t('home'),
		// header: (
		// 	<SearchBox />
		// )
	};
	changeStack(key) {
		switch(key) {
			case 'order':
				this.props.navigation.navigate('Order')
				break;
			case 'buy_coin':
				this.props.navigation.navigate('BuyCoin')
				break;
			case 'transfer_coin':
				this.props.navigation.navigate('TransferCoin')
				break;
		}
	}
  render() {
    return (
      <Container>
				{/* <Subtitle text={"menu"}/> */}
				<Menu>
					{homeMenus.map(v =>
						<HomeMenuItem options={v} onPress={() => this.changeStack(v.key) } key={v.key} />
					)}
				</Menu>
      </Container>
    );
  }
}

const Container = styled.View`
	display: flex;
`;
const Menu = styled.View`
	display: flex;
	flex-direction: row;
  flex-wrap: wrap;
`;
