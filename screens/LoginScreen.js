import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Pressable, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import GoogleAuthProvider from 'firebase/auth'
import {firebase} from '../config'
//import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

// import 'firebase/firestore'
// import 'expo-dev-client'
// add other Firebase services as needed

const provider = new firebase.auth.GoogleAuthProvider();

const handleSignIn = async () => {
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    // Handle user authentication
  } catch (error) {
    // Handle error
  }
}
//npm install --save @react-native-firebase/app
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

// expo.configure({
//   webClientId: '',
// });
/*{/import google / ios / facebook authentication/}
import FacebookAuthProvider from 'firebase/auth'
import AppleAuthProvider from 'firebase/auth'*/

//import { GoogleSignin } from '@react-native-google-signin/google-signin';


 
const LoginScreen = () => {
    const [fullName, setfullName] = useState('')
    const [email, setEmail] = useState('') 
    const [password, setpassword] = useState('') 

    const navigation = useNavigation()
    

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home")
            }
        })
        return unsubscribe

    }, [])


const LogIn = async () => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    navigation.navigate("Home")
  } catch (error) {
    alert(error.message);
  }
}
  

    const GooglesignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
        const userInfo = await GoogleSignin.signIn();
        navigation.navigate("Home")
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };


  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
          
            <Text style={styles.RegisterText}>מייל</Text>
            <TextInput
              placeholder="מייל"
                value={email}
                onChangeText={text => setEmail(text)}
              style={styles.input}
            />
             <Text style={styles.RegisterText}>סיסמה</Text>
            <TextInput
              placeholder="סיסמה"
                value={ password}
                onChangeText={text => setpassword(text)}
              style={styles.input}
              secureTextEntry
            />
      </View>
       <View>
          
          <TouchableOpacity
            onPress={() => GooglesignIn()}
            style={styles.button, styles.buttonOutline}
          >
            <Text style={styles.buttonOutlineText}>כנס</Text>
          </TouchableOpacity>



        <View style={styles.parentView}>
      
            <View style={styles.line} />
            <Text style={styles.Text1}>או כנס באמצעות</Text>
            <View style={styles.line} />

        </View>

          
        <TouchableOpacity
           onPress={() => LogIn(email,password)}
           style={styles.Google_button}>
           <Text style={styles.Google_buttonText}>Google SignIn</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
           onPress={GooglesignIn}
           style={styles.Facebook_button}>
           <Text style={styles.Facebook_buttonText}>Facebook SignIn</Text>
        </TouchableOpacity> */}
          
        <TouchableOpacity
           onPress={handleSignIn}
           style={styles.Facebook_button}>
           <Text style={styles.Facebook_buttonText}>popSignIn</Text>
        </TouchableOpacity>
          



       <Pressable onPress={() => navigation.navigate("Registrationscreen")}>
        <Text style={styles.Text2}>צור חשבון</Text>
      </Pressable>      
       </View>
    </KeyboardAvoidingView>
  )
} 




export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'right',


    },
    RegisterText: {
      color: 'black',
      fontWeight: '600',
      fontSize: 18,
      paddingVertical: 1,
      marginTop: '4%',
      marginbuttom: 0,
      textAlign: 'right',

  },
    input: {
       textAlign: 'right',
       backgroundColor: 'white',
       borderColor: '#DFE1E6',
       borderWidth: 1,
       paddingHorizontal: '40%',
       paddingVertical: '2.5%',
       borderRadius: '10%',
       marginTop: '1%',

    },

    buttonOutline: {
      backgroundColor: '#6750A4',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: '35%',
      paddingVertical: '3%',
      borderRadius: '10%',
      marginTop: '10%',
  },
  parentView:{
  flexDirection: 'row',
  justifyContent: 'center',

  },
    Text1: {
      display: 'flex',
      flexDirection: 'row',
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.5)',
      fontSize: 15,
      paddingVertical: '1%',
      marginTop: '7%',
      marginbuttom: '7%',


  },
  line: {
     borderBottomWidth: 1, 
     borderBottomColor:'rgba(0, 0, 0, 0.5)',
    width: '34%', 
    alignSelf: 'center', 
    marginTop: '7%',

},
   Google_button:{
 
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderColor: 'rgba(0, 0, 0, 0.08)',
      borderWidth: 1,
      paddingHorizontal: '30%',
      paddingVertical: '3%',
      borderRadius: '10%',
      marginTop: '5%',
      textAlign: 'center',
   },
   Google_buttonText: {
    color: 'black',
    fontSize: 16,
},
Facebook_button:{
 
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderColor: 'rgba(0, 0, 0, 0.08)',
  borderWidth: 1,
  paddingHorizontal: '30%',
  paddingVertical: '3%',
  borderRadius: '10%',
  marginTop: '5%',
  textAlign: 'center',
},
Facebook_buttonText: {
color: 'black',
fontSize: 16,
},

