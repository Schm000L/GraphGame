import * as React from 'react'
import { EdgeComponent } from './blockcomponents'

interface EdgeProps {
    top: number,
    left: number,
    width: number,
    rotation: number,
    zIndex: number,
    dispatch: (edge:[number, number, number]) => void,
    colour: [number, number, number]
    edge: [number, number, number]
}

const Edge = (props: EdgeProps) => {
    const handleClickEvent = (event: React.MouseEvent<HTMLElement>) => { 
        return props.dispatch(props.edge)
    }
    return <EdgeComponent top={props.top} left={props.left} width={props.width} rotation={props.rotation} zIndex={props.zIndex} colour={props.colour} onClick={handleClickEvent}/>

}
export default Edge