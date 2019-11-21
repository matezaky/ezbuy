import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors, spacing, fontSizes } from '../constants/Index';
import { updateDarkMode } from '../actions/User';

const propTypes = {
    item: PropTypes.string.isRequired,
    sections: PropTypes.array.isRequired,
    dispatchDarkMode: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        darkMode: state.userReducer.darkMode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDarkMode: (darkMode) => dispatch(updateDarkMode(darkMode)),
    };
}

class SettingsItem extends React.PureComponent {
    constructor(props) {
        super(props);
        const { sections } = this.props;
        this.state = {
            displaySectionData: sections[1].data,
        };
    }

    handleToggleSwitch = (value) => {
        const { item, dispatchDarkMode } = this.props;
        const { displaySectionData } = this.state;

        if (displaySectionData.includes(item) && item === 'Dark Mode') {
            dispatchDarkMode(value);
        }
    };

    render() {
        const { item, darkMode } = this.props;
        const { textColor } = this.state;

        return (
            <ItemContainer>
                <ItemText key={item.key} textColor={textColor}>
                    {item}
                </ItemText>
                <SettingsSwitch
                    onValueChange={(value) => this.handleToggleSwitch(value)}
                    value={darkMode}
                    trackColor={{ true: colors.purple, false: colors.gray }}
                    style={{
                        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                    }}
                />
            </ItemContainer>
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

const SettingsSwitch = styled.Switch`
    position: absolute;
    right: ${spacing.tiny}px;
    top: ${spacing.tiny}px;
`;

const ItemText = styled.Text`
    color: ${(props) => props.textColor || colors.black};
    font-size: ${fontSizes.large}px;
`;
