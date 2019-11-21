import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActivityIndicator, Keyboard } from 'react-native';
import { colors } from '../constants/Index';

const propTypes = {
    loading: PropTypes.bool,
};

const defaultProps = {
    loading: false,
};

class LoadingOverlay extends React.Component {
    componentDidUpdate() {
        const { loading } = this.props;

        if (loading) {
            Keyboard.dismiss();
        }
    }

    render() {
        const { loading } = this.props;
        return (
            <LoadingView loading={loading}>
                <ActivityView>
                    <ActivityIndicator
                        size='small'
                        color={colors.grayDark}
                        style={{
                            zIndex: 1,
                            transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                        }}
                    />
                </ActivityView>
            </LoadingView>
        );
    }
}

LoadingOverlay.propTypes = propTypes;
LoadingOverlay.defaultProps = defaultProps;

export default LoadingOverlay;

const ActivityView = styled.View`
    flex: 1;
    justify-content: center;
`;

const LoadingView = styled.View`
		display: ${(props) => (props.loading ? 'flex' : 'none')};
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.8;
    background-color: ${colors.white};
`;
