import { configureStore, createSlice } from '@reduxjs/toolkit'



let busNumRS = createSlice({
  name:'busNumRS',
  initialState: [],
  reducers: {
    addBusNumRS(state, action){
      state.push(action.payload)
    },
    removeBusNumRS(state, action){
      state.splice(action.payload,1)
    },
    consoleLog(state){
      console.log(state)
    },
    returnBusNumRS(state){
      return(state)
    }
  }
})


export let {addBusNumRS, removeBusNumRS, consoleLog, returnBusNumRS} = busNumRS.actions

let busStationRS= createSlice({
  name: 'busStationRS',
  initialState: [],
  reducers: {
    addBusStationRS(state, action){
      state.push(action.payload)
    },
    removeBusStationRS(state, action){
      state.splice(action.payload,1)
    },
    consoleLogSt(state){
      console.log(state)
    }
  }
})

export let {addBusStationRS, removeBusStationRS, consoleLogSt} =busStationRS.actions

let bookmark = createSlice({
  name: 'bookmark',
  initialState:[{}],
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
    busNumRS: busNumRS.reducer,
    busStationRS: busStationRS.reducer,
  }
})


