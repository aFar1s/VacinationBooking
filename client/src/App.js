import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register"
import Login from './components/auth/Login';
import Main from "./components/main/Main"
import Bookings from "./components/bookings/Bookings"
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute"
import { useState } from "react"
import GlobalCenterID from "./Helpers/globalCenterID"


function App() {
  const [globalCenterID, setGlobalCenterID] = useState("")

  return (
    <Router>
     <GlobalCenterID.Provider value={{ globalCenterID, setGlobalCenterID }}>
     <div className="App">
     <Switch>
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={Login} />
       <ProtectedRoute exact path="/" component={Main} />
       <ProtectedRoute exact path="/bookings" component={Bookings} />
     </Switch>
     </div>
     </GlobalCenterID.Provider>
   </Router>
  );
}

export default App;
