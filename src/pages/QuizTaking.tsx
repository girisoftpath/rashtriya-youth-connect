import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, CheckCircle } from 'lucide-react';
import { QuizSubmitModal } from '@/components/modals/QuizSubmitModal';

interface Question {
  id: number;
  question: string;
  options: string[];
  selectedAnswer?: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is the main concern regarding the use of public Wi-Fi networks?",
    options: [
      "They are slower than private networks",
      "They are usually not password protected",
      "They are only accessible to tech-savvy individuals",
      "They provide better security compared to private networks"
    ]
  },
  // Add more questions as needed
];

export const QuizTaking: React.FC = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [timeLeft, setTimeLeft] = useState(595); // 9:55 in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === currentQuestion ? { ...q, selectedAnswer: answer } : q
    ));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuestionNavigation = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
  };

  const handleSubmitQuiz = () => {
    setShowSubmitModal(true);
  };

  const confirmedSubmit = () => {
    setShowSubmitModal(false);
    navigate('/quiz-thank-you');
  };

  const clearAnswer = () => {
    setQuestions(prev => prev.map(q => 
      q.id === currentQuestion ? { ...q, selectedAnswer: undefined } : q
    ));
  };

  const skipQuestion = () => {
    handleNext();
  };

  const currentQuestionData = questions.find(q => q.id === currentQuestion);
  const answeredCount = questions.filter(q => q.selectedAnswer).length;
  const pendingCount = questions.length - answeredCount;

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-secondary">
                  Viksit Bharat Young Leaders Dialogue (VBYLD) 2026
                </h1>
                <p className="text-sm text-muted-foreground">Total Marks 20</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-lg font-mono">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className={timeLeft < 60 ? 'text-destructive' : 'text-foreground'}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Question Area */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">
                    Question {currentQuestion}
                    <span className="ml-4 text-sm text-muted-foreground">Marks 1</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    {currentQuestionData?.question}
                  </p>

                  <RadioGroup
                    value={currentQuestionData?.selectedAnswer || ''}
                    onValueChange={handleAnswerSelect}
                    className="space-y-4"
                  >
                    {currentQuestionData?.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <RadioGroupItem
                          value={option}
                          id={`option-${index}`}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="text-base leading-relaxed cursor-pointer flex-1"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="ghost"
                    onClick={skipQuestion}
                    className="text-muted-foreground"
                  >
                    Skip
                  </Button>

                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={clearAnswer}
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-success-foreground" />
                    </div>
                    <span className="font-medium">Answered</span>
                  </div>
                  <span className="text-xl font-bold">{answeredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{pendingCount}</span>
                    </div>
                    <span className="font-medium">Pending</span>
                  </div>
                  <span className="text-xl font-bold">{pendingCount}</span>
                </div>
              </div>

              {/* Question List */}
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-4">Question List</h3>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(num => {
                    const isAnswered = questions.find(q => q.id === num)?.selectedAnswer;
                    const isCurrent = num === currentQuestion;
                    
                    return (
                      <button
                        key={num}
                        onClick={() => handleQuestionNavigation(num)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                          isCurrent
                            ? 'bg-primary text-primary-foreground'
                            : isAnswered
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitQuiz}
                className="w-full bg-success hover:bg-success-light text-success-foreground"
                size="lg"
              >
                Submit Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>

      <QuizSubmitModal
        open={showSubmitModal}
        onOpenChange={setShowSubmitModal}
        onConfirm={confirmedSubmit}
      />
    </>
  );
};