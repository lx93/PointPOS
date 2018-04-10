import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Tabs,Tab,Right,Left,Body} from "native-base";
import IssueTab from "./issueTab";
import RedeemTab from "./redeemTab";
import SettingsTab from "./settingsTab";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Point POS</Title>
          </Body>
          <Right />
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
