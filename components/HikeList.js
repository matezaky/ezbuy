import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlatList } from 'react-navigation';
import HikeListItem from './HikeListItem';
import { colors, fontSizes, fontWeights, spacing } from '../constants/Index';

const propTypes = {
    maybeShowEmptyState: PropTypes.bool.isRequired,
    hikeData: PropTypes.array.isRequired,
};

class HikeList extends React.Component {
    renderListHeader = () => (
        <HeaderContainer>
            <HeaderText>Your Hikes</HeaderText>
        </HeaderContainer>
    );

    renderEmptyList = () => {
        const { maybeShowEmptyState } = this.props;
        if (maybeShowEmptyState) {
            return (
                <EmptyContainer>
                    <EmptyContainerText>
                        Hikes that you favorite will appear here.
                    </EmptyContainerText>
                </EmptyContainer>
            );
        }
        return null;
    };

    renderItem = ({ item }) => (
        <HikeListItem
            id={item.id}
            name={item.name}
            location={item.city}
            distance={item.distance}
        />
    );

    render() {
        const { hikeData } = this.props;
        const extractKey = ({ id }) => id;

        return (
            <RootView>
                {hikeData && (
                    <FlatList
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderListHeader}
                        ListEmptyComponent={this.renderEmptyList}
                        data={hikeData}
                        extraData={this.props}
                        keyExtractor={extractKey}
                    />
                )}
            </RootView>
        );
    }
}

HikeList.propTypes = propTypes;

export default HikeList;

const RootView = styled.View`
    margin-left: ${spacing.small}px;
`;

const HeaderContainer = styled.View`
    padding-bottom: 4px;
    margin-top: ${spacing.tiny}px;
`;

const HeaderText = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

const EmptyContainer = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const EmptyContainerText = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.medium}px;
`;
