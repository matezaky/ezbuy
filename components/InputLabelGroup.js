import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

const propTypes = {
    placeholder: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    textContentType: PropTypes.string,
    inputMaxLegnth: PropTypes.number,
    onChangeText: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoFocus: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    isShowLabel: PropTypes.bool,
};

const defaultProps = {
    inputMaxLegnth: 100,
    defaultValue: '',
    keyboardType: 'default',
    secureTextEntry: false,
    autoCorrect: false,
    autoCapitalize: 'none',
    autoFocus: false,
    blurOnSubmit: true,
};

class InputLabelGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        const {
            textContentType,
            inputMaxLegnth,
            defaultValue,
            onChangeText,
            placeholder,
            keyboardType,
            secureTextEntry,
            autoCorrect,
            autoCapitalize,
            autoFocus,
						blurOnSubmit,
						numberOfLines
        } = this.props;

        return (
            <LabelInputGroup>
                <InputLabel>{placeholder}</InputLabel>
                <Input
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    autoFocus={autoFocus}
                    textContentType={textContentType}
                    maxLength={inputMaxLegnth}
                    onChangeText={onChangeText}
                    defaultValue={defaultValue}
                    blurOnSubmit={blurOnSubmit}
										onSubmitEditing={Keyboard.dismiss}
										numberOfLines={numberOfLines}
                />
            </LabelInputGroup>
        );
    }
}

InputLabelGroup.propTypes = propTypes;
InputLabelGroup.defaultProps = defaultProps;

export default InputLabelGroup;

const LabelInputGroup = styled.View`
    width: 100%;
		flex-direction: row;
		flex-wrap: wrap;
    border-color: ${colors.lightGray};
		margin-top: -1px;
`;

const InputLabel = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    display: flex;
    padding: ${spacing.tiny}px 0 ${spacing.tiny}px ${spacing.tiny}px;
    width: 100%;
`;

const Input = styled.TextInput`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
		display: flex;
		width: 95%;
		margin: 0 2.5%;
		border-radius: 5px;
		border: 1px solid #ccc;
    padding: ${spacing.tiny}px;
`;
