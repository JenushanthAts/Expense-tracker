import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { expenseService } from "../../services/expenseService";
import { useExpense } from "../../hooks/useExpense";

// interface IModal {
//   onCloseModal: () => void;
//   //   fetchExpenses: () => Promise<void>;
// }
const DeleteExpense: FC = () => {
  const {
    expense,
    fetchExpenses,
    handleClose,
    calculateMonthlySummary,
    calculateMaxExpenseThreshold,
  } = useExpense();
  const handleDelete = async () => {
    try {
      if (expense && expense._id) {
        const response = await expenseService.removeExpense(expense._id);
        if (response.data.success) {
          handleClose();
          fetchExpenses();
          calculateMonthlySummary();
          calculateMaxExpenseThreshold();
          alert("Successfully Removed");
        }
      }
    } catch (err) {
      alert("Error occured");
    }
  };
  return (
    <Modal show={true} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this expense?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteExpense;
