import React  from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const ItemCard = (props) =>{

    const {item, rightAssessory,  } = props

    return(
        <View style={{marginVertical:hp(2),flexDirection:'row',alignItems:'center'}}>
            <Image 
                style={{width: 60, height: 60, borderRadius: 60/ 2}} 
                source={{
                    uri:item.avatar_url
                }}
            />
            
            <Text style={{marginLeft:hp(2),color:'green',fontWeight:'bold', flex:0.8}}>
                {item.login}
            </Text>
            
            {rightAssessory}

        </View> 
    )
}