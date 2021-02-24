import React, {useState} from 'react';
import Square from '../square';

import './app.css'; 

const App = () => {

      /* наше состояние отвечающее за ходы игроков */
    const [state, updateState] = useState([
        {0: null, 1: null, 2: null}, 
        {3: null, 4: null, 5: null}, 
        {6: null, 7: null, 8: null} 
    ]);
     
    const [user, updateUser] = useState('X');
    const [countO, updateCountO] = useState(0);
    const [countX, updateCountX] = useState(0);
    const [counter, updateCounter] = useState(0);
   
    const [winnerIndex, updateWinnerIndex] = useState();  
    /**
     * Обработка клика по ячейке, тобишь хода пользователя
     * Принимает 2 параметра. Так как у нас абстакция на основе массива из 3 обьектов то мы имеем такое поведение
     * 
     * @param idx номер строки по которой кликнули - также это индекс массива 0, 1, или 2
     * 
     * @param prop порядковый номер ячеки - в действительности это свойство объекта
     */
    
    const oldArr = [
        {0: null, 1: null, 2: null}, 
        {3: null, 4: null, 5: null}, 
        {6: null, 7: null, 8: null} 
    ];
   
    const userClick = (idx, prop) => {
        const newState = [...state]; // делаем копию текущего состояния 
        newState[idx][prop] = user; // обновляем в копии нужную ячейку на основе текущего пользователя - поним что такое user =)  
        updateState(newState); // обновляем состояние ходов 
        winner(newState);
        // Важно это должно быть в конце - так как мы обновляем текущего пользователя - тобишь даем ход другому игроку.
        updateUser(user === 'X' ? 'O' : 'X');
        updateCounter(counter + 1);
        if(counter >= 8){
            setTimeout( () => {
            updateState(oldArr);
            updateCounter(0);
          },  2000); 
        } 
    };       

        // тут ты должна сама все понять и сделать - Это очень важно!
    const winner = (gameState) => {
        //функция на победителя
         let lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 4, 8],
            [2, 4, 6],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        const isWinner = () => {
            if (user === 'X'){
                updateCountX(countX + 1);
            } else {
                updateCountO(countO + 1);
            }
            return setTimeout( () => {
                 updateState(oldArr);
                 updateCounter(0);
                 updateWinnerIndex(undefined);
            }, 3000);
        };

        for ( let i = 0; i < lines.length; i++ ) {
            
          const [a, b, c] = lines[i];

          const winnerCombination = {};
        
              
          for (let staetIndex = 0; staetIndex < gameState.length; staetIndex++) {

              if (user === gameState[staetIndex][a]) {
                  winnerCombination[a] = true;
                } else if (user === gameState[staetIndex][b]) {
                  winnerCombination[b] = true;
                } else if (user === gameState[staetIndex][c]) {
                  winnerCombination[c] = true;
                }
               if (
                 gameState[staetIndex][a] === user &&
                 gameState[staetIndex][b] === user &&
                 gameState[staetIndex][c] === user){
                  isWinner();
                  updateWinnerIndex(i);
                }
                if ( 
                  winnerCombination[a] && 
                  winnerCombination[b] && 
                  winnerCombination[c] 
                   ) {
                        isWinner();
                        updateWinnerIndex(i);
                    }
                }
            }
        };
    
     /**
     * Функция котороя помогает нам отрисовать все ячейки
     */
    const renderSquareItem = () => {
        const squareItems = []; // массив который должен состоять из элеметов Square
        state.forEach( (el, idx) => { // проходим по массиву ячеек - тобишь мы проходим по состоянию
            // помним что у нас каждый елемент массива это объект - поэтому мы используем функцию keys что-бы она нам вернула нам массив имен всех свойств данного объекта
            Object.keys(el).forEach((key) => {  // проходимся по всем именам обьекта 
                squareItems.push( // пушим наш элемент в массив 
                    <Square
                        userClick={userClick}
                        ClickData={ [idx, key] }
                        symbol={ state[idx][key] }>
                    </Square>
                ) 
            })
        });
        return squareItems.map(square => square);
    }
const renderLine = () => {
    
    let lines = [];

    for (let i = 0; i < 8; i++) {
      const styleClass = winnerIndex === i ? "line visibility" : "line";
      lines.push(
        <div className={styleClass} 
        />);
      console.log(winnerIndex);
    }
    return lines;
  };
    return (
        <div className='globalBlock'>
            <div className="mainBlock ">
                    {renderLine()}
                    {renderSquareItem()}
            </div>
            <div className="players">
                <p>All Score </p>
                <p>Player 1:{countX} </p>
                <p>Player 2:{countO} </p>
                <button 
                className="newGame"
                onClick={  
                    () => updateState(oldArr)
                    }>
                    New Game
                </button>
            </div>
        </div>
        
    )
};

export default App;
