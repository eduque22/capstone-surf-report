
import { Button } from '@mui/material'
import { useDispatch, useStore } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    chooseLat,
    chooseLon
} from '../../redux/slices/rootSlice';
import { LocationState } from '../../redux/slices/rootSlice';


import { Input } from '../sharedComponents/Input';



export const WaveForm = () => {
    const dispatch = useDispatch()
    const store = useStore();
    const { register, handleSubmit } = useForm<LocationState>({})
    const onSubmit:SubmitHandler<LocationState> = async(data, event) => {
        if (event) event?.preventDefault();

        dispatch(chooseLat(data.lat))
        dispatch(chooseLon(data.lon))
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='latitude'>Latitude</label>
                    <Input {...register('lat')} name='latitude' placeholder='Latitude' />
                </div>
                <div>
                    <label htmlFor='longitude'>Longitude</label>
                    <Input {...register('lon')} name='longitude' placeholder='Longitude' />
                </div>
      
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}