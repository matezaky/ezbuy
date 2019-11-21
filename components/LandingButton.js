import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import {
    spacing,
    colors,
    transparentColors,
    fontSizes,
    fontWeights,
    borderRadius,
    opacities,
} from '../constants/Index';

const propTypes = {
    action: PropTypes.func.isRequired,
    primary: PropTypes.bool,
    text: PropTypes.string.isRequired,
    margin: PropTypes.string,
};

const defaultProps = {
    primary: false,
    margin: '',
};

const LandingButton = ({ action, primary, margin, text }) => (
    <TouchableOpacity activeOpacity={opacities.regular} onPress={action}>
        <Button primary={primary} buttonMargin={margin}>
            <ButtonText primary={primary}>{text}</ButtonText>
        </Button>
    </TouchableOpacity>
);

LandingButton.propTypes = propTypes;
LandingButton.defaultProps = defaultProps;

export default LandingButton;

const Button = styled.View`
    background-color: ${(props) =>
        props.primary ? colors.blue : colors.white};
    border-radius: ${borderRadius.medium}px;
    margin: ${(props) => props.buttonMargin || `0 ${spacing.medium}px`};
    border: 1px solid ${colors.lightGray};
    box-shadow: 0 2px 8px ${transparentColors.gray};
`;

const ButtonText = styled.Text`
    color: ${(props) => (props.primary ? colors.white : colors.black)};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.extraLarge}px;
    text-align: center;
    padding: ${spacing.small}px 0;
`;
