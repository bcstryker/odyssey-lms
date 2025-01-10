import React, {useState, useEffect} from "react";
import Image from "next/image";
import {IQuestion} from "@/types";

const Quiz: React.FC<{questions: IQuestion[]}> = ({questions}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      setShuffledOptions(shuffleArray(currentQuestion.options));
    }
  }, [currentQuestion]);

  const shuffleArray = (array: string[]) => {
    return array.slice().sort(() => 0.5 - Math.random());
  };

  const handleOptionToggle = (option: string) => {
    setSelectedAnswers((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const isCorrect =
      selectedAnswers.length === currentQuestion.answer.length &&
      selectedAnswers.every((answer) => currentQuestion.answer.includes(answer));

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    setSelectedAnswers([]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const handleSkip = () => {
    setSelectedAnswers([]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizEnded(true);
    }
  };

  if (!currentQuestion) {
    return <p>Loading quiz...</p>;
  }

  if (quizEnded) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-2xl text-gray-500 font-bold mb-4">Quiz Completed!</h2>
        <p className="text-gray-400">
          You answered {correctAnswersCount} out of {questions.length} questions correctly.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-gray-500 mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      {currentQuestion.reference && (
        <div className="mb-4">
          {currentQuestion.reference.type === "image" && (
            <Image
              src={currentQuestion.reference.content}
              alt="Reference image"
              layout="responsive"
              width={700}
              height={475}
            />
          )}
          {currentQuestion.reference.type === "code" && (
            <pre className="bg-gray-200 text-gray-600 p-4 rounded">
              <code>{currentQuestion.reference.content}</code>
            </pre>
          )}
        </div>
      )}
      <p className="text-gray-500 mb-4">{currentQuestion.question}</p>

      <ul className="text-gray-500 mb-4">
        {shuffledOptions.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedAnswers.includes(option)}
                onChange={() => handleOptionToggle(option)}
                className="form-checkbox"
              />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4">
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
        <button onClick={handleSkip} className="px-4 py-2 bg-gray-500 text-white rounded">
          Skip
        </button>
      </div>

      <div className="text-gray-500 mt-4">
        <p>
          Score: {correctAnswersCount} / {currentQuestionIndex}
        </p>
      </div>
    </div>
  );
};

export default Quiz;
