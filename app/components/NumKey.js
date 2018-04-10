import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";


export default class NumKey extends Component{

	constructor (props){
		super(props);
	}

	render(){
		return <Button transparent style={styles.numpad} onPress={() => this.props.updateAmount(this.props.number)}><Text style={{fontSize:20}}>{this.props.number}</Text></Button>
	}
}
const styles = StyleSheet.create({

  numpad: {height:100,flex:1, alignContent:'center', justifyContent: 'center'}

});