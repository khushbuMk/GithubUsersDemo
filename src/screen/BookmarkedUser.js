import * as React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../redux/Action'
import { searchBar } from '../component/searchComponent';
import { getBookMarkUserListInfo } from '../redux/Selector';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ItemCard } from './../component/itemCard';
import { SearchComponent } from './../component/searchComponent';

function BookmarkedUser() {

    const { bookMarkedUser } = useSelector(state => ({
        bookMarkedUser: getBookMarkUserListInfo(state)
    }))

    const [searchData, setSearchData] = React.useState()

    React.useEffect(()=>{
        setSearchData(bookMarkedUser)
    },[bookMarkedUser])

    console.log("book",bookMarkedUser)

    const dispatch = useDispatch()

    const onSelectItem = (data) => {
        dispatch(UserActions.setBookmarkUserResponse(data))
    }

    const renderItem = ({item}) =>{

        // const selected = Object.keys(mapKeys(bookMarkedUser, 'id' )).includes(item.id)
        // console.log("selected",selected)

        const imageComponent = () => {
            return (
                <TouchableOpacity style={{width: 30, height: 30}} onPress={()=> onSelectItem(item)}>
                    <Image style={{width: 30, height: 30}}
                        source={require('../assets/images/bookmarkSet.png')} />
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

            <Text style={styles.text}>BookMarked Screen</Text>

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

export default BookmarkedUser