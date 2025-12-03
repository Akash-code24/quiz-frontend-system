import React from 'react';
import { quizzes } from '../data/quizzes';

function Home() {
    return (
        <div className="p-4 space-y-4"> 
            <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
           <h2 className='text-xl font-bold'> Avaiable Quizes</h2>
          {quizzes.map(quiz => (
            <Link key={quiz.id} to={`/quiz/${quiz.id}`}>
                <div className="p-4 border rounded shadow hover:bg-gray-100">
            {quiz.title}
            /</div>
            </Link>
          ))}
          <Link to="/admin" className="text-blue-500 hover:underline">
            Go to Admin Page
            </Link>
            </div>
    );
}