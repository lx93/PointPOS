import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Logo from '../components/LoginPage/Logo';
import Form from '../components/LoginPage/Form';
import ButtonSubmit from '../components/LoginPage/ButtonSubmit';
import SignupSection from '../components/LoginPage/SignupSection';
import {View,Text} from 'native-base';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import bgSrc from '../resources/wallpaper.png';


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
      <ImageBackground style={styles.picture} source={bgSrc}>
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit navigation={this.props.navigation} getToken={this.getToken} screenProps={this.props.screenProps}/>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    // resizeMode: 'cover',
  },
});
