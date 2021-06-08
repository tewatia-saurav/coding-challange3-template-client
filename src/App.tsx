import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";
import store from "./redux/redux";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path="/category" component={Category} /> */}
      </Switch>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
