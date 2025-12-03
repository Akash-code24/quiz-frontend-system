import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { quizzes as DUMMY } from "../data/quizzes";

export default function Home() {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("quizzes");
    const adminQuizzes = stored ? JSON.parse(stored) : [];

    // MERGE ADMIN + DUMMY
    // If admin quiz has same id, keep admin version
    const merged = [
      ...DUMMY.filter(d => !adminQuizzes.find(a => a.id === d.id)),
      ...adminQuizzes
    ];

    setQuizList(merged);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Available Quizzes</h1>

      {quizList.map((q) => (
        <Link key={q.id} to={`/quiz/${q.id}`}>
          <div className="p-4 border rounded hover:bg-gray-100 cursor-pointer">
            <h2 className="text-lg font-semibold">{q.title}</h2>
            <p className="text-sm text-gray-600">{q.questions.length} questions</p>
          </div>
        </Link>
      ))}

      <div className="mt-6">
        <Link to="/admin" className="text-blue-600 underline">
          Admin Login
        </Link>
      </div>
    </div>
  );
}