import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text, ScrollView, Image } from "react-native";
import TourCard from '../Common/tourCard';
import { SearchTour } from '../Service/api_fetch';
import Loader from './loader';

export default AttractionSecond = (props) => {
  const params = props.route.params;

  const [fileterData, setFilterData] = useState({
    selectedRegion: params.selectedRegion, startDate: params.startDate, endDate: params.endDate
  });
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SearchTour(parseInt(fileterData.selectedRegion), fileterData.startDate, fileterData.endDate).then(data => {
     setTourData(data);
     setLoading(false);
    })
  }, []);

  return (
    <View>
      {tourData.length > 0 &&
        <ScrollView>
        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
          {tourData.length > 0 && tourData.map((data, k) => {
            return (
              <TourCard key={k} data={data} />
            )
          })
          }
        </View>
    </ScrollView>
      }
      {tourData.length == 0 && !loading ?
        <View style={{backgroundColor: 'white', height: '100%', alignContent: 'center'}}>
          <Image source={require('../Image/nodata.png')}
            style={{ width: '100%', resizeMode: 'contain' }} />
            <Text style={{color: 'gray', textAlign: 'center', marginTop: -30}}>We fount Nothing!</Text>
        </View> : <Loader loading={loading}></Loader>
      }
      </View>
  );
}

