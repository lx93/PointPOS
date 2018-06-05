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


// fix for android. load Robot_medium fonts to avoid font loading error
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }


  render() {
    if (!this.state.isReady) {return <Expo.AppLoading />;}
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
            <IssueTab merchantName={this.props.screenProps.state.merchantInfo.name}/>
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


