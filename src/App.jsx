import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Submission from "./pages/Admin/Submission";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
