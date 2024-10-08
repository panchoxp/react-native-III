import React, { useEffect, useState } from 'react'
import { styles } from '../theme/styles'
import { Button, IconButton, Modal, Text, TextInput } from 'react-native-paper'
import { Alert, View } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { onValue, ref, remove, update } from 'firebase/database';

interface PropEditProduct {
    setshowModalEditProduct: Function;
    showModalEditProduct: boolean;
    productoSeleccionado: string;
}

export const EditProductComponent = ({ setshowModalEditProduct, showModalEditProduct, productoSeleccionado }: PropEditProduct) => {
    //hook para uid del usuario
    const [uid, setuid] = useState('');
    const [producto, setproducto] = useState('');
    const [precio, setprecio] = useState('');
    const [descripcion, setdescripcion] = useState('')

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            setuid(uid)
        } if (productoSeleccionado) {
            cargarProducto(productoSeleccionado);
        }
    }, [productoSeleccionado]);


    const cargarProducto = (producto: string) => {
        const productRef = ref(db, `users/${uid}/productos/${producto}`);
        onValue(productRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setproducto(data.producto);
                setprecio(data.precio);
                setdescripcion(data.descripcion);
            }
        });
    };

    const editar = () => {
        update(ref(db, `users/${uid}/productos/${producto}`), {
            producto: producto,
            precio: precio,
            descripcion: descripcion,
        }).then(() => {
            Alert.alert('Éxito', 'Datos actualizados correctamente.');
            setshowModalEditProduct(false);
        }).catch((error) => {
            console.error('Error al actualizar datos:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
        });
    };

    function eliminar() {
        remove(ref(db, `users/${uid}/productos/${producto}`));
        Alert.alert('Producto eliminado con exito')
        setshowModalEditProduct(false)
    }

    return (
        <Modal visible={showModalEditProduct} contentContainerStyle={styles.modal}>
            <View style={styles.header}>
                <Text variant='headlineSmall'>{producto}</Text>
                <View style={styles.icon}>
                    <IconButton icon='close-circle-outline'
                        size={30}
                        onPress={() => setshowModalEditProduct(false)} />
                </View>
            </View>

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
            <Button mode="contained" onPress={editar}>
                Editar Producto
            </Button>
            <IconButton                
                icon="delete"
                size={20}
                onPress={eliminar}
            />
        </Modal>
    )
}
