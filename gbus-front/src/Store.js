import { configureStore, createSlice } from '@reduxjs/toolkit'


let recentSearch = createSlice({
  name:'recentSearch',
  initialState: [],
  reducers: {
    addRS(state, action){
      state.push(action.payload)
    },
    removeRS(state, action){
      state.splice(action.payload,1)
    }
  }
})

export let {addRS, removeRS} =recentSearch.actions

let bookmark = createSlice({
  name: 'bookmark',
  initialState: [],
  reducers: {
    addBM(state, action){
      state.push(action.payload)
    },
    removeBM(state, action){
      state.splice(action.payload,1)
    }
  }
})

export let {addBM, removeBM} = bookmark.actions



export default configureStore({
  reducer: { 
    bookmark: bookmark.reducer,
    recentSearch: recentSearch.reducer,
  }
})


