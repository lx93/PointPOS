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


export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {token:'not available yet'}
	}

	updateState = async(u,p) => {
		try {
			let token = await this.getToken(u,p);
			let merchantInfo = await this.getMerchantInfo(token);
			
			await this.setState({token:token,merchantInfo});


			if (merchantInfo.message == 'Auth failed') {alert('Incorrect Login. Please try again.');}
			else {alert('Login successful');RootStack.navigate('HomePage');}

			// console.log('our token state is: '+ JSON.stringify(this.state.token))
			// console.log("our merchantInfo name is: "+this.state.merchantInfo.name)
		}
		catch (error) {console.log(error);}
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
	getToken = async(u,p) => {
		console.log('username is: '+u+' password is: '+p)
	    var options = {
	    	"method": "POST",
	    	"headers": {
	    		"content-type": "application/json"
	    	},
	    	"body": JSON.stringify({
	    		"email": u,
	    		"password": p,
	    	}),
	    };

		try {
			let response = await fetch('http://point-server-env.exyx39rieh.us-east-1.elasticbeanstalk.com/merchants/login',options);
			let responseJson = await response.json();
			return responseJson.token;
		} catch (error) {console.error(error);}
	}


	render() {
		this.allProps = {state: this.state, updateState: (u,p) => this.updateState(u,p)};
		console.log(this.state)
		return (<RootStack screenProps= {this.allProps} />)
	}
}

console.disableYellowBox = true;
