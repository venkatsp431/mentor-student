import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Base({ children }) {
  const navigate = useNavigate();
  return (
    <div className="base">
      <Container>
        <div className="button-group">
          <Button variant="default" size="lg">
            Dashboard
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/addstudents")}
          >
            Add Student
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/addmentor")}
          >
            Add Mentor
          </Button>
        </div>
      </Container>
      <div>{children}</div>
    </div>
  );
}
