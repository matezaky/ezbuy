import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '../constants/Index';
import { lightboxActionSheet } from './action_sheets/Lightbox';

const DISMISS_ICON_OFFSET = 30;
const DISMISS_ICON_SIZE = 35;

const DISMISS_ICON_STYLE = {
    position: 'absolute',
    left: DISMISS_ICON_OFFSET,
    top: DISMISS_ICON_OFFSET,
    zIndex: 1,
};

const propTypes = {
    images: PropTypes.array.isRequired,
    imageIndex: PropTypes.number.isRequired,
};

class ModalOverflow extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            imageAttribution: '',
        };
        this.showLightboxActionSheet = lightboxActionSheet.bind(this);
    }

    componentDidMount() {
        this.setImageAttribution();
    }

    setImageAttribution = async () => {
        const { images, imageIndex } = this.props;
        const imageAttribution = images[imageIndex].attribution;
        this.setState({ imageAttribution });
    };

    showAttributionAlert = () => {
        const { imageAttribution } = this.state;
        Alert.alert('Attribution', `Photo by ${imageAttribution}`);
    };

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.showLightboxActionSheet();
                }}
                activeOpacity={opacities.regular}
                style={DISMISS_ICON_STYLE}
            >
                <Ionicons
                    name='ios-more'
                    color={colors.white}
                    size={DISMISS_ICON_SIZE}
                />
            </TouchableOpacity>
        );
    }
}

ModalOverflow.propTypes = propTypes;

export default ModalOverflow;
