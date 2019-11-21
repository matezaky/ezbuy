import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import LightboxModal from './modals/LightboxModal';
import { getHikeImage } from '../utils/Hike';

const propTypes = {
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
};

const defaultProps = {
    images: [],
};

class PhotoLightboxGroup extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            imageArray: [],
        };
    }

    componentWillMount() {
        this.buildHikeImageArray();
    }

    buildHikeImageArray = async () => {
        const { id, images } = this.props;
        const imageArray = [];

        for (let i = 0; i < images.length; i += 1) {
            const imageUrl = await getHikeImage(id, i);
            imageArray.push({
                uri: imageUrl,
                attribution: images[i],
            });
        }

        this.setState({ imageArray });
    };

    render() {
        const { imageArray } = this.state;
        return (
            <View>
                <PhotoGroup>
                    {imageArray.map((image, index) => (
                        <Thumbnail
                            image={image}
                            imageIndex={index}
                            key={index}
                        />
                    ))}
                </PhotoGroup>
                <LightboxModal
                    images={imageArray}
                    animationType='fade'
                    modalAction='showLightbox'
                />
            </View>
        );
    }
}

PhotoLightboxGroup.propTypes = propTypes;
PhotoLightboxGroup.defaultProps = defaultProps;

export default PhotoLightboxGroup;

const PhotoGroup = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
