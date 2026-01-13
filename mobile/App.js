import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import AddProduct from './AddProduct';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Ana Sayfa: İlanların Listelendiği Yer */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'EcoCampus İlanlar' }} 
        />
        
        {/* İlan Ekleme Sayfası */}
        <Stack.Screen 
          name="AddProduct" 
          component={AddProduct} 
          options={{ title: 'Yeni İlan Ver' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}