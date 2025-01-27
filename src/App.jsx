import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Submission from "./pages/Admin/Submission";
import AccountManagement from "./pages/Admin/AccountManagement";

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

        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
