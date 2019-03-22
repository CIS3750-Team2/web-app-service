import React from 'react';

import {Button} from 'antd';
import {ModalProps, useModals} from 'util/ModalProvider';
import GraphView from 'widgets/GraphView';

const GraphViewModal = useModals(({ closeModal, graph }) => (
    <>
        <ModalProps
            title='Visualization Details'
            footer={
                <Button type='default' onClick={closeModal}>
                    Close
                </Button>
            }
            width='96%'
            style={{ margin: '2% 2% 0', top: 0 }}
        />
        <GraphView {...graph}/>
    </>
));

export default GraphViewModal;
