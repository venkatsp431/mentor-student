import React, { useState } from "react";
import Base from "../Base/base";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function Changementor({ students, setStudents, mentors }) {
  const navigate = useNavigate();
  const { stud } = useParams();
  const idx = parseInt(stud);
  //   console.log(vdx, idx, students);
  console.log(students[idx], students[idx]?.studentName);
  const yesMentor = [];
  mentors.map((ment) => {
    yesMentor.push({
      value: ment.mentor,
      label: ment.mentor,
    });
  });

  const [selectedMentor, setSelectedMentor] = useState([]);
  const handleChangeMentor = (selectedMentor) => {
    setSelectedMentor(selectedMentor);
  };
  const onSubmit = async function (e) {
    e.preventDefault();
    const values = { id: students[idx]._id, mentor: selectedMentor.label };
    console.log(students[idx].studentName, selectedMentor);
    const res = await fetch(
      "https://mentor-student1.onrender.com/api/student/changementor",
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res1 = await res.json();
    if (res1) {
      students[idx] = { ...students[idx], mentor: selectedMentor.label };
      setStudents(students);
      navigate("/");
    }
  };
  return (
    <div>
      <Base>
        <Container>
          <h2>{students[idx]?.studentName}</h2>

          <Form onSubmit={onSubmit}>
            <Form.Group controlId="selectedMentor">
              <Form.Label>Change Mentor:</Form.Label>
              <Select
                options={yesMentor}
                value={selectedMentor}
                onChange={handleChangeMentor}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Container>
      </Base>
    </div>
  );
}
