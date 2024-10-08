import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';

import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';
import { HomeScreen } from '../screens/HomeScreen';


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName='Login' >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name='Registro' component={RegistroScreen} />
            <Stack.Screen name='Home' component={HomeScreen} />            
        </Stack.Navigator>
    )
}


export const MainNavigator = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}
