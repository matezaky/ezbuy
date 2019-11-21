import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import InfoBar from './InfoBar';
import HikeMap from './HikeMap';
import {
    spacing,
    colors,
    transparentColors,
    borderRadius,
    opacities,
} from '../constants/Index';
import { showModal } from '../actions/Modal';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    distance: PropTypes.number.isRequired,
    elevation: PropTypes.number,
    route: PropTypes.string,
    coordinates: PropTypes.array,
    region: PropTypes.object,
    modalType: PropTypes.string,
};

const defaultProps = {
    region: undefined,
    coordinates: [],
    elevation: 0,
    route: '',
    modalType: 'map',
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class HikeMapWrapper extends React.Component {
    mapPress = () => {
        const { dispatchModalFlag, modalType } = this.props;
        dispatchModalFlag(modalType);
    };

    render() {
        const { coordinates, region, distance, elevation, route } = this.props;

        return (
            <MapViewWrapper>
                <InnerMapViewWrapper>
                    <HikeMap
                        mapRef={(ref) => {
                            this.mapView = ref;
                        }}
                        coordinates={coordinates}
                        region={region}
                    />
                    <InfoBar
                        distance={distance}
                        elevation={elevation}
                        route={route}
                    />
                    <TouchableOpacity
                        activeOpacity={opacities.regular}
                        onPress={this.mapPress}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            zIndex: 1,
                        }}
                    >
                        <MapOverlay />
                    </TouchableOpacity>
                </InnerMapViewWrapper>
                <GrayBlockView />
            </MapViewWrapper>
        );
    }
}

HikeMapWrapper.propTypes = propTypes;
HikeMapWrapper.defaultProps = defaultProps;

export default connect(
    null,
    mapDispatchToProps,
)(HikeMapWrapper);

const MapViewWrapper = styled.View`
    flex: 1;
    height: 275px;
    background-color: ${colors.purple};
    padding: ${spacing.micro}px ${spacing.small}px;
`;

const InnerMapViewWrapper = styled.View`
    position: relative;
    background-color: ${colors.white};
    border-radius: ${borderRadius.medium}px;
    box-shadow: 0 4px 12px ${transparentColors.gray};
    z-index: 1;
`;

const GrayBlockView = styled.View`
    flex: 1;
    height: 165px;
    background-color: ${colors.ultraLightGray};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
`;

const MapOverlay = styled.View`
    opacity: 0;
`;
