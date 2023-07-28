import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';
import { WaveState } from '../redux/slices/rootSlice';


export const useGetData = () => {
    const [waveData, setData] = useState<Record<string, Record<string, number>>>();

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {waveData, getData: handleDataFetch}
}