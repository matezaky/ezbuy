import React from 'react';
import PropTypes from 'prop-types';
import { Modal, StatusBar } from 'react-native';

const propTypes = {
    action: PropTypes.string.isRequired,
    modalAction: PropTypes.string.isRequired,
    hideStatusBar: PropTypes.bool,
};

const defaultProps = {
    hideStatusBar: true,
};

class ModalBase extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { action, modalAction } = this.props;
        if (prevProps.action !== action) {
            this.toggleModal(action, modalAction);
        }
    }

    showModal() {
        const { hideStatusBar } = this.props;

        if (this.extraActions) {
            this.extraActions();
        }

        this.setState({ modalVisible: true });

        if (hideStatusBar) {
            StatusBar.setHidden(true);
        }
    }

    hideModal() {
        this.setState({ modalVisible: false });
        StatusBar.setHidden(false);
    }

    toggleModal(action, modalAction) {
        if (action === modalAction) {
            this.showModal();
        } else if (action === 'hideModal') {
            this.hideModal();
        }
    }

    render() {
        const { modalVisible } = this.state;
        return <Modal visible={modalVisible} />;
    }
}

ModalBase.propTypes = propTypes;
ModalBase.defaultProps = defaultProps;

export default ModalBase;
