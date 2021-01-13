import React, { Component } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Content, Button, DatePicker, Text, Item, Label, Input } from 'native-base';
import RoomCard from '../Common/card';
import { GetCity, SearchRoom, GetAdHotel, GetAdTour } from '../Service/api_fetch';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";
import Loader from './loader';

export default class StayFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(), endDate: new Date(), selectedRegion: '', selectedPerson: '',
      selectedRoom: '', regions: [],
      adHotelImages: [], adTourImages: []
    };
    GetCity().then(cities => {
      cities.map(c => {
        this.state.regions.push({ label: c.name, value: c.cityId, icon: () => <Icon name="navigate-circle-outline" size={18} color="#307ecc" /> });
      });
    });

    GetAdHotel().then(adHotel => {
      if (adHotel && adHotel.length > 0) {
        var data = adHotel.map(a => {
          return a.data;
        });
        this.setState({ adHotelImages: data });
      }
    });

    GetAdTour().then(adTour => {
      if (adTour && adTour.length > 0) {
        var data = adTour.map(a => {
          return a.data;
        });
        this.setState({ adTourImages: data });
      }
    });
  }
  setStartDate(newDate) {
    this.setState({ startDate: newDate });
  }
  setEndDate(newDate) {
    setState({ endDate: newDate });
  }
  setSelectedRegion = (item) => {
    this.setState({ selectedRegion: item });
  }

  setSelectedPerson = (item) => {
    this.setState({ selectedPerson: item });
  }

  setSelectedRoom = (item) => {
    this.setState({ selectedRoom: item });
  }

  search = () => {
    SearchRoom(1, "2020-11-25T05:31:07.669Z", "2020-10-27T00:00:00.000Z", 2, 1).then(data => {
      // console.log('data is=>', data);
    });
    const { navigation } = this.props;
    navigation.navigate('staysecond', this.state);
  }

  render() {

    return (
      <ScrollView>
        <DropDownPicker
          items={this.state.regions}
          placeholder="Where are you going?"
          defaultValue={this.state.selectedRegion}
          containerStyle={{ height: 60, margin: 20, marginBottom: 10 }}
          style={{ backgroundColor: '#fafafa' }}
          isVisible={false}
          zIndex={5000}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={item => this.setSelectedRegion(item.value)}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ borderWidth: 1, width: '44%', borderColor: '#ececec', backgroundColor: '#fcfcfc', height: 60, marginLeft: 20, padding: 10, marginRight: 8 }}>
            <DatePicker
              defaultDate={new Date()}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Checkin Date"
              textStyle={{ color: "black", fontSize: 15 }}
              placeHolderTextStyle={{ color: "black", fontSize: 15 }}
              onDateChange={date=>this.setStartDate(date)}
              disabled={false}
            />
          </View>
          <View style={{ borderWidth: 1, width: '44%', borderColor: '#ececec', backgroundColor: '#fcfcfc', height: 60, padding: 10, marginRight: 20 }}>
            <DatePicker
              defaultDate={new Date()}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Checkout Date"
              textStyle={{ color: "black", fontSize: 15 }}
              placeHolderTextStyle={{ color: "black", fontSize: 15 }}
              onDateChange={date=>this.setEndDate(date)}
              disabled={false}
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 9 }}>
          <View style={{ borderWidth: 1, width: '44%', borderColor: '#ececec', backgroundColor: '#fcfcfc', height: 60, padding: 10, marginLeft: 20, marginRight: 8 }}>
            <Input keyboardType="number-pad" placeholder="Persons" style={{ fontSize: 15 }}
              onChangeText={text => this.setSelectedPerson(text)} value={this.state.selectedPerson} />
          </View>
          <View style={{ borderWidth: 1, width: '44%', borderColor: '#ececec', backgroundColor: '#fcfcfc', height: 60, padding: 10, marginRight: 20 }}>
            <Input keyboardType="number-pad" placeholder="Rooms" style={{ fontSize: 15 }}
              onChangeText={text => this.setSelectedRoom(text)} value={this.state.selectedRoom} />
          </View>
        </View>

        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, zIndex: 1, height: 60 }}>
          <Button onPress={() => this.search()} block style={{ backgroundColor: '#2196F3', height: 60 }}>
            <Icon name="search-outline" color="white" size={20}></Icon>
            <Text style={{ color: 'white' }}>Search</Text>
          </Button>
        </View>
        <SliderBox images={this.state.adHotelImages}
          sliderBoxHeight={200}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{ width: '90%', marginTop: 20 }}
          imageLoadingColor="#2196F3" />

      </ScrollView>
    );
  }


}

