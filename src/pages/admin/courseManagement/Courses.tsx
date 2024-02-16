/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import {
  useAssignFacultiesMutation,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/userManagement.api";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TItemData = { key: string; title: string; code: "string" };

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: TItemData) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

type TFacultyModalProps = {
  facultyInfo: TItemData;
};
const AddFacultyModal: React.FC<TFacultyModalProps> = ({ facultyInfo }) => {
  console.log("facultyInfo---=>", facultyInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [assignFaculties] = useAssignFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    assignFaculties(facultyData);
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
