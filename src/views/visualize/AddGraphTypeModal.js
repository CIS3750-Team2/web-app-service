import React from 'react';

import {ModalProps, useModals} from 'util/ModalProvider';
import AddGraphConfigureModal from './AddGraphConfigureModal';
import GraphTypeSelect from './GraphTypeSelect';
import {Button} from 'antd';

const AddGraphTypeModal = useModals(({ openModal, closeModal, row }) => (
    <>
        <ModalProps
            title='Add Visual - 1/2'
            footer={
                <Button onClick={closeModal}>
                    Cancel
                </Button>
            }
        />

       <GraphTypeSelect onSelect={(type) => openModal(
           <AddGraphConfigureModal row={row} type={type}/>
       )}/>
    </>
));

export default AddGraphTypeModal;
