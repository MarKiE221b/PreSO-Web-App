import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Submission from "./pages/Admin/Submission";
import AccountManagement from "./pages/Admin/AccountManagement";
import UserLayout from "./layouts/UserLayout";
import DashboardUser from "./pages/User/DashboardUser";
import SubmissionUser from "./pages/User/SubmissionUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="submission" element={<Submission />} />
          <Route path="manage-account" element={<AccountManagement />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="submission" element={<SubmissionUser />} />
        </Route>

        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
