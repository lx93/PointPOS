'use strict'

import React, {Component} from 'react';
import HomePage from './app/pages/HomePage';
import LoginPage from './app/pages/LoginPage';
import {StackNavigator,navigation} from 'react-navigation';


const RootStack = StackNavigator(
	{
	  LoginPage:{screen:LoginPage},
	  HomePage:{screen:HomePage},
	},
	{headerMode:'none'},
);


//this one is for Rice Paddy
var email = 'xli@pointup.io'
var password = 'admin'


export default class App extends Component{
	constructor(props) {
		super(props);
	}

	updateState = async() => {
		try {
			let token = await this.getToken(email,password);
			this.setState({token: token});
			console.log('our good state'+this.state.token)

			let merchantInfo = await this.getMerchantInfo(token);
			this.setState(merchantInfo);
			console.log("our fucking state"+this.state)
		}

		catch (error) {console.log(error);}
	}



  getCreds = (u, p) => {
  	//email = u;
  	//password = p;
  	this.updateState();

	}


// update the state of merchant using authToken
	getMerchantInfo = async(authToken) => {
	    var options = {
	      "method": "GET",
	      "headers": {
	        "authorization": "Bearer " + authToken,
	        "content-type": "application/json"
	    	}
		}

		try {
			let response = await fetch('http://point-server-env.exyx39rieh.us-east-1.elasticbeanstalk.com/merchants/',options);
			let responseJson = await response.json();
			return responseJson;
		} catch (error) {console.error(error);}
	}

// send over the username and password to server to retrieve an authToken
	getToken = async() => {
	    var options = {
	    	"method": "POST",
	    	"headers": {
	    		"content-type": "application/json"
	    	},
	    	"body": JSON.stringify({
	    		"email": email,
	    		"password": password,
	    	}),
	    };

		try {
			let response = await fetch('http://point-server-env.exyx39rieh.us-east-1.elasticbeanstalk.com/merchants/login',options);
			let responseJson = await response.json();
			return responseJson.token;
		} catch (error) {console.error(error);}
	}


	render() {
		return (<RootStack screenProps= {this.state} />)
	}
}

console.disableYellowBox = true;
