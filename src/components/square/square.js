import React from 'react';

import './square.css'; 

const Square = ({userClick, ClickData, symbol}) => {

  

   const cross = 'X';
   const zero = 'O';
   let renderElement;




    if (symbol === null || symbol === undefined) {
        renderElement = (
            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='squareNull square'>
              
            </div>
        )
    } else if (symbol===cross) {
        renderElement = (
            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='squareCross square'>    
                X
            </div>
        )
    } else if(symbol === zero) {
        renderElement = (
            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='squareZero square'>
                 O 
            </div>
        )
    }
    return renderElement;
};

export default Square;