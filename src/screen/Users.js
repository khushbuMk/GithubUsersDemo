import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../redux/Action'
import { getBookMarkUserListInfo, getGitHubUserListInfo } from '../redux/Selector';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SearchComponent } from './../component/searchComponent';
import { ItemCard } from '../component/itemCard';

const Users = () => {

    const { gitHubUsers, bookMarkedUser } = useSelector(state => ({
        gitHubUsers: getGitHubUserListInfo(state),
        bookMarkedUser: getBookMarkUserListInfo(state)
    }))

    const [searchData, setSearchData] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [pageNo, setPageNo] = useState(0)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setSearchData(gitHubUsers)
    },[gitHubUsers])

    useEffect(() => {
        logFetch()
    },[pageNo])

    async function logFetch() {
        if(pageNo == 0) {            
            fetch('https://api.github.com/users?since=' + pageNo)
                .then(response => response.json())
                .then(responseJSON => {
                    dispatch(UserActions.setUserResponse(responseJSON))
                    setIsRefreshing(false)
                })
        } else if(pageNo > 0) {
            if(!onEndReachedCalledDuringMomentum){
                fetch('https://api.github.com/users?since=' + pageNo)
                    .then(response => response.json())
                    .then(responseJSON => {
                        dispatch(UserActions.setUserResponse([...searchData, ...responseJSON]))
                        setIsRefreshing(false)
                        setOnEndReachedCalledDuringMomentum(true)
                    })
            }
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

    function onRefresh(){
        setIsRefreshing(true)
        logFetch()
    }

    function onReachEnd(){ 
        if(!isSearching) {
            setPageNo( searchData[searchData.length-1].id )
            console.log("Reached end", searchData[searchData.length-1].id )
        }        
    }

    return (
        <View style={{ flex: 1}}>

            <Text style={styles.text}>User Screen</Text>

            <SearchComponent setSearchData={setSearchData} setIsSearching={setIsSearching} list={gitHubUsers} />

            <FlatList
                style={{paddingHorizontal:wp(5)}}
                renderItem = {renderItem}
                data = {searchData}
                keyExtractor = {(item, index) => index.toString()}
                refreshControl = {
                    <RefreshControl
                        style={styles.refreshIndicator}
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
                onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false) }
                onEndReached = {() => onReachEnd()}
                onEndReachedThreshold={0.5}
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