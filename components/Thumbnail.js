import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { spacing, borderRadius, colors, opacities } from '../constants/Index';
import { showModal, setLightboxImage } from '../actions/Modal';

const THUMBNAIL_DIMENSION = 75;

const propTypes = {
    dispatchImage: PropTypes.func.isRequired,
    dispatchModalFlag: PropTypes.func.isRequired,
    imageIndex: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    modalType: PropTypes.string,
};

const defaultProps = {
    modalType: 'lightbox',
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchImage: (imageIndex) => dispatch(setLightboxImage(imageIndex)),
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class Thumbnail extends React.PureComponent {
    thumbnailPress = () => {
        const {
            dispatchImage,
            dispatchModalFlag,
            imageIndex,
            modalType,
        } = this.props;

        dispatchImage(imageIndex);
        dispatchModalFlag(modalType);
    };

    render() {
        const { image } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.thumbnailPress}
            >
                <ThumbnailImage source={image} resizeMode='cover' />
            </TouchableOpacity>
        );
    }
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default connect(
    null,
    mapDispatchToProps,
)(Thumbnail);

const ThumbnailImage = styled.Image`
    display: flex;
    background-color: ${colors.lightGray};
    width: ${THUMBNAIL_DIMENSION}px;
    height: ${THUMBNAIL_DIMENSION}px;
    border-radius: ${borderRadius.small}px;
    margin: 0 ${spacing.tiny}px ${spacing.micro}px 0;
`;
