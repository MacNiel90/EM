// hooks/useAiTutor.ts

import { useState } from 'react';

// The URL of your Python Flask backend
const API_ENDPOINT = 'http://127.0.0.1:8000/api/ai-tutor';

export interface ChatMessage {
  role: 'user' | 'bot' | 'system';
  content: string;
  timestamp?: Date;
  isStepByStep?: boolean;
  stepNumber?: number;
  totalSteps?: number;
}

export const useAiTutor = (initialSystemPrompt: string, studentName?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: initialSystemPrompt }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  // Enhanced sendMessage with step-by-step teaching
  const sendMessage = async (query: string, context?: string, requestStepByStep: boolean = true) => {
    setIsLoading(true);
    const userMessage: ChatMessage = { 
      role: 'user', 
      content: query,
      timestamp: new Date()
    };
    
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);

    try {
      // Enhanced system prompt for step-by-step teaching
      const enhancedPrompt = `You are Ella, EduMath GH's friendly AI tutor. You're teaching ${studentName || 'the student'}.

CRITICAL TEACHING RULES:
1. ALWAYS address the student by their first name (${studentName || 'Student'})
2. Break down explanations into clear, numbered steps
3. Only give ONE step at a time unless specifically asked for the full solution
4. After each step, ask if they understand before continuing
5. Use encouraging language and Ghanaian examples
6. Keep explanations simple and age-appropriate

PERSONALITY: You are Ella - patient, encouraging, and enthusiastic about mathematics. You make learning fun!

Current lesson context: ${context || 'General mathematics help'}

Remember: Teach step-by-step, use the student's name, and make it engaging!`;

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          history: [
            { role: 'system', content: enhancedPrompt },
            ...currentMessages.slice(1) // Exclude original system message
          ], 
          context: context,
          stepByStep: requestStepByStep,
          studentName: studentName
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Handle step-by-step responses
      const botMessage: ChatMessage = { 
        role: 'bot', 
        content: data.response,
        timestamp: new Date(),
        isStepByStep: data.isStepByStep || false,
        stepNumber: data.stepNumber || 1,
        totalSteps: data.totalSteps || 1
      };

      setMessages(prev => [...prev, botMessage]);

      if (data.totalSteps) {
        setTotalSteps(data.totalSteps);
        setCurrentStep(data.stepNumber || 1);
      }

    } catch (error) {
      console.error("AI Tutor fetch error:", error);
      const errorMessage: ChatMessage = { 
        role: 'bot', 
        content: `Hi ${studentName || 'there'}! I'm Ella, your AI tutor. I'm having trouble connecting right now, but I'm here to help you learn mathematics step by step. Please try again in a moment! 😊`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate practice questions based on completed lessons
  const generateQuestions = async (topics: string[], difficulty: string = 'intermediate') => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_ENDPOINT}/generate-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics,
          difficulty,
          studentName: studentName,
          questionCount: 5
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.questions || [];

    } catch (error) {
      console.error("Question generation error:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      sendMessage("Please continue with the next step", undefined, true);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      sendMessage("Can you explain the previous step again?", undefined, true);
    }
  };

  return { 
    messages, 
    isLoading, 
    sendMessage, 
    generateQuestions,
    currentStep,
    totalSteps,
    nextStep,
    previousStep
  };
};