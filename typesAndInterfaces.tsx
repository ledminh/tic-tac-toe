export type CellState = 'X' | 'O' | 'empty';


export interface LocalStorageData  {
    vsCPU: {
        cpuWins: number,
        playerWins: number,
        ties: number,
        currentBoardState: CellState[][] | null,
        turn: 'X' | 'O' | null,
        X: 'player1' | 'CPU',
        O: 'player1' | 'CPU'
    },
    vsPlayer: {
        player1Wins: number,
        player2Wins: number,
        ties: number,
        currentBoardState: CellState[][] | null,
        turn: 'X' | 'O' | null,
        X: 'player1' | 'CPU',
        O: 'player1' | 'CPU'
    }
}

export interface StateData {
    type: 'vsCPU' | 'vsPlayer' | null,
    turn: 'X' | 'O' | null,
    X: 'player1' | 'player2' | 'CPU' | null,
    O: 'player1' | 'player2' | 'CPU' | null,
    gameOverStatus: 'X' | 'O' | 'ties' | null,
    boardState: CellState[][] |null,
    player1Wins: number|null,
    player2Wins: number|null,
    cpuWins: number | null,
    ties: number | null
}