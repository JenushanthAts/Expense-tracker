import React, { FC } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { formatDate } from "../../utils/utils";
import { useExpense } from "../../hooks/useExpense";

// interface IModal {
//   onCloseModal: () => void;
// }
const ViewExpense: FC = () => {
  const { expense, handleClose } = useExpense();
  return (
    <Modal show={true} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Expense Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-2">
          <div className="col-3">
            <h6>Type:</h6>
          </div>
          <div className="col-9">
            <p className="mb-0">{expense?.type}</p>
          </div>
        </Row>
        <Row className="mb-2">
          <div className="col-3">
            <h6>Description:</h6>
          </div>
          <div className="col-9">
            <p className="mb-0">{expense?.description}</p>
          </div>
        </Row>
        <Row className="mb-2">
          <div className="col-3">
            <h6>Amount:</h6>
          </div>
          <div className="col-9">
            <p className="mb-0">{expense?.amount}</p>
          </div>
        </Row>
        <Row className="mb-2">
          <div className="col-3">
            <h6>Date:</h6>
          </div>
          <div className="col-9">
            <p className="mb-0">{formatDate(expense?.date)}</p>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ViewExpense;
