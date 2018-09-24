import * as React from 'react'
import styled from 'styled-components'
import Grid from './grid';
import logo from '../logo.svg';
import {ROWS, COLUMNS, NODE_POSITIONS} from '../config'

const HeadBanner = styled.header `
    background-color: #222;
    width:100 %;
    height: 90px;
    margin-bottom:10px;
    color: white;
`
const Logo = styled.img`
    animation: App-logo-spin infinite 20s linear;
    height: 80px;
    @keyframes App-logo-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      position:absolute;
      top:5px;
`

const Header = () => {
    return (
        <HeadBanner>
            <Logo src={logo} alt="logo" />
        </HeadBanner>
    )
}

export default class MainPage extends React.Component<{}, {}> {


    
    render(){
        return(
            <>
                <Header/>
                <Grid rows={ROWS} columns={COLUMNS} nodePositions={NODE_POSITIONS}/>
            </>
        )
    }
}