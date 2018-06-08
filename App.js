'use strict'

import React, {Component} from 'react';
import HomePage from './app/pages/HomePage';
import LoginPage from './app/pages/LoginPage';
import ButtomSubmit from './app/components/LoginPage/ButtonSubmit';
import {getMerchantInfo,getToken} from './app/utils/Login';
import {StackNavigator,navigation} from 'react-navigation';
import {AsyncStorage,View,StatusBar} from 'react-native';


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
		this.state = {token: undefined, merchantInfo:{name:'not available'}}
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
			let token = await getToken(u,p);
			await this.setState({token:token});
			let merchantInfo = await getMerchantInfo(token);
			await this.setState({merchantInfo});

			// save the authToken we fetched to AsyncStorage
			if (this.state.token != undefined){
				try {
					await AsyncStorage.setItem('authToken', this.state.token);
					console.log('authToken is now stored to AsyncStorage');
				} catch (error) {console.log('error saving authToken')}	
			}
		}
		catch (error) {console.log(error);}
	}

	updateStateThruToken = async(token) => {
		try {
			let merchantInfo = await getMerchantInfo(token);
			await this.setState({token:token})
			await this.setState({merchantInfo});
		}	catch (error) {console.log(error);}	}


	render() {
		// fix for android. load Robot_medium fonts to avoid font loading error
		if (!this.state.isReady) {return <Expo.AppLoading />;}

		this.allProps = {state: this.state, updateState: this.updateState, updateStateThruToken: this.updateStateThruToken};
		console.log(this.state)
		return (
			<View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
				<RootStack screenProps= {this.allProps} />
			</View>
		)
	}
}

console.disableYellowBox = true;
