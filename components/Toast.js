import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
    colors,
    transparentColors,
    borderRadius,
    spacing,
    fontSizes,
    fontWeights,
    opacities,
} from '../constants/Index';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
    name: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        action: state.hikeReducer.action,
    };
}

class Toast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top: new Animated.Value(SCREEN_HEIGHT),
        };
    }

    componentDidUpdate() {
        this.showToast();
    }

    showToast = () => {
        const { action } = this.props;
        const { top } = this.state;

        if (action === 'favoriteHike') {
            Animated.timing(top, {
                toValue: SCREEN_HEIGHT - 250,
                duration: 500,
            }).start();
        }

        this.timeout = setTimeout(() => {
            this.hideToast();
        }, 3500);
    };

    hideToast = () => {
        const { top } = this.state;
        clearTimeout(this.timeout);

        Animated.timing(top, {
            toValue: SCREEN_HEIGHT,
            duration: 500,
        }).start();
    };

    render() {
        const { name } = this.props;
        const { top } = this.state;

        return (
            <AnimatedContainer style={{ top }}>
                <ToastText>
                    {'You favorited, '}
                    {name}
                    {'.'}
                </ToastText>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.buttonPress}
                    style={{
                        position: 'absolute',
                        right: 12,
                        top: 5,
                    }}
                >
                    <Ionicons name='ios-close' color={colors.white} size={30} />
                </TouchableOpacity>
            </AnimatedContainer>
        );
    }
}

Toast.propTypes = propTypes;

export default connect(mapStateToProps)(Toast);

const Container = styled.View`
    position: absolute;
    left: ${spacing.small}px;
    right: ${spacing.small}px;
    background: ${transparentColors.purple};
    box-shadow: 0 4px 12px ${transparentColors.gray};
    border-radius: ${borderRadius.medium}px;
    z-index: 1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const ToastText = styled.Text`
    font-size: ${fontSizes.medium}px;
    color: ${colors.white};
    font-weight: ${fontWeights.medium};
    padding: 12px;
`;
