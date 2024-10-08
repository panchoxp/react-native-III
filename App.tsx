import React from 'react'
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { MainNavigator } from './src/navigators/MainNavigator';



export const App = () => {
  return (
    <MainNavigator />
  )
}
export default App;
