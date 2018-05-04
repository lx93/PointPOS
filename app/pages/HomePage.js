import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Tabs,Tab,Right,Left,Body, Text} from "native-base";
import IssueTab from "../tabs/issueTab";
import RedeemTab from "../tabs/redeemTab";
import SettingsTab from "../tabs/settingsTab";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left />
          <Body>
            <Title>Point POS</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('LoginPage')}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>

        <Tabs>
          <Tab heading="Issue">
            <IssueTab />
          </Tab>
          <Tab heading="Redeem">
            <RedeemTab />
          </Tab>
          <Tab heading="Settings">
            <SettingsTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


console.disableYelloBox = true;
