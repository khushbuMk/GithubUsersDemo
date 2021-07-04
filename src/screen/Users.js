import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../redux/Action'
import { getBookMarkUserListInfo, getGitHubUserListInfo } from '../redux/Selector';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SearchComponent } from './../component/searchComponent';
import { ItemCard } from '../component/itemCard';
import mapKeys from 'lodash/mapKeys';

const Users = () => {

    const { gitHubUsers, bookMarkedUser } = useSelector(state => ({
        gitHubUsers: getGitHubUserListInfo(state),
        bookMarkedUser: getBookMarkUserListInfo(state)
    }))

    const [searchData, setSearchData] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        logFetch()
    },[])

    async function logFetch() {
        try {
            let response = await fetch('https://api.github.com/users');
            let json = await response.json()
            dispatch(UserActions.setUserResponse(json))
            setSearchData(json)
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }

    const onSelectItem = (data) => {
        dispatch(UserActions.setBookmarkUserResponse(data))
    }

    const renderItem = ({item}) =>{

        let selected;

        bookMarkedUser.map((bitem)=>{
            if(bitem.id===item.id) {
                selected = true
            }
        })

        // const selected = Object.keys(mapKeys(bookMarkedUser, 'id' )).includes(item.id)
        // console.log("selected", bookMarkedUser )

        const imageComponent = () => {
            return (
                <TouchableOpacity style={{width: 30, height: 30}} onPress={()=> onSelectItem(item)}>
                    <Image style={{width: 30, height: 30}}
                        source={ selected ? require('../assets/images/bookmarkSet.png') : require('../assets/images/bookmarkUnset.png') } />
                </TouchableOpacity>
            )
        }

        return(
            <ItemCard 
                item={item} 
                rightAssessory = {imageComponent()}
            />
        )
    }

    return (
        <View style={{ flex: 1}}>

            <Text style={styles.text}>User Screen</Text>

            <SearchComponent searchData={searchData} setSearchData={setSearchData} />

            <FlatList
                style={{paddingHorizontal:wp(5)}}
                renderItem = {renderItem}
                data = {searchData}
                keyExtractor = {(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text :{
        backgroundColor:'green',
        width:'100%',
        padding:10,
        textAlign:'center',
        color:'pink',
        fontWeight:'bold'
    }
})

export default Users