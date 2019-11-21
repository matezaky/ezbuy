import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { colors, spacing, fontSizes, opacities } from '../constants/Index';
import { updateMap } from '../actions/User';
import { logoutUser } from '../utils/User';

const propTypes = {
    item: PropTypes.string.isRequired,
    dispatchMap: PropTypes.func.isRequired,
    map: PropTypes.string.isRequired,
    sections: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        map: state.userReducer.map,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchMap: (map) => dispatch(updateMap(map)),
    };
}

class SettingsItem extends React.PureComponent {
    constructor(props) {
        super(props);
        const { sections } = this.props;
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            textColor: colors.black,
            checkDisplay: 'none',
            mapSectionData: sections[0].data,
            accountSectionData: sections[2].data,
        };
    }

    componentWillMount = async () => {
        const { item, map } = this.props;
        const { mapSectionData } = this.state;

        if (mapSectionData.includes(item) && item === map) {
            this.selectItem();
        }
    };

    componentDidUpdate = async () => {
        const { item, map } = this.props;
        const { mapSectionData } = this.state;

        if (mapSectionData.includes(item) && item !== map) {
            this.unselectItem();
        }
    };

    handleLogout = async () => {
        logoutUser();
    };

    itemPress = () => {
        const { item, map } = this.props;
        const { accountSectionData, mapSectionData } = this.state;

        if (accountSectionData.includes(item) && item === 'Logout') {
            this.handleLogout();
        }

        if (mapSectionData.includes(item) || item !== map) {
            this.updateMapSelection();
        }
    };

    updateMapSelection() {
        const { item, dispatchMap } = this.props;

        this.selectItem();
        Haptics.selectionAsync();

        dispatchMap(item);
    }

    selectItem() {
        this.setState({
            textColor: `${colors.purple}`,
            checkDisplay: 'flex',
        });
    }

    unselectItem() {
        this.setState({
            textColor: colors.black,
            checkDisplay: 'none',
        });
    }

    render() {
        const { item } = this.props;
        const { checkDisplay, textColor } = this.state;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.itemPress}
            >
                <ItemContainer>
                    <ItemText key={item.key} textColor={textColor}>
                        {item}
                    </ItemText>
                    <Ionicons
                        name='ios-checkmark'
                        size={35}
                        color={colors.purple}
                        style={{
                            display: checkDisplay,
                            right: parseInt(spacing.small, 10),
                            top: 5,
                            position: 'absolute',
                        }}
                    />
                </ItemContainer>
            </TouchableOpacity>
        );
    }
}

SettingsItem.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsItem);

const ItemContainer = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const ItemText = styled.Text`
    color: ${(props) => props.textColor || colors.black};
    font-size: ${fontSizes.large}px;
`;
