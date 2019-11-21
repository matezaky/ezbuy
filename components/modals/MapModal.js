import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '../ModalDismiss';
import ModalBase from './ModalBase';
import HikeMap from '../HikeMap';
import { spacing } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

class MapModal extends ModalBase {
    render() {
        const { modalVisible } = this.state;
        const { animationType, mapRef, coordinates, region } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot>
                    <HikeMap
                        fullHeight
                        mapRef={mapRef}
                        coordinates={coordinates}
                        region={region}
                        maxZoom={12.5}
                        mapPadding={{
                            left: parseInt(spacing.tiny, 10),
                            bottom: parseInt(spacing.medium, 10),
                        }}
                    />
                    <ModalDismiss includeBackground />
                </ModalRoot>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(MapModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
`;
