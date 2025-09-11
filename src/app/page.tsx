'use client';

import { useState } from 'react';

// List of 30 emotions with emojis and colors
const EMOTIONS = [
  { name: 'Joy', emoji: '😊', color: 'bg-yellow-200', borderColor: 'border-yellow-400' },
  { name: 'Sadness', emoji: '😢', color: 'bg-blue-200', borderColor: 'border-blue-400' },
  { name: 'Anger', emoji: '😠', color: 'bg-red-200', borderColor: 'border-red-400' },
  { name: 'Fear', emoji: '😨', color: 'bg-purple-200', borderColor: 'border-purple-400' },
  { name: 'Surprise', emoji: '😲', color: 'bg-orange-200', borderColor: 'border-orange-400' },
  { name: 'Disgust', emoji: '🤢', color: 'bg-green-200', borderColor: 'border-green-400' },
  { name: 'Love', emoji: '😍', color: 'bg-pink-200', borderColor: 'border-pink-400' },
  { name: 'Laughter', emoji: '😂', color: 'bg-yellow-300', borderColor: 'border-yellow-500' },
  { name: 'Confusion', emoji: '😕', color: 'bg-gray-200', borderColor: 'border-gray-400' },
  { name: 'Pride', emoji: '😤', color: 'bg-indigo-200', borderColor: 'border-indigo-400' },
  { name: 'Jealousy', emoji: '😒', color: 'bg-emerald-200', borderColor: 'border-emerald-400' },
  { name: 'Nostalgia', emoji: '🥺', color: 'bg-rose-200', borderColor: 'border-rose-400' },
  { name: 'Excitement', emoji: '🤩', color: 'bg-amber-200', borderColor: 'border-amber-400' },
  { name: 'Calm', emoji: '😌', color: 'bg-cyan-200', borderColor: 'border-cyan-400' },
  { name: 'Anxiety', emoji: '😰', color: 'bg-violet-200', borderColor: 'border-violet-400' },
  { name: 'Hope', emoji: '🤞', color: 'bg-lime-200', borderColor: 'border-lime-400' },
  { name: 'Gratitude', emoji: '🙏', color: 'bg-teal-200', borderColor: 'border-teal-400' },
  { name: 'Curiosity', emoji: '🤔', color: 'bg-sky-200', borderColor: 'border-sky-400' },
  { name: 'Determination', emoji: '💪', color: 'bg-red-300', borderColor: 'border-red-500' },
  { name: 'Serenity', emoji: '😇', color: 'bg-blue-300', borderColor: 'border-blue-500' },
  { name: 'Shyness', emoji: '😳', color: 'bg-pink-300', borderColor: 'border-pink-500' },
  { name: 'Enthusiasm', emoji: '🤗', color: 'bg-orange-300', borderColor: 'border-orange-500' },
  { name: 'Relief', emoji: '😮‍💨', color: 'bg-green-300', borderColor: 'border-green-500' },
  { name: 'Embarrassment', emoji: '😅', color: 'bg-red-300', borderColor: 'border-red-500' },
  { name: 'Wonder', emoji: '🤯', color: 'bg-purple-300', borderColor: 'border-purple-500' },
  { name: 'Contentment', emoji: '😌', color: 'bg-blue-300', borderColor: 'border-blue-500' },
  { name: 'Frustration', emoji: '😤', color: 'bg-red-400', borderColor: 'border-red-600' },
  { name: 'Amazement', emoji: '😮', color: 'bg-yellow-400', borderColor: 'border-yellow-600' },
  { name: 'Peace', emoji: '☮️', color: 'bg-green-400', borderColor: 'border-green-600' },
  { name: 'Bliss', emoji: '🥰', color: 'bg-pink-400', borderColor: 'border-pink-600' }
];

// Pre-selected 25 winning emotions
const WINNING_EMOTIONS = [
  'Joy', 'Love', 'Laughter', 'Excitement', 'Hope',
  'Gratitude', 'Determination', 'Serenity', 'Enthusiasm', 'Relief',
  'Wonder', 'Contentment', 'Amazement', 'Peace', 'Bliss',
  'Surprise', 'Calm', 'Curiosity', 'Pride', 'Shyness',
  'Nostalgia', 'Confusion', 'Anxiety', 'Jealousy', 'Fear'
];

interface BingoCard {
  id: number;
  grid: (string | null)[][];
  isWinner?: boolean;
}

