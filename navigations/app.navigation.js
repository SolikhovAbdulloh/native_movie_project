import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detailed from "../app/screens/details";
import Home from "../app/screens/home";
export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Detailed"
        component={Detailed}
      />
    </Stack.Navigator>
  );
}

/* bu asosiy faylimiz yani navigatsiyalar aynan shu faylda amalga
 oshiriladi componentlar o'rtasida */
