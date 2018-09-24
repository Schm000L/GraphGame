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
    n: number = Math.floor(Math.random() * 8) + 3;
    i: number = 0;
    p1Edges: number[][] = new Array;
    p2Edges: number[][] = new Array;
    p1Points: number = 0;
    p2Points: number = 0;
    p1sTurn: boolean = true;

    nodes = this.createNodes(this.n);
    edges = this.populateTree(this.n);
    //console.log("eLen: " + edges.length);

    private createNodes(n:number):number[] {
        let nodes: number[]=[];
        for(let i:number=0; i<n; i++) {
            nodes.push(i);
        }
        return nodes;
    }

    // TODO: Skriv roligare generering av träd (ej kompletta träd.)
    private populateTree(n:number) {
        let edges: number[][]=new Array();
        for(let i: number=0; i<n;i++) {
            for(let j:number=0;j<n;j++) {
                if(i<j) {
                    let edge: [number, number, number] = [i, j, Math.floor(Math.random()*6)+1];
                    edges.push(edge);
                }
            }
        }
        return edges;
    }

    /*private addTakenNodes(n:number, add:number, takenNodes:number[]): number[] {
        let alreadyExist: boolean = false;

        for(n of takenNodes) {
            if(add === n)
                alreadyExist = true;
        }

        if(!alreadyExist)
            takenNodes.push(add);
        
        return takenNodes;
    }*/

    /*private complete(n:number, nodes:number[], p1Edges:number[][], p2Edges:number[][]): boolean {
        let returnValue: boolean = true;
        let takenNodes:  number[] = new Array();
        let takenEdges: number[][] = p1Edges.concat(p2Edges);
        //console.log("Taken: " + takenEdges);
        for(let edge of takenEdges) {
            takenNodes = this.addTakenNodes(n, edge[0], takenNodes);//borde vara överflödig
            takenNodes = this.addTakenNodes(n, edge[1], takenNodes);
        }

        console.log("takenNodes length: " + takenNodes.length);
        for(n of nodes) {
            if(takenNodes.indexOf(n) === -1) {
                //console.log(n + "was still free!");
                returnValue = false;
            }
        }
        //console.log("Complete returned: " + returnValue);
        return returnValue;
    }*/
    
    render(){
        return(
            <>
                <Header/>
                <Grid rows={ROWS} columns={COLUMNS} nodePositions={NODE_POSITIONS}/>
            </>
        )
    }
}