import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/dashboard";
import { useEffect, useState } from "react";
import AddStudents from "./Components/addStudents";
import AddMentor from "./Components/addMentor";
import AssignMentor from "./Components/assignMentor";
import Changementor from "./Components/changeMentor";

function App() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    async function apiReq() {
      try {
        const res = await fetch(
          `https://mentor-student1.onrender.com/api/student/all`,
          {
            method: "GET",
          }
        );
        const res1 = await res.json();
        if (res1) {
          // Check if the response is an array
          setStudents(res1.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function apiReqMen() {
      try {
        const res = await fetch(
          `https://mentor-student1.onrender.com/api/mentor/all`,
          {
            method: "GET",
          }
        );
        const res1 = await res.json();
        if (res1) {
          // Check if the response is an array
          setMentors(res1.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    apiReq();
    apiReqMen();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<Dashboard students={students} mentors={mentors} />}
        />
        <Route
          path="/addstudents"
          element={
            <AddStudents students={students} setStudents={setStudents} />
          }
        />
        <Route
          path="/addmentor"
          element={<AddMentor mentors={mentors} setMentors={setMentors} />}
        />
        <Route
          path="/assignmentor/:mentor"
          element={
            <AssignMentor students={students} setStudents={setStudents} />
          }
        />
        <Route
          path="/changementor/:stud"
          element={
            <Changementor
              students={students}
              setStudents={setStudents}
              mentors={mentors}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
