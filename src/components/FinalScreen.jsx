// imports

function FinalScreen ({ score, total, history, onRestart}) {

    return(
        <>
        <div className="container m-0 max-w-dvw max-h-dvh flex flex-col justify-center items-center gap-8 mt-20">
            <h1 className="text-4xl font-bold text-orange-400">Tu puntuacion: {score} de {total}</h1>
            <div>
                {history.map((q, index) => (
                    <div key={index} className={`flex flex-col gap-2 mt-5 p-5 rounded-xl border-2 ${q.correct ? 'border-green-500' : 'border-red-500'}`}>
                        <p className="font-bold text-lg">{q.question}</p>
                        <p className="text-white/40">{q.correct ? "Mostrando la respuesta correcta en caso de fallo..." : null}</p>
                        <p className="font-bold text-lg text-red-500/80">{!q.correct ? `La respuesta correcta era: ${q.correctId}` : null}</p>
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

export default FinalScreen;