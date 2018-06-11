import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Footer, FooterTab , Button, Badge, ListView, View} from 'native-base';
import {fetchTransactions} from '../utils/Query';

export default class TransactionsTab extends Component {
  constructor(props){
    super(props);
    this.state = {txHistory:[],footerTab:'logs'};
  }

  async componentDidMount () {
    await this.setTxState(this.props.token);
  }

  setTxState = async(token) => {
    var txHistory = await fetchTransactions(token);
    txHistory.reverse();
    this.setState ({txHistory:txHistory});
    // console.log(this.state.txHistory);
  }


  render() {
    // creates sub-components based on itierating thru the array of json tx records
    var transactionList = this.state.txHistory.map(function(tx){
      return (
        <ListItem>
          <Body>
            <Text>{tx.phone}</Text>
            <Text note>{tx.timestamp}</Text>
          </Body>
          <Right>
            <Text>${tx.transaction}</Text>
          </Right>
        </ListItem>
        );
    })

// =================================================================================================
    if (this.state.footerTab === 'logs') {
      return (
        <Container>
          <Content>
            <List>{transactionList}</List>
  //lol
          </Content>
  //lol
          <Footer>
            <FooterTab>
              <Button active>
                <FontAwesome name="list-ul" />
                <Text>All Logs</Text>
              </Button>
              <Button onPress={()=>this.setState({footerTab:'issued'})} >
                <FontAwesome name="arrow-up" />
                <Text>Issued</Text>
              </Button>
              <Button onPress={()=>this.setState({footerTab:'redeemed'})} >
                <FontAwesome name="arrow-down" />
                <Text>Redeemed</Text>
              </Button>
            </FooterTab>
          </Footer>

        </Container>
      ); 
    }
// =================================================================================================
    if (this.state.footerTab === 'issued') {
      return (
        <Container>
          <Content>
            <List>{transactionList}</List>
  //lol
          </Content>
  //lol
          <Footer>
            <FooterTab>
              <Button onPress={()=>this.setState({footerTab:'logs'})} >
                <FontAwesome name="list-ul" />
                <Text>All Logs</Text>
              </Button>
              <Button active>
                <FontAwesome name="arrow-up" />
                <Text>Issued</Text>
              </Button>
              <Button onPress={()=>this.setState({footerTab:'redeemed'})} >
                <FontAwesome name="arrow-down" />
                <Text>Redeemed</Text>
              </Button>
            </FooterTab>
          </Footer>

        </Container>
      ); 
    }
// =================================================================================================
    if (this.state.footerTab === 'redeemed') {
      return (
        <Container>
          <Content>
            <List>{transactionList}</List>
  //lol
          </Content>
  //lol
          <Footer>
            <FooterTab>
              <Button onPress={()=>this.setState({footerTab:'logs'})} >
                <FontAwesome name="list-ul" />
                <Text>All Logs</Text>
              </Button>
              <Button onPress={()=>this.setState({footerTab:'issued'})} >
                <FontAwesome name="arrow-up" />
                <Text>Issued</Text>
              </Button>
              <Button active>
                <FontAwesome name="arrow-down" />
                <Text>Redeemed</Text>
              </Button>
            </FooterTab>
          </Footer>

        </Container>
      ); 
    }
// =================================================================================================

  }
}


