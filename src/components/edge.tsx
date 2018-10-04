import * as React from 'react'
import { EdgeComponent } from './blockcomponents'

interface EdgeProps {
    top: number,
    left: number,
    width: number,
    rotation: number,
    zIndex: number,
    dispatch: (edge:[number, number, number]) => void,
    edge: [number, number, number]
}

const Edge = (props: EdgeProps) => {
    const handleClickEvent = (event: React.MouseEvent<HTMLElement>) => { 
        return props.dispatch(props.edge)
    }
    return <EdgeComponent top={props.top} left={props.left} width={props.width} rotation={props.rotation} zIndex={props.zIndex} onClick={handleClickEvent}/>

}
export default Edge

// export default class Edge extends React.Component<EdgeProps,{}> {
//     handleClickEvent = (event: React.MouseEvent<HTMLElement>) => {
//         return this.props.dispatch(this.props.edge)
//     }

//     render(){
//         return <EdgeComponent top={this.props.top} left={this.props.left} width={this.props.width} rotation={this.props.rotation} zIndex={this.props.zIndex} onClick={this.handleClickEvent}/>
//     }
// }