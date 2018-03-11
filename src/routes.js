import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import Register from './containers/Register';
import NewPlantForm from './containers/NewPlantForm';
import PrivateRoute from './components/PrivateRoute';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/new" component={NewPlantForm} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/" component={Home} />
    </Switch>
  </main>
);

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
