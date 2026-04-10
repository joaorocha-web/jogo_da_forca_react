export default function GameConfig({onConfigOption, onClick}) {
    return <section id="game-config">
            
        <div className="config-options">
            <div className="welcome">
                <h2>Bem Vindo!</h2>
                <p>Vamos configurar a tua partida!</p>
            </div>
            <div className="options">
                <div className="option">
                    <label>Digite Seu Nome:</label>
                    <input type="text" onChange={event => onConfigOption('name', event.target.value)}/>
                </div>
                <div className="option" onChange={event => onConfigOption('language', event.target.value)}>
                    <label>Selecione o Idioma:</label>
                    <select>
                        <option value="pt">Português </option>
                        <option value="eng">Inglês </option>
                    </select>
                </div>
                <div className="option">
                    <label>Nível de dificuldade:</label>
                    <select onChange={event => onConfigOption('difficulty', event.target.value)}>
                        <option value="easy">fácil</option>
                        <option value="medium">Médio</option>
                        <option value="hard">Difícil</option>
                    </select>
                </div>
                <button onClick={onClick}>Jogar</button>
            </div>
        </div>
        <div className="avatar"></div>
    </section>  
}