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

export default class AttractionFirst extends Component {
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

  search = () => {
    const { navigation } = this.props;
    navigation.navigate('Attractionsecond', this.state);
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
              placeHolderText="Start Date"
              textStyle={{ color: "black", fontSize: 15 }}
              placeHolderTextStyle={{ color: "black", fontSize: 15 }}
              onDateChange={newDate=>this.setStartDate(newDate)}
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
              placeHolderText="End Date"
              textStyle={{ color: "black", fontSize: 15 }}
              placeHolderTextStyle={{ color: "black", fontSize: 15 }}
              onDateChange={newDate=>this.setEndDate(newDate)}
              disabled={false}
            />
          </View>
        </View>

        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, zIndex: 1, height: 60 }}>
          <Button onPress={() => this.search()} block style={{ backgroundColor: '#2196F3', height: 60 }}>
            <Icon name="search-outline" color="white" size={20}></Icon>
            <Text style={{ color: 'white' }}>Search</Text>
          </Button>
        </View>
        <SliderBox images={this.state.adTourImages}
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

