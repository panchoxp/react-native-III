import React from 'react'
import { View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { styles } from '../theme/styles';
interface ProductCardProps {
    product: {
        producto: string;
        precio: string;
        descripcion: string;
    };
}
export const ProductCardComponent = ({ product }: ProductCardProps) => {
    
    return (
        <View style={styles.root}>
            <Divider/>                     
            <Text variant="labelLarge">{product.producto}</Text>
            <Text variant="bodyMedium">Precio: {product.precio}</Text>
            <Text variant="bodyMedium">Descripción: {product.descripcion}</Text>
        </View>
    );
};
