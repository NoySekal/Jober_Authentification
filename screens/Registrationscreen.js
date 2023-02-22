import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Pressable, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import GoogleAuthProvider from 'firebase/auth'
import {firebase} from '../config'

//npm install --save @react-native-firebase/app
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
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
//////////////////////////////////
const registerUser = async (email, password,fullName) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    /*  firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url:'billbuster-69970.firebaseapp.com',
      })
      .then(() => {
          alert('verification email sent')
      }).catch((error) => {
          alert(error.message)
      })*/
      
          firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
              name : fullName,
              email,
          
          })
    
      .catch((error) => {
          alert(error.message)
       })
      })
      .catch((error => {
          alert(error.message)
      }))

}
/////////////////////////////////////////////////

    const HandleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Registered With:', user.email);
            })
            .catch(error => alert(error.massage))
    }

    const HandleLogIn =() =>{
        auth
           .SignInWithEmailAndPassword(email, password)
           .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Logged In With:', user.email);
            })
            .catch(error => alert(error.massage))

    }
   

    const GooglesignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
        const userInfo = await GoogleSignin.signIn();
        console.log(user.email);
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
           <Text style={styles.RegisterText}>שם מלא</Text>
           <TextInput
              placeholder="שם מלא"
                value={fullName}
                onChangeText={text => setfullName(text)}
              style={styles.input}
            />
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
            onPress={() => registerUser(email,password,fullName)}
            style={styles.button, styles.buttonOutline}
          >
            <Text style={styles.buttonOutlineText}>צור חשבון</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => GoogleSignIn()}
            style={styles.button2, styles.buttonOutline2}
          >
            <Text style={styles.buttonOutlineText}>כנס באמצעות</Text>
          </TouchableOpacity> */}

        <View style={styles.parentView}>
      
            <View style={styles.line} />
            <Text style={styles.Text1}>או כנס באמצעות</Text>
            <View style={styles.line} />

        </View>
          {/* <TouchableOpacity
            onPress={HandleLogIn}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity> */}
          
        <TouchableOpacity
           onPress={GooglesignIn}
           style={styles.button}>
           <Text style={styles.buttonText}>Google SignIn</Text>
        </TouchableOpacity>
          
          {/* <Pressable onpress ={()=>GooglesignIn().then(res =>{
            console.log(res)
           }).catch(error=> console.log(error))
           } style={styles.buttonOutline3}>
            <Text style= {styles.Text1}>מחלnגוגל</Text>
          </Pressable> */}




          <Text style={styles.Text2}>כבר יש לך משתמש?</Text>
      
       </View>
    </KeyboardAvoidingView>
   
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


    //</View>

    //</View>
  )
} 
// function GoogleSignIn() {
//   return (
//     <Button
//       title="Google Sign-In"
//       onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
//     />
//   );
// }



export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //    justifyContent: 'center',
  backgroundColor: 'white',
  alignItems: 'center',
  textAlign: 'right',


  },
  RegisterText: {
    color: 'black',
   // fontFamily: 'Roboto',
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

  // buttonContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
      
  // },
  buttonOutline: {
    backgroundColor: '#6750A4',
    display: 'flex',
    // marginTop: 36,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // padding: 10,
    // marginVertical: 10,
    
    // position: 'absolute',
    // width: 400,
    // height: 40,
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
})