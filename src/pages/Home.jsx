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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">Quiz Management</h1>
            <p className="text-gray-600 mb-8">Select a quiz to get started</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {quizList.map((q) => (
                    <Link key={q.id} to={`/quiz/${q.id}`}>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-indigo-600">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{q.title}</h2>
                            <p className="text-sm text-gray-500">
                                <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                                    {q.questions.length} questions
                                </span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link to="/admin" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200">
                    Admin Login
                </Link>
            </div>
        </div>
    </div>
);
}