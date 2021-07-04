import createReducer from "./CreateReducer"
import * as types from './ActionTypes';
import mapKeys from 'lodash/mapKeys'


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
    [types.BOOKMARK_USERS](state, action) {
        const { data } = action
        const oldData = mapKeys(state.bookmarkList, 'id' )
        const newData = mapKeys([data], 'id' )
        let join 

        if( Object.keys(oldData).includes(data.id) ) {
            join = Object.values(oldData).filter((item)=> item.id !== data.id)
        } else {
            join = {...newData, ...oldData}
        }

        console.log("Debugging joing", {...oldData, data})
    
        return {
            ...state,
            bookmarkList : Object.values(join)
        }
    },
})