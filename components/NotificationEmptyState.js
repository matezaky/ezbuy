import React from 'react';
import styled from 'styled-components';
import { colors, fontSizes, spacing } from '../constants/Index';
import { BellEmptyState } from '../icons/Index';

class NotificationEmptyState extends React.PureComponent {
    render() {
        return (
            <RootView>
                <BellWrapper>
                    <BellEmptyState />
                </BellWrapper>
                <EmptyStateText>No new notifications</EmptyStateText>
            </RootView>
        );
    }
}

export default NotificationEmptyState;

const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const BellWrapper = styled.View`
    opacity: 0.8;
`;

const EmptyStateText = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${colors.mediumGray};
    font-size: ${fontSizes.medium}px;
`;
