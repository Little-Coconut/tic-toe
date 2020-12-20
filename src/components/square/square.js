import React from 'react';

import './square.css'; 

const Square = ({userClick, ClickData, symbol}) => {

  

   const cross = '1';
   const zero = '0';
   let renderElement;




    if (symbol === null || symbol === undefined) {
        renderElement = (
            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='squareNull square'>
                    squareNull
            </div>
        )
    } else if (symbol===cross) {
        renderElement = (
            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='squareCross square'>    
                squareCross
            </div>
        )
    } else if(symbol === zero) {
        renderElement = (
            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='squareZero square'
            >
                squareZero
            </div>
        )
    }
    return renderElement;
};

export default Square;