export default function BingoApp() {
  const [numWinners, setNumWinners] = useState(5);
  const [cards, setCards] = useState<BingoCard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWinners, setShowWinners] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to check if a card contains only winning emotions
  const isCardWinning = (grid: (string | null)[][]): boolean => {
    const cardEmotions = grid.flat().filter(emotion => emotion !== null);
    return cardEmotions.every(emotion => WINNING_EMOTIONS.includes(emotion));
  };

  // Function to generate a unique bingo card
  const generateBingoCard = (id: number, isWinner: boolean = false): BingoCard => {
    let grid: (string | null)[][];
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      grid = [];
      
      if (isWinner) {
        // For winning cards, use exactly the 25 winning emotions
        const shuffledWinning = [...WINNING_EMOTIONS].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 5; i++) {
          grid[i] = [];
          for (let j = 0; j < 5; j++) {
            const emotionIndex = i * 5 + j;
            grid[i][j] = shuffledWinning[emotionIndex] || '';
          }
        }
      } else {
        // For regular cards, use random emotions from all 30
        const shuffled = [...EMOTIONS].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 5; i++) {
          grid[i] = [];
          for (let j = 0; j < 5; j++) {
            const emotionIndex = i * 5 + j;
            grid[i][j] = shuffled[emotionIndex]?.name || '';
          }
        }
      }
      
      attempts++;
    } while (!isWinner && isCardWinning(grid) && attempts < maxAttempts);
    
    // Throw error if max attempts reached
    if (!isWinner && isCardWinning(grid) && attempts >= maxAttempts) {
      throw new Error(`Failed to generate non-winning card #${id} after ${maxAttempts} attempts. The random generation keeps creating winning combinations.`);
    }
    
    return { id, grid, isWinner };
  };

  // Generate 50 unique cards with winners
  const generateCards = () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const newCards: BingoCard[] = [];
      
      // First, generate all 50 cards as regular cards
      for (let i = 1; i <= 50; i++) {
        newCards.push(generateBingoCard(i, false));
      }
      
      // Then, randomly select which cards will be winners
      const winningCardIds = [];
      const allCardIds = Array.from({ length: 50 }, (_, i) => i + 1);
      
      // Shuffle and pick the first numWinners cards
      const shuffledIds = allCardIds.sort(() => Math.random() - 0.5);
      for (let i = 0; i < numWinners; i++) {
        winningCardIds.push(shuffledIds[i]);
      }
      
      // Replace the selected cards with winning cards
      winningCardIds.forEach(cardId => {
        const cardIndex = newCards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
          newCards[cardIndex] = generateBingoCard(cardId, true);
        }
      });
      
      // Sort cards by ID to display them in order
      const sortedCards = newCards.sort((a, b) => a.id - b.id);
      
      setCards(sortedCards);
      setShowWinners(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating cards');
      setCards([]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Fonction pour imprimer les cartes
  const printCards = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rainbow-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2 md:mb-4 drop-shadow-lg">
            🎨 Emotions Bingo 🎨
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium px-4">
            ✨ Create magical cards for children! ✨
          </p>
        </div>

        {/* Configuration */}
        <div className="bg-gradient-to-r from-white to-purple-50 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 no-print border-4 border-purple-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 mb-4 md:mb-6 text-center">
            🎮 Game Configuration
          </h2>
          
          {/* Winning Emotions Display */}
          <div className="mb-4 md:mb-6 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300">
            <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-3 text-center">
              🏆 25 Winning Emotions 🏆
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 sm:gap-2">
              {WINNING_EMOTIONS.map((emotion, index) => {
                const emotionData = EMOTIONS.find(e => e.name === emotion);
                return (
                  <div
                    key={index}
                    className={`${emotionData?.color} ${emotionData?.borderColor} border-2 rounded-lg p-1 sm:p-2 text-center`}
                  >
                    <div className="text-sm sm:text-lg">{emotionData?.emoji}</div>
                    <div className="text-xs font-medium hidden sm:block">{emotion}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4 md:mb-6">
            <label className="text-lg sm:text-xl text-purple-700 font-bold">
              🏆 Number of winners:
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={numWinners}
              onChange={(e) => setNumWinners(parseInt(e.target.value))}
              className="border-4 border-purple-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 w-20 sm:w-24 text-center text-lg sm:text-xl font-bold text-purple-800 focus:border-purple-500 focus:ring-4 focus:ring-purple-200"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
            <button
              onClick={generateCards}
              disabled={isGenerating}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-transform duration-200 ease-out hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isGenerating ? '⏳ Generating...' : '🎲 Generate 50 cards'}
            </button>
            {cards.length > 0 && (
              <>
                <button
                  onClick={() => setShowWinners(!showWinners)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-transform duration-200 ease-out hover:scale-105 shadow-lg"
                >
                  {showWinners ? '🙈 Hide Winners' : '🏆 Show Winners'}
                </button>
                <button
                  onClick={printCards}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-transform duration-200 ease-out hover:scale-105 shadow-lg"
                >
                  🖨️ Print cards
                </button>
              </>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl shadow-lg p-4 sm:p-6 mb-6 md:mb-8 border-4 border-red-300">
            <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-2 text-center">
              ⚠️ Generation Error ⚠️
            </h3>
            <p className="text-sm sm:text-base text-red-700 text-center mb-3">
              {error}
            </p>
            <div className="text-center">
              <button
                onClick={() => setError(null)}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-transform duration-200 ease-out hover:scale-105 shadow-lg"
              >
                ✖️ Dismiss Error
              </button>
            </div>
          </div>
        )}

        {/* Winning Cards Numbers Display */}
        {cards.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-4 sm:p-6 mb-6 md:mb-8 border-4 border-yellow-300 no-print">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-800 mb-3 text-center">
              🏆 Winning Cards Numbers 🏆
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {cards
                .filter(card => card.isWinner)
                .map((card, index) => (
                  <div
                    key={card.id}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 sm:px-4 py-2 rounded-xl font-bold text-sm sm:text-base shadow-lg transform hover:scale-105 transition-transform duration-200"
                  >
                    #{card.id}
                  </div>
                ))}
            </div>
            <p className="text-center text-sm sm:text-base text-orange-700 mt-3 font-medium">
              {cards.filter(card => card.isWinner).length} winning card(s) out of {cards.length} total cards
            </p>
          </div>
        )}

        {/* Print First Page - Winning Emotions and Numbers */}
        {cards.length > 0 && (
          <div className="print-first-page hidden">
            {/* Winning Emotions for Print */}
            <div className="print-winning-emotions">
              <h3>🏆 25 Winning Emotions 🏆</h3>
              <div className="print-winning-emotions-grid">
                {WINNING_EMOTIONS.map((emotion, index) => {
                  const emotionData = EMOTIONS.find(e => e.name === emotion);
                  return (
                    <div key={index} className="print-winning-emotion">
                      <div>{emotionData?.emoji}</div>
                      <div>{emotion}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Winning Numbers for Print */}
            <div className="print-winning-numbers">
              <h3>🏆 Winning Cards Numbers 🏆</h3>
              <div className="print-winning-numbers-list">
                {cards
                  .filter(card => card.isWinner)
                  .map((card) => (
                    <div key={card.id} className="print-winning-number">
                      #{card.id}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Cards Display */}
        {cards.length > 0 && (
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border-4 border-pink-200">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-800 mb-4 md:mb-8 no-print text-center">
              🎨 Magic Cards Generated ({cards.length}) 🎨
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 print-grid">
              {cards.map((card, index) => (
                <div key={card.id} className={index > 0 && (index + 1) % 4 === 0 ? 'print-break' : ''}>
                  <BingoCardComponent card={card} showWinners={showWinners} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Bingo card component
function BingoCardComponent({ card, showWinners }: { card: BingoCard; showWinners: boolean }) {
  const isWinnerVisible = showWinners && card.isWinner;
  
  return (
    <div className={`bingo-card bg-gradient-to-br from-white to-purple-50 border-4 rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl transition-transform duration-300 ease-out hover:scale-105 ${
      isWinnerVisible
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-100 shadow-yellow-200' 
        : 'border-purple-300'
    }`}>
      {/* Card header */}
      <div className="text-center mb-3 sm:mb-4">
        <div className={`text-white rounded-xl py-1 sm:py-2 px-2 sm:px-4 mb-1 sm:mb-2 ${
          isWinnerVisible
            ? 'bg-gradient-to-r from-yellow-500 to-orange-600' 
            : 'bg-gradient-to-r from-pink-500 to-purple-600'
        }`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black">
            {isWinnerVisible ? '🏆' : '🎯'} Card #{card.id} {isWinnerVisible ? '🏆' : ''}
          </h3>
        </div>
        <div className={`text-sm sm:text-base md:text-lg font-bold ${
          isWinnerVisible ? 'text-orange-700' : 'text-purple-700'
        }`}>
          ✨ Emotions Bingo ✨
        </div>
        {isWinnerVisible && (
          <div className="text-xs sm:text-sm font-bold text-yellow-600 mt-1 animate-pulse">
            🎉 WINNER! 🎉
          </div>
        )}
      </div>

      {/* 5x5 Grid */}
      <div className="bingo-grid grid grid-cols-5 gap-1 sm:gap-2">
        {card.grid.map((row, rowIndex) =>
          row.map((emotion, colIndex) => {
            const emotionData = EMOTIONS.find(e => e.name === emotion);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  bingo-cell aspect-square flex items-center justify-center
                  border-2 rounded-lg sm:rounded-xl shadow-lg transition-transform duration-200 ease-out hover:scale-105
                  ${emotionData?.color} ${emotionData?.borderColor} hover:shadow-lg
                `}
              >
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl mb-1 drop-shadow-lg">
                    {emotionData?.emoji}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}