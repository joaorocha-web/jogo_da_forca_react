import { useState } from 'react';

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const triesLimit = 5;

export default function GameBoard({onFinishGame, word}) {
    const [correctLetters, setCorrectLetters] = useState([]);
    const [failLetters, setFailLetters] = useState([]);
    const guessedLetters = [...correctLetters, ...failLetters];

    function handleGuess(letter){
       
        if(letters.includes(letter)){
            setCorrectLetters(prev => {
                return [
                    ...prev, letter
                ];
            });
        }else{
            setFailLetters(prev => {
                return [
                    ...prev, letter
                ]
            });
        }


        if(failLetters.length === triesLimit){
            onFinishGame();
        }

        if(correctLetters.length === letters.length){
            let isWinner = true;
            onFinishGame(isWinner);
        }

    }
  
    let letters = [...word.word.toUpperCase()];
    let src = `forca_img_${failLetters.length}.PNG`;

    return <section id="game-board">
        <div id="drawn-block">
            <img src={src} alt="" />
        </div>
        <div id="guess-block">
            <h2>Advinhe a Palavra:</h2>
            <p>Dica: {word.hint}</p>
            <div id='word-space'>
                {letters.map((letter, i) => <span className='letter-space' key={i}>{correctLetters.includes(letter) && letter}</span>)}
            </div>
            <div id='alphabet'>
                {alphabet.map((letter, i) => 
                    <button 
                    key={i} 
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter)}>{letter}
                    </button>)}
            </div>
        </div>
    
    </section>
}