import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./shared/components/RootLayout";
import Error from "./shared/Error/Error.tsx";
import AuthPage from "./components/AuthPage.tsx";
import HomeMainbar from "./components/HomeMainbar.tsx";
import QuestionDetails from "./components/QuestionsDetails.tsx";
import { action as loginAction } from "./util/login.ts";
import {
  loader as searchLoader,
  tokenLoader,
  action as logoutAction,
} from "./util/auth.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      id="root"
      loader={tokenLoader}
      errorElement={<Error />}
    >
      <Route index element={<AuthPage />} action={loginAction} />
      <Route
        path="/questions"
        element={<HomeMainbar />}
        loader={searchLoader}
      />
      <Route path="/questions/:id" element={<QuestionDetails />} />
      <Route path="/logout" action={logoutAction} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
