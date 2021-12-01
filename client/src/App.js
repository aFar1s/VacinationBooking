import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register"
import Login from './components/auth/Login';
import Main from "./components/main/Main"
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute"


function App() {
  return (
    <Router>
    <div className="App">
     <Switch>
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={Login} />
       <ProtectedRoute exact path="/" component={Main} />
     </Switch>
    </div>
   </Router>
  );
}

export default App;
