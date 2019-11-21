import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { fontWeights, fontSizes, colors, spacing } from '../constants/Index';

export default class FeedFooter extends React.PureComponent {
    render() {
        return (
            <Container>
                <View>
                    <Text>New Hikes Every Week</Text>
                    <Circle />
                </View>
            </Container>
        );
    }
}

const Circle = styled.View`
    background-color: ${colors.gray};
    opacity: 0.8;
    border-radius: 7px;
    height: 7px;
    width: 7px;
    margin: ${spacing.micro}px auto;
`;

const Container = styled.View`
    padding: ${spacing.large}px;
`;

const Text = styled.Text`
    color: ${colors.gray};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
    text-align: center;
`;
