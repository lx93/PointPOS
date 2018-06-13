import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Footer, FooterTab , Button, Badge, ListView, View} from 'native-base';
import {fetchTransactions,findIssuedTx,findRedeemedTx} from '../utils/Query';

export default class TransactionsTab extends Component {
  constructor(props){
    super(props);
    this.state = {allTx:[],issuedTx:[],redeemedTx:[],footerTab:'logs'};
  }

  async componentDidMount () {
    await this.setTxState(this.props.token);
  }

  setTxState = async(token) => {
    var allTx = await fetchTransactions(token);
    allTx.reverse();
    var issuedTx = findIssuedTx(allTx);
    var redeemedTx = findRedeemedTx(allTx);
    this.setState ({allTx:allTx,issuedTx:issuedTx,redeemedTx:redeemedTx});
  }



  render() {
    // creates sub-components based on itierating thru the array of all json tx records
    var transactionList = this.state.allTx.map(function(tx){
      return (
        <ListItem>
          <Body>
            <Text>{tx.phone}</Text>
            <Text note>{tx.timestamp}</Text>
          </Body>
          <Right>
            <Text>${tx.amount}</Text>
          </Right>
        </ListItem>
        );
    })

    // creates sub-components based on itierating thru the array of json tx records issued
    var issuedList = this.state.issuedTx.map(function(tx){
      return (
        <ListItem>
          <Body>
            <Text>{tx.phone}</Text>
            <Text note>{tx.timestamp}</Text>
          </Body>
          <Right>
            <Text>${tx.amount}</Text>
          </Right>
        </ListItem>
        );
    })

    // creates sub-components based on itierating thru the array of json tx records redeemed
    var redeemedList = this.state.redeemedTx.map(function(tx){
      return (
        <ListItem>
          <Body>
            <Text>{tx.phone}</Text>
            <Text note>{tx.timestamp}</Text>
          </Body>
          <Right>
            <Text>${tx.amount}</Text>
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
            <List>{issuedList}</List>
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
            <List>{redeemedList}</List>
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


