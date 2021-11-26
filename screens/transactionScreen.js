import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  DrawerLayoutAndroidBase,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import database from '../config';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';

export default class transactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonState: 'normal',
      scanned: false,
      permissions: null,
      bookScannedData: '',
      studentScannedData: '',
      scannedData:'',
    };
  }

  askPerms = async ({id}) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      permissions: status === 'granted',
      buttonState: id,
    });
  };

  handleBarcodeScans = async ({ type, data }) => {
    this.setState({
      scanned: true,
      bookScannedData: data,
      studentScannedData: data,
      buttonState: 'normal',
    });
  };
  

  transactions = async() => {
    database.collection("books").doc(this.state.bookScannedData).get().then((doc) => {
      var book = doc.data();
      console.log(book);
      if(book.bookAvailability){
        this.initiateBookIssue();
        transactionMessage = "Book Issued";
      }
      else{
        this.initiateBookReturn();
        transactionMessage = "Book Returned";
      }
    })
  }
  

  render() {
    if (this.state.buttonState !== 'normal' && this.state.permissions) {
      return (
        <BarCodeScanner
          onBarcodeScanned={
            this.state.scanned ? undefined : this.handleBarcodeScans
          }
        />
      );
    } else {
      return (
        <View>
          <Image
            source={require('../assets/booklogo.jpg')}
            style={{ alignSelf: 'center' }}></Image>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '20%',
              // marginTop: 50,
              flex: 1,
            }}>
            {this.state.permissions === true
              ? this.state.scannedData
              : 'request camera permissions'}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              style={{
                width: 100,
                height: 40,
                borderWidth: 5,
              }}
              placeholder="Book ID"
              onChangeText={text => this.setState({bookScannedData: text})}
              value={this.state.bookScannedData} 
              ></TextInput>
            <TouchableOpacity
              onPress={this.askPerms("bookID")}
              style={{
                marginTop: '30%',
                paddingRight:'20%',
                backgroundColor: '#000',
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              <Text style={{ color: '#fff', justifyContent: 'center' }}>
                Scan the QR code for book ID
              </Text>
            </TouchableOpacity>
            <TextInput
              style={{
                width: 100,
                height: 40,
                borderWidth: 5,
                alignSelf:"center",
              }} 
              placeholder="Student ID"
              value={this.state.studentScannedData} 
              onChangeText={text => this.setState({studentScannedData: text})}
              ></TextInput>
            <TouchableOpacity
              onPress={this.askPerms("studentID")}
              style={{
                marginTop: '30%',
                paddingRight:'20%',
                backgroundColor: '#000',
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              <Text style={{ color: '#fff', justifyContent: 'center' }}>
                Scan the QR code for student ID
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.transactions}>
              <Text>Sumbit</Text>
              </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
