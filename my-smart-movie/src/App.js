import Workflow from "./Workflow";
// import MovieList from "./components/MovieList";
import { Provider } from "react-redux";
import { reduxStore } from "./store/store";

function App() {
  return (
    <Provider store={reduxStore}>
      <Workflow />
    </Provider>
  );
}

export default App;
