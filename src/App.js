import logo from "./logo.svg";
import "./App.css";
import Body from "./Components/Body";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      {" "}
      <Body />
    </Provider>
  );
}

export default App;
