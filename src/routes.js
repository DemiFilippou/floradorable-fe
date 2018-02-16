import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './containers/Login'
import Register from './containers/Register'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
    </Switch>
  </main>
)

  /*
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route path='/user_plant' component={UserPlants}/>
    </Switch>
  </main>
)

const UserPlants = () => (
  <Switch>
    <Route exact path='/user_plant' component={UserPlantsAll}/>
    <Route path='/user_plant/:number' component={UserPlant}/>
  </Switch>
)*/

export default Main;
