import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Footer, FooterTab , Button, Badge} from 'native-base';
export default class TransactionsTab extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <MaterialCommunityIcons name="call-made" />
              </Left>
              <Body>
                <Text>2018-06-01 9:30am</Text>
              </Body>
              <Right>
                <Text>$50</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <MaterialCommunityIcons name="call-received" />
              </Left>
              <Body>
                <Text>2018-06-01 10:30am</Text>
              </Body>
              <Right>
                <Text>$30</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <MaterialCommunityIcons name="call-received" />
              </Left>
              <Body>
                <Text>2018-06-01 11:30am</Text>
              </Body>
              <Right>
                <Text>$20</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>

        </Content>

          <Footer>
            <FooterTab>
              <Button badge vertical>
                <Icon name="apps" />
                <Text>Apps</Text>
              </Button>
              <Button active badge vertical>
                <Icon active name="list" />
                <Text>Logs</Text>
              </Button>
              <Button vertical>
                <Icon name="person" />
                <Text>Customers</Text>
              </Button>
            </FooterTab>
          </Footer>





      </Container>
    );
  }
}
