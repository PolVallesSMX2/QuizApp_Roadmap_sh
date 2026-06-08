import { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
// import ResultsScreen from './components/ResultsScreen'
import FinalScreen from './components/FinalScreen'
import questionData from './components/questions'
function App() {
  
  const [screen, setScreen] = useState('START') // QUIZ y RESULTS
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  
  const startQuiz = () => {
    setScore(0)
    setUserAnswers([])
    setScreen('QUIZ')
  }

  const finishQuiz = (finalScore, history) => {
    setScore(finalScore)
    setUserAnswers(history)
    setScreen('RESULTS')
  }

  return (
    <>
      <div className='app-container'>
        {screen === 'START' && <StartScreen onStart={startQuiz} />}
        {screen === 'QUIZ' && <QuizScreen  questions={questionData} onFinish={finishQuiz} />}
        {screen === 'RESULTS' && <FinalScreen score={score} total={questionData.length} history={userAnswers} onRestart={startQuiz} />}
      </div>
    </>
  )
}

export default App
