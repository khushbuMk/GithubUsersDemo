import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Users from '../screen/Users';
import BookmarkedUser from '../screen/BookmarkedUser';

const Tab = createBottomTabNavigator()

function TabStackNavigator() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
            
                        if (route.name === 'Users') {
                            iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                        } else if (route.name === 'Bookmarked User') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }
            
                        // You can return any component that you like here!
                        return <View style={{height:32, width:32, backgroundColor:'red'}} ></View>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Users" component={Users} />
                <Tab.Screen name="Bookmarked User" component={BookmarkedUser} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    // tabIcon: {
    //     height: hp(2.3),
    //     width: hp(2.3),
    //     marginBottom: hp(0.6)
    // }
})

export default TabStackNavigator