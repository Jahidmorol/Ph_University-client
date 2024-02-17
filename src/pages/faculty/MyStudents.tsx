import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import PHInput from "../../components/form/PHInput";
import { useParams } from "react-router-dom";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData, isFetching } = useGetAllFacultyCoursesQuery(
    [
      { name: "semesterRegistration", value: registerSemesterId },
      { name: "course", value: courseId },
    ]
  );

  console.log(facultyCoursesData);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      pagination={false}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default MyStudents;
