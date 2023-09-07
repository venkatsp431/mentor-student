import React from "react";
import Base from "../Base/base";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard({ students, mentors }) {
  // const navigate = useNavigate();
  console.log(students);
  if (!Array.isArray(students)) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Base>
        <Container>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-4"
          >
            <Tab eventKey="home" title="Students">
              <Row>
                {students.map((stud, idx) => (
                  <Col md={3} key={idx}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{stud?.studentName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {stud?.mentor}
                        </Card.Subtitle>

                        <Link
                          to={`/changementor/${idx}`}
                          className="text-decoration-none"
                        >
                          Change/Assign Mentor
                        </Link>
                        {stud.prevMentor ? (
                          <Card.Subtitle className="mb-2 mt-2 text-muted">
                            Previous Mentor : {stud?.prevMentor}
                          </Card.Subtitle>
                        ) : (
                          ""
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>
            <Tab eventKey="profile" title="Mentors">
              <Row>
                {mentors.map((stud, idx) => (
                  <Col md={3} key={idx}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{stud?.mentor}</Card.Title>

                        <Link to={`/assignmentor/${stud?.mentor}`}>
                          Assign Students
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </Base>
    </div>
  );
}
