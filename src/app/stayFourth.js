import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ScrollView, Image } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Content, Button, DatePicker, Text, Item, Label, Input, Form, Picker } from 'native-base';
import RoomCard from '../Common/card';
import { GetCity, SearchRoom } from '../Service/api_fetch';
import Loader from './loader';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';


export default StayFourth = (props) => {

  const [estimatedTime, setEstimatedTime] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [detailData, setDetailData] = useState(null);

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
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>First & Middle Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Last Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Mobile No.</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Email</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Special Request(Optional)</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <View style={{ marginBottom: 15 }}>
                      <Text style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Select Estimated Check-in Time</Text>
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
                  <Text style={{ backgroundColor: '#679df5', color: 'white', padding: 10, }}>Traveler Info</Text>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 12 }}>Passport with minimum validaty of 6 months form departure date is required for international flight or transit abroad.</Text>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>First & Middle Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Last Name</Label>
                      <Input style={{ fontSize: 13 }} />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 15 }}>
                      <Label style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>NRC No.</Label>
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
            <View style={{margin: 20 }}>
            <Text style={{ padding: 5, fontSize: 14, color: 'gray' }}>Room</Text>
                <Text style={{ padding: 5, color: '#3f87f1', fontWeight: 'bold', fontSize: 14 }}>1 * Deluxe Double Room</Text>
            </View>
            <Text style={{ backgroundColor: '#ebebeb', padding: 10, }}>Traveler Info</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: '#e2e2e2' }}>
              <View>
                <Text style={{ padding: 5, fontSize: 14, color: 'gray', fontWeight: 'bold' }}>Mr Kaung</Text>
                <Text style={{  padding: 5, fontSize: 14, color: 'gray', fontWeight: 'bold'  }}>NRC NUMBER</Text>
              </View>
              <View style={{ right: 30, position: 'absolute', width: '40%' }}>
                <Text style={{ padding: 5, fontSize: 14, color: 'white' }}>No. of Guests</Text>
                <Text style={{  padding: 5, fontSize: 14, color: 'gray', fontWeight: 'bold'  }}>8/kkk(N)34343</Text>
              </View>
            </View>
          </ProgressStep>

          {/* ...............................third....................................... */}
          <ProgressStep nextBtnStyle={nextButtonStyle} nextBtnTextStyle={buttonTextStyle} previousBtnStyle={nextButtonStyle} previousBtnTextStyle={buttonTextStyle} label="Payment">
            <View style={{ alignItems: 'center' }}>
              <Text>This is the Payment!</Text>
            </View>
          </ProgressStep>

          {/* ...............................fourth....................................... */}
          <ProgressStep nextBtnStyle={nextButtonStyle} nextBtnTextStyle={buttonTextStyle} previousBtnStyle={nextButtonStyle} previousBtnTextStyle={buttonTextStyle} label="Complete">
            <View style={{ alignItems: 'center' }}>
              <Text>This is the Complete!</Text>
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