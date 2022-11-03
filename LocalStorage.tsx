import { BoardState, GameType } from "./typesAndInterfaces";

type stateDataType = {
    isStarted: true,
    gameType: GameType,
    turn: 'X' | 'O',
    board: BoardState,
    XPlayer: 'player1' | 'player2' | 'CPU',
    OPlayer: 'player1' | 'player2' | 'CPU',

} | {
    isStarted: false
};

type scoresType = {
    vsCPU: {
        numXWins: number,
        numTies: number,
        numOWins: number,
    },
    vsPlayer: {
        numXWins: number,
        numTies: number,
        numOWins: number,
    }
}

const initScore: scoresType = {
    vsCPU: {
        numXWins: 0,
        numTies: 0,
        numOWins: 0,
    },
    vsPlayer: {
        numXWins: 0,
        numTies: 0,
        numOWins: 0,
    }
}

interface LocalStorageData {
    stateData: stateDataType,
    scores: scoresType

}

const load = () => {
    let strData = localStorage.getItem('tictactoeData');

    if(strData === null) {
        return null;
    }
    else {
        return JSON.parse(strData) as LocalStorageData;
    }

}

/*********************************************************/

export const loadState = () => {
    const data = load();
    return data === null? null : data.stateData;
}

export const init = () => {
    const data:LocalStorageData = {
        stateData: {
            isStarted: false
        },
        scores: initScore
    };
    
    localStorage.setItem('tictactoeData', JSON.stringify(data));
}


export const updateStateData = (updateObj: {
    isStarted?: boolean,
    gameType?: GameType,
    turn?: 'X' | 'O',
    board?: BoardState,
    XPlayer?: 'player1' | 'player2' | 'CPU',
    OPlayer?: 'player1' | 'player2' | 'CPU',
}) => {

    const data = load() as LocalStorageData;

    const newStateData = {
        ...data.stateData,
        ...updateObj
    }

    localStorage.setItem('tictactoeData', JSON.stringify({
        ...data,
        stateData: newStateData
    }));


}

export const loadScores = (gameType: GameType) => {
    const data = load() as LocalStorageData;

    return data.scores[gameType];

}

export const updateScores = (gameType: GameType, scores: {
    numXWins: number,
    numTies: number,
    numOWins: number,
}) => {
    const data = load() as LocalStorageData;

    const newScores = {
        ...data.scores,
        [gameType]: scores
    }

    localStorage.setItem('tictactoeData', JSON.stringify({
        ...data,
        scores: newScores
    }));

} 