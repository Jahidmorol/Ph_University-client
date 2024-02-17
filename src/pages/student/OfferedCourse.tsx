import { useGetMyOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data } = useGetMyOfferedCoursesQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1> This is OfferedCourse component </h1>
    </div>
  );
};

export default OfferedCourse;
