import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { opacities, colors } from '../constants/Index';
import { favoriteHike, unfavoriteHike } from '../actions/Hike';
import { getUserFavoriteHikes } from '../utils/User';

const propTypes = {
    id: PropTypes.string.isRequired,
    dispatchFavorite: PropTypes.func.isRequired,
    dispatchUnfavorite: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchFavorite: (updatedHikeData) =>
            dispatch(favoriteHike(updatedHikeData)),
        dispatchUnfavorite: (updatedHikeData) =>
            dispatch(unfavoriteHike(updatedHikeData)),
    };
}

class FavoriteButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iconColor: colors.gray,
            iconName: 'ios-heart-empty',
            iconSize: 30,
        };
    }

    componentWillMount = async () => {
        await this.getFavoriteHikes();
        this.setFavoriteHike();
    };

    getFavoriteHikes = async () => {
        const favoritedHikes = await getUserFavoriteHikes();
        const hikes = [];

        favoritedHikes.forEach((hike) => {
            if (hike.exists) {
                hikes.push(hike.id);
            }
        });

        this.setState({
            hikes,
        });
    };

    setFavoriteHike = async () => {
        const { id } = this.props;
        const { hikes } = this.state;

        if (hikes.includes(id)) {
            this.setHeartFilled();
        }
    };

    setHeartFilled() {
        this.setState({
            iconColor: colors.purple,
            iconName: 'ios-heart',
        });
    }

    setHeartEmpty() {
        this.setState({
            iconColor: colors.gray,
            iconName: 'ios-heart-empty',
        });
    }

    removeFavoriteHike = async () => {
        const { id } = this.props;
        const { hikes } = this.state;
        const index = hikes.indexOf(id);

        delete hikes[index];
    };

    buttonPress = () => {
        this.updateButtonStyle();
        Haptics.selectionAsync();
    };

    updateButtonStyle() {
        const { iconName } = this.state;
        const {
            dispatchFavorite,
            dispatchUnfavorite,
            id,
            distance,
            name,
            city,
        } = this.props;

        const updatedHikeData = {
            id,
            distance,
            name,
            city,
        };

        if (iconName === 'ios-heart-empty') {
            this.setHeartFilled();
            this.setFavoriteHike();
            dispatchFavorite(updatedHikeData);
        } else {
            this.setHeartEmpty();
            this.removeFavoriteHike();
            dispatchUnfavorite(updatedHikeData);
        }
    }

    render() {
        const { iconName, iconColor, iconSize } = this.state;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.buttonPress}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 20,
                }}
            >
                <Ionicons name={iconName} color={iconColor} size={iconSize} />
            </TouchableOpacity>
        );
    }
}

FavoriteButton.propTypes = propTypes;

export default connect(
    null,
    mapDispatchToProps,
)(FavoriteButton);
