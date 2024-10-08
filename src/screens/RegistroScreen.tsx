import React, { useState } from 'react'

//firebase
import { auth, db } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, View } from 'react-native';
import { Button, RadioButton, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { ref, set } from 'firebase/database';

export const RegistroScreen = ({ navigation }: any) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [genero, setgenero] = useState<boolean>(true);

  function datosUsuario(uid: string) {
    set(ref(db, 'users/' + uid), {
      nombre: nombre,
      apellido: apellido,
      email: email,
      genero:genero,
    });
  }
  function registrar() {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.')
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        datosUsuario(uid)
        Alert.alert('Usuario registrado con exito')
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode);
        switch (errorCode) {
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'El correo ya existe');
            break;
          case 'auth/invalid-email':
            Alert.alert('Error', 'Correo invalido');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'Ingrese una contraseña de 6 dígitos');
            break;
        }
      });
  }
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Registro</Text>
      <TextInput
        label="Nombre"
        mode="outlined"
        placeholder="Escriba su nombre"
        value={nombre}
        onChangeText={text => setnombre(text)}
      />
      <TextInput
        label="Apellido"
        mode="outlined"
        placeholder="Escriba su apellido"
        value={apellido}
        onChangeText={text => setapellido(text)}
      />
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
      <TextInput
        mode="outlined"
        label="Confirmar Contraseña"
        placeholder="Escriba de nuevo la contraseña"
        value={confirmPassword}
        secureTextEntry={hiddenPassword}
        onChangeText={text => setconfirmPassword(text)}
        right={<TextInput.Icon icon="eye" onPress={() => sethiddenPassword(!hiddenPassword)} />}
      />

      <RadioButton.Group
        onValueChange={(newValue) => setgenero(newValue === 'hombre')}
        value={genero ? 'hombre' : 'mujer'}
      >
        <Text style={{fontSize:20}}>Genero</Text>
        <View>
          <Text>Hombre</Text>
          <RadioButton value="hombre" />
        </View>
        <View>
          <Text>Mujer</Text>
          <RadioButton value="mujer" />
        </View>
      </RadioButton.Group>

      <Button icon="login" mode="contained" onPress={registrar}>
        Registrar
      </Button>

    </View>
  );
}
