import React, {PureComponent, cloneElement, isValidElement} from 'react';
import _ from 'lodash';
import {Modal} from 'antd';

const ModalContext = React.createContext(null);

const useModals = (WrappedComponent) => {
    const wrapper = (props) => (
        <ModalContext.Consumer>
            {(context = {}) =>
                <WrappedComponent
                    {...props}
                    {...context}
                />
            }
        </ModalContext.Consumer>
    );
    wrapper.displayName =
        `useModals(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return wrapper;
};

@useModals
class ModalProps extends PureComponent {
    static propTypes = Modal.propTypes;

    componentDidMount() {
        this.updateModal();
    }

    componentDidUpdate() {
        this.updateModal();
    }

    updateModal = () => this.props.updateModal(
        _.omit(
            this.props,
            ['openModal', 'closeModal', 'updateModal']
        )
    );

    render() {
        return null;
    }
}

class ModalProvider extends PureComponent {
    state = {
        modalProps: {},
        modalElement: undefined,
        renderElement: undefined,
    };

    injectProps = (modalElement, modalProps = {}) => {
        // extract event handlers and defaults from all props
        const noop = () => undefined;
        const { onCancel = noop, onOk = noop } =
            { ...modalElement.props, ...modalProps };

        // inject our own event handlers into the modal
        return cloneElement(modalElement, {
            ...modalProps,
            visible: true,
            onCancel: (e) => {
                if (!onCancel(e)) {
                    this.closeModal();
                }
            },
            onOk: (e) => {
                if (!onOk(e)) {
                    this.closeModal();
                }
            }
        });
    };

    openModal = (modalElement, modalProps = {}) => {
        if (modalElement && isValidElement(modalElement)) {
            if (modalElement.type !== Modal) {
                modalElement = (
                    <Modal>
                        {modalElement}
                    </Modal>
                );
            }

            this.setState({
                modalProps,
                modalElement,
                renderElement: this.injectProps(modalElement, modalProps),
            });
        }
    };

    updateModal = (modalProps) => {
        const {modalElement, modalProps: oldProps} = this.state;
        if (!this.state.modalElement) return;

        const newProps = {
            ...oldProps,
            ...modalProps,
        };

        if (!_.isEqual(newProps, oldProps)) {
            this.setState({
                modalProps: newProps,
                renderElement: this.injectProps(modalElement, newProps),
            });
        }
    };

    closeModal = () => {
        this.setState({
            modalProps: {},
            modalElement: undefined,
            renderElement: undefined,
        });
    };

    contextValue = {
        openModal: this.openModal,
        closeModal: this.closeModal,
        updateModal: this.updateModal,
    };

    render() {
        return (
            <ModalContext.Provider value={this.contextValue}>
                <div className='modal-element-container'>
                    {this.state.renderElement}
                </div>
                {this.props.children}
            </ModalContext.Provider>
        );
    }
}

export {
    ModalProvider as default,
    useModals,
    ModalProps,
    ModalContext
};
