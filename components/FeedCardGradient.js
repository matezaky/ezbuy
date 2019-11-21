import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

const propTypes = {
    imageDidLoad: PropTypes.string,
};

const defaultProps = {
    imageDidLoad: true,
};

const FeedCardGradient = ({ imageDidLoad }) => (
    <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: imageDidLoad ? 75 : 0,
        }}
    />
);

FeedCardGradient.propTypes = propTypes;
FeedCardGradient.defaultProps = defaultProps;

export default FeedCardGradient;
