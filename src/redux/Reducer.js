import createReducer from "./CreateReducer"
import * as types from './ActionTypes';
import mapKeys from 'lodash/mapKeys'
import { storeBookmarkedUsers } from "../storage/storage";


const initialState = {
    userList:[],
    bookmarkList: []
}

export const listReducer = createReducer(state = initialState, {
    [types.GET_GITHUB_USERS_RESPONSE](state, action) {
        const { data } = action
        return {
            ...state,
            userList:data
        }
    },
    [types.SET_BOOKMARKED_USERS](state, action) {
        const { data } = action
        return {
            ...state,
            bookmarkList: JSON.parse(data)
        }
    },
    [types.BOOKMARK_USERS](state, action) {
        const { data } = action
        const oldData = mapKeys(state.bookmarkList, 'id' )        
        let join 

        if( Object.keys(oldData).includes(String(data.id)) ) {
            join = Object.values(oldData).filter((item)=> item.id !== data.id)
            console.log("Remove")
        } else {
            const newData = mapKeys([data], 'id' )
            join = {...newData, ...oldData}
            console.log("Add")
        }

        storeBookmarkedUsers(Object.values(join))

        return {
            ...state,
            bookmarkList : Object.values(join)
        }
    },
})