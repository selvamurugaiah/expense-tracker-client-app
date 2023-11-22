import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const Dashboard = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const user = useSelector((state) => state.users.users);

  const userInfoString = localStorage.getItem("userInfo");
  const userId = userInfoString ? JSON.parse(userInfoString).userId : null;
  const token = userInfoString ? JSON.parse(userInfoString).token : null;

  useEffect(() => {
    const fetchIncomeList = async () => {
      try {
        const response = await axios.get(
          `https://expense-tracker-app-9kz8.onrender.com/income/get-incomes?page=1&userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIncomeList(response.data.docs);
      } catch (error) {
        console.error('Error fetching income data:', error.message);
      }
    };

    const fetchExpenseList = async () => {
      try {
        const response = await axios.get(
          `https://expense-tracker-app-9kz8.onrender.com/expense/get-expense?page=1&userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExpenseList(response.data.docs);
      } catch (error) {
        console.error('Error fetching expense data:', error.message);
      }
    };

    fetchIncomeList();
    fetchExpenseList();
  }, [userId, token]);

  useEffect(() => {
    if (incomeList && incomeList.length > 0) {
      const incomeTotal = incomeList.reduce((total, item) => total + item.amount, 0);
      setTotalIncome(incomeTotal);
    }

    if (expenseList && expenseList.length > 0) {
      const expenseTotal = expenseList.reduce((total, item) => total + item.amount, 0);
      setTotalExpense(expenseTotal);
    }
  }, [incomeList, expenseList]);

  useEffect(() => {
    setRemainingAmount(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  // Prepare data for the chart
  const chartData = {
    labels: ['Total Income', 'Total Expense', 'Remaining Amount'],
    datasets: [
      {
        label: 'Financial Overview',
        backgroundColor: ['green', 'red', 'blue'],
        data: [totalIncome, totalExpense, remainingAmount],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2>Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
       
          <Bar data={chartData} options={chartOptions}  />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
        <Card>
            <Card.Body>
              <Card.Title>Financial Overview</Card.Title>
              <Card.Text>
                <p style={{ color: 'green' }}>Total Income: ${totalIncome}</p>
                <p style={{ color: 'red' }}>Total Expense: ${totalExpense}</p>
                <h3 style={{ color: 'blue' }}>Remaining Amount: ${remainingAmount}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;