Text2: {
  textAlign: 'center',
  color: '#6750A4',
  fontSize: 15,
  display: 'flex',
  marginTop: '75%',
},
    buttonOutline2: {
      backgroundColor: '#6750A4',
      borderradius: 8, 

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      paddingHorizontal: 24,
      marginVertical: 10,
      
      position: 'absolute',
      width: 328,
      height: 40,
      left: 0,
      top: 100,
  },
  buttonOutline3: {
    backgroundColor: '#6750A4',
    borderradius: 8, 

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 24,
    marginVertical: 10,
    
    position: 'absolute',
    width: 328,
    height: 40,
    left: 0,
    top: 150,
},

    buttonOutlineText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',

    }

})
/////////////////DRAFTDRAFTDRAFTDRAFT/////////////////////////
// const registerUser = async (email, password,fullName) => {
//   await firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then(() => {
//     /*  firebase.auth().currentUser.sendEmailVerification({
//           handleCodeInApp: true,
//           url:'billbuster-69970.firebaseapp.com',
//       })
//       .then(() => {
//           alert('verification email sent')
//       }).catch((error) => {
//           alert(error.message)
//       })*/
      
//           firebase.firestore().collection('users')
//           .doc(firebase.auth().currentUser.uid)
//           .set({
//               name : fullName,
//               email,
          
//           })
    
//       .catch((error) => {
//           alert(error.message)
//        })
//       })
//       .catch((error => {
//           alert(error.message)
//       }))

// }
// const HandleSignUp = () => {
//   auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(userCredentials => {
//         const user = userCredentials.user;
//         console.log('Registered With:', user.email);
//       })
//       .catch(error => alert(error.massage))
// }

   
    /*<View style={styles.container}>
    <View style={styles.inputContainer}></View>
    <View style={styles.name}>
        <Text style={styles.RegisterText}>שם מלא </Text>
        <TextInput style={styles.inputName} placeholder="שם מלא" 
        onChangeText={(fullName) => setfullName(fullName)} autoCorrect={false} />
    </View>
    <View style={styles.email}>
        <Text style={styles.textEmail}>מייל </Text>
        <TextInput style={styles.inputEmail} placeholder="מייל" onChangeText={(email) => setEmail(email)} autoCorrect={false} />
    </View>
    <View style={styles.password}>
        <Text style={styles.textPassword}>סיסמה</Text>
        <TextInput style={styles.inputPassword} placeholder="סיסמה" onChangeText={(password) => setpassword(password)} autoCorrect={false} />
    </View>
 
    <TouchableOpacity onPress={() => registerUser(email,password,fullName)} style={styles.button}>
        <Text style={styles.TextBtn}>צור חשבון</Text>
    </TouchableOpacity>
    <View style={styles.containerAuto}>
        {/* add 3 buttons for google, facebook and apple  register and authentication*/

          {/* <TouchableOpacity
            onPress={HandleLogIn}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity> */}
    //</View>
          {/* <TouchableOpacity
            onPress={() => GoogleSignIn()}
            style={styles.button2, styles.buttonOutline2}
          >
            <Text style={styles.buttonOutlineText}>כנס באמצעות</Text>
          </TouchableOpacity> */}
    //</View>
  //   const HandleLogIn =() =>{
  //     auth
  //        .SignInWithEmailAndPassword(email, password)
  //        .then(userCredentials => {
  //           const user = userCredentials.user;
  //           console.log('Logged In With:', user.email);
  //         })
  //         .catch(error => alert(error.massage))

  // }
            {/* <Pressable onpress ={()=>GooglesignIn().then(res =>{
            console.log(res)
           }).catch(error=> console.log(error))
           } style={styles.buttonOutline3}>
            <Text style= {styles.Text1}>מחלnגוגל</Text>
          </Pressable> */}
          // function GoogleSignIn() {
//   return (
//     <Button
//       title="Google Sign-In"
//       onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
//     />
//   );
// }
