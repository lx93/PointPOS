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
      // console.log(result.data)
      this.props.result(result.data);
    }
  };

  // _handleSuccess = (result) => {
  //   if (!this.state.lastScannedUrl) {return;}
  //   this.props.result(this.state.lastScannedUrl);
  // };


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


