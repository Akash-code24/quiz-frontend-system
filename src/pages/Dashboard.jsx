import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Load quizzes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quizzes");
    if (saved) setQuizzes(JSON.parse(saved));
  }, []);

  function saveToStorage(updated) {
    localStorage.setItem("quizzes", JSON.stringify(updated));
  }

  // Create a quiz
  function createQuiz() {
    if (!newQuizTitle.trim()) return alert("Enter quiz title");

    const newQuiz = {
      id: Date.now().toString(),
      title: newQuizTitle,
      questions: []
    };

    const updated = [...quizzes, newQuiz];
    setQuizzes(updated);
    saveToStorage(updated);
    setNewQuizTitle("");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Create Quiz Box */}
      <div className="p-4 rounded border shadow-sm bg-white mb-6">
        <h2 className="text-xl font-semibold mb-3">Create New Quiz</h2>

        <input
          className="border p-2 w-full rounded mb-3"
          placeholder="Quiz Title"
          value={newQuizTitle}
          onChange={(e) => setNewQuizTitle(e.target.value)}
        />

        <button
          onClick={createQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Quiz
        </button>
      </div>

      {/* Quiz List */}
      <h2 className="text-xl font-semibold mb-2">Your Quizzes</h2>

      {quizzes.map((quiz) => (
        <QuizItem
          key={quiz.id}
          quiz={quiz}
          quizzes={quizzes}
          setQuizzes={setQuizzes}
          saveToStorage={saveToStorage}
        />
      ))}

      {quizzes.length === 0 && (
        <p className="text-gray-600 mt-4">No quizzes created yet.</p>
      )}
    </div>
  );
}

// =============================
// CHILD COMPONENT: QUIZ ITEM
// =============================
function QuizItem({ quiz, quizzes, setQuizzes, saveToStorage }) {
  const [showForm, setShowForm] = useState(false);
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [type, setType] = useState("mcq");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  function addQuestion() {
    if (!questionPrompt.trim()) return alert("Enter question text");

    let newQ = {
      id: "q" + Date.now(),
      prompt: questionPrompt,
      type,
      answer: type === "mcq" ? Number(answer) : 
              type === "truefalse" ? (answer === "true") : answer,
      options: type === "mcq" ? options : []
    };

    const updated = quizzes.map((q) =>
      q.id === quiz.id ? { ...q, questions: [...q.questions, newQ] } : q
    );

    setQuizzes(updated);
    saveToStorage(updated);

    // Reset form
    setQuestionPrompt("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setShowForm(false);
  }

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{quiz.title}</h3>
      <p className="text-gray-600 text-sm">{quiz.questions.length} questions</p>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
      >
        {showForm ? "Close" : "Add Question"}
      </button>

      {/* Add Question Form */}
      {showForm && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h4 className="font-semibold mb-2">Add New Question</h4>

          <input
            className="border p-2 w-full rounded mb-3"
            placeholder="Question text"
            value={questionPrompt}
            onChange={(e) => setQuestionPrompt(e.target.value)}
          />

          <label className="font-medium block mb-1">Question Type:</label>
          <select
            className="border p-2 w-full rounded mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="mcq">MCQ</option>
            <option value="truefalse">True / False</option>
            <option value="text">Text Answer</option>
          </select>

          {/* MCQ Options */}
          {type === "mcq" && (
            <>
              {options.map((opt, i) => (
                <input
                  key={i}
                  className="border p-2 w-full rounded mb-2"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) =>
                    setOptions(options.map((o, idx) => (idx === i ? e.target.value : o)))
                  }
                />
              ))}

              <label className="font-medium block mb-1 mt-2">
                Correct Answer (0-3):
              </label>
              <input
                className="border p-2 w-full rounded"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </>
          )}

          {/* True False */}
          {type === "truefalse" && (
            <select
              className="border p-2 w-full rounded"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}

          {/* Text Answer */}
          {type === "text" && (
            <input
              className="border p-2 w-full rounded"
              placeholder="Correct answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          <button
            onClick={addQuestion}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Question
          </button>
        </div>
      )}
    </div>
  );
}
