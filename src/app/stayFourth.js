import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ScrollView, Image } from "react-native";
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Content, Button, DatePicker, Text, Item, Label, Input } from 'native-base';
import RoomCard from '../Common/card';
import { GetCity, SearchRoom } from '../Service/api_fetch';
import Loader from './loader';

export default StayFourth = (props) => {
  return (
    <View>
        <Text>Hello I am Fourth!</Text>
    </View>
  );

}

