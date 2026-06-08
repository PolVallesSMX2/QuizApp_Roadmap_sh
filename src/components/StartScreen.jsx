// import

function StartScreen ({ onStart }) {

    return (
        <>
        <div className="container m-0 max-w-svw max-h-svh">
            <div className="hero">
                <h1 className="text-4xl font-bold text-center m-20">El gran desafio de <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Trivia Tech</span>!</h1>
                <p className="text-center text-xl">Cuestionario de opción múltiple para poner a prueba tus conocimientos.</p>
            </div>
            <div className="main flex flex-col items-center justify-center m-10">
                <h2 className="text-blue-600 text-3xl font-bold mb-4 underline decoration-3 decoration-orange-400 underline-offset-5">Las reglas del juego</h2>
                <ul className="text-center">
                    <li>Cada pregunta tiene un límite de <span className="font-bold">1 minuto</span>.</li>
                    <li>Si el tiempo se agota, se te restará 1 punto y pasarás a la siguiente pregunta.</li>
                    <li>Al seleccionar una opción, verás inmediatamente si es correcta (verde) o incorrecta (rojo).</li>
                    <li>¡Una vez que elijas una opción, no podrás cambiarla!</li>
                </ul>
                <button onClick={onStart} className="text-center font-bold align-center start-cta m-15 bg-orange-400 p-3 rounded-xl hover:bg-orange-400/80 hover:scale-105">
                    Comenzar Quiz
                </button>
            </div>
        </div>
        </>
    )

}

export default StartScreen