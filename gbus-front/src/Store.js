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

let busData = createSlice({
  name: 'busData',
  initialState:[
    {
      id: 1,
      name: "1300",
      busStop: ["힐스테이트레이크송도2차(201동)", "힐스테이트레이크송도1차입구","송담초등학교","e편한세상정문","랜드마크시티센트럴더샵"],
      bm: false,
    },
    {
      id: 2,
      name: "1301",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bm:false,
    },
    {
      id: 3,
      name: "1302",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bm:false,
    },
    {
      id: 4,
      name: "1601",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bm:false,
    },
    {
      id: 5,
      name: "7700",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bm:false,
    },
    {
      id: 6,
      name: "9100",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bm:false,
    },
    {
      id: 7,
      name: "9200",
      busStop : ["ㄱ","ㄴ","ㄷ"],
      bm:false,
    },
  ],

  reducers:{
    setBM(state,action){
      state[action.payload].bm = !state[action.payload].bm
    }
  }
})

export let {setBM} = busData.actions;


export default configureStore({
  reducer: { 
    bookmark: bookmark.reducer,
    busData: busData.reducer,
    recentSearch: recentSearch.reducer,
  }
})


