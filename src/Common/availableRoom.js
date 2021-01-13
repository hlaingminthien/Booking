import React, { Component } from 'react';
import { Image, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Text, Button, Left, Body, Right } from 'native-base';
const availableRoom = ({ data, navigation }) => {
  const room = data;

  goDetail = () => {
    navigation.navigate('staythird', { 'roomId': room.roomId, navigation });
  }

  return (
    <View style={{ zIndex: 1 }} key={data}>
      <Card>
        <CardItem cardBody>
          {room.mainImg == "" && <Image source={require('../Image/noPhoto.png')} style={{ height: 200, width: null, flex: 1 }} />}
          {room.mainImg != "" && <Image source={{ uri: `${room.mainImg}` }} style={{ height: 200, width: null, flex: 1 }} />}
        </CardItem>
        <View style={{ backgroundColor: '#2196f3', padding: 8 }}>
          <Text> <Icon style={{ fontSize: 15, color: '#ead40a' }} active name="fast-food-outline" /><Text style={{ marginLeft: 5, fontSize: 11, color: '#ead40a', fontWeight: 'bold' }}> Breakfast Included</Text></Text>
        </View>
        {/* <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#5f5b5b', margin: 10 }}>{"hotel is null"}</Text> */}
        <View style={{ alignItems: 'flex-end', margin: 10 }}>
          <Text style={{ margin: 5, fontSize: 13 }}>{room.roomType}</Text>
          {(room.disPer > 0 || room.disAmt == 0) ?
            <Text>
              <Text style={{ margin: 5, fontSize: 13, fontWeight: 'bold', color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>MMK {room.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              <Text style={{ margin: 5, fontSize: 13, fontWeight: 'bold' }}>  MMK {(room.originalPrice - 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </Text>
            :
            <Text style={{ margin: 5, fontSize: 13, fontWeight: 'bold' }}>MMK {room.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          }
          <Text style={{ margin: 5, fontSize: 13, color: 'green' }}><Icon style={{ margin: 5, fontSize: 15, color: 'green' }} active name="checkmark-circle-outline" />Includes taxes and charges</Text>
          {!room.noPrePayment && <Text style={{ margin: 5, fontSize: 13 }}>No prepayment needed</Text>}
        </View>
        <View style={{marginLeft: 10, marginTop: -60, marginBottom: 20 }}>
          <Button style={{borderRadius: 8}} info onPress={()=>goDetail()}>
              <Text>Add Room</Text>
            </Button>
        </View>
      </Card>
    </View>
  );
}

export default availableRoom;