import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { opacities, colors } from '../constants/Index';
import styled from 'styled-components'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Width = Dimensions.get('screen').width

const HeaderSearchBox = ({options, onChange}) => (
	<Container>
		<SearchInput placeholder={"Nhập để tìm kiêm"} onChange={onChange}/>
		<Ionicons name={"ios-search"} size={20} style={{
			position: 'absolute',
			left: 15,
			top: 20,
		}}/>
	</Container>
)
export default HeaderSearchBox

const Container = styled.View`
	display: flex;
	position: relative;
`;
const SearchInput = styled.TextInput`
	margin: 10px 10px;
	width: ${Width - 20}px;
	padding: 0 0 0 30px;
	height: 40px;
	border: 1px solid #aaa;
	border-radius: 5px;
`;