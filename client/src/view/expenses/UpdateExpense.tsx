import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import ExpenseComp from "../../components/expense/ExpenseComp";
import { useExpense } from "../../hooks/useExpense";
// interface IModal {
//   onCloseModal: () => void;
// }
const UpdateExpense: FC = () => {
  const { handleClose } = useExpense();

  return (
    <Modal show={true} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExpenseComp />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UpdateExpense;
