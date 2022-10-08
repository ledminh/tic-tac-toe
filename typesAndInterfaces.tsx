export type CellState = 'X' | 'O' | 'empty';
export type BoardState = [[CellState, CellState, CellState],
                            [CellState, CellState, CellState],
                            [CellState, CellState, CellState]];


export type ScorePanelType = 'X' | 'O' | 'TIES'; 

export type PlayerType = 'player1' | 'player2' | 'CPU';

export type GameType = 'vsCPU' | 'vsPlayer';

export type MarkType = 'X' | 'O';


// export interface LocalStorageData  {
//     vsCPU: {
//         turn: 'X' | 'O' | null,
//         X: 'player1' | 'CPU' | null,
//         O: 'player1' | 'CPU' | null,
//         gameOverStatus: 'X' | 'O' | 'ties' | null,
//         boardState: BoardState | null,
//         playerWins: number,
//         cpuWins: number,
//         ties: number,
//     },
//     vsPlayer: {
//         turn: 'X' | 'O' | null,
//         X: 'player1' | 'player2' | null,
//         O: 'player1' | 'player2' | null,
//         gameOverStatus: 'X' | 'O' | 'ties' | null,
//         boardState: BoardState| null,
//         player1Wins: number,
//         player2Wins: number,
//         ties: number,
//     }
// }

// export interface StateData {
//     type: GameType | null,
//     turn: 'X' | 'O' | null,
//     X: 'player1' | 'player2' | 'CPU' | null,
//     O: 'player1' | 'player2' | 'CPU' | null,
//     gameOverStatus: 'X' | 'O' | 'ties' | null,
//     boardState: BoardState | null,
//     player1Wins: number|null,
//     player2Wins: number|null,
//     cpuWins: number | null,
//     ties: number | null
// }

// export interface ActionType {
//     type: 'ACTION/LOAD_DATA',
//     payload: {
//         type: GameType,
//         X: 'player1' | 'player2' | 'CPU'
//     }
// }

