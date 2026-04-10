export default function GameOver(winner, onRestart, onExit) {
    return <section id="game-over">
        {winner && <h2>Você Ganhou!</h2>}
        {!winner && <h2>Você Perdeu!</h2>}

        {winner && <img src="forca_img_0.PNG"></img>}
        {!winner && <img src="forca_img_6.PNG"></img>}

        <div>
            <button onClick={() => onExit(true)}>Voltar Início</button>
            <button>Jogar Novamente</button>
        </div>
    </section>
}