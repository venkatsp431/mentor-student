import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import Base from "../Base/base";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignMentor({ students, setStudents }) {
  const navigate = useNavigate();
  const { mentor } = useParams();
  console.log(mentor);
  const [noment, setnoment] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const handleAddStudent = (selectedOptions) => {
    setSelectedStudents(selectedOptions);
  };

  useEffect(() => {
    const nomentor = async () => {
      const res = await fetch(
        "https://mentor-student1.onrender.com/api/mentor/nomentor"
      );
      const res1 = await res.json();
      if (res1.data) {
        res1.data.map((studName, idx) =>
          noment.push({
            value: studName.studentName,
            label: studName.studentName,
          })
        );
        setnoment(noment);
        console.log(noment);
      }
    };
    nomentor();
  }, [noment]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const values = {
      mentor,
      students: selectedStudents.map((stud) => stud.label),
    };
    console.log(values);
    const res = await fetch(
      "https://mentor-student1.onrender.com/api/mentor/assignmentor",
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
      const updatedStudents = students.map((student) => {
        if (
          selectedStudents.some(
            (selectedStudent) => selectedStudent.label === student.studentName
          )
        ) {
          return { ...student, mentor: mentor };
        }
        return student;
      });
      setStudents(updatedStudents);
      navigate("/");
    }
  };
  return (
    <div>
      <Base>
        <Container>
          <h2>{mentor}</h2>

          <Form onSubmit={onSubmit}>
            <Form.Group controlId="selectedStudents">
              <Form.Label>Add Students:</Form.Label>
              <Select
                isMulti
                options={noment}
                value={selectedStudents}
                onChange={handleAddStudent}
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
