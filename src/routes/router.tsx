import React, { Suspense } from "react";
import { PrivateRoute } from "components/common/PrivateRoute";
import GiaoVien from "features/user/pages/GiaoVien";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "redux/store";
import NotificationList from "features/notification/pages/NotificationList";
import ThemNotification from "features/notification/pages/ThemNotification";
import SuaNotification from "features/notification/pages/SuaNotification";
import EducationProgramList from "features/education program/pages/EducationProgramList";
import ThemEducationProgram from "features/education program/pages/ThemEducationProgram";
import SuaEducationProduct from "features/education program/pages/SuaEducationProgram";
import TuitionList from "features/tuition/pages/TuitionList";
import StudyScoreList from "features/study score/pages/StudyScoreList";
import SuaStudyScore from "features/study score/pages/SuaStudyScore";
import ThemStudyScore from "features/study score/pages/ThemStudyScore";
import ThemTuition from "features/tuition/pages/ThemTuition";
import SuaTuition from "features/tuition/pages/SuaTuition";
import CourseList from "features/course/pages/CourseList";
import ThemCourse from "features/course/pages/ThemCourse";
import SuaCourse from "features/course/pages/SuaCourse";
import EducationProgramCourse from "features/education program/pages/EducationProgramCourse";
import SinhVien from "features/user/pages/SinhVien";
import ThemEducationProgramCourse from "features/education program/pages/ThemEducationProgramCourse";
import GetProfile from "features/user/pages/GetProfile";
import SectionClassList from "features/section class/pages/SectionClassList";
import CreateSectionCLass from "features/section class/pages/CreateSectionClass";
import UpdateSectionCLass from "features/section class/pages/UpdateSectionClass";
import SectionClassStudentList from "features/section class/pages/SectionClassStudentList";
import CreateStudentSectionClass from "features/section class/pages/StudentSectionClassList";
import HomePage from "features/home/HomePage";
import UserDetail from "features/user/pages/UserDetailTeacher";
import UserDetailTeacher from "features/user/pages/UserDetailTeacher";
import UserDetailStudent from "features/user/pages/UserDetailStudent";

const ThemUser = React.lazy(() => import("features/user/pages/ThemUser"));
const EditUser = React.lazy(() => import("features/user/pages/EditUser"));
const LoginPage = React.lazy(() => import("features/auth/pages/LoginPage"));
const AuthPage = React.lazy(() => import("features/auth/pages/AuthPage"));

export default function RouterView() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            {/* <Route path="forgot" element={<ForgotPage />} />
              <Route path="change-password" element={<ChangePassPage />} /> */}
          </Route>
          <Route
            path="/trangchu"
            element={
              <PrivateRoute>
                <Suspense>
                  <HomePage />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/GiaoVien"
            element={
              <PrivateRoute>
                <Suspense>
                  <GiaoVien />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/SinhVien"
            element={
              <PrivateRoute>
                <Suspense>
                  <SinhVien />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemUser />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <EditUser />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/detailTeacher/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <UserDetailTeacher />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/detailStudent/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <UserDetailStudent />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/getProfile/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <GetProfile />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/ThongBao"
            element={
              <PrivateRoute>
                <Suspense>
                  <NotificationList />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/notification/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemNotification />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/notification/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <SuaNotification />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/chuongtrinhdaotao"
            element={
              <PrivateRoute>
                <Suspense>
                  <EducationProgramList />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/chuongtrinhdaotao/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemEducationProgram />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/chuongtrinhdaotao/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <SuaEducationProduct />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/chuongtrinhdaotao/getCourse/:eduId"
            element={
              <PrivateRoute>
                <Suspense>
                  <EducationProgramCourse />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/chuongtrinhdaotao/createCourse"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemEducationProgramCourse />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/hocphi"
            element={
              <PrivateRoute>
                <Suspense>
                  <TuitionList />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/hocphi/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemTuition />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/hocphi/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <SuaTuition />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/diemhocphan"
            element={
              <PrivateRoute>
                <Suspense>
                  <StudyScoreList />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/studyscore/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemStudyScore />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/studyscore/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <SuaStudyScore />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/hocphan"
            element={
              <PrivateRoute>
                <Suspense>
                  <CourseList />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/hocphan/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemCourse />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/hocphan/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <SuaCourse />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/lophocphan"
            element={
              <PrivateRoute>
                <Suspense>
                  <SectionClassList />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/lophocphan/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <CreateSectionCLass />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/lophocphan/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <UpdateSectionCLass />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/lophocphan/getStudent/:sectionScoreId"
            element={
              <PrivateRoute>
                <Suspense>
                  <SectionClassStudentList />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/lophocphan/createStudent"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemStudyScore />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      ;
    </Provider>
  );
}
