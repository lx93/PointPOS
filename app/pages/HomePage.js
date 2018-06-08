import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Tabs,Tab,Right,Left,Body, Text} from "native-base";
import IssueTab from "../tabs/IssueTab";
import RedeemTab from "../tabs/RedeemTab";
import TransactionTab from "../tabs/TransactionTab";
import {AsyncStorage} from 'react-native';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {isReady: false};
  }


  logout = async() => {
    // deletes the stored authToken from AsyncStorage
    try {
      await AsyncStorage.removeItem('authToken');
      console.log('Logged out! authToken is removed from AsyncStorage.');
    } catch (error) {console.log('error deleting authToken')}

    this.props.navigation.navigate('LoginPage')
  }

  render() {
    // console.log ('HomePage gets this token state: ' + JSON.stringify(this.props.screenProps.state))

    return (
      <Container>
        <Header hasTabs>
          <Left />
          <Body>
            <Title>{this.props.screenProps.state.merchantInfo.name}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.logout()}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>

        <Tabs>
          <Tab heading="Issue">
            <IssueTab merchantName={this.props.screenProps.state.merchantInfo.name} token={this.props.screenProps.state.token}/>
          </Tab>
          <Tab heading="Redeem">
            <RedeemTab navigation={this.props.navigation} token={this.props.screenProps.state.token}/>
          </Tab>
          <Tab heading="Transactions">
            <TransactionTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


