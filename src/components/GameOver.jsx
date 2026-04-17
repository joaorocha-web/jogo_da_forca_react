import { playSound } from '../utils/sounds';
export default function GameOver({winner, word, onExit, onRestart}) {
    let winning = winner !== undefined;
    
    return <section id="game-over">
        {winning && 
            <div>
                <h2>Parabéns {winner.name}</h2>
                <p>Ninguém morreu!</p>
            </div>
        }

        {!winning && 
            <div>
                <h2>Você Perdeu!</h2>
                <p>A palavra era: {word.word}</p>
            </div>
        }

        {winning && <img src="images/forca_img_0.PNG"></img>}
        {!winning && <img src="images/forca_img_6.PNG" className="loser"></img>}

        <div className="buttons">
            <button onClick={() => {
                onExit();
                playSound('/sounds/botao-forca.mp3', 0.7);
            }}>Voltar Início</button>
            <button onClick={() => {
                onRestart();
                playSound('/sounds/botao-forca.mp3', 0.7);
            }}>Jogar Novamente</button>
        </div>
    </section>
}