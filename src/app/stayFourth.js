import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ScrollView, Image } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Content, Button, DatePicker, Text, Item, Label, Input, Form, Picker, ListItem, Radio, Right, Left } from 'native-base';
import RoomCard from '../Common/card';
import { GetCity, SearchRoom } from '../Service/api_fetch';
import Loader from './loader';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';


export default StayFourth = (props) => {

  const [estimatedTime, setEstimatedTime] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('kbz');

  useEffect(() => {
    setDetailData(props.route.params.detailData);
    console.log('props.route.params.detailData is=>', props.route.params.detailData.mainImg);
  }, []);

  return (

    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <ProgressSteps marginBottom={50} activeStepIconBorderColor="#3f87f1" completedProgressBarColor="#3f87f1" activeStepNumColor="white" activeLabelColor="#3f87f1" completeLabelColor="#3f87f1" activeStepIconColor="#3f87f1" completedStepIconColor="#3f87f1">
          <ProgressStep label="Book" previousBtnDisabled={true} nextBtnText="Next" nextBtnStyle={bookButtonStyle} nextBtnTextStyle={buttonTextStyle}>
            <View style={{ alignItems: 'center' }}>
              <ScrollView style={{ backgroundColor: 'white' }}>
                <View>
                  <Text style={{ backgroundColor: '#679df5', color: 'white', padding: 10 }}>Contact Info</Text>
                  <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 12, marginBottom: 15 }}>Make sure the contact number and email address are reachable. E-ticket will be sent to the given emial address.</Text>
                    {/* <Form> */}
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>First & Middle Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>Last Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>Mobile No.</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>Email</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>Special Request(Optional)</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <View style={{ marginBottom: 15 }}>
                      <Text style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>Select Estimated Check-in Time</Text>
                      <Item picker style={{ fontSize: 13 }}>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ fontSize: 13 }}
                          placeholder="Select your SIM"
                          placeholderStyle={{ color: "#bfc6ea", fontSize: 13 }}
                          placeholderIconColor="#007aff"
                          selectedValue={estimatedTime}
                          onValueChange={() => setEstimatedTime(estimatedTime)}
                        >
                          <Picker.Item label="Normal Check-in" value="key0" />
                          <Picker.Item label="Early Check-in" value="key1" />
                          <Picker.Item label="Late Check-in" value="key2" />
                        </Picker>
                      </Item>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                      />
                      <Text style={{ fontSize: 13 }}>I am also a guest/traveller</Text>
                    </View>
                    {/* </Form> */}
                  </View>
                </View>
                <View>
                  <Text style={{ backgroundColor: '#679df5', color: 'white', padding: 10, }}>Traveller Info</Text>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 12 }}>Passport with minimum validaty of 6 months form departure date is required for international flight or transit abroad.</Text>
                    <Item floatingLabel style={{ marginBottom: 15, marginTop: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>First & Middle Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>Last Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: '#524a4a', fontWeight: 'bold' }}>NRC No.</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ProgressStep>

          {/* ...............................second....................................... */}
          <ProgressStep nextBtnStyle={nextButtonStyle} nextBtnTextStyle={buttonTextStyle} previousBtnStyle={nextButtonStyle} previousBtnTextStyle={buttonTextStyle} label="Review">
            <View style={{ flex: 1, flexDirection: 'row', margin: 20, borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: '#e2e2e2' }}>
              {detailData && detailData.mainImg ? <Image source={{ uri: `${detailData.mainImg}` }} style={{ height: 100, width: 100 }} /> : <Image source={{ uri: '../Image/noPhoto.png' }} style={{ height: 85, width: 52, margin: 7 }} />}
              {detailData &&
                <View style={{ paddingLeft: 10, width: '70%' }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#e2e2e2' }}>{detailData.hotel.name}</Text>
                  <Text style={{ color: '#3f87f1', fontSize: 12, fontWeight: 'bold', marginTop: 10 }}>No. 82. Sin Phyu Shin Avenue, Pyay Road,. Ward 11. Hlaing Township, Yangob, Myanmar.</Text>
                </View>}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: '#e2e2e2' }}>
              <View>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>Check-in</Text>
                <Text style={{ padding: 5, color: '#3f87f1', fontWeight: 'bold', fontSize: 14 }}>15 Jan 2021</Text>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>(after 02:00 pm)</Text>
              </View>
              <View style={{ right: 30, position: 'absolute', width: '40%' }}>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>Check-out</Text>
                <Text style={{ padding: 5, color: '#3f87f1', fontWeight: 'bold', fontSize: 14 }}>16 Jan 2021</Text>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>(before 12:00 pm)</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: '#e2e2e2' }}>
              <View>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>Duration</Text>
                <Text style={{ padding: 5, color: '#3f87f1', fontWeight: 'bold', fontSize: 14 }}>1 Night(s)</Text>
              </View>
              <View style={{ right: 30, position: 'absolute', width: '40%' }}>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>No. of Guests</Text>
                <Text style={{ padding: 5, color: '#3f87f1', fontWeight: 'bold', fontSize: 14 }}>2 Adult(s)</Text>
              </View>
            </View>
            <View style={{ margin: 20 }}>
              <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>Room</Text>
              <Text style={{ padding: 5, color: '#3f87f1', fontWeight: 'bold', fontSize: 14 }}>1 * Deluxe Double Room</Text>
            </View>
            <Text style={{ backgroundColor: '#ebebeb', padding: 10, fontWeight: 'bold' }}>Traveler Info</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: '#e2e2e2' }}>
              <View>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Mr Kaung</Text>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray', fontWeight: 'bold' }}>NRC NUMBER</Text>
              </View>
              <View style={{ right: 30, position: 'absolute', width: '40%' }}>
                <Text style={{ padding: 5, fontSize: 14, color: 'white' }}>No. of Guests</Text>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray', fontWeight: 'bold' }}>8/kkk(N)34343</Text>
              </View>
            </View>
          </ProgressStep>

          {/* ...............................third....................................... */}
          <ProgressStep nextBtnStyle={nextButtonStyle} nextBtnText="Pay" nextBtnTextStyle={buttonTextStyle} previousBtnStyle={nextButtonStyle} previousBtnTextStyle={buttonTextStyle} label="Payment">
            <View style={{ padding: 10, backgroundColor: '#eae9e9' }}>
              <View>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>Total amount to be paid</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>MMK 79,000</Text>
                <Text style={{ fontSize: 12, fontWeight: "bold", color: 'gray' }}>Amount payable in USD 59.2</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, fontWeight: "bold", paddingTop: 20, padding: 10 }}>Payment Method</Text>
            <View>
              <ListItem selected={paymentMethod == 'credit'} onPress={() => setPaymentMethod('credit')}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Radio
                      color={"#f0ad4e"}
                      selectedColor={"#5cb85c"}
                      selected={paymentMethod == 'credit'}
                    />
                    <Text style={{ marginLeft: 10, marginTop: -3, fontSize: 13, fontWeight: 'bold' }}>Creadit/Debit Card</Text>
                    <Text style={{ fontSize: 14, fontWeight: "bold", position: 'absolute', right: 20 }}>MMK 79,000</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../Image/visa.jpg')} style={{ width: 30, height: 25, marginLeft: 30 }}></Image>
                    <Image source={require('../Image/master.png')} style={{ width: 30, height: 25, marginLeft: 5 }}></Image>
                    <Image source={require('../Image/unionpay.png')} style={{ width: 30, height: 25, marginLeft: 5 }}></Image>
                    <Image source={require('../Image/mpu.png')} style={{ width: 30, height: 25, marginLeft: 5 }}></Image>
                    <Image source={require('../Image/jcb.png')} style={{ width: 30, height: 25, marginLeft: 5 }}></Image>
                  </View>
                </View>
              </ListItem>
              <ListItem selected={paymentMethod == 'kbz'} onPress={() => setPaymentMethod('kbz')}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Radio
                      color={"#f0ad4e"}
                      selectedColor={"#5cb85c"}
                      selected={paymentMethod == 'kbz'}
                    />
                    <Text style={{ marginLeft: 10, marginTop: -3, fontSize: 13, fontWeight: 'bold' }}>KBZPay</Text>
                    <Text style={{ fontSize: 14, fontWeight: "bold", position: 'absolute', right: 20 }}>MMK 79,000</Text>
                  </View>
                  <View>
                    <Image source={require('../Image/kbz.png')} style={{ width: 30, height: 30, marginLeft: 30 }}></Image>
                  </View>
                </View>
              </ListItem>
              <ListItem selected={paymentMethod == 'wave'} onPress={() => setPaymentMethod('wave')}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Radio
                      color={"#f0ad4e"}
                      selectedColor={"#5cb85c"}
                      selected={paymentMethod == 'wave'}
                    />
                    <Text style={{ marginLeft: 10, marginTop: -3, fontSize: 13, fontWeight: 'bold' }}>WavePay</Text>
                    <Text style={{ fontSize: 14, fontWeight: "bold", position: 'absolute', right: 20 }}>MMK 79,000</Text>
                  </View>
                  <View>
                    <Image source={require('../Image/wave.png')} style={{ width: 30, height: 30, marginLeft: 30 }}></Image>
                  </View>
                </View>
              </ListItem>
            </View>
            <View>
              <Text style={{ backgroundColor: '#e6e6e6', paddingLeft: 10, padding: 5, fontSize: 13, fontWeight: 'bold' }}>Promo Code</Text>
              <Text style={{ padding: 10, fontSize: 12, fontWeight: 'bold' }}>If you have a promo code. enter it here. Promotions cannot be combined.</Text>
              <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <TextInput placeholder="Type Promo Code" style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '50%' }}></TextInput>
                <Button style={{ right: 30, position: 'absolute', backgroundColor: '#e6e6e6' }} rounded>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>Apply</Text>
                </Button>
              </View>
            </View>
            <View>
              <Text style={{ backgroundColor: '#e6e6e6', paddingLeft: 10, padding: 5, fontSize: 13, fontWeight: 'bold', marginTop: 40 }}>Payment Summary</Text>
              <View style={{ flexDirection: 'column', padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>1 x Deluxe Double or Twin Room</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>MMK 142,200</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>1 x Premier Room</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>MMK 171,200</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ backgroundColor: '#ffb74c', paddingLeft: 10, padding: 5, fontSize: 13, fontWeight: 'bold', marginTop: 20 }}>Price Details</Text>
              <View style={{ flexDirection: 'column', padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>Subtotal</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>MMK 313,200</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>Taxes</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>-MMK 17,400</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>Convenience fees</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>+MMK 0</Text>
                </View>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e8e8e8', paddingBottom: 10 }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>Discount</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>-MMK 156,600</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>Total</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>MMK 174,000</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: '500' }}>Promotion</Text>
                  <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: 'bold', right: 20, position: 'absolute' }}>-MMK 0</Text>
                </View>
              </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#076fc1' }}>
                  <Text style={{paddingTop: 18, paddingBottom: 18, paddingLeft: 10, fontSize: 13, fontWeight: 'bold', color: 'white' }}>Grand Total</Text>
                  <Text style={{paddingTop: 18, paddingBottom: 18, paddingLeft: 10, fontSize: 13, fontWeight: 'bold', color: 'white', right: 20, position: 'absolute' }}>MMK 174,000</Text>
                </View>
                <Text style={{backgroundColor: '#0907c1', color: 'white', textAlign: 'right', fontSize: 12, fontWeight: 'bold', padding: 10}}>Amount payable in USD 131.10</Text>
                <Text style={{textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: 'gray', marginTop: 50}}>By clicking PAY. you agree to our <Text style={{color: '#2196F3', fontSize: 13}}>terms and conditions</Text></Text>
            </View>
          </ProgressStep>

          {/* ...............................fourth....................................... */}
          <ProgressStep nextBtnStyle={nextButtonStyle}  finishBtnText="OK" nextBtnTextStyle={buttonTextStyle} previousBtnStyle={nextButtonStyle} previousBtnTextStyle={buttonTextStyle} label="Complete">
            <View style={{ alignItems: 'center' }}>
              <Text style={{color: 'green', fontStyle: 'italic', fontSize: 20}}>Thank you, Payment Success.</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </ScrollView>

  );

}



const buttonTextStyle = {
  fontSize: 14, color: 'white', textAlign: 'center'
};

const nextButtonStyle = {
  backgroundColor: '#4082ec',
  width: 100,
  borderRadius: 20,
}


const bookButtonStyle = {
  backgroundColor: '#4082ec',
  width: "180%",
  borderRadius: 20,
}