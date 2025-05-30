import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/home';
import User from '../pages/user';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false
      }}
      tabBar={pros=><CustomTabBar {...pros} />}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
      />
      <Tab.Screen 
        name="User"
        component={User} 
      />
    </Tab.Navigator>
  );
}