'use strict'

import React, {Component} from 'react';
import HomePage from './app/pages/HomePage';
import LoginPage from './app/pages/LoginPage';
import ButtomSubmit from './app/components/LoginPage/ButtonSubmit';
import {StackNavigator,navigation} from 'react-navigation';


const RootStack = StackNavigator(
	{
		HomePage:{screen:HomePage},

		LoginPage:{screen:LoginPage},

	},
	{headerMode:'none'},
);


export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibG92ZXNoYWNrIiwiZW1haWwiOiJhQGIuY29tIiwiaW1hZ2UiOiJ1cGxvYWRzL0RlZmF1bHQucG5nIiwibWVyY2hhbnRJZCI6IjViMDBjZGZlNzMwODA4NmE0YjZiOWM3NSIsImlhdCI6MTUyODM4MjAzMSwiZXhwIjoxNTU5OTM5NjMxfQ.U9Rs4m-DRoUtUV20zOBxYKK_1cPO6dSPi70mjn6MAII", merchantInfo:{name:'not available'}}
	}

	// fix for android. load Robot_medium fonts to avoid font loading error
	  async componentDidMount() {
	    await Expo.Font.loadAsync({
	      Roboto: require("native-base/Fonts/Roboto.ttf"),
	      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
	    });
	    this.setState({ isReady: true });
	  }

	updateState = async(u,p) => {
		try {
			let token = await this.getToken(u,p);
			let merchantInfo = await this.getMerchantInfo(token);
			
			await this.setState({token:token,merchantInfo});


			if (merchantInfo.message == 'Auth failed') {alert('Incorrect Login. Please try again.');}
			else {alert('Login successful'); }

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
			let response = await fetch('http://point-server.us-east-1.elasticbeanstalk.com/merchants/',options);
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
			let response = await fetch('http://point-server.us-east-1.elasticbeanstalk.com/merchants/login',options);
			let responseJson = await response.json();
			return responseJson.token;
		} catch (error) {console.error(error);}
	}


	render() {
		// fix for android. load Robot_medium fonts to avoid font loading error
		if (!this.state.isReady) {return <Expo.AppLoading />;}

		this.allProps = {state: this.state, updateState: (u,p) => this.updateState(u,p)};
		console.log(this.state)
		return (<RootStack screenProps= {this.allProps} />)
	}
}

console.disableYellowBox = true;
