import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useExpense } from "../../hooks/useExpense";
import PieChart from "../../components/chart/PieChartComp";
import { expenseService } from "../../services/expenseService";

const Dashboard: FC = () => {
  const { monthlySummary } = useExpense();
  const [report, setReport] = useState({});
  const getMonthlyReport = async () => {
    try {
      const res = await expenseService.getMonthlyReport();
      console.log(res);
      if (res.status === 200) {
        setReport(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMonthlyReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="d-flex justify-content-center mt-4">
      <Container>
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
        <Row>
          <Col xs={12} md={8} className="">
            <div className="card ">
              <div className="card-body">
                <PieChart data={report} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
