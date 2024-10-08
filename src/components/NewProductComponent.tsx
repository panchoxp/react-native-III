import React, { useEffect, useState } from 'react';
import { Modal, Portal, Text, TextInput, Button, IconButton, Divider } from 'react-native-paper';
import { styles } from '../theme/styles';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged, reload } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { Alert, View } from 'react-native';

//interface - props
interface PropsProduct {
    showModalProduct: boolean;
    setshowModalProduct: Function;
}

export const NewProductComponent = ({ showModalProduct, setshowModalProduct }: PropsProduct) => {
    // Hooks para manejar los datos del producto
    const [uid, setuid] = useState('')
    const [producto, setproducto] = useState('');
    const [precio, setprecio] = useState('');
    const [descripcion, setdescripcion] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid; 
                setuid(uid);
            }
        });
        return () => unsubscribe(); 
    }, []);

    const enviarDatos = () => {     
                set(ref(db, `users/${uid}/productos/${producto}`), {
                    producto: producto,
                    precio: precio,
                    descripcion: descripcion,
                })
                    .then(() => {
                        setproducto('');
                        setprecio('');
                        setdescripcion('');
                        Alert.alert("Producto guardado con exito")
                        setshowModalProduct(false)                        
                    })
                    .catch((error) => {
                        console.error('Error al guardar los datos:', error);
                    });
            
        
    };

    return (

        <Modal visible={showModalProduct} contentContainerStyle={styles.modal}>
            <View style={styles.header}>
                <Text variant='headlineSmall'>Nuevo Producto</Text>
                <View style={styles.icon}>
                    <IconButton icon='close-circle-outline'
                        size={30}
                        onPress={() => setshowModalProduct(false)} />
                </View>
            </View>
            <Divider />
            <TextInput
                label="Nombre del Producto"
                mode="outlined"
                placeholder="Escriba el nombre del producto"
                value={producto}
                onChangeText={setproducto}
            />
            <TextInput
                label="Precio"
                mode="outlined"
                placeholder="Escriba el precio del producto"
                value={precio}
                onChangeText={setprecio}
            />
            <TextInput
                label="Descripción"
                mode="outlined"
                placeholder="Escriba la descripción del producto"
                value={descripcion}
                onChangeText={setdescripcion}
            />
            <Button mode="contained" onPress={enviarDatos}>
                Guardar Producto
            </Button>
        </Modal>

    );
};

