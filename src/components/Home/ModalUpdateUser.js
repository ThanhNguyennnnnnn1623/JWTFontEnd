import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser, putUpdateUser } from '../../../Service/apiService';
import _ from 'lodash';

function ModalUpdateUser(props) {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [question, setQuestion] = useState('');
    

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);
            // update state
            setQuestion(dataUpdate.question);
        }
    }, [dataUpdate])



    const handleSubmitCreateUser = async () => {
        
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Câu hỏi:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <p style={{ fontSize: 30 }}>
                                {question}
                            </p>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;