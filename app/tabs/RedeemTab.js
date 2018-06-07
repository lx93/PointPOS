import React, { Component } from 'react';
import {Dimensions,StatusBar,StyleSheet,TouchableOpacity,} from 'react-native';
import {Fab,Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";
import { BarCodeScanner, Permissions } from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getBalance} from '../utils/Balance';
import QRScanner from '../components/QRScanner';
import NumPad from '../components/NumPad';



export default class redeemTab extends Component {

  constructor(props) {
    super(props);
    this.state = {showManualEntryPage: false, showDeductPage: false, deductAmount: 0, balance: 0};
    this.setBalanceIdState = this.setBalanceIdState.bind(this);
    deductAmountArray = [];
  }

  updateDeductAmount = (digit) => {
    deductAmountArray.push(digit);
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
    alert(await getBalance(this.state.balanceId))
    this.setState({showDeductPage: true});
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
          
          <NumPad update={this.updateDeductAmount} clear={this.clearDeductAmountArray} />

          <Footer>
              <Button active={true} onPress={() => this.setState({showDeductPage: false, showManualEntryPage: false})}>
                <Text>Finish Transaction</Text>
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

            <View style={{ flex: 1 }}>
              <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.setState({ active: !this.state.active, showManualEntryPage: true })}>
                <MaterialCommunityIcons name="keyboard" />
              </Fab>
            </View>      
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
