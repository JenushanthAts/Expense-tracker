import React, { FC, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const PieChartComp: FC<{ data: any }> = ({ data }) => {
  const [pieData, setPieData] = useState<{ amount: number; type: string }[]>(
    []
  );

  useEffect(() => {
    if (data.success) {
      const totalExpenses = data.expenses.reduce(
        (total: number, expense: { amount: number }) => total + expense.amount,
        0
      );

      const balance = data.monthlyBudget - totalExpenses;
      setPieData([
        ...data.expenses,
        {
          amount: balance,
          type: "Balance",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.success]);

  const filteredData = pieData.filter((expense) => expense.amount !== 0);
  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#8884D8", "#FFBB28"];
  return (
    <div style={{ width: "100%", height: 300 }}>
      <div style={{ height: "95%" }}>
        <p>Expenses</p>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="amount"
              nameKey="type"
              labelLine={false}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(props) => {
                const { cx, cy, midAngle, innerRadius, outerRadius, percent } =
                  props;
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#000"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {pieColors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>

        {/* </div> */}
      </div>
    </div>
  );
};
export default PieChartComp;
