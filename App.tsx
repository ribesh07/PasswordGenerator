/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
import { GestureResponderEvent, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


const PasswordSchema = yup.object().shape({
  // name:yup.string().required(),
  passwordLength: yup.number().min(4,'min 4 char').max(16,'max 16 char').required('password is required'),
  // age : yup.number().integer().positive().max(45).required('age is required '),
});
// const user = PasswordSchema.validate({
//     password: 123456789,
//     name : 'rk',
//     age : 5,
// });
// console.log(user);

export default function App() {
  var [password, setPassword] = useState('');
  var [passwordGenerated, setPasswordGenerated] = useState(false);
  var [lowerCase, setLowerCase] = useState(false);
  var [upperCase, setUpperCase] = useState(false);
  var [numbers, setNumbers] = useState(false);
  var [specialChar, setSpecialChar] = useState(false);
  const windowWidth = useWindowDimensions().width
  const windowHeight = useWindowDimensions().height

  //Generate password Logic
  const generatePasswordString = (passwordLengths : number) =>{
    let characterlist  = ''
    const upperCasechar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCasechar = 'abcdefghijklmnopqrstuvwxyz'
    const numberschar = '0123456789'
    const specialCharcter = '!@#$%^&*()_+'
    if (upperCase){
      characterlist += upperCasechar;
    }
    if (lowerCase){
    characterlist += lowerCasechar;
    }
    if (numbers){
    characterlist += numberschar;
    }
    if (specialChar){
    characterlist += specialCharcter;
    }
    console.log(characterlist);
    console.log(passwordLengths)
    const passwordResult = createPasswordString(characterlist,passwordLengths)
    console.log('password :' + passwordResult)
    setPassword(passwordResult)
    setPasswordGenerated(true)
    console.log(passwordGenerated)
    }


    //Password String
    const createPasswordString = (characters : string , length : number) =>{
      let result = ''
      let results = ''
      for(let i = 0; i < length; i++) {
        const characterIndex = Math.round(Math.random() * characters.length)
        console.log(characterIndex)
        results = characters.charAt(characterIndex)
        result += results
      }

      return result
      }

      //Resest the states on call
      const resetPasswordString = () => {
        setPasswordGenerated(false);
        setPassword('');
        setLowerCase(false);
        setUpperCase(false);
        setNumbers(false);
        setSpecialChar(false);
      };
  return (
    <SafeAreaView style={{flex : 1,backgroundColor : 'aqua'}}>
    <View style={styles.container}>
      <Text style={{
        fontSize: 24,
        color: 'white',
        fontWeight : 'bold',
        padding:5,
      }}>Password Generator</Text>
    </View>
    <ScrollView keyboardShouldPersistTaps="handled">
   <View style={{
        flex: 1,
        marginTop :80,
        height : windowHeight,
        width : windowWidth,
        justifyContent: 'flex-start',
        flexWrap : 'nowrap',
        alignItems: 'center',

    }}>
        <Text style={{
            fontSize: 20,
            color: 'white',
            fontWeight:'bold',
            marginTop :-20,
            marginBottom:18,
        }}>Password Generator</Text>

    <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
        onSubmit={ values => {
          console.log(values)
          generatePasswordString(Number(values.passwordLength))
        }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleSubmit,
       }) => (
        <>

        <View style={styles.inputWrapper}>
        <View style = {styles.inputColumn}>
          <Text style={[styles.InlineText,{marginTop:2}]}>Password Length</Text>
          {touched.passwordLength && errors.passwordLength &&
          (
            <Text style={[{marginTop:10,color:'red',fontSize:12}]}>{errors.passwordLength}</Text>
          )}
          <TextInput
            style={styles.inputStyle}
            value = {values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="4 .. 16"
            keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputWrapper}>
          {(lowerCase || upperCase || numbers || specialChar) ? null : (
            <View style={{marginLeft:0}}>
            <Text style = {[styles.InlineText,{fontSize:18,color:'red'}]}>Include Atleast One</Text>
          </View>
          ) }
        <View style={styles.inputColumn}>
          <Text style = {styles.InlineText}>Include lowerCase</Text>
          <BouncyCheckbox
            // useBuiltInState
            isChecked={lowerCase}
            onPress={() => {
              lowerCase = !lowerCase
              setLowerCase(lowerCase)
              console.log(lowerCase)
            }}
            fillColor="aqua"
            />
        </View>
        </View>
        <View style={styles.inputWrapper}>
        <View style={styles.inputColumn}>
          <Text style = {styles.InlineText}>Include UpperCase</Text>
          <BouncyCheckbox
            // useBuiltInState
            isChecked={upperCase}
            onPress={() => {
              upperCase = !upperCase
              setUpperCase(upperCase)
              console.log(upperCase)
            }}
            fillColor="black"
            />
        </View>
        </View>
        <View style={styles.inputWrapper}>
        <View style={styles.inputColumn}>
          <Text style = {styles.InlineText}>Include Numbers</Text>
          <BouncyCheckbox
            // useBuiltInState
            isChecked={numbers}
            onPress={() => {
              numbers = !numbers
              setNumbers(numbers)
              console.log(numbers)
            }}
            fillColor="brown"
            />
        </View>
        </View>
        <View style={styles.inputWrapper}>
        <View style={styles.inputColumn}>
          <Text style = {styles.InlineText}>Include SpecialCharacter</Text>
          <BouncyCheckbox
            // useBuiltInState
            isChecked={specialChar}
            onPress={() => {
              specialChar = !specialChar
              setSpecialChar(specialChar)
              console.log(specialChar)
            }}
            fillColor="#c34fe3"
            />
        </View>
        </View>

        <View style={styles.formActions}>
          <TouchableOpacity onPress={handleSubmit as (e?:GestureResponderEvent) => void} >
            <Text style={[styles.InlineText,{marginLeft:12,fontWeight: 'bold'}]}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetPasswordString}>
            <Text style={[styles.InlineText,{marginLeft:12,fontWeight: 'bold'}]}>Reset</Text>
          </TouchableOpacity>
        </View>
        </>
         )}
     </Formik>
    { passwordGenerated ? (
      <View style={[styles.card,styles.cardElevated]}>
        <Text selectable={true} style={[styles.InlineText,{fontSize:20,fontWeight: '700',color : 'black'}]}>Password : {password}</Text>
        <Text style={styles.InlineText}>Select To Copy</Text>
      </View>
    ) :
     null
    }
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : 'grey',
        // marginTop :8,
        flexDirection :'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    inputWrapper : {
      // padding :2,
    },
    formActions : {
      // width : 300,
      flexDirection : 'column',
      justifyContent : 'center',
      // padding : 8,
      alignItems : 'center',
    },
    inputStyle : {
        height :40,
        padding :8,
        margin :8,
    },
    inputColumn : {
      backgroundColor :'lightgrey',
      margin:2,
      paddingTop:6,
      flexWrap : 'wrap',
      width :350,
      height :50,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent : 'space-between',
      borderRadius : 10,
    },
    InlineText :{padding:8,
      marginLeft:8,
      fontSize:15},
    card : {
        marginTop : 20,
        backgroundColor : 'white',
        padding :8,
        margin :8,
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'center',
        // height : 300,
        // width : 350,

    },
    cardElevated : {
      elevation : 10,
      shadowOffset : {width : 1, height : 1},
      shadowColor : 'black',
      shadowOpacity : 0.5,

    },
});
