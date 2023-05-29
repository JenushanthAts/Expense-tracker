import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="ml-auto">
          <Nav.Link onClick={() => navigate("/")}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => navigate("/expenses")}>Expenses</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;
