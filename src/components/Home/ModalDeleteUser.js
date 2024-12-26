import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser } from '../../../Service/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash'

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const [answer, setAnswer] = useState('')

    useEffect(()=> {
        if (!_.isEmpty(dataDelete)) {
            // update state
            setAnswer(dataDelete.answer);
        }
    }, [dataDelete])

    const handleSubmitDeleteUser = async () => {
        // let data = await deleteUser(dataDelete.id)
        // if (data && data.EC === 0) {
        //     toast.success(data.EM);
        //     handleClose();
        //     await props.fetchListUsers()
        // }
        // if (data && data.EC !== 0) {
        //     toast.error(data.EM)
        // }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Câu trả lời: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: 30 }}>{answer }</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;