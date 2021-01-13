import React, { Component } from 'react';
import { Image, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Text, Button, Left, Body, Right } from 'native-base';

const tourCardImage = (props) => {
  console.log('tourCardImage is=>', props);
  const tour = props.data;
  return (
    <View style={{ zIndex: 1 }}>
      <Card>
        {/* <CardItem>
          <Left>
            <Body>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#5f5b5b' }}>{room.hotel.name}</Text>
            </Body>
          </Left>
        </CardItem> */}
        <CardItem cardBody>
          <Image source={{uri: `${tour.mainImg}`}} style={{ height: 200, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#5f5b5b' }}>{tour.name}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="cash-outline" />
              <Text>{tour.price}</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    </View>
  );
}

export default tourCardImage;