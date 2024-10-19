/* eslint-disable react/react-in-jsx-scope */
import OnBoardingScreen from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Onboard" 
          component={OnBoardingScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Homepage"
          component={HomePage}
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

