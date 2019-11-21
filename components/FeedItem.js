import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import FeedCard from './FeedCard';
import { spacing, opacities } from '../constants/Index';

const propTypes = {
    coverPhoto: PropTypes.string,
    name: PropTypes.string,
    distance: PropTypes.number,
    elevation: PropTypes.number,
    route: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
};

const defaultProps = {
    name: '',
    route: '',
    description: '',
    city: '',
    coverPhoto: undefined,
    distance: 0,
    elevation: 0,
};

class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: true,
        };
    }

    render() {
        const {
            navigation,
            name,
            distance,
            elevation,
            route,
            city,
            description,
            coverPhoto,
        } = this.props;

        const { showCard } = this.state;

        if (showCard) {
            return (
                <CardsContainer>
                    <TouchableOpacity
                        activeOpacity={opacities.regular}
                        onPress={() => {
                            navigation.push('Hike', {
                                hike: this.props,
                            });
                        }}
                    >
                        <FeedCard
                            name={name}
                            image={{ uri: coverPhoto }}
                            distance={distance}
                            elevation={elevation}
                            route={route}
                            city={city}
                            description={description}
                        />
                    </TouchableOpacity>
                </CardsContainer>
            );
        }
        return null;
    }
}

FeedItem.propTypes = propTypes;
FeedItem.defaultProps = defaultProps;

export default withNavigation(FeedItem);

const CardsContainer = styled.View`
    flex-direction: column;
    padding: ${spacing.tiny}px;
    padding-bottom: 0;
`;
