'use strict'

import React, {Component} from 'react';
import HomePage from './app/HomePage';
import LoginPage from './app/LoginPage';
import {StackNavigator,navigation} from 'react-navigation';


const App = StackNavigator({
  // LoginPage:{screen:LoginPage},
  HomePage:{screen:HomePage},
},{headerMode:'none'});

export default App;

console.disableYelloBox = true;
