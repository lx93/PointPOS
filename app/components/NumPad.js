import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";


export default class NumPad extends Component{

	constructor (props){
		super(props);
	}

	render(){
		return (
			<Container>        
		        <View style={{flex: 1, flexDirection: 'row'}}>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('1')}><Text style={{fontSize:20}}>1</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('2')}><Text style={{fontSize:20}}>2</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('3')}><Text style={{fontSize:20}}>3</Text></Button>
		        </View>

		        <View style={{flex: 1, flexDirection: 'row'}}>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('4')}><Text style={{fontSize:20}}>4</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('5')}><Text style={{fontSize:20}}>5</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('6')}><Text style={{fontSize:20}}>6</Text></Button>
		        </View>

		        <View style={{flex: 1, flexDirection: 'row'}}>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('7')}><Text style={{fontSize:20}}>7</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('8')}><Text style={{fontSize:20}}>8</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('9')}><Text style={{fontSize:20}}>9</Text></Button>
		        </View>

		        <View style={{flex: 1, flexDirection: 'row'}}>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('.')}><Text style={{fontSize:20}}>.</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.update('0')}><Text style={{fontSize:20}}>0</Text></Button>
		          <Button transparent style={styles.numpad} onPress={() => this.props.clear()}><Text style={{fontSize:20}}>DEL</Text></Button>
		        </View>
		    </Container>
		)

	}
}
const styles = StyleSheet.create({

  numpad: {height:100,flex:1, alignContent:'center', justifyContent: 'center'}

});