import Workflow from "./Workflow";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Workflow />,
    // Add an error element
    children: [
      { index: true, element: <Home /> },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>

  );
}

export default App;
