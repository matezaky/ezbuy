import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    spacing,
    colors,
    fontWeights,
    fontSizes,
    borderRadius,
} from '../constants/Index';

const propTypes = {
    distance: PropTypes.number,
    elevation: PropTypes.number,
    route: PropTypes.string,
};

const defaultProps = {
    distance: 0,
    elevation: 0,
    route: '',
};

const InfoBar = ({ distance, elevation, route }) => (
    <CardContent>
        <ContentItem>
            <MetaDataType>Distance</MetaDataType>
            <MetaData>
                {distance}
                {'m'}
            </MetaData>
        </ContentItem>
        <ContentItem>
            <MetaDataType>Elevation</MetaDataType>
            <MetaData>
                {elevation}
                {'ft'}
            </MetaData>
        </ContentItem>
        <ContentItem>
            <MetaDataType>Route</MetaDataType>
            <MetaData>{route}</MetaData>
        </ContentItem>
    </CardContent>
);

InfoBar.propTypes = propTypes;
InfoBar.defaultProps = defaultProps;

export default InfoBar;

const CardContent = styled.View`
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: ${spacing.tiny}px ${spacing.small}px;
    margin-top: -4px;
    z-index: 2;
    background-color: ${colors.white};
    border-bottom-left-radius: ${borderRadius.medium}px;
    border-bottom-right-radius: ${borderRadius.medium}px;
`;

const ContentItem = styled.View`
    flex-direction: column;
    flex-grow: 1;
`;

const MetaDataType = styled.Text`
    color: ${colors.mediumGray};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

const MetaData = styled.Text`
    padding-top: 1px;
    color: ${colors.black};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
`;
