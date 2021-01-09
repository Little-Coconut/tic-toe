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

      /* состояние которое отвечает за игроков
       К примеру у нас такая логика, что это состояние должо быть равным только 2 значениям 'X' и '0'
       'X' - то это игрок номер 1
       '0' - то это игрок номер 2
    */
    const [user, updateUser] = useState('X');
    
    /**
     * Обработка клика по ячейке, тобишь хода пользователя
     * Принимает 2 парамерта. Так как у нас абстакция на основе массива из 3 обьектов то мы имеем такое поведение
     * 
     * @param idx номер строки по которой кликнули - также это индекс массива 0, 1, или 2
     * 
     * @param prop порядковый номер ячеки - в действительности это свойство объекта
     */
    
    const userClick = (idx, prop) => {
        const newState = [...state]; // делаем копию текущего состояния 
        newState[idx][prop] = user; // обновляем в копии нужную ячкйку на основе текущего пользователя - поним что такое user =)  
        updateState(newState); // обновляем состояние ходов 
        console.log('userClick');
        winner(newState);
        // Важно это должно быть в конце - так как мы обновляем текущего пользователя - тобишь даем ход другому игроку.
         updateUser(user === 'X' ? 'O' : 'X');

    };
 
   
        // тут ты должна сама все понять и зделать - Это очень важно!
    const winner = (gameState) => {
        //функция на победителя
         const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 4, 8],
            [2, 4, 6],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
  
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];

          const winnerCombination = {};

          for(let staetIndex = 0; staetIndex < gameState.length; staetIndex++) {
              if (user === gameState[staetIndex][a]) {
                  winnerCombination[a] = true;
              } else if (user === gameState[staetIndex][b]) {
                  winnerCombination[b] = true;
              } else if (user === gameState[staetIndex][c]) {
                  winnerCombination[c] = true;
              }
          }
          if ( 
              winnerCombination[a] && 
              winnerCombination[b] && 
              winnerCombination[c] 
            ) { 
            console.log('winner '); 
          } 
      };
    }

     /**
     * Функция котороя помогает нам отрисовать все ячейки
     */

    const renderSquareItem = () => {
        const squareItems = []; // маассив который должен состоять из элеметов Square
        state.forEach((el, idx)=>{ // проходим по массиву ячеек - тобишь мы проходим по состоянию
            // помним что у нас каждый елемент массива это объект - поэтому мы используем функцию keys что-бы она нам вернула нам массив имен всех свойств данного объекта
            Object.keys(el).forEach(key => {  // проходимся по всем именам обьекта 
                squareItems.push( // пушим наш элемент в массив 
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
        <div className="globalBlock">
            <div className="mainBlock"> 
                {renderSquareItem()}
            </div>
            <div className="players">
                <p>Score </p>
                <p>Player 1: </p>
                <p>Player 2:  </p>
            </div>
        </div>
        
    )
};

export default App;
// функция на счетчик победиля 
// const totalWinner = (updateState, prop ) => {
//     if (winner(updateState) === 'X' ) return
//     if (winner(updateState) === '0' ) return

//     if (updateState[prop] === 'X') return
//     if (updateState[prop] === '0') return



//     if (current % 2 === 0) {
//         updateState[prop] = 'X'
//     } else {
//         updateState[prop] = '0'
//     } 
// } 