import { WaveState } from '../redux/slices/rootSlice';

let token = 'AIzaSyAKb3mx1_nsHe6mw2EqfKeoZ4O1quq_jME'




export const serverCalls = {
    get: async () => {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`https://ojodelmar-default-rtdb.firebaseio.com/${userId}/wave.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }

        return await response.json()
    },

    create: async(data: WaveState) => {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`https://ojodelmar-default-rtdb.firebaseio.com/${userId}/wave.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to create data on server'), response.status
        }

        return await response.json()
    },

    update: async(id:string, data:WaveState) => {
        const response = await fetch(`https://drone-stuff-rangers121.glitch.me/api/drones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to update data on server'), response.status
        }

        return await response.json()
    },

    delete: async(id:string) => {
        const response = await fetch(`https://drone-stuff-rangers121.glitch.me/api/drones/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to delete data'), response.status
        }
    }
}