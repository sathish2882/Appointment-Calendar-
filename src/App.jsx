
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import CalendarView from './components/CalendarView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/calendar" component={CalendarView} />
      </Switch>
    </Router>
  );
}

export default App;
