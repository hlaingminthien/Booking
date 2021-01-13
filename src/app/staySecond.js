import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ScrollView, Image } from "react-native";
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Content, Button, DatePicker, Text, Item, Label, Input } from 'native-base';
import RoomCard from '../Common/card';
import { GetCity, SearchRoom } from '../Service/api_fetch';
import Loader from './loader';

export default StaySecond = (props) => {
  const params = props.route.params;
  const [fileterData, setFilterData] = useState({
    selectedRegion: params.selectedRegion,
    selectedRoom: params.selectedRoom, selectedPerson: params.selectedPerson, startDate: params.startDate, endDate: params.endDate
  });
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SearchRoom(parseInt(fileterData.selectedRegion), fileterData.startDate, fileterData.endDate, parseInt(fileterData.selectedPerson), parseInt(fileterData.selectedRoom)).then(data => {
      setRoomData(data);
      setLoading(false);
    })
  }, []);

  return (
    <View>
      {roomData.length > 0 &&
        <ScrollView>
        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
          {roomData.length > 0 && roomData.map((data, k) => {
            return (
              <RoomCard key={k} data={data} startDate={fileterData.startDate} endDate={fileterData.endDate} navigation={props.navigation}/>
            )
          })
          }
        </View>
    </ScrollView>
      }
      {roomData.length == 0 && !loading ?
        <View style={{backgroundColor: 'white', height: '100%', alignContent: 'center'}}>
          <Image source={require('../Image/nodata.png')}
            style={{ width: '100%', resizeMode: 'contain' }} />
            <Text style={{color: 'gray', textAlign: 'center', marginTop: -30}}>We found Nothing!</Text>
        </View> : <Loader loading={loading}></Loader>
      }
      </View>
  );

}

