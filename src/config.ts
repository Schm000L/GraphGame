export const ROWS = 7
export const COLUMNS = 13
export const NODE_POSITIONS = [{row:2, column:0}, {row:2, column:2}, {row:4,column:2}, {row:0, column: 0}, {row: 6, column:6}, {row: 6, column:12}]

// Räta linjer direkt mellan noder är jobbigt.
// Kör designerade nodcolumner? Låt bågarna vara som "rör" som antingen är raka (nord-syd eller öst-väst) eller 90-gradiga.
// Alternativet är att göra allting absolut och köra typ 