import React from 'react';
import './App.css';
import ChatPage from './components/ChatPage';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { connect, useSelector } from 'react-redux';

function App() {
  const loggedInUser = useSelector((state) => state.user?.data?.data?.user);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route
          path="/chat"
          render={() => (loggedInUser ? <ChatPage /> : <Redirect to="/" />)}
        />
        <Route component={LoginPage}/>
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return { user: state?.user?.data?.data.user };
};
export default connect(mapStateToProps)(App);
