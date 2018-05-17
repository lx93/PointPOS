import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/LoginPage/Logo';
import Form from '../components/LoginPage/Form';
import Wallpaper from '../components/LoginPage/Wallpaper';
import ButtonSubmit from '../components/LoginPage/ButtonSubmit';
import SignupSection from '../components/LoginPage/SignupSection';
import {Button, Text} from 'native-base';


var username = 'sweetie';
var password;
export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {username: username, password: password};
  }


  updateUsername (text) {username = text;console.log("username： "+ this.state.username)}
  updatePassword (text) {password = text;console.log("password: "+ this.state.password)}

  render() {
    return (
      <Wallpaper>;
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit navigation={this.props.navigation} loginState={this.state} />
      </Wallpaper>
    );
  }
}
