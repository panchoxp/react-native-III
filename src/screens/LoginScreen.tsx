import React, { useState } from 'react'
import { styles } from '../theme/styles';
//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { Button, Text, TextInput } from 'react-native-paper';
import { Alert, TouchableOpacity, View } from 'react-native';

export const LoginScreen = ({ navigation }: any) => {
  //hooks
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);

//login
  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Usuario no existente.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Error', 'Correo inválido.');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'Ingrese una contraseña.');
            break;
          case 'auth/too-many-requests':
            Alert.alert('Error', 'La contraseña es incorrecta.');
            break;
          default:
            Alert.alert(errorMessage);
            break;
        }
      });
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Login</Text>
      <TextInput
        label="Email"
        mode='outlined'
        placeholder='Escriba el correo'
        keyboardType='email-address'
        value={email}
        onChangeText={text => setemail(text)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escriba la contraseña"
        value={password}
        secureTextEntry={hiddenPassword}
        onChangeText={text => setpassword(text)}
        right={<TextInput.Icon icon="eye" onPress={() => sethiddenPassword(!hiddenPassword)} />}
      />
      <Button icon="account" mode="contained" onPress={login}>
        Iniciar sesion
      </Button>
      <Button icon="account-plus" mode="contained" onPress={() => navigation.navigate('Registro')}>
        Registrarse
      </Button>
    </View>

  )
}
