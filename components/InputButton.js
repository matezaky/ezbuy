import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import {
    spacing,
    colors,
    fontSizes,
    fontWeights,
    opacities,
} from '../constants/Index';

const propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

class InputButton extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const { action, text } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={action}
            >
                <ButtonView>
                    <ButtonText>{text}</ButtonText>
                </ButtonView>
            </TouchableOpacity>
        );
    }
}

InputButton.propTypes = propTypes;

export default InputButton;

const ButtonView = styled.View`
    margin-top: 20px;
    background-color: ${colors.white};
    border: 1px solid ${colors.lightGray};
    border-left-width: 0;
    border-right-width: 0;
`;

const ButtonText = styled.Text`
    color: ${colors.purple};
    font-weight: ${fontWeights.medium};
    font-size: ${fontSizes.large};
    text-align: center;
    padding: ${spacing.small}px 0;
`;
