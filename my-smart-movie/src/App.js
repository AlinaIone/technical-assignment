import Workflow from "./Workflow";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  root: {
    backgroundColor: '#5c5c5e',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    height: '100%'
  },
  palette: {

    primary: {
      main: /*' #697487'*/ '#5c8c9c',
      dark: '#5c5c5e' 
    },
    secondary: {
      main: '#516077', // Pink color
    },
    background: {
      default: '#6A9D90 ' /*#5b7c99 #5c8c9c*/      , // Cadet Blue
    },
    text: {
      light: '#e6e6fa', // Dark text color
      dark: '#142733', // Light text color
    },
},
typography: {
  fontFamily: 'Roboto, sans-serif', // Default font family
  h1: {
    fontSize: '2.5rem', // Heading 1 font size
    fontWeight: 'bold', // Heading 1 font weight
    marginBottom: '1rem', // Heading 1 margin bottom
  },
  body1: {
    fontSize: '1rem', // Body text font size
    lineHeight: 1.5, // Body text line height
  },
},
sizes:{
  container: {maxWidth:'1200px'}
}
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/movies",
    element: <Workflow />,
    // Add an error element
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
]);

function App() {
  return <ThemeProvider theme={theme}><CssBaseline/><RouterProvider router={router} /></ThemeProvider>;
}

export default App;
