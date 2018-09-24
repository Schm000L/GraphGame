export const ROWS = 6
export const COLUMNS = 6
export const NODE_POSITIONS = [{row:1, column:1}, {row:1, column:3}, {row:4,column:3}, {row:0, column: 0}]

// Räta linjer direkt mellan noder är jobbigt.
// Kör designerade nodcolumner? Låt bågarna vara som "rör" som antingen är raka (nord-syd eller öst-väst) eller 90-gradiga.
// Alternativet är att göra allting absolut och köra typ 