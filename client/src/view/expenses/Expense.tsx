import { ModalEnum } from "../../models/Expsenses";
import { FC, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import ViewExpense from "./ViewExpense";
import { formatDate } from "../../utils/utils";
import DeleteExpense from "./DeleteExpense";
import AddExpense from "./AddExpense";
import { useExpense } from "../../hooks/useExpense";
import UpdateExpense from "./UpdateExpense";
import SetBudget from "./SetBudget";

const Expenses: FC = () => {
  const {
    setExpense,
    expenseLists,
    shownPage,
    setShownPage,
    monthlySummary,
    calculateMaxExpenseThreshold,
    setType,
  } = useExpense();
  let thresHoldValue = calculateMaxExpenseThreshold();
  const handleOnClick = (id: string | undefined, status: ModalEnum) => {
    setShownPage(status);
    let data = expenseLists.expenses.find((ele) => ele._id === id);
    if (data) {
      setExpense(data);
    }
  };
  const handleAdd = (status: ModalEnum) => {
    setShownPage(status);
  };

  useEffect(() => {
    return () => {
      setType("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="d-flex justify-content-center mt-4">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="card-title float-left">
              <h2>All Expenses</h2>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={6}>
            <Button
              size="sm"
              onClick={() => {
                handleAdd(ModalEnum.setBudget);
              }}
            >
              Set Budget
            </Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <Button
              size="sm"
              onClick={() => {
                handleAdd(ModalEnum.add);
              }}
              disabled={monthlySummary.monthlyBudget === 0 ? true : false}
            >
              New
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 ">
          <Col xs={12} md={4} className="mb-3">
            <div className="card">
              <div className="card-body">
                Total Expenses for this month (LKR):{" "}
                {monthlySummary.totalExpenses}
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="card">
              <div className="card-body">
                Remaining amount (LKR):{monthlySummary.remaining}
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="card">
              <div className="card-body">
                Budget (LKR):{monthlySummary.monthlyBudget}
              </div>
            </div>
          </Col>
        </Row>
        {monthlySummary.monthlyBudget === 0 && (
          <Row className="mt-3">
            <Col xs={12}>
              <div className="alert alert-danger" role="alert">
                Please set your monthly budget!
              </div>
            </Col>
          </Row>
        )}
        {thresHoldValue > 0 && (
          <Row className="mt-3">
            <Col xs={12}>
              <div className="alert alert-danger" role="alert">
                Your monthly expense reaches 90% of max expense!
              </div>
            </Col>
          </Row>
        )}
        <Row className="mt-3">
          <Col xs={6}>
            <p>Filter by Type</p>
          </Col>
          <Col xs={6}>
            <Form.Select
              name="type"
              required
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" selected disabled>
                --Please Select--
              </option>
              <option value="Foods">Foods</option>
              <option value="Movies">Movies</option>
              <option value="Online Subscriptions">Online Subscriptions</option>
              <option value="Travelling">Travelling</option>
              <option value="">All</option>
            </Form.Select>
          </Col>
          <Col xs={12}>
            {expenseLists.error && <p>Error Occured</p>}
            {expenseLists.expenses.length === 0 && !expenseLists.loading && (
              <p>No Records Found</p>
            )}
            {expenseLists.expenses.length > 0 && (
              <>
                <div className="table-responsive my-2">
                  <Table
                    striped
                    bordered
                    responsive
                    className="table table-bordered"
                  >
                    <thead className="bg-success text-white">
                      <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseLists.expenses.map((expense, index) => (
                        <tr key={index}>
                          <td>{expense.type}</td>
                          <td>{expense.amount}</td>
                          <td>{formatDate(expense.date)}</td>
                          <td className="d-flex gap-2">
                            <Button
                              onClick={() => {
                                handleOnClick(expense._id, ModalEnum.edit);
                              }}
                              className="btn btn-success"
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => {
                                handleOnClick(expense._id, ModalEnum.delete);
                              }}
                              className="btn btn-danger"
                              size="sm"
                            >
                              Remove
                            </Button>
                            <Button
                              onClick={() => {
                                handleOnClick(expense._id, ModalEnum.view);
                              }}
                              size="sm"
                              className="btn btn-primary"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </Col>
        </Row>

        {shownPage === ModalEnum.view && <ViewExpense />}
        {shownPage === ModalEnum.delete && <DeleteExpense />}
        {shownPage === ModalEnum.add && <AddExpense />}
        {shownPage === ModalEnum.edit && <UpdateExpense />}
        {shownPage === ModalEnum.setBudget && <SetBudget />}
      </Container>
    </div>
  );
};
export default Expenses;
