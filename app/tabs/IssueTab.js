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

  // showPhone = () => {this.setState({showPhone:true});}


  updateAmount = (digit) => {
    amountArray.push(digit);
    this.setState({amount:amountArray.join('')});
  }
  updatePhoneNumber = (digit) => {
    phoneArray.push(digit);
    this.setState({phoneNumber:phoneArray.join('')});
  }
  deletePhoneDigit = () => {
    phoneArray.pop();
    this.setState({phoneNumber:phoneArray.join('')});   
  }
  deleteAmountDigit = () => {
    amountArray.pop();
    this.setState({amount:amountArray.join('')});   
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
    //this updates the balance on our server
    let balanceId = await createBalance(this.props.token,this.state.amount,1+this.state.phoneNumber);
    alert ('Successs! Customer ' + this.state.phoneNumber + ' has just received $' + this.state.amount);
    await this.setState({balanceId:balanceId});

    // this sends SMS to the consumer
    var text = smsGenerator(this.state.amount,this.state.phoneNumber,this.props.merchantName, balanceId);
    // sendSMS(1+this.state.phoneNumber,text);

    // this clears everything
    this.clearAmountArray();
    this.clearPhoneArray();
    this.setState({showPhone: false, balanceId: null});
  }

  cancelButton() {
    // this clears everything
    this.clearAmountArray();
    this.clearPhoneArray();
    this.setState({showPhone: false, balanceId: null});
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
        
        <NumPad update={this.updatePhoneNumber} del={this.deletePhoneDigit} />

        <Footer>
            <Button success active={true} onPress={() => {this.issueBalance()}}>
              <Text>Issue Giftcard</Text>
            </Button>
             <Button danger active={true} onPress={() => this.cancelButton()}>
                <Text>Cancel</Text>
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
        
        <NumPad update={this.updateAmount} del={this.deleteAmountDigit} />

        <Footer>
            <Button success active={true} onPress={() => this.setState({showPhone: true})}>
              <Text>Next Step: Enter Phone Number</Text>
            </Button>
        </Footer>
      </Container>
    );

  }
}



