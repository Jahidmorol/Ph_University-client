import OfferedCourse from "../pages/student/MyOfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];

export default studentPaths;
