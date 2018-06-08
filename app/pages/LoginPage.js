import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Logo from '../components/LoginPage/Logo';
import Form from '../components/LoginPage/Form';
import ButtonSubmit from '../components/LoginPage/ButtonSubmit';
import SignupSection from '../components/LoginPage/SignupSection';
import {View,Text} from 'native-base';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import bgSrc from '../resources/wallpaper.png';
import {AsyncStorage} from 'react-native';


var username
var password

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.getToken = this.getToken.bind(this);
  }

  async componentDidMount() {

    // we check to see if we have authToken stored in AsyncStorage from previous session
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (token != null){
        console.log("Found authToken from AsyncStorage! Log in automatically. " + token);
        console.log("Fetching merchantInfo based on stored authToken and setting state...")
        this.props.screenProps.updateStateThruToken(token);
        this.props.navigation.navigate('HomePage');
      }
    } catch (error) {console.log('AsyncStorage authToken does not exist')}
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
