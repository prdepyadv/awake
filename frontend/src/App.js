import { Container } from 'react-bootstrap'
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import './App.css';
import HomeScreen from './screens/HomeScreen'
import VocabScreen from './screens/VocabScreen';
import AskUsScreen from './screens/AskUsScreen';
import LoginScreen from './screens/LoginScreen';
import useToken from './useToken';
import { useHistory } from "react-router-dom";
import LogoutScreen from './screens/LogoutScreen';
import { useDispatch } from 'react-redux';

function App(props) {
  const { token, setToken } = useToken();
  const history = useHistory();

  function clearSession() {
    console.log('clearing session in App.js');
    sessionStorage.clear();
    setToken('');
    console.log(`token`, token);
    history.push('/login');
    //return <Redirect to='/login' />
  }

  useEffect(() => {
    console.log('mounting App.js');
    console.log(props);
    return () => {
      console.log('un-mounting App.js');
    }
  });

  return (
    <div>
      <Header token={token} />
      <main className="py-3">
        {
          token ? 
          (
            <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/' component={VocabScreen} exact />
            <Route path='/vocab' component={VocabScreen} exact />
            <Route path='/qna' component={AskUsScreen} exact />
            <Route path='/logout' exact >
              <LogoutScreen clearSession={clearSession} />
            </Route>

            <Route path='/login'  exact >
              <LoginScreen setToken={setToken} />
            </Route>

            </Container>
            ) : (
              <Container>
            <Route exact>
              <LoginScreen setToken={setToken} />
            </Route>
            </Container>
          )
        }
      </main>
      <Footer />
    </div>
  );
}

export default withRouter(App);