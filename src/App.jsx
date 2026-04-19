import { useEffect, useRef, useState } from "react"
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

const GAME_STATUS = {
  CONFIG: 'config',
  STARTED: 'started',
  FINISHED: 'finished'
};

const GAME_SONGS = {
  DEFAULT: 'sounds/bg-forca.mp3',
  GAME_OVER: 'sounds/game-over-forca.mp3',
  GAME_VICTORY: 'sounds/vitoria-forca.mp3'
};

const defaultConfig = {
  name: 'João Victor',
  language: 'pt',
  difficulty: 'easy',
  sound: true
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

function App() {
  const audioRef = useRef();
  const [backgroundSong, setBackgroundSong] = useState(GAME_SONGS.DEFAULT)
  const [winner, setWinner] = useState();
  const [word, setWord] = useState();
  const [gameConfig, setGameConfig] = useState(defaultConfig);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.CONFIG);

  const isConfiguring = gameStatus === GAME_STATUS.CONFIG;
  const isStarted = gameStatus === GAME_STATUS.STARTED;
  const isFinished = gameStatus === GAME_STATUS.FINISHED;
  
  function handleOnChange(option, value){
    setGameConfig(prev => {
      return {
        ...prev, [option]: value
      }
    })
  }

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load(); 
  }, [backgroundSong]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (gameConfig.sound) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [gameConfig.sound, gameStatus]);

  useEffect(() => {
    if (gameConfig.language === 'eng') {
      document.documentElement.setAttribute('data-theme', 'american');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [gameConfig.language]);

  function handleStartGame(){
    setWord(getRandomWord(gameConfig));
    setWinner(undefined);
    setGameStatus(GAME_STATUS.STARTED);
    setBackgroundSong(GAME_SONGS.DEFAULT);
  }
  
  function handleFinishGame(isWinner = false) {
    setGameStatus(GAME_STATUS.FINISHED);
    setWinner(isWinner ? {name: gameConfig.name} : undefined);
    setBackgroundSong(isWinner ? GAME_SONGS.GAME_VICTORY : GAME_SONGS.GAME_OVER)
  }
  
 function handleExitGame(){
    setGameStatus(GAME_STATUS.CONFIG);
    setWord(undefined);
    setWinner(undefined);
    setBackgroundSong(GAME_SONGS.DEFAULT)
  }
  
  return <main>
      {isConfiguring && <GameConfig onConfigOption={handleOnChange} onClick={handleStartGame} config={gameConfig}/>}
      {isStarted &&<GameBoard config={gameConfig}  word={word} onFinishGame={handleFinishGame} onExit={handleExitGame}/>}
      {isFinished && <GameOver onExit={handleExitGame} onRestart={handleStartGame} winner={winner} word={word}/>}
      <audio ref={audioRef} loop>
        <source src={backgroundSong} type="audio/mpeg"/>
      </audio>
  </main>
}

export default App
