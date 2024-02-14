import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log("academicSemester", data);

  return (
    <div>
      <h2>this is AcademicSemester page</h2>
    </div>
  );
};

export default AcademicSemester;
