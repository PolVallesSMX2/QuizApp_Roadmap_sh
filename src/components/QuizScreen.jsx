import { useState, useEffect, useRef } from 'react';


function QuizScreen({ questions, onFinish }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(30)
    const [selectedAnswerId, setSelectedAnswerId] = useState(null)
    const [score, setScore] = useState(0)
    const [history, setHistory] = useState([])

    const currentQuestion = questions[currentIndex] // La pregunta actual es la que sea el  mismo  indice que el indice actual
    const timerRef = useRef(null)  // Para guardar la referencia del setInterval


    // Efecto para controlar el reloj de 60 segundos
    useEffect(() => {
        // Si el usuario ya respondió, detenemos el reloj temporalmente
        if (selectedAnswerId !==  null) return

        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current)
                    timerRef.current = null

                    handleTimeout()  // Funcion  para alertar y saltar de  pregunta que definiremos mas tarde
                    return 0
                }
                return prev -1
            })
        }, 1000) 

        // LIMPIEZA: Se ejecuta al cambiar de pregunta o desmontar el componente
        return () => clearInterval(timerRef.current)
    }, [currentIndex, selectedAnswerId])

    // Funcion timepo agotado
    const handleTimeout = () => {
        // Si timerRef ya es null, significa que esta función YA SE ESTÁ EJECUTANDO.
        // Así que salimos corriendo para no duplicar el alert.
        //if (timerRef.current === null) return;

        // Matamos el reloj inmediatamente para congelar todo
        clearInterval(timerRef.current);
        //timerRef.current = null;

        alert("¡Tiempo agotado! Se resta 1 punto")
        console.log("Tiempo agotado")

        const updatedHistory = [
            ...history,
            {
                question: currentQuestion.question,
                selected: null,
                correctId: currentQuestion.correctAnswerId,
                correct: false,
                skipped: true
            }
        ]

        setHistory(updatedHistory)
        setScore((prev) => prev - 1)

        nextQuestion(updatedHistory, score - 1)
    }

    // Clic a una respuesta
    const handleAnswerClick = (optionId) => {
        if (selectedAnswerId !== null) return; //Bloquea clics extra teoricamente MIRAR

        clearInterval(timerRef.current) // Detiene el reloj
        setSelectedAnswerId(optionId)

        const isCorrect = optionId === currentQuestion.correctAnswerId
        const newScore = isCorrect ? score + 1 : score
        setScore(newScore)

        const updatedHistory = [
            ...history,
            {
                question: currentQuestion.question,
                selected: optionId,
                correctId: currentQuestion.correctAnswerId,
                correct: isCorrect // No se puede poner true, a qui loq ue se hace es guardar correct con el valor de isCorrect que este es true o false.
            }
        ]
        setHistory(updatedHistory)

        // Pase automatico despues de responder o timeout
        setTimeout(() => {
            nextQuestion(updatedHistory, newScore)
        }, 1500) //Milisegundos de restraso = 1.5 segundos
    }

    // Definimos funcion nextQuestion usada par de veces antes
    const nextQuestion = (currentHistory, currentScore) => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1)
            setSelectedAnswerId(null)
            setTimeLeft(30) //reiniciamos el reloj
        } else {
            onFinish(currentScore, currentHistory)
        }
    }

    return (
        <>
        <div className='quiz-card'>
            <div className='quiz-header flex flex-col items-center justify-center gap-3 m-10'>
                <span className='text-4xl font-bold text-orange-400'>Pregunta: {currentIndex + 1} de {questions.length}</span>
                <span className={`timer ${timeLeft <= 15 ? 'danger' : ''} text-2xl font-semibold text-blue-600`}>Tiempo: {timeLeft}s</span> {/* Preguntar el porque aqui la funcion s epone dentro del classname?? */}
            </div>

            <h2 className='text-center text-xl font-bold mb-10'>{currentQuestion.question}</h2>

            <div className='options-container max-w-sm mx-auto flex flex-col justify-center gap-2'>
                {currentQuestion.options.map((option) => {
                    //  Logica para las clases de color
                    let buttonClass = ""
                    if (selectedAnswerId !== null) {
                        if (option.id === currentQuestion.correctAnswerId) {
                            buttonClass = "correct"  //Clase CSS para verde(correcto)
                        } else if (option.id === selectedAnswerId) { 
                            buttonClass = "incorrect"
                        }
                    }

                    return (
                        <button
                            key={option.id}
                            className={`option-btn ${buttonClass}`}
                            onClick={() => handleAnswerClick(option.id)}
                            disabled={selectedAnswerId !== null} //Bloqueamos/Deshabilkitamos el boton si en el valor sleectedAnswerId hay algo  osea  no es  null
                        >
                            {option.id.toUpperCase()}. {option.text}
                        </button>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default QuizScreen