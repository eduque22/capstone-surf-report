import React from 'react';
import { styled } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useDispatch, useStore } from 'react-redux';
import {
    chooseSwellDir,
    chooseSwellPer,
    chooseWave,
    chooseWindDir,
    chooseWindSpeed,
    WaveState
} from '../../redux/slices/rootSlice';
import { serverCalls } from '../../api';



import wave_img from '../../assets/image/wave.jpg';
import { auto } from '@popperjs/core';



interface Props {
    title: string;
}

const Root = styled('div')({
    padding: 0,
    margin: 0
})

const NavBarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const Logo = styled('h1')({
    margin: '0 0 0 0.45em'
})

const LogoA = styled(Link)({
    color: 'rgb(28,24,22)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
})

const LogoNavigation = styled('ul')({
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'black'
})

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .7)), url(${wave_img});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute'
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})





type waveData = {
    time: string;
    windDirection: Record<string, number>
    windSpeed: Record<string, number>
    waveHeight: Record<string, number>
    swellPeriod: Record<string, number>
    swellDirection: Record<string, number>

}

type JSONResponse = {
    hours: waveData[]
    meta: Record<string, number|string|string[]>
}

async function fetchData(lat:number, lon:number):Promise<JSONResponse> {
    const params = 'windDirection,windSpeed,waveHeight,swellPeriod,swellDirection';

    const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=${params}`, {
    headers: {
        'Authorization': 'fea823f2-29d8-11ee-86b2-0242ac130002-fea8246a-29d8-11ee-86b2-0242ac130002'
  }
    })
    const data = await response.json()
    console.log('Data in fetch:', data)
    return data
    // .then((response) => response.json()).then((jsonData) => {
    //     console.log(jsonData)
    //     data = jsonData
    //     return jsonData
    // }); 
}


export const Home = (props:Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const store = useStore();
    const myAuth = localStorage.getItem('myAuth')
    console.log('myAuth:', myAuth)

    const [lat, setLat] = useState(38.4388)
    const [lon, setLon] = useState(120.0761)

    const [ data, setData ] = useState<waveData|null>(null)

    async function handleClick (event):Promise<void> {
        const apiCall = await fetchData(lat, lon)
        const hourEnteredData = apiCall.hours[0]
        dispatch(chooseSwellDir(hourEnteredData?.swellDirection?.sg))
        dispatch(chooseSwellPer(hourEnteredData?.swellPeriod?.sg))
        dispatch(chooseWave(hourEnteredData?.waveHeight?.sg))

        dispatch(chooseWindDir(hourEnteredData?.windDirection?.sg))
        dispatch(chooseWindSpeed(hourEnteredData?.windSpeed?.sg))
        console.log('store data', store.getState())
        setData(hourEnteredData)
        // await serverCalls.create(store.getState() as WaveState)
        console.log('Data in handleClick:', data)
    }


    async function saveData () {
        await serverCalls.create(store.getState() as WaveState)
        navigate('/wavecard')
    }





    const cardTemplate =   
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Today's Surf Report
            </Typography>

    
            <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemText>
                    Time: {data?.time ? data.time : 'Loading time...'}
                </ListItemText>
                
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText>
                {
                    data?.waveHeight ? 
                    <>Wave Height: {(data.waveHeight.sg * 3.28).toFixed(2)}ft</> : <>Loading wave height...</>
                }
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText>
                {
                    data?.windDirection ? 
                    <>Wind Direction: {(data.windDirection.sg)}°</> : <>Loading wind direction...</>
                }
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText>
                {
                    data?.windSpeed ? 
                    <>Wind Speed: {(data.windSpeed.sg * 1.94).toFixed(2)} knots</> : <>Loading wind speed...</>
                }
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText>
                {
                    data?.swellDirection ? 
                    <>Swell Direction: {(data.swellDirection.sg)}° </> : <>Loading swell direction...</>
                }
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText>
                {
                    data?.swellPeriod? 
                    <>Swell Period: {(data.swellPeriod.sg)} seconds between swell waves </> : <>Loading swell period...</>
                }
                </ListItemText>
                </ListItemButton>
            </ListItem>
            </List>
        </CardContent>
        {myAuth === 'true' ? <><CardActions>
            <Button color='success' onClick={saveData} size="small">Save</Button>
        </CardActions></> : null}
    </React.Fragment>

    return (
        <Root>
            <NavBarContainer>
                <Logo>
                    <LogoA to='/'>Ojo Del Mar</LogoA>
                </Logo>
                <LogoNavigation>
                    <li>
                        <NavA to='/'>Home</NavA>
                    </li>
                    {myAuth === 'true' ? 
                        <>
                        <li>
                        <NavA to='/wavecard'>Wave Card</NavA>
                       </li>
                       <li>
                            <NavA to='/signin'>Sign Out</NavA>
                        </li></>
                        :
                         <><li>
                         <NavA to='/signin'>Sign In</NavA>
                        </li><li>
                             <NavA to='/signup'>Sign Up</NavA>
                         </li></>
                    }
                </LogoNavigation>
            </NavBarContainer>
            <Main>
                <MainText>
                        <p>Please Enter Your Location(eg. Latitude, Longitude)</p>

                        <TextField value={lat} onChange={(event) => {setLat(event.target.value)}} id="outlined-basic" label="Latitude" variant="outlined" />
                        <TextField value={lon} onChange={(event) => {setLon(event.target.value)}} id="outlined-basic" label="Longitude" variant="outlined" />

                        <Button onClick={handleClick}>Check The Waves</Button>
                        <Box sx={{ maxWidth: 275,
                                marginTop: 10,
                                marginLeft: 'auto',
                                marginRight: 'auto' }}>
                            <Card>{data ? cardTemplate : null}</Card>
                        </Box>
                        {/* {
                    data ? 
                    <Card variant="outlined">Card</Card> : <></>
                } */}

                </MainText>
            </Main>
        </Root>
        
    )
}


