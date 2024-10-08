import React, { useEffect, useState } from 'react'
import { Button, IconButton, Modal, RadioButton, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { Alert, View } from 'react-native';
import { onValue, ref, update } from 'firebase/database';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface PropUser {
    showModelUser: boolean;
    setshowModelUser: Function;
}
export const EditUserComponent = ({ showModelUser, setshowModelUser }: PropUser) => {
    //hooks datos usuario
    const [uid, setuid] = useState('')
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [genero, setgenero] = useState<boolean>(false)

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            setuid(uid)
            leerUsuario(uid)
        }
    }, []);

    function leerUsuario(uid: string) {
        const userRef = ref(db, `users/${uid}`);

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setnombre(data.nombre);
                setapellido(data.apellido);
                setgenero(data.genero);                
            } else {
                Alert.alert('Error', 'No se encontraron datos para este usuario.');
            }
        });
    }

    const editar = () => {
        update(ref(db, `users/${uid}`), {
            nombre: nombre,
            apellido: apellido,
            genero: genero
        }).then(() => {
            Alert.alert('Éxito', 'Datos actualizados correctamente.');
            setshowModelUser(false);
        }).catch((error) => {
            console.error('Error al actualizar datos:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
        });
    };

    return (
        <Modal visible={showModelUser} contentContainerStyle={styles.modal}>
            <View style={styles.header}>
                <Text variant='headlineSmall'>Editar Usuario</Text>
                <View style={styles.icon}>
                    <IconButton icon='close-circle-outline'
                        size={30}
                        onPress={() => setshowModelUser(false)} />
                </View>
            </View>
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
            <RadioButton.Group
                onValueChange={(newValue) => setgenero(newValue === 'hombre')}
                value={genero ? 'hombre' : 'mujer'}
            >
                <Text style={{ fontSize: 20 }}>Genero</Text>
                <View>
                    <Text>Hombre</Text>
                    <RadioButton value="hombre" />
                </View>
                <View>
                    <Text>Mujer</Text>
                    <RadioButton value="mujer" />
                </View>
            </RadioButton.Group>
            <Button icon="login" mode="contained" onPress={editar}>
                Guardar
            </Button>

        </Modal>
    )
}
