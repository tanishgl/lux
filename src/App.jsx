import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Account from "./Components/Account";
import GamePage from "./UI/GamePage";

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <GamePage />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
