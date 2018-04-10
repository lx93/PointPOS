import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './components/LoginPage/Logo';
import Form from './components/LoginPage/Form';
import Wallpaper from './components/LoginPage/Wallpaper';
import ButtonSubmit from './components/LoginPage/ButtonSubmit';
import SignupSection from './components/LoginPage/SignupSection';
import {Button, Text} from 'native-base';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit navigation={this.props.navigation}/>
      </Wallpaper>
    );
  }
}
