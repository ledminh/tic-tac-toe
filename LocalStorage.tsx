import { GameType, LocalStorageData } from "./typesAndInterfaces"





/*
    loadData is called when:
        -   At the beginning, right after user press NewGameButton on StartScreen 
        -   After user press NewGameButton after finish a game
        -   After user press NewGameButton after press Restart button
        -   After user open the app again and it is in a middle of the game when the user leave.
*/

export const loadData: (type:GameType) => LocalStorageData['vsCPU'] | LocalStorageData['vsPlayer']= (type: GameType) => {

     
    return {
        turn: null,
        X: null,
        O: null,
        gameOverStatus: null,
        boardState: null,
        player1Wins: 0,
        player2Wins: 0,
        ties: 0,
    }
}
