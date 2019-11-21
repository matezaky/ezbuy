import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen.js'
import SignInScreen from './screens/SignInScreen.js'
import LandingScreen from './screens/LandingScreen.js'
import CreateAccountScreen from './screens/CreateAccountScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptCodeScreen from './screens/OptCodeScreen';
import ProfileScreen from './screens/ProfileScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import BuyCoinScreen from './screens/BuyCoinScreen.js';
import TransferCoinScreen from './screens/TransferCoinScreen.js';
import i18n from './i18n'
const HomeStack = createStackNavigator(
	{
			Home: HomeScreen,
			Order: OrderScreen,
			BuyCoin: BuyCoinScreen,
			TransferCoin: TransferCoinScreen,
	},
);

const TabNavigator = createBottomTabNavigator(
	{
			Home: HomeStack,
			Profile: ProfileScreen,
	},
	{
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarOnPress: ({ defaultHandler }) => {
				defaultHandler();
		},
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			const { routeName } = navigation.state;
			let iconName;
			if (routeName === i18n.t('home')) {
				iconName = `ios-home`;
			} else if (routeName ===  i18n.t('profile')) {
				iconName = `ios-person`;
			}
			// You can return any component that you like here!
			return <Ionicons name={iconName} size={25} color={tintColor} />;
		},
	}),
	},
);

const AuthStack = createStackNavigator({
	Landing: {
		headerMode: 'none',
		navigationOptions: ({ navigation }) => ({
				header: null,
		}),
		screen: LandingScreen
	},
	SignIn: SignInScreen,
	CreateAccount: CreateAccountScreen,
	OptCode: OptCodeScreen,
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: TabNavigator,
    }
  )
);