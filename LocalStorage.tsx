import { GameType, LocalStorageData } from "./typesAndInterfaces"





/*
    loadData is called when:
        -   Start game: {turn: null, X: null, O: null, gameOverStatus: null, boardState: null}
        -   Start a new game: {turn: null, X: null, O: null, gameOverStatus: null, boardState: null}
        -   Restart: {turn: null, X: null, O: null, gameOverStatus: null, boardState: null}
        -   In a middle of a game.
*/

export const loadData: (type:GameType) => LocalStorageData['vsCPU'] | LocalStorageData['vsPlayer'] | null = (type: GameType) => {
    const strData = localStorage.getItem('tictactoeData');
    
    if(strData === null) return null;

    return JSON.parse(strData)[type];
}
