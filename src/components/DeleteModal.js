import React from 'react';
import Modal from 'react-modal';

const DeleteModal = (props) => (
  <Modal 
    isOpen={props.queryConfirm}
    onRequestClose={props.onNo}
    contentLabel="Confirm deletion"
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className="modal__title">Do you really want to delete the expense?</h3>
    <div className="modal__button-group">
      <button className="button" onClick={props.onNo}>No</button>
      <button className="button" onClick={props.onYes}>Yes</button>
    </div>
  </Modal>
);

export default DeleteModal;