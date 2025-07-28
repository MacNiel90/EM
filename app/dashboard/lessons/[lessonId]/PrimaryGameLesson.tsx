'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Trophy, Heart, Zap, Target, Gift, Sparkles, Volume2, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Link from 'next/link';

// Game data for different lessons with proper types
interface CountingLevel {
  objects: number;
  answer: number;
  items: string;
  question: string;
}

interface MathLevel {
  num1: number;
  num2: number;
  answer: number;
  story: string;
}

interface ShapeLevel {
  shape: string;
  name: string;
  options: string[];
  answer: string;
}

type GameLevel = CountingLevel | MathLevel | ShapeLevel;

interface GameData {
  title: string;
  description: string;
  type: 'counting' | 'addition' | 'subtraction' | 'shapes';
  levels: GameLevel[];
}

// Game data for different lessons
const gameData: Record<string, GameData> = {
  'counting-numbers': {
    title: 'Counting Adventure! 🎯',
    description: 'Help Kofi count objects to win stars!',
    type: 'counting',
    levels: [
      { objects: 3, answer: 3, items: '🍎', question: 'How many apples does Ama have?' },
      { objects: 5, answer: 5, items: '⚽', question: 'Count the footballs in the field!' },
      { objects: 7, answer: 7, items: '🌟', question: 'How many stars can you see?' },
      { objects: 4, answer: 4, items: '🚗', question: 'Count the cars on the road!' },
      { objects: 6, answer: 6, items: '🎈', question: 'How many balloons are there?' }
    ] as CountingLevel[]
  },
  'addition-basics': {
    title: 'Addition Magic! ✨',
    description: 'Solve addition problems to collect treasures!',
    type: 'addition',
    levels: [
      { num1: 2, num2: 1, answer: 3, story: 'Kwame has 2 oranges. His sister gives him 1 more. How many does he have now?' },
      { num1: 3, num2: 2, answer: 5, story: 'There are 3 birds in a tree. 2 more birds join them. How many birds in total?' },
      { num1: 4, num2: 3, answer: 7, story: 'Ama bought 4 pencils. Her friend gave her 3 more. How many pencils does she have?' },
      { num1: 5, num2: 2, answer: 7, story: 'In the classroom, there are 5 boys and 2 girls. How many children in total?' },
      { num1: 6, num2: 4, answer: 10, story: 'Kofi saved 6 cedis. His father gave him 4 more cedis. How much money does he have?' }
    ] as MathLevel[]
  },
  'subtraction-basics': {
    title: 'Subtraction Safari! 🦁',
    description: 'Help animals solve subtraction problems!',
    type: 'subtraction',
    levels: [
      { num1: 5, num2: 2, answer: 3, story: 'There were 5 mangoes on the tree. 2 fell down. How many are left?' },
      { num1: 7, num2: 3, answer: 4, story: 'Ama had 7 stickers. She gave 3 to her friend. How many does she have left?' },
      { num1: 8, num2: 5, answer: 3, story: 'There were 8 chickens in the yard. 5 went inside. How many are still outside?' },
      { num1: 6, num2: 4, answer: 2, story: 'Kwame had 6 marbles. He lost 4 while playing. How many marbles does he have now?' },
      { num1: 9, num2: 6, answer: 3, story: 'There were 9 students in class. 6 went home early. How many students are left?' }
    ] as MathLevel[]
  },
  'shapes-colors': {
    title: 'Shape Detective! 🔍',
    description: 'Find and match shapes to become a shape master!',
    type: 'shapes',
    levels: [
      { shape: '🔴', name: 'Circle', options: ['Circle', 'Square', 'Triangle'], answer: 'Circle' },
      { shape: '🟦', name: 'Square', options: ['Circle', 'Square', 'Triangle'], answer: 'Square' },
      { shape: '🔺', name: 'Triangle', options: ['Circle', 'Square', 'Triangle'], answer: 'Triangle' },
      { shape: '⭐', name: 'Star', options: ['Star', 'Heart', 'Diamond'], answer: 'Star' },
      { shape: '💎', name: 'Diamond', options: ['Star', 'Heart', 'Diamond'], answer: 'Diamond' }
    ] as ShapeLevel[]
  }
};

