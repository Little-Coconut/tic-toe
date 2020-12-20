import React, {useState} from 'react';
import Square from '../square';

import './app.css'; 

const App = () => {

    const [state, updateState] = useState([
        {0: null, 1: null, 2: null},
        {3: null, 4: null, 5: null},
        {6: null, 7: null, 8: null}
    ]);

    const [user, updateUser] = useState('1');


    const userClick = (idx, prop) => {
        const newState = [...state];
        newState[idx][prop] = user;
        updateState(newState);
        updateUser(user === '1' ? '0' : '1');
        console.log('userClick');
    };
    
    const anybodyWinner = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 4, 8],
            [2, 4, 6],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];

    const renderSquareItem = () => {
        const squareItems = [];
        state.forEach((el, idx)=>{
            Object.keys(el).forEach(key => {
                squareItems.push(
                    <Square
                        userClick={userClick}
                        ClickData={[idx, key]}
                        symbol={state[idx][key]}>
                    </Square>
                )
            })
        });

        return squareItems.map(square => square);
    }

    return (
        <div className="mainBlock"> 
            {renderSquareItem()}
        </div>
    )
};

export default App;