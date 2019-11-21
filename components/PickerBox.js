import React from 'react';
import styled from 'styled-components';
import { Alert, KeyboardAvoidingView, Picker, Text, ScrollView, Platform} from 'react-native';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

const PickerBox = ({items, name, onChange, selectedValue}) =>(
	<RootView>
		<InputLabel>{name}</InputLabel>
		<PickerStyle
			selectedValue={selectedValue}
			onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
			{items.map(v=> <Picker.Item label={v.label} value={v.value} key={v.value}/>)}
		</PickerStyle>
	</RootView>
)
export default PickerBox

const RootView = styled.View`
		display: flex;
		flex-direction: column;
`;

const InputLabel = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    display: flex;
    padding: ${spacing.tiny}px 0 ${spacing.tiny}px ${spacing.tiny}px;
    width: 100%;
`;

const PickerStyle = styled.Picker`
	padding: ${spacing.tiny}px 0 ${spacing.tiny}px ${spacing.medium}px;
	margin-left: 5px;
	height: 50px;
	width: 100%;
	border: 1px solid red;
`;