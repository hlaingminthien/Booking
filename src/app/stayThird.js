import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ScrollView, Image } from "react-native";
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, CardItem, Container, Header, Content, Text, Button, Root } from "native-base";
import AvailableRoomCard from '../Common/availableRoom';
import { GetRoomById, AvailableRoom } from '../Service/api_fetch';
import Loader from './loader';
import ImageView from "react-native-image-viewing";

export default StayThird = (props, { navigation }) => {

    const [visible, setIsVisible] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableRoomData, setData] = useState([]);
    const [roomQty, setRoomQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        GetRoomById(props.route.params.roomId).then(data => {
            setDetailData(data);
            var imgArrays = [];
            imgArrays.push({ uri: `${data.mainImg}` });
            data.images.map(img => {
                imgArrays.push({ uri: `${img.img}` });
            });
            setImages(imgArrays);
            AvailableRoom(props.route.params.hotelId, props.route.params.startDate, props.route.params.endDate).then(avRooms => {
                setData(avRooms);
                setLoading(false);
            });
        });
    }, []);

    const addRoom = (price) => {
        setRoomQty(roomQty + 1);
        setTotalPrice(totalPrice + (price * (roomQty+1)) )
    }

    const bookNow = () => {
        props.route.params.navigation.navigate('stayfourth', {detailData});
    }
    return (
        <View style={{ padding: 10 }}>
            {!loading &&
                <ScrollView>
                    {detailData.mainImg ? <Image source={{ uri: `${detailData.mainImg}` }} style={{ height: 200, width: null, flex: 1 }} /> : <Image source={{ uri: '../Image/noPhoto.png' }} style={{ height: 85, width: 52, margin: 7, flex: 1 }} />}
                    <View style={{ flexDirection: 'row', flex: 3 }}>
                        {
                            detailData.images.map((data,k) => {
                                return <Image key={k} source={{ uri: `${data.img}` }} style={{ height: 85, width: 52, margin: 7, flex: 1 }} />
                            })
                        }
                        <View style={{ alignItems: 'flex-end', position: 'absolute', backgroundColor: 'white', opacity: 0.8, right: 8, marginTop: 25 }}>
                            <Text onPress={() => setIsVisible(true)} style={{ color: 'black', fontWeight: 'bold', width: 100, padding: 12, textAlign: 'center' }}>
                                See More
                            </Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', padding: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 5, marginTop: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#e2e2e2', color: '#1e7eca' }}>{detailData.hotel.name}</Text>
                        <Text style={{ fontSize: 13, marginTop: 10 }}>
                            <Icon name="navigate-circle-outline" style={{ fontSize: 13 }}></Icon>
                            {detailData.hotel.address || " Mandalay"}</Text>
                        <Text style={{ fontSize: 13, marginTop: 10, color: 'green' }}><Icon style={{ margin: 5, fontSize: 13, color: 'green' }} active name="checkmark-circle-outline" /> Wifi Included</Text>
                        <Text style={{ fontSize: 13, marginTop: 10, color: 'green' }}><Icon style={{ margin: 5, fontSize: 13, color: 'green' }} active name="checkmark-circle-outline" /> Pool Included</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#e2e2e2', color: 'white' }}>{detailData.hotel.name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>
                            Make your own selection
                        </Text>
                        <Text style={{ fontSize: 12, color: 'gray', marginTop: 10, borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#e2e2e2' }}>10 room options available</Text>
                    </View>

                    {availableRoomData.length > 0 &&
                        <ScrollView>
                            <View style={{ marginTop: 10, marginBottom: 80 }}>
                                {availableRoomData.length > 0 && availableRoomData.map((room, k) => {
                                    return (
                                        <View style={{ zIndex: 1 }} key={k}>
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
                                                <View style={{ marginLeft: 10, marginTop: -60, marginBottom: 20 }}>
                                                    <Button style={{ borderRadius: 8 }} info onPress={() => addRoom(room.originalPrice)}>
                                                        <Text>Add Room</Text>
                                                    </Button>
                                                </View>
                                            </Card>
                                        </View>
                                    )
                                })
                                }
                            </View>
                        </ScrollView>
                    }

                    {/* image detail view */}
                    <ImageView
                        images={images}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                    />
                </ScrollView>
            }
            {loading && <Loader loading={loading}></Loader>}
            {
                roomQty > 0 ?
                    <View style={{ bottom: 0, padding: 20, position: 'absolute', height: 80, backgroundColor: 'gray', width: '105%', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', fontSize: 15, fontWeight: 'bold' }}> MMK {(totalPrice - 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', fontSize: 12, fontWeight: 'bold' }}>{roomQty} room(s) * 1 night(s)</Text>
                        <Button style={{ right: 10, position: 'absolute', backgroundColor: '#e48635' }} rounded>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}  onPress={() => bookNow()}>Book Now</Text>
                        </Button>
                    </View>
                    :
                    <View style={{ bottom: 0, padding: 20, position: 'absolute', height: 80, backgroundColor: 'gray', width: '105%', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', fontSize: 12, fontWeight: 'bold' }}>No room selected yet</Text>
                        <Button style={{ right: 10, position: 'absolute', backgroundColor: '#e48635' }} rounded>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Select Room</Text>
                        </Button>
                    </View>
            }


        </View>
    );

}

