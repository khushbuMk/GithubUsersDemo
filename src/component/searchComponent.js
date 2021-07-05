import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux';
import { getGitHubUserListInfo } from '../redux/Selector';

export const SearchComponent = (props) => {
    
    const { setSearchData, list, setIsSearching } = props

    const [search, setSearch] = useState()

    const searchFilter = (text) => {
        setSearch(text)
        setSearchData(list.filter((item)=>item.login.toLowerCase().includes(text.toLowerCase())))
        text ? setIsSearching(true) : setIsSearching(false)
    }

    return (
        <View style={styles.search}>
            <TextInput 
                placeholder={"Search_here"}
                onChangeText={text => searchFilter(text) }                    
                value={search}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        paddingHorizontal: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        height: hp(6),
        borderRadius: 12,
        marginTop: hp(4),
        marginBottom: hp(2),
        elevation: 4,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: 'white',
        alignSelf:'center'
    },
})