import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Button, Container } from "react-bootstrap";
import * as Yup from "yup";
import Base from "../Base/base";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  mentor: Yup.string().required("Mentor name is required"),
});

const initialValues = {
  mentor: "",
};

export default function AddMentor({ mentors, setMentors }) {
  const navigate = useNavigate();
  const onSubmit = async (values, setSubmitting) => {
    const res = await fetch(
      `https://mentor-student1.onrender.com/api/mentor/addmentor`,
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
      mentors.push(res1.data);
      setMentors(mentors);
      navigate("/");
    }
    setSubmitting(false);
  };
  return (
    <Base>
      <Container>
        <h3>Add Mentor</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
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
    </Base>
  );
}
