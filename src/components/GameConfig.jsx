import { playSound } from "../utils/sounds";

export default function GameConfig({config, onConfigOption, onClick}) {
    return <section id="game-config">
            
        <div className="config-options">
            <div className="welcome">
                <h2>Bem Vindo!</h2>
                <p>Vamos configurar a tua partida!</p>
            </div>
            <div className="options">
                <div className="option">
                    <label>Digite Seu Nome:</label>
                    <input type="text" value={config.name} onChange={event => onConfigOption('name', event.target.value)}/>
                </div>
                <div className="option" onChange={event => onConfigOption('language', event.target.value)}>
                    <label>Selecione o Idioma:</label>
                    <select>
                        <option value="pt" selected={config.language === 'pt'}>Português </option>
                        <option value="eng" selected={config.language === 'eng'}>Inglês </option>
                    </select>
                </div>
                <div className="option">
                    <label>Nível de dificuldade:</label>
                    <select onChange={event => onConfigOption('difficulty', event.target.value)}>
                        <option value="easy">Fácil</option>
                        <option value="medium">Médio</option>
                        <option value="hard">Difícil</option>
                    </select>
                </div>
                <div className="option">
                    <label>Música de fundo:</label>
                    <select onChange={event => onConfigOption('sound', event.target.value === 'true')}>
                        <option value={true}>Ligado</option>
                        <option value={false}>Desligado</option>
                    </select>
                </div>
                <button onClick={() => {
                    onClick();
                    playSound('/sounds/botao-forca.mp3', 0.7);
                }}>Jogar</button>
            </div>
        </div>
        <div className="avatar" onMouseEnter={() => playSound('sounds/surpresa-efeito-forca.mp3', 0.7)}></div>
    </section>  
}