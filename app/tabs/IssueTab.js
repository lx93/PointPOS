import React, { Component } from "react";
import { StyleSheet, Alert } from 'react-native'
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";
import NumPad from '../components/NumPad';
import {sendSMS,smsGenerator} from '../utils/Messaging';
import {createBalance,updateBalance} from '../utils/Balance';


export default class IssueTab extends Component {


  constructor(props) {
    super(props);
    amountArray = [];
    phoneArray = [];
    this.state = {amount: 0, showPhone: false, phoneNumber: null, balanceId: null};
  }



  showPhone = () => {this.setState({showPhone:true});}


  updateAmount = (digit) => {
    amountArray.push(digit);
    this.setState({amount:amountArray.join('')});
  }
  updatePhoneNumber = (digit) => {
    phoneArray.push(digit);
    this.setState({phoneNumber:phoneArray.join('')});
  }
  clearPhoneArray = () => {
      phoneArray = [];
      this.setState({phoneNumber:null});
  }
  clearAmountArray = () => {
      amountArray = [];
      this.setState({amount:0});
  }


  formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber == null) return phoneNumber;
    else if (phoneNumber.length <= 2) return phoneNumber;
    else if (phoneNumber.length > 2 && phoneNumber.length <= 5) return (phoneNumber.slice(0,3)+'-'+phoneNumber.slice(3));
    else if (phoneNumber.length > 5 && phoneNumber.length <= 10) return (phoneNumber.slice(0,3)+'-'+phoneNumber.slice(3,6)+'-'+phoneNumber.slice(6));
    else {
      alert('Invalid US number! Try again.');
      this.setState({phoneNumber:null});
      phoneArray = [];
      return phoneNumber;
    }
  }


  issueBalance = async() => {
    let balanceId = await createBalance(this.props.token,this.state.amount,1+this.state.phoneNumber);
    await this.setState({balanceId:balanceId});
    // sendSMS(1+this.state.phoneNumber,smsGenerator(this.state.amount,this.state.phoneNumber,this.props.merchantName, balanceId));
    alert(smsGenerator(this.state.amount,1+this.state.phoneNumber,this.props.merchantName,this.state.balanceId));
  }

  render() {

    // renders the phone number entry page
    if (this.state.showPhone) {
      return (
      <Container>
        <Header><Title>Enter Customer Phone Number Below</Title></Header>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize:30,textAlign:"center"}}>☎(+1) {this.formatPhoneNumber(this.state.phoneNumber)}</Text>
        </View>
        
        <NumPad update={this.updatePhoneNumber} clear={this.clearPhoneArray} />

        <Footer>
            <Button active={true} onPress={() => {
              this.issueBalance();
              this.setState({showPhone: false});
            }}>
              <Text>Issue Giftcard</Text>
            </Button>
        </Footer>
      </Container>

    );
    }


    // renders the giftcard amount entry page
    return (
      <Container>
        <Header><Title>Issue Store Credit Below</Title></Header>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize:30,textAlign:"center"}}>${this.state.amount}</Text>
        </View>
        
        <NumPad update={this.updateAmount} clear={this.clearAmountArray} />

        <Footer>
            <Button active={true} onPress={() => this.setState({showPhone: true})}>
              <Text>Next Step: Enter Phone Number</Text>
            </Button>
        </Footer>
      </Container>
    );

  }
}



