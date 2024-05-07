import Workflow from "./Workflow";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import DisplayError from "./pages/DisplayError";

const theme = createTheme({
  root: {
    backgroundColor: "#5c5c5e",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    height: "100%",
  },
  palette: {
    primary: {
      main: "#6A9D90",
    },
    secondary: {
      main: "#736560",
    },
    tertiary: {
      main: "#416961",
      lightBlue: " #3EA893",
      powerGreen: "#1CE8BF",
      orange: "#9e796c",
    },

    background: {
      default: "#6A9D90",
    },
    text: {
      light: "#e6e6fa",
      dark: "#142733",
      white: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Workflow />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "details/:movieId",
        element: <MovieDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <DisplayError />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
