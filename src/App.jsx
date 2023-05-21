import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
decode("&lt; &gt; &quot; &apos; &amp; &#169; &#8710; &#039;");
import "./App.css";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizz, setQuizz] = useState([]);

  function saveSelectedOption(event) {
    const theSelectedOption = quizz.find(
      (el) => el.eachQuestionId === event.target.name
    );
    theSelectedOption.selectedAns = event.target.value;
  }

  function checkAnswers(){
    quizz.forEach((el)=>{
      // if(el.selectedAns !== el.answer) console.log('You gat it')
    })
    console.log(document.getElementsByClassName('option'))
    // const parent = document.getElementsByClassName('options')
  }

  // console.log(quizz)

  useEffect(() => {
    async function getQuiz() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();

      setQuizz(
        data.results.map((data) => {
          return {
            eachQuestionId: nanoid(),
            question: data.question,
            options: shuffleArray([
              ...data.incorrect_answers,
              data.correct_answer,
            ]),
            // options: [
            //   Object.assign({}, [
            //     shuffleArray([...data.incorrect_answers, data.correct_answer]),
            //   ]),
            // ],
            answer: data.correct_answer
          };
        })
      );
    }
    getQuiz();
  }, [startQuiz]);

  const quizArray = quizz.map((el) => {
    return (
      <QuizPage
        id={el.eachQuestionId}
        question={el.question}
        options={el.options}
        saveSelectedOption={saveSelectedOption}
        selected={el.isSelected}
      />
    );
  });

  // ///////////////
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <main>
      {!startQuiz && <HomePage setStartQuiz={setStartQuiz} id={nanoid()} />}
      {startQuiz && quizArray}
      {startQuiz && <button className="submit-btn" onClick={checkAnswers}>Check Answers</button>}
    </main>
  );
}

// URL => https://opentdb.com/api.php?amount=5

// Requirements:
// 2 screens. start and question
// Pull 5 questions from the OTDB API
// Tally correct answers after "check answers" is clicked
// style and polish UI

// Hints:
// Use library to decode html entities
// Create new array with all answers and randomly insert correct answer into array of incorrects
// Limit answer choice to 1, add an extra parameter in the object or use radio as btn

// Check answers btn fn:
// create a state for each question
// add an onchange on each input and save the selected to its state
// when you click the "check answers" btn, check the questions states value
// ...against the answers in the quizz state and apply styles and conditions for correct and wrong ones
