import React from 'react';
import '../app/app.css';

const Square = ({userClick, ClickData, symbol}) => {

   const cross = 'X';
   const zero = 'O';
   let renderElement;
   
    if (symbol === null || symbol === undefined) {

        renderElement = (

            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='square'>
            </div>
        )
    } else if (symbol === cross) {

        renderElement = (

            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='square'>    
                X
            </div>
        )
    } else if(symbol === zero) {

        renderElement = (

            <div 
                onClick={() => {
                    userClick(ClickData[0], ClickData[1])}}
                className='square'>
                 O 
            </div>
        )
    }
    return renderElement;
};

export default Square;