import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landing'
import Home from './components/home';
import Activity from './components/activity';
import Detail from './components/detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route exact path = '/home' component = {Home}/>
        <Route exact path = '/activity' component = {Activity}/>
        <Route exact path = '/home/:id' component = {Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
