import React, { Component } from 'react';
import {Dimensions,Text,StatusBar,StyleSheet,TouchableOpacity,} from 'react-native';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getBalance} from '../utils/Balance';
import QRScanner from '../components/QRScanner';


export default class redeemTab extends Component {

  constructor(props) {
    super(props);
    this.state = {hasCameraPermission: null, lastScannedUrl: null, manualEntry: false, balance: 0};
    this.setBalanceIdState = this.setBalanceIdState.bind(this);
  }


  setBalanceIdState(balanceID) {
    var parsedData = JSON.parse(balanceID)
    balanceID = parsedData.balanceId;
    getBalance(balanceID)

    // this.setState({balanceID:balanceID})
    // alert(getBalance(balanceID))
  }


  render() {

    // ========================== renders the QRScanner ========================== 

    if (!this.state.manualEntry) {
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
                onPress={() => this.setState({ active: !this.state.active, manualEntry: true })}>
                <MaterialCommunityIcons name="keyboard" />
              </Fab>
            </View>      
          </Container>
        )
    }


    // ========================== renders the manualEntry page ===========================
    if (this.state.manualEntry) {
      return (
        <Container>
          <View style={{ flex: 1 }}>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active, manualEntry: false })}>
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
