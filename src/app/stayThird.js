import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ScrollView, Image } from "react-native";
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {  Card, CardItem, Container, Header, Content, Text, Button, Root } from "native-base";
import AvailableRoomCard from '../Common/availableRoom';
import { GetRoomById, AvailableRoom } from '../Service/api_fetch';
import Loader from './loader';
import ImageView from "react-native-image-viewing";
import Toast, {DURATION} from 'react-native-easy-toast'

export default StayThird = (props, { navigation }) => {

    const [visible, setIsVisible] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableRoomData, setData] = useState([]);
    const [text, setText] = useState("No room selected yet");
    const [buttonText, setButtonText] = useState("Select Room");

    useEffect(() => {
        // this.toast.show(<View><Text>hello world!</Text></View>);
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
                toast.show('hello world!', DURATION.FOREVER);
            });
        });
    }, []);

    const addRoom = (price) => {
        // console.log("Hello");
        // setText("MMK "+price+
        //  ", 1 rooms(s) * 1 night(s)");
        // setButtonText("Book Now");
        // Toast.hide();
        // Toast.show({
        //     text: text,
        //     buttonText: buttonText,
        //     buttonTextStyle: { color: "white", fontSize: 13 },
        //     buttonStyle: { backgroundColor: "#2196F3", marginTop: 3, marginBottom: 3, height: 60, borderRadius: 15 },
        //     duration: 9000 * 9000,
        // })
    }
    // goResearch = () => {
    //     navigation.navigate('stayfourth');
    // }

    return (
            <ScrollView style={{ padding: 10 }}>
                {!loading &&
                    <ScrollView>
                        {detailData.mainImg ? <Image source={{ uri: `${detailData.mainImg}` }} style={{ height: 200, width: null, flex: 1 }} /> : <Image source={{ uri: '../Image/noPhoto.png' }} style={{ height: 85, width: 52, margin: 7, flex: 1 }} />}
                        <View style={{ flexDirection: 'row', flex: 3 }}>
                            {
                                detailData.images.map(data => {
                                    return <Image source={{ uri: `${data.img}` }} style={{ height: 85, width: 52, margin: 7, flex: 1 }} />
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
                                <View style={{ marginTop: 10, marginBottom: 100 }}>
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


                <Toast ref={(toast) => toast = toast}/>
            </ScrollView>
    );

}

