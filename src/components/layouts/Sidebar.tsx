import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { Menu, Layout } from "antd";
import facultyPaths from "../../routes/faculty.routes";
import studentPaths from "../../routes/student.routes";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { TSidebarItem } from "../../types";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }
  let sidebarItems: TSidebarItem[] = [];

  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
