'use strict'

import React, {Component} from 'react';
import HomePage from './app/pages/HomePage';
import LoginPage from './app/pages/LoginPage';
import {StackNavigator,navigation} from 'react-navigation';


const App = StackNavigator({
  HomePage:{screen:HomePage},
  LoginPage:{screen:LoginPage},
},{headerMode:'none'});

export default App;

console.disableYellowBox = true;
