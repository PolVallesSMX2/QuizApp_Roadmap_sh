// imports

function ResultsScreen ({ score, total, history, onRestart}) {

    return(
        <>
        <div className="container m-0 max-w-dvw max-h-dvh">
            <h1>Tu puntuacion: {score} de {total}</h1>
            <div>
                {history.map((q, index) => (
                    <div key={index}>
                        <p>{q.question}</p>
                        <p>{q.correct ? "Acertaste" : "Fallaste"}</p>
                        <p>{!q.correct ? `La repuesta correcta era: ${q.correctId}` : null}</p>
                    </div>
                ))}
            </div>
            <button onClick={onRestart} className="text-center font-bold align-center start-cta m-15 bg-orange-400 p-3 rounded-xl hover:bg-orange-400/80 hover:scale-105">
                Reiniciar Quiz
            </button>
        </div>
        </>
    )
}

export default ResultsScreen;