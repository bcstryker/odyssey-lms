import React, {useState} from "react";
import {IFlashCard} from "@/types";

interface FlashCardsProps {
  flashcards: IFlashCard[];
}

const FlashCards: React.FC<FlashCardsProps> = ({flashcards}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
  };

  if (!flashcards || flashcards.length === 0) {
    return <p>No flashcards available for this section.</p>;
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      {/* Flashcard */}
      <div
        className={`relative w-4/5 max-w-lg h-3/5 bg-white shadow-lg rounded-lg transform transition-transform duration-1000 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          perspective: "1000px",
        }}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-center p-4 backface-hidden ${
            isFlipped ? "hidden" : "block"
          }`}
        >
          <p className="text-2xl font-semibold">{currentCard.front}</p>
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-center p-4 bg-gray-100 backface-hidden ${
            isFlipped ? "block" : "hidden"
          }`}
        >
          <p className="text-2xl">{currentCard.back}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex mt-6 space-x-4">
        <button onClick={handlePrevious} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Previous
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashCards;
