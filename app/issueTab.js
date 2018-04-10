import React, { Component } from "react";
import { StyleSheet } from 'react-native'
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";
import NumKey from './components/NumKey';

export default class issueTab extends Component {
  constructor(props) {
    super(props);
    numArray = [];
    this.state = {amount: 0};
  }

  updateAmount = (digit) => {
    numArray.push(digit);
    this.setState({amount:numArray});
  }

  delAmount = () => {
    numArray = [];
    this.setState({amount:0});
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Issue Store Credit Below</Title>
          </Body>
        </Header>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Title style={{fontSize:60}}>${this.state.amount}</Title>
        </View>
        
        <Content padder>

        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-evenly'}}>
          <NumKey number={'1'} updateAmount={this.updateAmount}/>
          <NumKey number={'2'} updateAmount={this.updateAmount}/>
          <NumKey number={'3'} updateAmount={this.updateAmount}/>
        </View>

        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-evenly'}}>
          <NumKey number={'4'} updateAmount={this.updateAmount}/>
          <NumKey number={'5'} updateAmount={this.updateAmount}/>
          <NumKey number={'6'} updateAmount={this.updateAmount}/>
        </View>

        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-evenly'}}>
          <NumKey number={'7'} updateAmount={this.updateAmount}/>
          <NumKey number={'8'} updateAmount={this.updateAmount}/>
          <NumKey number={'9'} updateAmount={this.updateAmount}/>
        </View>

        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-evenly'}}>
          <NumKey number={'.'} updateAmount={this.updateAmount}/>
          <NumKey number={'0'} updateAmount={this.updateAmount}/>
          <NumKey number={'DEL'} updateAmount={this.delAmount}/>
        </View>

        </Content>

        <Footer>
            <Button active={true} onPress={() => alert(numArray.join(""))}>
              <Text>Send</Text>
            </Button>
        </Footer>


      </Container>



    );
  }
}

const styles = StyleSheet.create({

  root: { backgroundColor: "white", flex: 1 },

});


