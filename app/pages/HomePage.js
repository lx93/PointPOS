import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Tabs,Tab,Right,Left,Body, Text} from "native-base";
import IssueTab from "../tabs/IssueTab";
import RedeemTab from "../tabs/RedeemTab";
import SettingsTab from "../tabs/SettingsTab";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {isReady: false};
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
            <Button transparent onPress={() => this.props.navigation.navigate('LoginPage')}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>

        <Tabs>
          <Tab heading="Issue">
            <IssueTab merchantName={this.props.screenProps.state.merchantInfo.name} token={this.props.screenProps.state.token}/>
          </Tab>
          <Tab heading="Redeem">
            <RedeemTab navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Settings">
            <SettingsTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


