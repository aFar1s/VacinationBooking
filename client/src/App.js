import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register"


function App() {
  return (
    <Router>
    <div className="App">
     <Switch>
       <Route exact path="/register" component={Register} />
     </Switch>
    </div>
   </Router>
  );
}

export default App;
