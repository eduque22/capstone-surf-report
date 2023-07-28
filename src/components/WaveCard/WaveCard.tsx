

import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useGetData } from '../../custom-hooks';
import { useEffect } from 'react';
import { Button } from '@mui/base';
import { CardContent, Typography, List, ListItem, ListItemButton, ListItemText, CardActions } from '@mui/material';
import React from 'react';


const NavA = styled(Link)({
    display: 'block',
    color: 'black',
    fontFamily: 'Roboto, arial, sans-serif',
    marginBottom: '20px'
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


export const WaveCard = () => {
    const myAuth = localStorage.getItem('myAuth')
    const userId:string = localStorage.getItem('userId')|| 'randomId'
    const { waveData, getData } = useGetData()
    useEffect(() => {
        console.log(waveData ? Object.values(waveData) : 'no data yet')
    }, [waveData])
    const cardTemplate = (data, idx) => {
    return (<React.Fragment key={idx}>
        <CardContent>

    
            <List>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText>
                {
                    data?.windDirection ? 
                    <>Wind Direction: {(data.windDirection)}°</> : <>Loading wind direction...</>
                }
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText>
                {
                    data?.windSpeed ? 
                    <>Wind Speed: {(data.windSpeed * 1.94).toFixed(2)} knots</> : <>Loading wind speed...</>
                }
                </ListItemText>
                </ListItemButton>
            </ListItem>
            
            </List>
        </CardContent>
    </React.Fragment>)
    }

    // const dataToShow = Object.values(waveData!)
    const makeCards = () => {
        if (waveData) {
            const waves = Object.values(waveData);
            const cardToShow = waves.map((wave, idx) => {
                return (<>{cardTemplate(wave, idx)}</>)
            })
            return cardToShow;
        } else {
            return (<>No wave data</>)
        }
    }

    return (
        <>
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
                         <>
                            <li>
                                <NavA to='/signin'>Sign In</NavA>
                            </li>
                            <li>
                                <NavA to='/signup'>Sign Up</NavA>
                            </li>
                        </>
                    }
                </LogoNavigation>
            </NavBarContainer>
            {myAuth === 'true' ? 
                        <>
                        Here are your waves: {makeCards()}
                        </>
                        :
                         <>
                            Please log in to view our waves!
                        </>
                    }
        </>
    )

}