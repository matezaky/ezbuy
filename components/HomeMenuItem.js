import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, Text, Dimensions,View } from 'react-native';
import { opacities, colors } from '../constants/Index';
import styled from 'styled-components'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Width = Dimensions.get('screen').width

const HomeMenuItem = ({options, onPress}) => (
	<TouchableOpacity
		activeOpacity={opacities.regular}
		style={{
			width: Width / 2 - 20,
			height: Width/ 3.5 ,
			// flex: 1,
			backgroundColor: colors.blue,
			padding: 10,
			display: 'flex',
			flexDirection: 'column',
			justifyContent:'center',
			alignItems:"center",
			marginHorizontal: 10,
			marginVertical: 15,
			borderRadius: 5,
		}}
		onPress={() => onPress()}>
		<View style={{
			flex: 1,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: 30,
			width: '100%',
		}}>
			<Ionicons name={options.icon} size={40} color={'#fff'}/>
		</View>
		<Title>{options.text}</Title>
	</TouchableOpacity>
)
export default HomeMenuItem

const Title = styled.Text`
	width: 100%;
	text-align: center;
	font-weight: 600;
	color: #fff;
	font-size: 14px;
`;