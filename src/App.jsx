import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core'

import { Navbar, Home, Auth } from './componenets';


const App = () => {
  

  return (
    <Router>
      <Container maxwidth='lg'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth' component={Auth} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App;