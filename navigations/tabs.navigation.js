import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ioiconss from "react-native-vector-icons/Ionicons";
import Details from "../app/screens/details";
import Home from "../app/screens/home";
export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconaName;

          if (route.name == "Home") {
            iconaName = focused ? "home" : "home-outline";
          } else if (route.name == "Details") {
            iconaName = focused ? "settings" : "settings-outline";
          }
          return <Ioiconss name={iconaName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        component={Home}
        name="Home"
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarBadge: 6 }}
        component={Details}
        name="Details"
      />
    </Tab.Navigator>
  );
}
