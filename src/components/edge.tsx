import * as React from 'react'
import { EdgeElement} from './blockcomponents'
import { Edge } from '../config';

interface EdgeProps {
    top: number,
    left: number,
    width: number,
    rotation: number,
    zIndex: number,
    dispatch: (edge:Edge) => void,
    colour: [number, number, number]
    edge: Edge
}

const EdgeComponent = (props: EdgeProps) => {
    const handleClickEvent = (event: React.MouseEvent<HTMLElement>) => { 
        return props.dispatch(props.edge)
    }
    return <EdgeElement top={props.top} left={props.left} width={props.width} rotation={props.rotation} zIndex={props.zIndex} colour={props.colour} onClick={handleClickEvent}/>

}
export default EdgeComponent