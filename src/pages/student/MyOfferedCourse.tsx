/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { useGetMyOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

type TCourse = {
  [index: string]: any;
};

const MyOfferedCourse = () => {
  const { data: offeredCourseData } = useGetMyOfferedCoursesQuery(undefined);

  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item?.sections?.map((section: TCourse) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section.days.map((day: any) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button>Enroll</Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default MyOfferedCourse;

// we found this type data !
// [
//   { course: { title: 'React' }, section: 1, _id: 'sdfasdfasdfas45345' },
//   { course: { title: 'React' }, section: 2, _id: 'sdfasdfasdfas45345' },
//   { course: { title: 'Redux' }, section: 1, _id: 'sdfasdfasdfas45345' },
// ];

// but we need this type
// [
//   {
//     courseTitle: 'React',
//     sections: [
//       { section: 1, _id: 'ADFa4345basdfa' },
//       { section: 2, _id: 'ADFa4345basdf3' },
//     ],
//   },
//   {
//     courseTitle: 'Redux',
//     sections: [{ section: 1, _id: 'ADFa4345basdfa' }],
//   },
// ];
