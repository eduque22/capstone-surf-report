
import { createSlice } from '@reduxjs/toolkit';



export interface WaveState {
    waveHeight: number;
    swellPeriod: number;
    swellDirection: number;
    windDirection: number;
    windSpeed: number;
}

// export interface LocationState {
//     lat: number;
//     lon: number;
// }


const initialState: WaveState = {
    waveHeight: 0,
    swellPeriod: 0,
    swellDirection: 0,
    windDirection: 0,
    windSpeed: 0
}

// const initialState: LocationState = {
//     lat: 0,
//     lon: 0
// }


const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        chooseWave: (state, action) => { state.waveHeight = action.payload },
        chooseSwellPer: (state, action) => { state.swellPeriod = action.payload },
        chooseSwellDir: (state, action) => { state.swellDirection = action.payload },
        chooseWindDir: (state, action) => { state.windDirection = action.payload },
        chooseWindSpeed: (state, action) => { state.windSpeed = action.payload }
    }
})

// const rootSlice = createSlice({
//     name: 'root',
//     initialState,
//     reducers: {
//         chooseLat: (state, action) => { state.lat = action.payload },
//         chooseLon: (state, action) => { state.lon = action.payload },
//     }
// })

export const reducer = rootSlice.reducer
console.log(rootSlice)

export const {
    chooseWave,
    chooseSwellPer,
    chooseSwellDir,
    chooseWindDir,
    chooseWindSpeed
} = rootSlice.actions


// export const {
//     chooseLat,
//     chooseLon
// } = rootSlice.actions