export default function PrimaryGameLesson({ lessonId, lessonTitle, onComplete }: { 
  lessonId: string; 
  lessonTitle: string;
  onComplete?: (score: number) => void;
}) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stars, setStars] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [encouragementMessages] = useState([
    "Great job! Keep going! 🌟",
    "You're doing amazing! 🎉",
    "Fantastic work! 💪",
    "Excellent! You're a math star! ⭐",
    "Wonderful! Keep it up! 🚀"
  ]);

  const game = gameData[lessonId as keyof typeof gameData];
  const currentQuestion = game?.levels[currentLevel];

  useEffect(() => {
    if (gameCompleted) {
      const earnedStars = score >= 80 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0;
      setStars(earnedStars);
      setShowCelebration(true);
      
      // Call completion callback
      if (onComplete) {
        onComplete(score);
      }
    }
  }, [gameCompleted, score]);

  const playSound = (type: 'correct' | 'wrong' | 'complete') => {
    // In a real app, you would play actual sound effects here
    console.log(`Playing ${type} sound`);
  };

  const handleAnswer = (answer: string | number) => {
    setSelectedAnswer(answer);
    let correct = false;
    
    if (currentQuestion) {
      if (isCountingLevel(currentQuestion) || isMathLevel(currentQuestion)) {
        correct = parseInt(answer.toString()) === currentQuestion.answer;
      } else if (isShapeLevel(currentQuestion)) {
        correct = answer === currentQuestion.answer;
      }
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 20);
      playSound('correct');
    } else {
      setLives(prev => prev - 1);
      playSound('wrong');
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (correct || lives > 1) {
        if (game && currentLevel < game.levels.length - 1) {
          setCurrentLevel(prev => prev + 1);
        } else {
          setGameCompleted(true);
          playSound('complete');
        }
      }
      setSelectedAnswer('');
    }, 2000);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setGameStarted(false);
    setGameCompleted(false);
    setSelectedAnswer('');
    setShowFeedback(false);
    setStars(0);
    setShowCelebration(false);
  };

  // Type guard functions
  const isCountingLevel = (level: GameLevel): level is CountingLevel => {
    return 'objects' in level && 'question' in level;
  };

  const isMathLevel = (level: GameLevel): level is MathLevel => {
    return 'num1' in level && 'num2' in level && 'story' in level;
  };

  const isShapeLevel = (level: GameLevel): level is ShapeLevel => {
    return 'shape' in level && 'name' in level && 'options' in level;
  };

  const renderCountingGame = () => {
    if (!currentQuestion || !isCountingLevel(currentQuestion)) return null;
    
    return (
      <div className="text-center space-y-8">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentQuestion.question}</h3>
          <p className="text-lg text-gray-700">Count carefully and click the right number! 🎯</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8 p-8 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl border-4 border-dashed border-yellow-300">
          {Array.from({ length: currentQuestion.objects }).map((_, i) => (
            <div 
              key={i} 
              className="text-7xl animate-bounce hover:scale-110 transition-transform cursor-pointer" 
              style={{ animationDelay: `${i * 0.2}s` }}
              onClick={() => playSound('correct')}
            >
              {currentQuestion.items}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg mx-auto">
          {[currentQuestion.answer - 1, currentQuestion.answer, currentQuestion.answer + 1, currentQuestion.answer + 2]
            .filter(num => num > 0)
            .sort(() => Math.random() - 0.5)
            .map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option.toString())}
                className={`h-20 text-3xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedAnswer === option.toString()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110 shadow-2xl'
                    : 'bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-purple-50 text-blue-600 border-4 border-blue-200 hover:border-blue-400 shadow-lg'
                }`}
                disabled={showFeedback}
              >
                {option}
              </Button>
            ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-lg font-medium text-gray-700">
            {encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]}
          </p>
        </div>
      </div>
    );
  };

  const renderMathGame = () => {
    if (!currentQuestion || !isMathLevel(currentQuestion)) return null;
    
    return (
      <div className="text-center space-y-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl mb-8 border-4 border-green-200">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-800 mb-6 font-medium leading-relaxed">{currentQuestion.story}</p>
          <div className="text-5xl font-bold text-green-600 mb-4 bg-white p-4 rounded-xl shadow-lg inline-block">
            {currentQuestion.num1} {game?.type === 'addition' ? '+' : '-'} {currentQuestion.num2} = ?
          </div>
          <p className="text-lg text-green-700 font-medium">Can you solve this problem? 🤔</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg mx-auto">
          {[currentQuestion.answer - 2, currentQuestion.answer, currentQuestion.answer + 1, currentQuestion.answer + 3]
            .filter(num => num >= 0)
            .sort(() => Math.random() - 0.5)
            .map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option.toString())}
                className={`h-20 text-3xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedAnswer === option.toString()
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-110 shadow-2xl'
                    : 'bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-emerald-50 text-green-600 border-4 border-green-200 hover:border-green-400 shadow-lg'
                }`}
                disabled={showFeedback}
              >
                {option}
              </Button>
            ))}
        </div>
      </div>
    );
  };

  const renderShapeGame = () => {
    if (!currentQuestion || !isShapeLevel(currentQuestion)) return null;
    
    return (
      <div className="text-center space-y-8">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">What shape is this? 🔍</h3>
          <p className="text-lg text-gray-700">Look carefully and choose the correct name!</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-12 rounded-2xl mb-8 border-4 border-purple-200">
          <div className="text-9xl mb-6 animate-pulse hover:animate-bounce cursor-pointer" onClick={() => playSound('correct')}>
            {currentQuestion.shape}
          </div>
          <p className="text-xl text-purple-700 font-bold">Touch the shape to hear its name! 👆</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`h-20 text-2xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                selectedAnswer === option
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white scale-110 shadow-2xl'
                  : 'bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-pink-50 text-purple-600 border-4 border-purple-200 hover:border-purple-400 shadow-lg'
              }`}
              disabled={showFeedback}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderGameContent = () => {
    if (!game) return null;
    
    switch (game.type) {
      case 'counting':
        return renderCountingGame();
      case 'addition':
      case 'subtraction':
        return renderMathGame();
      case 'shapes':
        return renderShapeGame();
      default:
        return <div>Game type not supported</div>;
    }
  };

  if (!game) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Game Not Available</h1>
          <p className="text-gray-600 mb-8">This lesson doesn&apos;t have a game version yet.</p>
          <Button asChild>
            <Link href="/dashboard/lessons">Back to Lessons</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="rounded-xl">
            <Link href="/dashboard/lessons">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Link>
          </Button>
          
          {gameStarted && !gameCompleted && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-xl">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-bold text-red-700">{lives}</span>
              </div>
              <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-xl">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-700">{score}</span>
              </div>
            </div>
          )}
        </div>

        {/* Game Start Screen */}
        {!gameStarted && !gameCompleted && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white overflow-hidden transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-black/10">
                {/* Floating elements for fun */}
                <div className="absolute top-10 left-10 text-4xl animate-bounce">⭐</div>
                <div className="absolute top-20 right-20 text-3xl animate-pulse">🎯</div>
                <div className="absolute bottom-20 left-20 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🚀</div>
                <div className="absolute bottom-10 right-10 text-4xl animate-pulse" style={{animationDelay: '1s'}}>🏆</div>
              </div>
              <div className="relative z-10">
                <div className="text-8xl mb-6 animate-bounce">🎮</div>
                <h1 className="text-5xl font-bold mb-6 animate-pulse">{game.title}</h1>
                <p className="text-2xl mb-8 opacity-90 font-medium">{game.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <Target className="w-10 h-10 mx-auto mb-3 animate-pulse" />
                    <h3 className="font-bold mb-2 text-lg">5 Fun Levels</h3>
                    <p className="text-sm opacity-90">Complete all challenges to win!</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <Heart className="w-10 h-10 mx-auto mb-3 animate-pulse text-red-300" />
                    <h3 className="font-bold mb-2 text-lg">3 Lives</h3>
                    <p className="text-sm opacity-90">Don't worry, you can try again!</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <Trophy className="w-10 h-10 mx-auto mb-3 animate-pulse text-yellow-300" />
                    <h3 className="font-bold mb-2 text-lg">Earn Stars</h3>
                    <p className="text-sm opacity-90">Get high scores for amazing rewards!</p>
                  </div>
                </div>

                <Button
                  onClick={() => setGameStarted(true)}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 text-2xl font-bold px-16 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse"
                >
                  <Zap className="w-8 h-8 mr-4" />
                  Let's Play! 🚀
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Play Screen */}
        {gameStarted && !gameCompleted && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Level {currentLevel + 1} of {game.levels.length}</h2>
                  <Badge className="bg-blue-500 text-white px-4 py-2">
                    Score: {score}
                  </Badge>
                </div>
                <Progress value={((currentLevel + 1) / game.levels.length) * 100} className="h-3 progress-modern" />
              </CardContent>
            </Card>

            {/* Game Content */}
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                {renderGameContent()}
              </CardContent>
            </Card>

            {/* Feedback Modal */}
            {showFeedback && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
                <Card className={`border-0 shadow-2xl transform scale-110 ${isCorrect ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-pink-500'} text-white animate-bounce`}>
                  <CardContent className="p-12 text-center">
                    <div className="text-8xl mb-6 animate-pulse">
                      {isCorrect ? <CheckCircle className="w-16 h-16 mx-auto" /> : <XCircle className="w-16 h-16 mx-auto" />}
                    </div>
                    <h3 className="text-4xl font-bold mb-6">
                      {isCorrect ? 'Excellent! 🎉' : 'Try Again! 💪'}
                    </h3>
                    <p className="text-2xl font-medium">
                      {isCorrect ? 'You\'re amazing! Keep going!' : `The correct answer is ${currentQuestion?.answer}. You'll get it next time!`}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Game Completion Screen */}
        {gameCompleted && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white overflow-hidden transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-black/10">
                {/* Celebration elements */}
                <div className="absolute top-5 left-5 text-4xl animate-bounce">🎊</div>
                <div className="absolute top-10 right-10 text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🎉</div>
                <div className="absolute bottom-10 left-10 text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>🏆</div>
                <div className="absolute bottom-5 right-5 text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>⭐</div>
              </div>
              <div className="relative z-10">
                
                <div className="text-8xl mb-8 animate-bounce">🏆</div>
                <h1 className="text-5xl font-bold mb-6 animate-pulse">Congratulations! 🎉</h1>
                <p className="text-2xl mb-8 font-medium">You completed all levels like a true math champion!</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <Star className="w-10 h-10 mx-auto mb-3 animate-pulse text-yellow-300" />
                    <h3 className="font-bold mb-2 text-lg">Amazing Score</h3>
                    <p className="text-3xl font-bold">{score} points!</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <Trophy className="w-10 h-10 mx-auto mb-3 animate-pulse text-yellow-300" />
                    <h3 className="font-bold mb-2 text-lg">Stars Earned</h3>
                    <div className="flex justify-center space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className={`w-8 h-8 ${i < stars ? 'text-yellow-300 fill-current animate-pulse' : 'text-white/30'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <Gift className="w-10 h-10 mx-auto mb-3 animate-pulse text-pink-300" />
                    <h3 className="font-bold mb-2 text-lg">Special Reward</h3>
                    <p className="text-sm font-medium">Math Champion Badge Unlocked! 🏅</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={resetGame}
                    className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Play Again
                  </Button>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <Link href="/dashboard/lessons">
                      <Sparkles className="w-5 h-5 mr-2" />
                      More Lessons
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}