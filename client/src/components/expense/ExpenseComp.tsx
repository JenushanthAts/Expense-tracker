import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { IExpense } from "../../models/Expsenses";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useExpense } from "../../hooks/useExpense";
import { expenseService } from "../../services/expenseService";
const ExpenseComp: FC = () => {
  const [form, setForm] = useState({} as IExpense);
  const {
    expense,
    fetchExpenses,
    handleClose,
    calculateMonthlySummary,
    calculateMaxExpenseThreshold,
  } = useExpense();
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "amount") {
      const formattedValue = parseFloat(value);
      let amount = name;
      setForm((prevForm) => ({
        ...prevForm,
        [amount]: formattedValue,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (expense._id) {
      try {
        const response = await expenseService.updateExpense(expense._id, form);
        if (response.status === 200) {
          fetchExpenses();
          handleClose();
          calculateMonthlySummary();
          calculateMaxExpenseThreshold();
          alert("Successfully updated");
        }
      } catch (err) {
        alert("Update request failed");
      }
    } else {
      try {
        const response = await expenseService.addNewExpense(form);
        if (response.status === 201) {
          fetchExpenses();
          handleClose();
          calculateMonthlySummary();
          calculateMaxExpenseThreshold();
          alert("Successfully added");
          setForm({});
        }
      } catch (err) {
        alert("Add request failed");
      }
    }
  };
  useEffect(() => {
    if (expense._id) {
      setForm({ ...expense });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Select
          name="type"
          value={form.type || ""}
          required
          onChange={handleChange}
        >
          <option value="">--Please Select--</option>
          <option value="Foods">Foods</option>
          <option value="Movies">Movies</option>
          <option value="Online Subscriptions">Online Subscriptions</option>
          <option value="Travelling">Travelling</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2" controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          required
          placeholder="Amount"
          name="amount"
          value={form.amount || ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="amount">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          required
          value={form.description || ""}
          name="description"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={form.date?.substring(0, 10)}
          required
          onChange={handleChange}
        />
      </Form.Group>

      {expense._id ? (
        <Button variant="danger" type="submit">
          Update
        </Button>
      ) : (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      )}
    </Form>
  );
};
export default ExpenseComp;
