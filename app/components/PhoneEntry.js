import React from 'react';
import {StyleSheet,View,Text,ScrollView,TextInput} from 'react-native';
import NumPad from './NumPad';
import {sendSMS} from '../utils/Messaging';

export default class extends React.Component{
  static defaultProps={
    onCancel:()=>{},
    num:1,
    content:[],
    giftValue: 0,
  };
  constructor(props){
    super(props);
    this.state={content:[]};
  }


  smsGenerator = (giftValue) => {
    return ("You have just received a $" + giftValue + " giftcard from Top of the Hill Chapel Hill!")
  }


  render(){
    const content=this.state.content;
    const myContent=[];
    const num=this.props.num;

    // updating content state when new character is added
    if(!this.props.content||this.props.content.length!==num) {
      for (let i = 0; i < num; i++)
        myContent.push(
          <TextInput
            key={'input_'+i}
            style={styles.input}
            autoFocus={i===0?true:false}
            onChangeText={(text) => {
              content[i] = text;
              this.setState({content: content});
            }}
            placeholder='mobile number here'
            underlineColorAndroid={'transparent'}
          />
        );
    }
    else
      for(let i=0;i<num;i++)
        myContent.push(this.props.content[i]);
    return(
        <ScrollView style={styles.masker} keyboardDismissMode={'on-drag'}>
          <View style={styles.container}>
            <Text style={styles.title}>Please enter customer phone number</Text>
            {myContent}
            <View style={styles.btn_container}>
              <Text style={styles.btn} onPress={()=>this.props.onCancel()}>Cancel</Text>
              <Text style={styles.btn} onPress={()=>sendSMS(num===1?this.state.content[0]:this.state.content,this.smsGenerator(this.props.giftValue))}>Confirm Send</Text>
            </View>
          </View>
        </ScrollView>

    );
  }
}

const styles=StyleSheet.create({
  masker:{
    flex:1,
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.6)',
    zIndex:100
  },
  container:{
    alignSelf:'center',
    width:'75%',
    marginTop:150,
    backgroundColor:'#fff',
    borderRadius:10,
    overflow:'hidden'
  },
  title:{
    textAlign:'center',
    paddingTop:13,
    paddingHorizontal:6,
    fontSize:15,
    color:'#666',
    fontWeight:'bold',
    lineHeight:20,
    marginBottom:10
  },
  input:{
    paddingVertical:0,
    paddingHorizontal:8,
    height:34,
    backgroundColor:'#eee',
    marginVertical:10,
    borderTopWidth:.5,
    borderBottomWidth:.5,
    borderColor:'#ccc',
    fontSize:15
  },
  btn_container:{
    flexDirection:'row',
    borderTopWidth:.5,
    borderColor:'#ddd',
    marginTop:10
  },
  btn:{
    width:'50%',
    textAlign:'center',
    fontWeight:'bold',
    paddingVertical:12
  }
});