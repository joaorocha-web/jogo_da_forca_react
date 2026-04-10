import { useState } from "react"
import { PORTUGUESE_WORDS_EASY, PORTUGUESE_WORDS_MEDIUM, PORTUGUESE_WORDS_HARD } from './Words';
import { ENGLISH_WORDS_EASY, ENGLISH_WORDS_MEDIUM, ENGLISH_WORDS_HARD} from './Words';

import GameBoard from "./components/GameBoard"
import GameConfig from "./components/GameConfig"
import GameOver from "./components/GameOver";

const WORDS = {
  PORTUGUESE: {
    EASY: PORTUGUESE_WORDS_EASY,
    MEDIUM: PORTUGUESE_WORDS_MEDIUM,
    HARD: PORTUGUESE_WORDS_HARD
  },
  ENGLISH: {
    EASY: ENGLISH_WORDS_EASY,
    MEDIUM: ENGLISH_WORDS_MEDIUM,
    HARD: ENGLISH_WORDS_HARD
  }
};

function getRandomWord({ language, difficulty }) {
  const idiom = language === 'pt' ? 'PORTUGUESE' : 'ENGLISH';

  let level = 'EASY';
  if (difficulty === 'medium') level = 'MEDIUM';
  if (difficulty === 'hard') level = 'HARD';

  const source = WORDS[idiom][level];

  const randomIndex = Math.floor(Math.random() * source.length);

  return source[randomIndex];
}

let winner;

function App() {
  const [gameConfig, setGameConfig] = useState({
    name: '',
    language: 'pt',
    difficulty: 'easy'
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const word = getRandomWord(gameConfig);
  

  function handleOnChange(option, value){
    setGameConfig(prev => {
      return {
        ...prev, [option]: value
      }
    })
  }

  function handleStartGame(restart = false){
    if(restart === true){
      setGameStarted(false);
    }
    console.log(restart);
    setGameStarted(true);
  }

  function handleFinishGame(isWinner = false) {
    setGameFinished(true);

    winner = isWinner ? {name:gameConfig.name} : undefined;
  }

  
  return <main>
      {!gameStarted && <GameConfig onConfigOption={handleOnChange} onClick={handleStartGame}/>}
      {(gameStarted && !gameFinished) &&<GameBoard  word={word} onFinishGame={handleFinishGame}/>}
      {gameFinished && <GameOver onExit={handleStartGame} winner={winner}/>}
  </main>
}

export default App
