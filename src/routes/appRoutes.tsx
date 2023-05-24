import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomePage from "../features/home/HomePage";
import { RouteType } from "./config";
import DashboardPageLayout from "../features/user/pages/DashboardPageLayout";
import GiaoVien from "../features/user/pages/GiaoVien";
import SinhVien from "../features/user/pages/SinhVien";
import SuaGiaoVien from "features/user/pages/EditUser";
import Login from "features/auth/pages/Login";
import NotificationList from "features/notification/pages/NotificationList";
import ThemNotification from "features/notification/pages/ThemNotification";
import EducationProgramList from "features/education program/pages/EducationProgramList";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SuaEducationProduct from "features/education program/pages/SuaEducationProgram";
import ThemEducationProgram from "features/education program/pages/ThemEducationProgram";
import SuaNotification from "features/notification/pages/SuaNotification";
import ThemGiaoVien from "features/user/pages/ThemUser";
import CourseList from "features/course/pages/CourseList";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ThemCourse from "features/course/pages/ThemCourse";
import SuaCourse from "features/course/pages/SuaCourse";
import TuitionList from "features/tuition/pages/TuitionList";
import PaidIcon from "@mui/icons-material/Paid";
import ThemTuition from "features/tuition/pages/ThemTuition";
import SuaTuition from "features/tuition/pages/SuaTuition";
const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Thong tin",
      icon: <DashboardOutlinedIcon />,
    },
    child: [
      {
        index: true,
        path: "/GiaoVien",
        element: <GiaoVien />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Giao vien",
        },
      },
      {
        path: "/GiaoVien/create",
        element: <ThemGiaoVien />,
        state: "dashboard.analytics",
      },
      {
        path: "/GiaoVien/update/:id",
        element: <SuaGiaoVien />,
        state: "dashboard.analytics",
      },
      {
        path: "/SinhVien",
        element: <SinhVien />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Sinh Vien",
        },
      },
    ],
  },
  {
    path: "/notification",
    element: <NotificationList />,
    state: "notification",
    sidebarProps: {
      displayText: "Thông báo",
      icon: <NotificationsIcon />,
    },
  },
  {
    path: "/notification/create",
    element: <ThemNotification />,
    state: "notification",
  },
  {
    path: "/notification/update/:id",
    element: <SuaNotification />,
    state: "notification",
  },
  {
    path: "/educationProgram",
    element: <EducationProgramList />,
    state: "educationProgram",
    sidebarProps: {
      displayText: "Chương Trình Đào Tạo",
      icon: <MenuBookIcon />,
    },
  },
  {
    path: "/educationProgram/create",
    element: <ThemEducationProgram />,
    state: "educationProgram",
  },
  {
    path: "/educationProgram/update/:id",
    element: <SuaEducationProduct />,
    state: "educationProgram",
  },
  {
    path: "/course",
    element: <CourseList />,
    state: "course",
    sidebarProps: {
      displayText: "Học phần",
      icon: <AutoStoriesIcon />,
    },
  },
  {
    path: "/course/create",
    element: <ThemCourse />,
    state: "course",
  },
  {
    path: "/course/update/:id",
    element: <SuaCourse />,
    state: "course",
  },
  {
    path: "/tuition",
    element: <TuitionList />,
    state: "tuition",
    sidebarProps: {
      displayText: "Học Phí",
      icon: <PaidIcon />,
    },
  },
  {
    path: "/tuition/create",
    element: <ThemTuition />,
    state: "tuition",
  },
  {
    path: "/tuition/update/:id",
    element: <SuaTuition />,
    state: "tuition",
  },
];

export default appRoutes;
