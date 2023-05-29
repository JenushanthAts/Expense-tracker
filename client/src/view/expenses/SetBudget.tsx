import { FC, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useExpense } from "../../hooks/useExpense";
import { expenseService } from "../../services/expenseService";

const SetBudget: FC = () => {
  const { handleClose, calculateMonthlySummary, monthlySummary } = useExpense();
  const [budget, setBudget] = useState<number>(monthlySummary.monthlyBudget);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await expenseService.setMonthlyBudget({
        maxAmount: budget,
      });
      console.log(response);
      if (response.status === 200) {
        handleClose();
        calculateMonthlySummary();
        alert("Budget Successfully set");
      }
    } catch (err) {
      alert("Cannot set budget");
    }
  };
  return (
    <Modal show={true} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add your budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Amount in LKR"
              name="amount"
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value))}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SetBudget;
