import React, { Component } from 'react';
import {Dimensions,Text,StatusBar,StyleSheet,TouchableOpacity,LayoutAnimation} from 'react-native';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';

export default class QRScanPage extends Component {

  constructor(props) {
    super(props);
    this.state = {hasCameraPermission: null, lastScannedUrl: null};
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
      this._handleSuccess(result);
    }
  };

  _handleSuccess = (result) => {
    this.props.result(result.data);
    if (!this.state.lastScannedUrl) {return;}
    this.props.result(this.state.lastScannedUrl);
    // console.log(this.state.lastScannedUrl);
  };

  _handleTest = () => {
    this.props.result('5b16e3e6d97d6c7bc5c70619');
  };

  render() {

    return (
      <Container>
        <View style={styles.container}>

          {this.state.hasCameraPermission === null
            ? <Text>Requesting for camera permission</Text>
            : this.state.hasCameraPermission === false
                ? <Text style={{ color: '#fff' }}>
                    Camera permission is not granted
                  </Text>
                : <BarCodeScanner onBarCodeRead={this._handleBarCodeRead}
                    style={{
                      height: Dimensions.get('window').height,
                      width: Dimensions.get('window').width,}}/>}
          </View>


      </Container>

    );
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
          // this is to enabling the test scan button for debugging

          // <View style={{ flex: 1 }}>
          //   <Button block success onPress={()=> this._handleTest()}>
          //     <Text>test scan</Text>
          //   </Button>
          // </View>

