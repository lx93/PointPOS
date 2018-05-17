import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/LoginPage/Logo';
import Form from '../components/LoginPage/Form';
import Wallpaper from '../components/LoginPage/Wallpaper';
import ButtonSubmit from '../components/LoginPage/ButtonSubmit';
import SignupSection from '../components/LoginPage/SignupSection';
import {Button, Text} from 'native-base';
import App from '../../App';



var username;
var password;
export default class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  updateUsername (text) {username = text;console.log("username： "+ username); }
  updatePassword (text) {password = text;console.log("password: "+ password); }


  getToken () {
    console.log ('username is'+username+'password is'+password)
    new App().getCreds(username, password);
  }


  render() {
    return (
      <Wallpaper>;
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit navigation={this.props.navigation} />
      </Wallpaper>
    );
  }
}
