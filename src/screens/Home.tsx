/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Messages from '../tabs/message';
import Analytics from '../tabs/analytics';
import Summary from '../tabs/summary';
import Spam from '../tabs/spam';
import Settings from '../tabs/settings';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const HomePage = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle:{height:100},
                }}
            >
                <Tab.Screen
                    name="Messages"
                    component={Messages}
                    options={{
                        headerShown: false,
                        tabBarIcon: (tabInfo) => <Icon name={tabInfo.focused ? 'home' : 'home-outline'} size={30} color="black" />,
                        tabBarActiveTintColor:'blue',
                        tabBarLabelStyle:{fontSize:16, fontWeight:'800', marginBottom:10},
                    }}
                />
                <Tab.Screen
                    name="Analytics"
                    component={Analytics}
                    options={{
                        headerShown: false,
                        tabBarIcon: (tabInfo) => <Icon name={tabInfo.focused ? 'analytics' : 'analytics-outline'} size={30} color="black" />,
                        tabBarActiveTintColor:'blue',
                        tabBarLabelStyle:{fontSize:16, fontWeight:'800', marginBottom:10},
                    }}
                />
                <Tab.Screen
                    name="Summary"
                    component={Summary}
                    options={{
                        headerShown: false,
                        tabBarIcon: (tabInfo) => <Icon name={tabInfo.focused ? 'document' : 'document-outline'} size={30} color="black" />,
                        tabBarActiveTintColor:'blue',
                        tabBarLabelStyle:{fontSize:16, fontWeight:'800', marginBottom:10},
                    }}
                />
                <Tab.Screen
                    name="Spam"
                    component={Spam}
                    options={{
                        headerShown: false, tabBarIcon: (tabInfo) => <Icon name={tabInfo.focused ? 'bug' : 'bug-outline'} size={30} color="black" />,
                        tabBarActiveTintColor:'blue',
                        tabBarLabelStyle:{fontSize:16, fontWeight:'800', marginBottom:10},
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerShown: false, tabBarIcon: (tabInfo) => <Icon name={tabInfo.focused ? 'settings' : 'settings-outline'} size={30} color="black" />,
                        tabBarActiveTintColor:'blue',
                        tabBarLabelStyle:{fontSize:16, fontWeight:'800', marginBottom:10},
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default HomePage;
