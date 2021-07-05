import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Users from '../screen/Users';
import BookmarkedUser from '../screen/BookmarkedUser';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getBookmarkedUsers } from '../storage/storage';
import { useDispatch } from 'react-redux';
import * as UserActions from '../redux/Action'

const Tab = createBottomTabNavigator()

export const  TabStackNavigator = ()  => {

    const dispatch = useDispatch();

    React.useEffect(()=>{
        async function getBookUsers() {
            const response = await getBookmarkedUsers();
            if(response) {
                dispatch(UserActions.setBookmarkedUsersFromStore(response))
            }
        }        
        getBookUsers()
    },[])

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
                        return <Image style={[styles.tabIcon, {tintColor:color}]} source={route.name === 'Users' ? require('../assets/images/userSet.png') : require('../assets/images/bookSet.png')} />
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
    tabIcon: {
        height: hp(4),
        width: hp(4),
        // marginBottom: hp(0.6)
    }
})

export default TabStackNavigator