import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

type PropTypes = {
  open: boolean;
    closeModal: () => void;
  children: React.ReactNode
};


const ModalContainer = (props: PropTypes) => {
  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
      className={"modal"}
      overlayClassName={
        "bg-black bg-opacity-30 fixed top-0 left-0 w-full h-full z-[9999999] block"
      }
      shouldCloseOnOverlayClick={true}
    >
      {props.children}
    </Modal>
  );
};

export default ModalContainer;
