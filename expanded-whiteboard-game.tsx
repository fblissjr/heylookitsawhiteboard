import React, { useState, useEffect } from 'react';
import { Star, Cloud, Sun, Moon } from 'lucide-react';

const conversations = [
  [
    { character: 'dad', text: "Oh, hey! it's a whiteboard!" },
    { character: 'daughter', text: "so cool dad..." }
  ],
  [
    { character: 'dad', text: "Look, I can draw stick figures!" },
    { character: 'daughter', text: "Dad, please stop..." }
  ],
  [
    { character: 'dad', text: "Want to play hangman?" },
    { character: 'daughter', text: "On a whiteboard? Really?" }
  ],
  [
    { character: 'dad', text: "I'm the king of whiteboard art!" },
    { character: 'daughter', text: "More like the jester..." }
  ]
];

const dadJokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "What do you call a fake noodle? An impasta!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "What do you call a can opener that doesn't work? A can't opener!"
];

const DadCharacter = () => (
  <svg width="150" height="300" viewBox="0 0 150 300">
    <circle cx="75" cy="50" r="40" stroke="black" strokeWidth="2" fill="none" />
    <path d="M 50 30 Q 75 10 100 30 M 50 30 Q 75 50 100 30" fill="none" stroke="green" strokeWidth="3" />
    <line x1="75" y1="90" x2="75" y2="200" stroke="black" strokeWidth="2" />
    <line x1="75" y1="130" x2="25" y2="180" stroke="black" strokeWidth="2" />
    <line x1="75" y1="130" x2="125" y2="180" stroke="black" strokeWidth="2" />
    <line x1="75" y1="200" x2="50" y2="280" stroke="black" strokeWidth="2" />
    <line x1="75" y1="200" x2="100" y2="280" stroke="black" strokeWidth="2" />
    <circle cx="65" cy="45" r="4" fill="black" />
    <circle cx="85" cy="45" r="4" fill="black" />
    <path d="M 60 65 Q 75 75 90 65" fill="none" stroke="black" strokeWidth="2" />
    <rect x="120" y="175" width="8" height="20" fill="green" />
  </svg>
);

const DaughterCharacter = () => (
  <svg width="150" height="300" viewBox="0 0 150 300">
    <path d="M 45 50 L 45 30 L 105 30 L 105 50 Q 75 60 45 50 L 45 100 Q 75 120 105 100 L 105 50" stroke="black" strokeWidth="2" fill="none" />
    <line x1="75" y1="100" x2="75" y2="200" stroke="black" strokeWidth="2" />
    <line x1="75" y1="150" x2="45" y2="200" stroke="black" strokeWidth="2" />
    <line x1="75" y1="150" x2="105" y2="200" stroke="black" strokeWidth="2" />
    <line x1="75" y1="200" x2="50" y2="280" stroke="black" strokeWidth="2" />
    <line x1="75" y1="200" x2="100" y2="280" stroke="black" strokeWidth="2" />
    <circle cx="60" cy="60" r="4" fill="black" />
    <circle cx="90" cy="60" r="4" fill="black" />
    <path d="M 60 80 Q 75 90 90 80" fill="none" stroke="black" strokeWidth="2" />
  </svg>
);

const SpeechBubble = ({ text, isRight }) => (
  <div className={`relative max-w-xs ${isRight ? 'ml-4' : 'mr-4'}`}>
    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 100">
      <path d={`M10,10 Q100,${isRight ? '0' : '40'} 190,10 Q200,50 190,90 Q100,${isRight ? '100' : '60'} 10,90 Q0,50 10,10`} 
            fill={isRight ? '#e2e8f0' : '#d1fae5'} stroke="#000000" strokeWidth="1" />
    </svg>
    <p className="relative z-10 p-4 text-lg">{text}</p>
  </div>
);

const CharacterWithBubble = ({ character, text, isRight }) => (
  <div className={`flex items-center ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
    {character === 'dad' ? <DadCharacter /> : <DaughterCharacter />}
    <SpeechBubble text={text} isRight={isRight} />
  </div>
);

const WhiteboardDoodle = ({ Icon }) => (
  <div className="absolute" style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }}>
    <Icon className="w-6 h-6 text-gray-300 opacity-30" />
  </div>
);

const WhiteboardGame = () => {
  const [currentConversation, setCurrentConversation] = useState(0);
  const [customDadText, setCustomDadText] = useState('');
  const [customDaughterText, setCustomDaughterText] = useState('');
  const [doodles, setDoodles] = useState([]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        setCurrentConversation((prev) => (prev + 1) % conversations.length);
        setDoodles([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const addDoodle = () => {
    const doodleIcons = [Star, Cloud, Sun, Moon];
    const randomIcon = doodleIcons[Math.floor(Math.random() * doodleIcons.length)];
    setDoodles([...doodles, <WhiteboardDoodle key={doodles.length} Icon={randomIcon} />]);
  };

  const generateDadJoke = () => {
    const joke = dadJokes[Math.floor(Math.random() * dadJokes.length)];
    setCustomDadText(joke);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Whiteboard Conversations</h1>
        <div className="bg-gray-200 p-8 rounded-lg mb-4 min-h-[500px] flex justify-between items-center relative">
          {doodles}
          <CharacterWithBubble 
            character="dad" 
            text={customDadText || conversations[currentConversation][0].text}
            isRight={false}
          />
          <CharacterWithBubble 
            character="daughter" 
            text={customDaughterText || conversations[currentConversation][1].text}
            isRight={true}
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={customDadText}
            onChange={(e) => setCustomDadText(e.target.value)}
            placeholder="Custom dad text"
            className="flex-1 p-2 border rounded text-lg"
          />
          <input
            type="text"
            value={customDaughterText}
            onChange={(e) => setCustomDaughterText(e.target.value)}
            placeholder="Custom daughter text"
            className="flex-1 p-2 border rounded text-lg"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <button onClick={generateDadJoke} className="bg-green-500 text-white px-6 py-3 rounded text-lg">
            Dad Joke!
          </button>
          <button onClick={addDoodle} className="bg-purple-500 text-white px-6 py-3 rounded text-lg">
            Add Doodle
          </button>
        </div>
        <p className="mt-4 text-gray-600 text-center text-lg">Press spacebar to see the next conversation!</p>
      </div>
    </div>
  );
};

export default WhiteboardGame;
