import questions from './data.json'
import { useState } from 'react'
import { Answer, Question } from './types'

function App() {
  const [question, setQuestion] = useState<number>(0)
  const [data, setData] = useState<Question[]>(shuffle(questions))
  const [wrongAnswer, setWrongAnswer] = useState<Answer[]>([])
  const [correctAnswer, setCorrectAnswer] = useState<Answer[]>([])
  
  const handleClick = (answer: string) => {
    if (checkQuestion(question)) return
    if (answer === data[question].correct_answer) {
      setCorrectAnswer(correctAnswer.concat({question, answer}))
    } else {
      setWrongAnswer(wrongAnswer.concat({question, answer}))
    }
  }

  const handleReset = () => {
    setQuestion(0)
    setWrongAnswer([])
    setCorrectAnswer([])
    setData(shuffle(questions).map((e: Question) => { 
      const shu = shuffle(e.options)
      return {...e, options: shu }
      }) as Question[])
  }

  const checkQuestion = (i: number) => wrongAnswer.some(e => e.question === i) || correctAnswer.some(e => e.question === i)

  function shuffle(array: any[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('/assets/bg.jpg')]">
      <main className="w-fit pb-10 pt-5 h-[65%] transition-all flex-col gap-3 xl:px-[5%] rounded-xl bg-[#343964] flex items-center justify-evenly">
        {wrongAnswer.length + correctAnswer.length === data.length 
          ? <div className='flex items-center gap-5 justify-start h-full flex-col'>
              <img className='w-full px-5 xl:p-0' src="/assets/congrats.svg" alt="" />
              <h2 className='text-2xl text-center w-[80%]'>Congrats! You completed the quiz.</h2>
              <p>You answer {correctAnswer.length}/10 correctly.</p>
              <button onClick={handleReset} className='w-[55%] mt-10 flex gap-3 justify-center items-center rounded-xl cursor-pointer bg-gradient-to-r from-[#E65895] to-[#BC6BE8] h-[60px] font-bold'>
                Play Again
              </button>
            </div>
          : <>
              <div className='w-full flex items-center flex-col gap-3'>
                <h1 className='text-[#8B8EAB] font-bold'>Country Quiz</h1>
                <div className='flex flex-wrap w-[70%] xl:min-w-[600px] gap-3 justify-center'>
                  {data.map((e, i) => 
                    <div onClick={() => setQuestion(i)} key={e.question} className={`h-10 w-10 cursor-pointer rounded-full ${question === i || checkQuestion(i) ? 'bg-gradient-to-r from-[#E65895] to-[#BC6BE8]' : 'bg-[#393F6E]'}  flex justify-center items-center text-sm font-bold`}>{i+1}</div>
                  )}
                </div>
              </div>
              <h2 className='w-[70%] xl:w-[55%] text-center h-[55px] text-xl'>{data[question].question}</h2>
              <div className='flex flex-wrap gap-5 justify-center h-fit w-full xl:w-[90%]'>
                {data[question].options.map((option) => 
                  <button onClick={() => handleClick(option)} className='w-[40%] flex gap-3 justify-center items-center rounded-xl bg-[#393F6E] cursor-pointer hover:bg-gradient-to-r from-[#E65895] to-[#BC6BE8] h-[60px] font-bold'>
                  <span className='text-center p-2 transition-all'>{option}</span>
                  {wrongAnswer.some(e => e.answer === option && e.question === question)
                    ? <img src='/assets/Close_round_fill.svg'></img>
                    : null}
                  {correctAnswer.some(e => e.answer === option && e.question === question)
                  || (wrongAnswer.some(e => e.question === question) && option === data[question].correct_answer)
                    ? <img src='/assets/Check_round_fill.svg'></img>
                    : null}
                </button>
                )}
              </div>
            </>}
      </main>
    </div>
  )
}

export default App
