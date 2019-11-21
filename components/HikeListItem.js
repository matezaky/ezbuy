import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
    colors,
    fontSizes,
    fontWeights,
    spacing,
    opacities,
} from '../constants/Index';
// import { getHikeSnapshot } from '../utils/Hike';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
};

class ProfileHikeRow extends React.PureComponent {
    getHikeData = async () => {
        const { id } = this.props;
        // const hikeSnapshot = await getHikeSnapshot(id);
        // this.setHikeData(hikeSnapshot);
    };

    setHikeData = async (hikeSnapshot) => {
        const { navigation, id } = this.props;
        const hikeData = hikeSnapshot.data();
        hikeData.id = id;
        navigation.push('Hike', {
            hike: hikeData,
        });
    };

    render() {
        const { name, location, distance } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={() => {
                    this.getHikeData();
                }}
            >
                <Container>
                    <Name>{name}</Name>
                    <MetaData>
                        {location}
                        {' · '}
                        {distance}
                        {'m'}
                    </MetaData>
                </Container>
            </TouchableOpacity>
        );
    }
}

ProfileHikeRow.propTypes = propTypes;

export default withNavigation(ProfileHikeRow);

const Container = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const Name = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.bold};
`;

const MetaData = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.medium}px;
`;
