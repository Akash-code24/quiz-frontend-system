import { useParams } from "react-router-dom";
import React,{ useEffect, useState } from "react";
import { quizzes as DUMMY } from "../data/quizzes";

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("quizzes");
    const adminQuizzes = stored ? JSON.parse(stored) : [];

    // Merge Dummy + Admin quizzes
    const allQuizzes = [
      ...DUMMY.filter(d => !adminQuizzes.find(a => a.id === d.id)),
      ...adminQuizzes
    ];

    // Find quiz by ID
    const foundQuiz = allQuizzes.find(q => q.id.toString() === id.toString());

    setQuiz(foundQuiz || null);
  }, [id]);

  if (!quiz) return <div className="p-4">❌ Quiz not found</div>;

  function submit() {
    let s = 0;

    quiz.questions.forEach((q) => {
      const given = answers[q.id];

      if (q.type === "mcq" && Number(given) === q.answer) s++;
      if (q.type === "truefalse" && (given === "true") === q.answer) s++;
      if (q.type === "text" && given?.trim().toLowerCase() === q.answer.trim().toLowerCase()) s++;
    });

    setScore(s);
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

      <div className="space-y-4">
        {quiz.questions.map((q, idx) => (
          <div key={idx} className="border p-4 rounded">
            <p className="font-medium">{idx + 1}. {q.prompt}</p>

            {/* MCQ */}
            {q.type === "mcq" &&
              q.options.map((opt, i) => (
                <label className="block mt-1" key={i}>
                  <input 
                    type="radio" 
                    name={q.id} 
                    value={i}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  />
                  <span className="ml-2">{opt}</span>
                </label>
              ))
            }

            {/* True/False */}
            {q.type === "truefalse" && (
              <>
                <label className="block mt-1">
                  <input 
                    type="radio" 
                    name={q.id} 
                    value="true"
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  />
                  <span className="ml-2">True</span>
                </label>

                <label className="block mt-1">
                  <input 
                    type="radio" 
                    name={q.id} 
                    value="false"
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  />
                  <span className="ml-2">False</span>
                </label>
              </>
            )}

            {/* Text answer */}
            {q.type === "text" && (
              <input
                className="border p-2 mt-2 w-full rounded"
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={submit}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {score !== null && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p className="font-semibold">
            Score: {score} / {quiz.questions.length}
          </p>
        </div>
      )}
    </div>
  );
}