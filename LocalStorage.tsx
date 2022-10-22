import { BoardState, GameType } from "./typesAndInterfaces";

interface LocalStorageDataFull {
    savedData: {
        isStarted: true,
        gameType: GameType,
        turn: 'X' | 'O',
        board: BoardState,
        numXWins: number,
        numTies: number,
        numOWins: number,
        XPlayer: 'player1' | 'player2' | 'CPU',
        OPlayer: 'player1' | 'player2' | 'CPU'
    }
}

interface LocalStorageDataEmpty {
    savedData: {
        isStarted: false
    }
}

type LocalStorageData = LocalStorageDataFull | LocalStorageDataEmpty;

export const load = () => {
    let strData = localStorage.getItem('tictactoeData');
    let data: LocalStorageData;

    if(strData === null) {
        data = {
            savedData: {
                isStarted: false
            }
        }
    }
    else {
        data = JSON.parse(strData);
    }

    return data;
}
