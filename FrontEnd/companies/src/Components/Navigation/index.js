import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../Pages/Home';
import { Container } from 'react-bootstrap';
import Companies from '../../Pages/Companies';
import Blacklists from '../../Pages/Blacklists';
import IdentificationTypes from '../../Pages/IdentificationTypes';

const Navigation = () => {
  return (
    <Container role='main'>
      <Switch>
        <Route path='/company'>
          <Companies />
        </Route>
        <Route path='/black-list'>
          <Blacklists />
        </Route>
        <Route path='/identification-type'>
          <IdentificationTypes />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Container>
  );
};

export default Navigation;
