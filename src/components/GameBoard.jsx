import { useState, useRef } from 'react';
import { playSound } from '../utils/sounds';

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const triesLimit = 6;


export default function GameBoard({config, onFinishGame, word, onExit}) {
    const suspenseRef = useRef(undefined)
    const [correctLetters, setCorrectLetters] = useState([]);
    const [failLetters, setFailLetters] = useState([]);
    
    const guessedLetters = [...correctLetters, ...failLetters];
    const letters = [...word.word.toUpperCase()];
    const uniqueLetters = [...new Set(letters)];
  
    let drawnSrc = `images/forca_img_${failLetters.length}.PNG`;
    let languageSrc = `images/${config.language}.PNG`;

    function playSuspense(){
    if (!suspenseRef.current) {
        suspenseRef.current = new Audio('/sounds/suspense-forca.mp3');
        suspenseRef.current.volume = 0.5;
    }

    suspenseRef.current.currentTime = 0;
    suspenseRef.current.play().catch(() => {});
}

function stopSuspense() {
  if (suspenseRef.current) {
    suspenseRef.current.pause();
    suspenseRef.current.currentTime = 0;
  }
}

    function handleGuess(letter){
       
        if(letters.includes(letter)){
            const newCorrectLetters = [...correctLetters, letter];

            setCorrectLetters(newCorrectLetters);
            playSound('/sounds/botao-certo-forca.wav', 0.9);
            if(newCorrectLetters.length === uniqueLetters.length){
                onFinishGame(true);
                stopSuspense();
            }

        }else{
            
            const newFailLetters = [...failLetters, letter];

            setFailLetters(newFailLetters);
            playSound('/sounds/botao-errado-forca.mp3', 0.9);

            if(newFailLetters.length > triesLimit/2){
                playSuspense();
            }
            if(newFailLetters.length === triesLimit){
                onFinishGame();
                stopSuspense();
            }
        }
    }

    return <section id="game-board">
        <menu>
            <img src={languageSrc} alt="" />
            <button onClick={() => {
                    onExit();
                    playSound('/sounds/botao-forca.mp3', 0.5);
                }}><span>Sair </span><span className="material-symbols-outlined">door_open</span></button>
        </menu>
        <div id="drawn-block">
            <img src={drawnSrc} alt="" />
        </div>
        <div id="guess-block">
                <div id="failed-panel">
                    <p>TENTATIVAS</p>
                    <p className='attempts'>{failLetters.length}/{triesLimit}</p>
                </div>
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