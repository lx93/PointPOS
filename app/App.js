'use strict'

import React, {Component} from 'react';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import {StackNavigator,navigation} from 'react-navigation';


const App = StackNavigator({
  // LoginPage:{screen:LoginPage},
  HomePage:{screen:HomePage},
},{headerMode:'none'});

export default App;

console.disableYelloBox = true;