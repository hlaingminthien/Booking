// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Loader from './loader';
import { Register } from '../Service/api_fetch';
import Icon from 'react-native-vector-icons/Ionicons';


const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const userNameInputRef = createRef();
  const userIdInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userId) {
      alert('Please fill UserId');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      userId: userId,
      password: password,
      username: userName,
    };

    Register(dataToSend).then((responseJson) => {
      console.log('responseJson is=>', responseJson);
            //Hide Loader
            setLoading(false);
            console.log(responseJson);
            // If server response message same as Data Matched
            if (responseJson.status == 200) {
              setIsRegistraionSuccess(true);
              console.log(
                'Registration Successful. Please Login to proceed'
              );
            } else {
              setErrortext('Registration Unsuccessful');
            }
          }).catch((error) => {
            //Hide Loader
            setLoading(false);
            console.error(error);
      });
  };

  if (isRegistraionSuccess) {
    return (
      <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/TravelParadise.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainBody}>
    <Loader loading={loading} />
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        marginTop: 30,
        alignContent: 'center',
      }}>
      <View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>Create your account</Text>
          </View>
          <View style={styles.SectionStyle}>
          <Text style={{fontSize: 15}}>Create an account to use travelparadise.work services easily.</Text>
          </View>
          <View style={styles.SectionStyle}>
          <TextInput
              style={styles.inputStyle}
              onChangeText={(UserId) => setUserId(UserId)}
              underlineColorAndroid="#f000"
              placeholder="UserId"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                userIdInputRef.current &&
                userIdInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <TextInput
              style={styles.inputStyle}
              onChangeText={
                (UserName) => setUserName(UserName)
              }
              underlineColorAndroid="#f000"
              placeholder="Username"
              placeholderTextColor="#8b9cb5"
              ref={userNameInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <TextInput
              style={styles.inputStyle}
              onChangeText={
                (Password) => setPassword(Password)
              }
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity>
          <View style={{margin: 35}}>
            <View style={{borderTopColor: '#d6d6d6', borderTopWidth: 1, alignItems: 'center'}}>
              <Text style={{padding: 0, backgroundColor: 'white', width: 200, textAlign: 'center', marginTop: -12}}>or use one of these options</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 45, marginRight: 45, marginTop: 10, marginBottom: 35}}>
              <View style={styles.iconContainer} >
              <Icon size={42} color="#2196F3" name="logo-facebook"></Icon>
              </View>
              <View  style={styles.iconContainer} >
              <Image source={require('../Image/google.png')}
                style={{width: '60%', resizeMode: 'contain', margin: 30}}/>
              </View>
              <View  style={styles.iconContainer} >
              <Icon size={42} color="black" name="logo-apple"></Icon>
              </View>
          </View>
          <View style={{marginTop: 30}}>
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('LoginScreen')}>
            Already have an account? Sign In
          </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  </ScrollView>
);
};
export default RegisterScreen;

const styles = StyleSheet.create({
mainBody: {
  flex: 1,
  backgroundColor: 'white',
  alignContent: 'center',
},
SectionStyle: {
  flexDirection: 'row',
  height: 40,
  marginTop: 20,
  marginLeft: 35,
  marginRight: 35,
  margin: 10,
},
SectionHeaderStyle: {
  flexDirection: 'row',
  height: 22,
  marginTop: 20,
  marginLeft: 35,
  marginRight: 35,
  fontWeight: 'bold',
  fontSize: 30
},
buttonStyle: {
  backgroundColor: '#0a6bb8',
  borderWidth: 0,
  color: '#FFFFFF',
  borderColor: '#7DE24E',
  height: 40,
  alignItems: 'center',
  marginLeft: 35,
  marginRight: 35,
  marginTop: 20,
  marginBottom: 20,
},
buttonTextStyle: {
  color: '#FFFFFF',
  paddingVertical: 10,
  fontSize: 16,
},
inputStyle: {
  flex: 1,
  color: 'black',
  paddingLeft: 15,
  paddingRight: 15,
  borderWidth: 1,
  borderColor: '#dadae8',
},
registerTextStyle: {
  color: '#2196F3',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 14,
  alignSelf: 'center',
  padding: 10,
},
errorTextStyle: {
  color: 'red',
  textAlign: 'center',
  fontSize: 14,
},
iconContainer: {
  width: 70, 
  height: 70, 
  borderWidth: 1, 
  borderBottomColor: 'gray', 
  alignItems: 'center',
  justifyContent: 'center'
},
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});