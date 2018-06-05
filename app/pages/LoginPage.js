import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Logo from '../components/LoginPage/Logo';
import Form from '../components/LoginPage/Form';
import Wallpaper from '../components/LoginPage/Wallpaper';
import ButtonSubmit from '../components/LoginPage/ButtonSubmit';
import SignupSection from '../components/LoginPage/SignupSection';


var username
var password

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.getToken = this.getToken.bind(this);
  }


  updateUsername (text) {username = text;console.log(text)}
  updatePassword (text) {password = text;console.log(text)}

  getToken () {
    this.props.screenProps.updateState(username,password);
  }

  render() {
    return (
      <Wallpaper>;
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit navigation={this.props.navigation} getToken={this.getToken} screenProps={this.props.screenProps}/>
      </Wallpaper>
    );
  }
}
