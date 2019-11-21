import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal, SafeAreaView } from 'react-native';
import ModalOverflow from '../ModalOverflow';
import ModalDismiss from '../ModalDismiss';
import ModalBase from './ModalBase';
import LightboxImage from '../LightboxImage';
import { colors } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        imageIndex: state.modalReducer.imageIndex,
        action: state.modalReducer.action,
    };
}

class LightboxModal extends ModalBase {
    render() {
        const { modalVisible } = this.state;
        const { animationType, images, imageIndex } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ModalOverflow
                            images={images}
                            imageIndex={imageIndex}
                        />
                        <ModalDismiss />
                        <LightboxImage
                            images={images}
                            imageIndex={imageIndex}
                        />
                    </SafeAreaView>
                </ModalRoot>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(LightboxModal);

const ModalRoot = styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${colors.trueBlack};
`;
