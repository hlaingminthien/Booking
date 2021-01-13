// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './loader';
import { Login } from '../Service/api_fetch'
import Icon from 'react-native-vector-icons/Ionicons';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  } from 'react-native-google-signin';

const SignIn = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const passwordInputRef = createRef();

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '329635580920-7sba92ef4ojo4t25u5okf2002v7arpoh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const fbLogin = () => {
    LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              getInfoFromToken(data.accessToken.toString());
            }
          )
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
        fields: {
            string: 'id, name, first_name, last_name, birthday, email'
        },
    }
    const profileRequest = new GraphRequest('/me', { token, parameters: PROFILE_REQUEST_PARAMS },
        (error, result) => {
          console.log('error, result is=>', {error, result});
            if (error) {
                console.log('Login Info has an error:', error)
            }

            else {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                }
                else{
                  AsyncStorage.setItem(
                    'user_id', result.id
                  );
                  AsyncStorage.setItem(
                    'user_name', result.name
                  );
                  navigation.replace('DrawerNavigationRoutes');
                }
            }
        },
    )
    new GraphRequestManager().addRequest(profileRequest).start()
}

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userId) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {
      userId: userId,
      password: userPassword

    };


    Login(dataToSend).then((responseJson) => {
      //Hide Loader
      setLoading(false);
      // If server response message same as Data Matched
      if (responseJson.access_token) {
        AsyncStorage.setItem(
          'user_id', responseJson.user_id
        );
        AsyncStorage.setItem(
          'user_name', responseJson.user_name
        );
        navigation.replace('DrawerNavigationRoutes');
      } else {
        setErrortext('Please check your id or password');
        console.log('Please check your id or password');
      }
    })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  

  const googleSignIn  = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      console.log('Hello hehe', accessToken);
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        console.log('error is=>', error);
        // some other error happened
      }
    }
  };

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
              <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Sign in</Text>
            </View>
            <View style={styles.SectionStyle}>
              <Text style={{ fontSize: 15 }}>You can sign in using your travelparadise.work account to access our services.</Text>
            </View>
            <View style={styles.SectionHeaderStyle}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#565656' }}>Email address</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserId) => setUserId(UserId)}
                placeholder="UserId" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionHeaderStyle}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#565656' }}>Password</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={
                  (UserPassword) => setUserPassword(UserPassword)
                }
                placeholder="Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
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
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <View style={{ margin: 35 }}>
              <View style={{ borderTopColor: '#d6d6d6', borderTopWidth: 1, alignItems: 'center' }}>
                <Text style={{ padding: 0, backgroundColor: 'white', width: 200, textAlign: 'center', marginTop: -12 }}>or use one of these options</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 45, marginRight: 45, marginTop: 10, marginBottom: 35 }}>
              <View style={styles.iconContainer} >
                <Icon onPress={fbLogin} size={42} color="#2196F3" name="logo-facebook"></Icon>
              </View>
              <View style={styles.iconContainer}>
              <TouchableOpacity  style={{ width: '60%', margin: 30 }}  onPress={googleSignIn}>
                <Image style={{ resizeMode: 'contain', width: '100%'}} source={require('../Image/google.png')}
                 />
                  </TouchableOpacity>
              </View>
              <View style={styles.iconContainer} >
                <Icon size={42} color="black" name="logo-apple"></Icon>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                Don't have an account yet? Sign up
            </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </ScrollView>
  );
};
export default SignIn;

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
  }
});