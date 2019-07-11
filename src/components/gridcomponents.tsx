import * as React from 'react'
import styled from 'styled-components'
import { BLOCKSIZE, COLUMNS, ROWS } from '../config';
import { Block, Edge } from '../helpers/customtypes'
import { FeedbackState } from '../state-management/feedback'

// TODO: Add visual when edge goes through a node

// ---------------------------------------- [Mainpage] ----------------------------------------
export const HeadBanner = styled.header `
    background-color: #222;
    width: 100%;
    height: 90px;
    color: white;
`
export const Logo = styled.img`
    animation: App-logo-spin infinite 20s linear;
    height: 80px;
    @keyframes App-logo-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    position:absolute;
    top:5px;
`

export const ResetButton = styled.button`
    background-color: mediumaquamarine;
    width:400px;
    height: 25px;
    border-radius:10px;
    /* border:2px solid black; */
    margin:0 auto;
    cursor:pointer;
    text-shadow:1px;
`

export const TopContainer = styled.div`
    /* background-color: blueviolet; */
    box-sizing:border-box;
    width:100%;
    display:flex;
    height: 110px;
    padding-top:5px;
    flex-direction:column;
    justify-content:space-between;
`

interface ScoreBoxProps {
    round?: boolean
}

export const ScoreBox = styled.div`
    display:flex;
    box-sizing:border-box;
    margin:0 auto;
    width: ${COLUMNS*BLOCKSIZE}px;
    /* width:400px; */
    height:25px;
    background:hotpink;
    margin-bottom:${ (props: ScoreBoxProps) => props.round ? '10px' : '0'};
    align-items:center;
    justify-content:center;
    border-radius: ${ (props: ScoreBoxProps) => props.round ? '0 0 10px 10px' : '10px 10px 0 0'};

`

export const GameScoreContainer = styled.div`
    margin: 0 auto;
    height: inherit;
    width: 400px;
    background:red;
    display:flex;
    flex-direction:row;
`

interface GameScore {
    p2?: boolean
}

export const GameScoreBox = styled.div`
    display:flex;
    box-sizing:border-box;
    height:inherit;
    width: 200px;
    border-right:5px solid black;
    background: ${(props: GameScore) => props.p2 ? 'green' : 'blue'};
    justify-content:center;
    align-items:center;
`

// TODO: Change ErrorBox to feedback box: Green for positive, red for negative.
const FBox = styled.div`
    box-sizing:border-box;
    margin:0 auto;
    width:400px;
    height:35px;
    
    border-radius:4px;
    border:2px solid black;
    background: ${(props: {error?: boolean}) => props.error ? 'red' : 'green'};
    

    display:flex;
    justify-content: center;
    align-items:center;
    text-align:center;
`

export const FeedbackBox = (props: FeedbackState) => {
    if(props.feedbackMessage)
        return <FBox error= {props.error}> {props.feedbackMessage} </FBox>
    else 
        return <FBox style={{'visibility': 'hidden'}}/>
    }

export const GameArea = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:${ROWS*BLOCKSIZE}px;
`

// TODO: Rename
export const SideContainer = styled.div`
    width:${(1920 - COLUMNS*BLOCKSIZE) / 2}px;
    height: inherit;
    display:flex;
    justify-content: center;
    align-items:center;
`


// ---------------------------------------- [Grid parts] ----------------------------------------
export const EmptyBlock = styled.div`
    width:${BLOCKSIZE}px;
    height:inherit;
    margin: 0;
`

interface NodeProps {
    connected?: boolean
}

export const Node = styled.div `
    box-sizing: border-box;
    width:${BLOCKSIZE}px;
    height:${BLOCKSIZE}px;
    border-radius:${Math.floor(BLOCKSIZE/2)}px;
    background-color: ${(props:NodeProps = {connected: false}) => props.connected ? 'skyblue' : 'blue'};
    margin: 0;
    position:relative;
    z-index:100;
    &:hover {
        background-color:white;
    }
    border:4px double navy;
    box-shadow: 0 0 10px 3px black inset;
`

interface RowProps{
    blocks: Block[],
    rowIndex: number,
    connectedNodes?: number[]
}

const BaseRow = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:${BLOCKSIZE}px;
    padding:0;
    margin:0;
    &:nth-child(1) {
        margin-top:0;
    }
`

export const Row = (props: RowProps) => <BaseRow>
    { props.blocks.map( (block:Block, i:number) => block === "NODE" ? 
        <Node key={'block'+props.rowIndex+i+Math.random} connected={props.connectedNodes && props.connectedNodes.includes(i)}/> 
        : <EmptyBlock key={'block'+props.rowIndex+i+Math.random}/>
    )}
</BaseRow>

// ---------------------------------------- [Grid] ----------------------------------------
export const BaseGrid = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:${COLUMNS*BLOCKSIZE}px;
    padding:0;
    text-align:center;
    background-color: palegoldenrod;
    /* border:1px solid hotpink; */
    /* border-radius:3px; */
    border:1px solid black;
`

// ---------------------------------------- [Edge] ----------------------------------------
// TODO: Refactor Edge
export interface ElementProps {
    top: number,
    left: number,
    width: number,
    rotation: number,
    colour: [number, number, number],
    zIndex: number
}
interface EdgeProps extends ElementProps {
    dispatchClick: (edge:Edge) => void,
    dispatchHover: (points?: number) => void,
    colour: [number, number, number]
    edge: Edge
}

export const EdgeElement = styled.div.attrs<ElementProps>({
    style: (props: ElementProps) => ({
        backgroundColor: `rgb(${props.colour[0]} ${props.colour[1]} ${props.colour[2]})`,
        top: `${props.top}px`,
        left: `${props.left}px`,
        width:`${props.width}px`,

        transform: `rotate(${props.rotation}rad)`,
        zIndex: `${props.zIndex}`,
    })
})`
    box-sizing:border-box;
    position: absolute;
    height:${Math.floor(BLOCKSIZE/5)}px;
    transform-origin:0 0 0;

    &:hover {
        border:2px solid white;
    }
`

export const EdgeComponent = (props: EdgeProps) => {
    const handleClickEvent = (event: React.MouseEvent<HTMLElement>) => { 
        return props.dispatchClick(props.edge)
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        return props.dispatchHover(props.edge.points)
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        return props.dispatchHover()
    }

    return <EdgeElement top={props.top} left={props.left} width={props.width} 
        rotation={props.rotation} zIndex={props.zIndex} colour={props.colour} 
        onClick={handleClickEvent} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} > 
    </EdgeElement>
}