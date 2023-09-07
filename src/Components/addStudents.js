import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Base from "../Base/base";

export default function AddStudents({ students, setStudents }) {
  const validationSchema = Yup.object({
    studentName: Yup.string().required("Student Name is required"),
    mentor: Yup.string(),
  });
  const initialValues = {
    studentName: "",
    mentor: "",
  };
  const navigate = useNavigate();
  const onSubmit = async (values, { setSubmitting }) => {
    // Handle form submission logic here
    const res = await fetch(
      "https://mentor-student1.onrender.com/api/student/add",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res1 = await res.json();
    if (res1) {
      students.push(res1.data);
      setStudents(students);
      navigate("/");
    }
    console.log("Form submitted with values:", values);
    setSubmitting(false);
  };
  return (
    <Base>
      <div className="addStudents">
        <Container>
          <h2>Add Students</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label">
                    Student Name
                  </label>
                  <Field
                    type="text"
                    name="studentName"
                    id="studentName"
                    className={`form-control ${
                      touched.studentName && errors.studentName
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="studentName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mentor" className="form-label">
                    Mentor
                  </label>
                  <Field
                    type="text"
                    name="mentor"
                    id="mentor"
                    className={`form-control ${
                      touched.mentor && errors.mentor ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="mentor"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </Base>
  );
}
