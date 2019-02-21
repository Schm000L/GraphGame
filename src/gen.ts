class Graph {
    constructor(){}

    public runGraphGame():void {
        let n: number = Math.floor(Math.random() * 8) + 3;

        let p1Edges: number[][] = new Array;
        let p2Edges: number[][] = new Array;
        let p1Points: number = 0;
        let p2Points: number = 0;
        let p1sTurn: boolean = true;

        let nodes = this.createNodes(n);
        let edges = this.populateTree(n);
        console.log("eLen: " + edges.length);

        let i: number = 0;

        while(!this.complete(n, nodes, p1Edges, p2Edges)) {
            if(p1sTurn){
                console.log("P1: i: " + i + " e: " + edges[i]);
                p1Edges.push(edges[i])
                p1Points += edges[i][2];
                p1sTurn = false;
            } else {
                console.log("P2: i: " + i + " e: " + edges[i]);
                p2Edges.push(edges[i])
                p2Points += edges[i][2];
                p1sTurn = true;
            }
            i++;
        }

        console.log("Edges: " + edges);
        console.log("P1: " + p1Points + "| P2: " + p2Points);
        console.log("P1 Edges:");
        console.log(p1Edges);
        console.log("i: " + i);
    }


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

    private addTakenNodes(n:number, add:number, takenNodes:number[]): number[] {
        let alreadyExist: boolean = false;

        for(n of takenNodes) {
            if(add === n)
                alreadyExist = true;
        }

        if(!alreadyExist)
            takenNodes.push(add);
        
        return takenNodes;
    }

    private complete(n:number, nodes:number[], p1Edges:number[][], p2Edges:number[][]): boolean {
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
    }
}
