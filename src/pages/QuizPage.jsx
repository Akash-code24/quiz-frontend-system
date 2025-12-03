import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { quizzes } from "../data/quizzes";

export default function QuizPage() {
  const { id } = useParams();
  const quiz = quizzes.find(q => q.id === id);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  function submit() {
    let s = 0;

    quiz.questions.forEach(q => {
      if (q.type === "mcq" && Number(answers[q.id]) === q.answer) s++;
      if (q.type === "truefalse" && (answers[q.id] === "true") === q.answer) s++;
    });

    setScore(s);
  }

return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{quiz?.title}</h1>

        <div className="space-y-4 mt-4">
            {quiz?.questions.map((q, idx) => (
                <div key={q.id} className="border p-3 rounded">
                    <p>{idx + 1}. {q.prompt}</p>

                    {q.type === "mcq" &&
                        q.options.map((opt, i) => (
                            <label className="block" key={i}>
                                <input 
                                    type="radio" 
                                    name={q.id} 
                                    value={i}
                                    onChange={e => setAnswers({...answers, [q.id]: e.target.value})}
                                /> {opt}
                            </label>
                        ))
                    }

                    {q.type === "truefalse" && (
                        <>
                            <label className="block">
                                <input type="radio" name={q.id} value="true"
                                    onChange={e => setAnswers({...answers, [q.id]: e.target.value})} /> True
                            </label>

                            <label className="block">
                                <input type="radio" name={q.id} value="false"
                                    onChange={e => setAnswers({...answers, [q.id]: e.target.value})} /> False
                            </label>
                        </>
                    )}
                </div>
            ))}
        </div>

        <button onClick={submit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Submit
        </button>

        {score !== null && (
            <p className="mt-3 font-semibold">
                Score: {score} / {quiz?.questions.length}
            </p>
        )}
    </div>
);
}
