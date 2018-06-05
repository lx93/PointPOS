import React, { Component } from "react";
import { StyleSheet, Alert } from 'react-native'
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";
import NumPad from '../components/NumPad';
import PhoneEntry from '../components/PhoneEntry';
import {sendSMS,smsGenerator} from '../utils/Messaging';


export default class issueTab extends Component {


  constructor(props) {
    super(props);
    amountArray = [];
    phoneArray = [];
    this.state = {amount: 0, showPhone: false, phoneNumber: null};
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

  render() {

    // renders the phone number entry page
    if (this.state.showPhone) {
      // --------------------------this renders an alert-input----------------------
      // return (<PhoneEntry onCancel={()=>{this.setState({showPhone: false})}} giftValue={this.state.amount}/> )

      // -------------------------Alternative, this renders in the same page---------------------
      return (
      <Container>
        <Header><Title>Enter Customer Phone Number Below</Title></Header>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Title style={{fontSize:30}}>☎(+1) {this.formatPhoneNumber(this.state.phoneNumber)}</Title>
        </View>
        
        <NumPad update={this.updatePhoneNumber} clear={this.clearPhoneArray} />

        <Footer>
            <Button active={true} onPress={() => {
              // sendSMS('1'+this.state.phoneNumber,smsGenerator(this.state.amount,this.state.phoneNumber,this.props.merchantName));
              this.setState({showPhone: false});
              alert(smsGenerator(this.state.amount,this.state.phoneNumber,this.props.merchantName));
            }}>
              <Text>Confirm Send!</Text>
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
          <Title style={{fontSize:30}}>${this.state.amount}</Title>
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



