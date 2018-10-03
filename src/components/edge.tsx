import * as React from 'react'
// import styled from 'styled-components'
// import Row from './row'
// import {Block, COLUMNS, EDGES} from '../config'
// import { updateBlock } from '../state-management/grid';
// import { connect } from 'react-redux';
// import { RootState } from '../state-management/combiner';
import { EdgeComponent } from './blockcomponents'
// import { edgeParameters } from '../helpers/edgemath';


interface EdgeProps extends StateProps, DispatchProps {
    top: number,
    left: number,
    width: number,
    rotation: number,
    zIndex: number,
    dispatch: (edge:[number, number, number]) => void,
   edge: [number, number, number]
}

interface StateProps {
} 

interface DispatchProps {
}

// const mapStateToProps = (state: RootState) => {
//     return {
//       grid: state.gridReducer.grid
//     }
//   }

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//       updateBlock: (block: Block, row: number, column: number) => dispatch(updateBlock(block, row, column))
//     }
// }

export default class Edge extends React.Component<EdgeProps,{}> {
    handleClickEvent = (event: React.MouseEvent<HTMLElement>) => {
        return this.props.dispatch(this.props.edge)
    }

    render(){
        let inlineStyle = {
            backgroundColor: `rgb(${Math.random()*255} ${Math.random()*255} ${Math.random()*255})`
        }

        return <EdgeComponent top={this.props.top} left={this.props.left} width={this.props.width} rotation={this.props.rotation} zIndex={this.props.zIndex} style={inlineStyle} onClick={this.handleClickEvent}/>
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Grid)