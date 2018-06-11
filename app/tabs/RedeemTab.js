import React, { Component } from 'react';
import {Dimensions,StatusBar,StyleSheet,TouchableOpacity,} from 'react-native';
import {Fab,Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";
import { BarCodeScanner, Permissions } from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getBalance,updateBalance} from '../utils/Balance';
import QRScanner from '../components/QRScanner';
import QRScannerDebug from '../components/QRScannerDebug';
import NumPad from '../components/NumPad';



export default class redeemTab extends Component {

  constructor(props) {
    super(props);
    this.state = {showManualEntryPage: false, showDeductPage: false, deductAmount: 0, balance: null, balanceId: null};
    this.setBalanceIdState = this.setBalanceIdState.bind(this);
    deductAmountArray = [];
  }

  updateDeductAmount = (digit) => {
    deductAmountArray.push(digit);
    this.setState({deductAmount:deductAmountArray.join('')});
  }
  deleteDeductAmount = () => {
    deductAmountArray.pop();
    this.setState({deductAmount:deductAmountArray.join('')});
  }
  clearDeductAmountArray = () => {
    deductAmountArray = [];
    this.setState({deductAmount:0});
  }

  setBalanceIdState = async(qrjson) => {
    var parsedData = JSON.parse(qrjson)
    balanceId = parsedData.balanceId;
    await this.setState({balanceId:balanceId})
    await this.setState({balance: await getBalance(this.state.balanceId)})
    this.setState({showDeductPage: true});
  }

  deductBalanceId = async() => {
    await updateBalance(this.props.token,-this.state.deductAmount,this.state.balanceId);
    clearDeductAmountArray();
    this.setState({showDeductPage: false, showManualEntryPage: false, deductAmount: 0, balance: null, balanceId: null})  }

  cancelButton() {
    clearDeductAmountArray();
    this.setState({showDeductPage: false, showManualEntryPage: false, deductAmount: 0, balance: null, balanceId: null})
  }


  render() {

    // ========================== renders the deductPage ========================== 

    if (this.state.showDeductPage) {
      return (
        <Container>
          <Header><Title>How much to deduct? Balance is ${this.state.balance}</Title></Header>

          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <Text style={{fontSize:30,textAlign:"center"}}>${this.state.deductAmount}</Text>
          </View>
          
          <NumPad update={this.updateDeductAmount} del={this.deleteDeductAmount} />

          <Footer>
              <Button success active={true} onPress={() => this.deductBalanceId()}>
                <Text>Deduct Balance</Text>
              </Button>
             <Button danger active={true} onPress={() => this.cancelButton()}>
                <Text>Cancel</Text>
              </Button>
          </Footer>
        </Container>
      );
    }

    // ========================== renders the QRScanner ========================== 

    if (!this.state.showManualEntryPage) {
      return (
          <Container>
            <QRScanner result={this.setBalanceIdState} />

              <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.setState({ active: !this.state.active, showManualEntryPage: true })}>
                <MaterialCommunityIcons name="keyboard" />
              </Fab>
          </Container>
        )
    }


    // ========================== renders the manualEntry page ===========================
    if (this.state.showManualEntryPage) {
      return (
        <Container>
          <View style={{ flex: 1 }}>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active, showManualEntryPage: false })}>
              <MaterialCommunityIcons name="qrcode-scan" />
            </Fab>
          </View>
        </Container>)
    }


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  }
});
