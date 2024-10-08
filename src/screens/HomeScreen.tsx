import React, { useEffect, useState } from 'react';
import { styles } from '../theme/styles';
import { Avatar, FAB, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import { NewProductComponent } from '../components/NewProductComponent';
// Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../config/firebaseConfig';
import { FlatList } from 'react-native-gesture-handler';
import { ProductCardComponent } from '../components/ProductCardComponent';
import { EditUserComponent } from '../components/EditUserComponent';
import { EditProductComponent } from '../components/EditProductComponent';


interface Product {
  producto: string;
  precio: string;
  descripcion: string;
}

export const HomeScreen = ({ navigation }: any) => {
  //hook para uid
  const [uid, setuid] = useState('')
  //hook para ver el modal o no
  const [showModalProduct, setshowModalProduct] = useState<boolean>(false)
  const [showModelUser, setshowModelUser] = useState<boolean>(false)
  const [showModalEditProduct, setshowModalEditProduct] = useState<boolean>(false)
  //hook para producto seleccionado
  const [productoSeleccionado, setproductoSeleccionado] = useState('')
  //hook para leer datos del usuario
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [genero, setgenero] = useState<boolean>(true);
  //hook para leer el arreglo de los productos  
  const [productos, setproductos] = useState<Product[]>([]);

  //hook para leer datos

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      setuid(uid)
      cargarUsuario(uid)
      cargarProductos(uid)
    }
  }, []);

  function cargarUsuario(uid: string) {
    const starCountRef = ref(db, `users/${uid}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setnombre(data.nombre);
        setapellido(data.apellido);
        setgenero(data.genero);
      }
    });
  }
  function cargarProductos(uid: string) {
    const productRef = ref(db, `users/${uid}/productos`);
    onValue(productRef, (snapshot) => {
      const dataProductos = snapshot.val();
      const listaProductos: any = Object.keys(dataProductos).map((producto) => ({ producto, ...dataProductos[producto] }))
      setproductos(listaProductos)
    });
  }
  function cerrarSesion() {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    }).catch((error) => {
      console.error(error);
    });
  }
  const avatarLabel = `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <View>
            <Avatar.Text size={30} label={avatarLabel} />
            <Text variant="bodySmall">
              {genero === true ? 'Bienvenido' : genero === false ? 'Bienvenida' : 'Bienvenid@'}
            </Text>
            <Text variant="labelLarge">{nombre} {apellido}</Text>
          </View>
          <IconButton
            style={styles.icon}
            icon="account-edit"
            size={20}
            onPress={() => setshowModelUser(true)}
          />
          <IconButton icon='logout'
            size={30}
            onPress={cerrarSesion} />
        </View>

        <FlatList
          data={productos}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setproductoSeleccionado(item.producto); // Guardar el producto seleccionado
              setshowModalEditProduct(true); // Abrir el modal de edición
            }}>
              <ProductCardComponent product={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.producto}
        />

      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setshowModalProduct(true)}
      />
      <NewProductComponent showModalProduct={showModalProduct} setshowModalProduct={() => setshowModalProduct(false)} />
      <EditUserComponent showModelUser={showModelUser} setshowModelUser={() => setshowModelUser(false)} />
      <EditProductComponent
        showModalEditProduct={showModalEditProduct}
        setshowModalEditProduct={() => setshowModalEditProduct(false)}
        productoSeleccionado={productoSeleccionado} />
    </>
  );
};