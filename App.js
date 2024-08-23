import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { auth } from './config/FirebaseConfig';
import { signOut } from 'firebase/auth';

import SignInScreen from './screens/SignInScreen';
import ListingScreen from './screens/ListingScreen';
import BookingScreen from './screens/BookingScreen';

const Stack = createNativeStackNavigator();
  //function perform logout
  const performLogout = async({navigation}) => {
    try{
      await signOut(auth)

      console.log(`Successfully signed out`);
      
      if (navigation.canGoBack()){
        navigation.dispatch(StackActions.popToTop())
      }

    }catch(err){
      console.log(`Error while signing out : ${err}`);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
            initialRouteName='Car Owner App G08' 
            screenOptions={ () => ({
              headerStyle: {backgroundColor: '#d6cabc'},
              headerTintColor: '#000',
              headerTitleStyle: {fontWeight: 'bold'},
              headerTitleAlign: 'center'
          
          }) 
        }
      >
      <Stack.Screen component={SignInScreen} name="Car Owner App G08" />

      <Stack.Group screenOptions={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => {
                //perform logout
                performLogout({navigation})
              }
            } 
            >
              <Icon name="exit" size={35} color="black" />
            </TouchableOpacity>
          ) 
        })}>
          <Stack.Screen component={ListingScreen} name="Listing Screen"/>
          <Stack.Screen component={BookingScreen} name='Booking Screen'/>    
        </Stack.Group>
      
      </Stack.Navigator>


    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
