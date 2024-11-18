import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const SchoolUserLayout = lazy(() => import("./layout/SchoolUserLayout.jsx"));
const LoginPage = lazy(() => import("./pages/landing/LoginPage.jsx"));

import Loading from "./components/landing components/Loading.jsx";
import Dashboard from "./pages/school/Dashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Submit from "./pages/school/Submit.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route
          path="school"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute
                isAuthenticated={true}
                allowedUserType={"school"}
                component={SchoolUserLayout}
              />
            </Suspense>
          }
        >
          <Route path=":schoolId/dashboard" element={<Dashboard />} />
          <Route path=":schoolId/submit" element={<Submit />} />
        </Route>

        <Route path="*" element={<Loading />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
