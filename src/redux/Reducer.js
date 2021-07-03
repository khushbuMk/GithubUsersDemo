import createReducer from "./CreateReducer"


const initialState = {
    userList:[],
    bookmarkList: []
}

export const listReducer = createReducer(state = initialState, {
    // [types.LOGIN_RESPONSE](state, action) {
    //     const { data } = action
    //     return {
    //         ...state,
    //         userList:data
    //     }
    // },
})