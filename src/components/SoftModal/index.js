import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function SoftModal({ header, body, footer, open = false, toggle, headertoggle }) {
  return (
    <Modal isOpen={open} toggle={toggle} backdrop={true}>
      {header && <ModalHeader toggle={headertoggle && toggle}>{header}</ModalHeader>}
      <ModalBody>{body}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
}
