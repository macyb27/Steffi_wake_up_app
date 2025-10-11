import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Star, Moon, Sun, Trophy, Gift, Zap, Volume2, VolumeX } from 'lucide-react';
import './App.css';

// Süße Monster-Daten mit SVG-Definitionen
const MONSTERS = [
  { id: 1, name: 'Fluffy', emoji: '🦄', rarity: 'legendary', color: '#ff69b4' },
  { id: 2, name: 'Bubbles', emoji: '🐙', rarity: 'rare', color: '#9d4edd' },
  { id: 3, name: 'Sparkle', emoji: '✨', rarity: 'common', color: '#ffd60a' },
  { id: 4, name: 'Moony', emoji: '🌙', rarity: 'rare', color: '#a8dadc' },
  { id: 5, name: 'Sunny', emoji: '☀️', rarity: 'common', color: '#ffb703' },
  { id: 6, name: 'Starry', emoji: '⭐', rarity: 'legendary', color: '#06ffa5' },
  { id: 7, name: 'Cotton', emoji: '☁️', rarity: 'common', color: '#e0e1dd' },
  { id: 8, name: 'Rainbow', emoji: '🌈', rarity: 'epic', color: '#ff006e' },
  { id: 9, name: 'Cherry', emoji: '🍒', rarity: 'rare', color: '#d90429' },
  { id: 10, name: 'Peach', emoji: '🍑', rarity: 'common', color: '#ffafcc' },
  { id: 11, name: 'Butterfly', emoji: '🦋', rarity: 'epic', color: '#7209b7' },
  { id: 12, name: 'Cupcake', emoji: '🧁', rarity: 'rare', color: '#f72585' },
  { id: 13, name: 'Candy', emoji: '🍬', rarity: 'common', color: '#ff006e' },
  { id: 14, name: 'Flower', emoji: '🌸', rarity: 'rare', color: '#ff69b4' },
  { id: 15, name: 'Magic', emoji: '🪄', rarity: 'legendary', color: '#b5179e' },
];

// Motivierende Standard-Nachrichten
const DEFAULT_MESSAGES = [
  "Guten Morgen, Sonnenschein! ☀️ Du schaffst das heute!",
  "Aufstehen, du wundervolle Prinzessin! 👑",
  "Zeit für einen magischen Tag voller Abenteuer! ✨",
  "Deine Monster warten schon auf dich! 🦄",
  "Du bist stark, schön und kannst alles erreichen! 💪",
  "Ein neuer Tag bedeutet neue Möglichkeiten! 🌈",
  "Du bist die beste Version von dir selbst! 💖",
  "Lass heute dein Lächeln strahlen! 😊",
  "Die Welt braucht deine positive Energie! ⚡",
  "Sei stolz auf dich - du bist großartig! 🌟",
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [alarmTime, setAlarmTime] = useState('07:00');
  const [alarmName, setAlarmName] = useState('');
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const [currentAlarm, setCurrentAlarm] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [gameType, setGameType] = useState('');
  const [collectedMonsters, setCollectedMonsters] = useState([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [view, setView] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [message, setMessage] = useState('');
  
  const audioRef = useRef(null);
  const alarmCheckInterval = useRef(null);

  // Easter Egg: Konami Code
  const [konamiCode, setKonamiCode] = useState([]);
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newCode = [...konamiCode, e.key].slice(-10);
      setKonamiCode(newCode);
      
      if (newCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        setKonamiCode([]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  const triggerEasterEgg = () => {
    alert('🎉 EASTER EGG GEFUNDEN! 🎉\nAlle Monster freigeschaltet! +1000 Punkte!');
    setCollectedMonsters(MONSTERS);
    setPoints(prev => prev + 1000);
  };

  // Zeit-Update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Alarm-Check
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      alarms.forEach(alarm => {
        if (alarm.enabled && alarm.time === currentTimeStr && !isAlarmRinging) {
          triggerAlarm(alarm);
        }
      });
    };

    alarmCheckInterval.current = setInterval(checkAlarms, 10000); // Alle 10 Sekunden prüfen
    return () => clearInterval(alarmCheckInterval.current);
  }, [alarms, isAlarmRinging]);

  // Daten aus LocalStorage laden
  useEffect(() => {
    const savedAlarms = localStorage.getItem('alarms');
    const savedMonsters = localStorage.getItem('monsters');
    const savedPoints = localStorage.getItem('points');
    const savedStreak = localStorage.getItem('streak');
    
    if (savedAlarms) setAlarms(JSON.parse(savedAlarms));
    if (savedMonsters) setCollectedMonsters(JSON.parse(savedMonsters));
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  // Daten in LocalStorage speichern
  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    localStorage.setItem('monsters', JSON.stringify(collectedMonsters));
  }, [collectedMonsters]);

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  const triggerAlarm = (alarm) => {
    setIsAlarmRinging(true);
    setCurrentAlarm(alarm);
    setMessage(DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)]);
    
    if (soundEnabled) {
      playAlarmSound();
    }
  };

  const playAlarmSound = () => {
    // Sanfter Alarm-Sound mit Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440; // A4 Note
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 3);
    
    // Wiederholen bis der Alarm gestoppt wird
    if (isAlarmRinging) {
      setTimeout(playAlarmSound, 3000);
    }
  };

  const addAlarm = () => {
    if (!alarmTime) return;
    
    const newAlarm = {
      id: Date.now(),
      time: alarmTime,
      name: alarmName || 'Wecker',
      enabled: true,
    };
    
    setAlarms([...alarms, newAlarm]);
    setAlarmTime('07:00');
    setAlarmName('');
  };

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const snoozeAlarm = () => {
    setIsAlarmRinging(false);
    setShowGame(false);
    // 5 Minuten Snooze
    if (currentAlarm) {
      const [hours, minutes] = currentAlarm.time.split(':').map(Number);
      const snoozeTime = new Date();
      snoozeTime.setHours(hours, minutes + 5);
      const snoozeTimeStr = `${String(snoozeTime.getHours()).padStart(2, '0')}:${String(snoozeTime.getMinutes()).padStart(2, '0')}`;
      
      setAlarms([...alarms, {
        ...currentAlarm,
        id: Date.now(),
        time: snoozeTimeStr,
        name: currentAlarm.name + ' (Snooze)',
      }]);
    }
  };

  const dismissAlarm = () => {
    // Zufälliges Mini-Spiel wählen
    const games = ['math', 'memory', 'sequence'];
    const selectedGame = games[Math.floor(Math.random() * games.length)];
    setGameType(selectedGame);
    setShowGame(true);
  };

  const completeGame = (success) => {
    if (success) {
      setIsAlarmRinging(false);
      setShowGame(false);
      
      // Belohnung geben
      const earnedPoints = 10 + (streak * 5);
      setPoints(prev => prev + earnedPoints);
      setStreak(prev => prev + 1);
      
      // Zufälliges Monster freischalten
      const unlockedMonsters = MONSTERS.filter(m => !collectedMonsters.find(cm => cm.id === m.id));
      if (unlockedMonsters.length > 0) {
        const newMonster = unlockedMonsters[Math.floor(Math.random() * unlockedMonsters.length)];
        setCollectedMonsters([...collectedMonsters, newMonster]);
        alert(`🎉 Neues Monster freigeschaltet: ${newMonster.emoji} ${newMonster.name}!`);
      }
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo neon-glow">
            <Moon className="icon-inline" />
            Monster Morning
            <Sparkles className="icon-inline sparkle-icon" />
          </h1>
          <div className="header-stats">
            <div className="stat-item">
              <Star className="stat-icon" />
              <span>{points} Punkte</span>
            </div>
            <div className="stat-item">
              <Trophy className="stat-icon" />
              <span>{streak} Streak</span>
            </div>
            <div className="stat-item">
              <Heart className="stat-icon" />
              <span>{collectedMonsters.length}/{MONSTERS.length} Monster</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <button 
          className={`nav-btn ${view === 'home' ? 'active' : ''}`}
          onClick={() => setView('home')}
        >
          <Moon size={20} />
          <span>Wecker</span>
        </button>
        <button 
          className={`nav-btn ${view === 'collection' ? 'active' : ''}`}
          onClick={() => setView('collection')}
        >
          <Gift size={20} />
          <span>Sammlung</span>
        </button>
        <button 
          className={`nav-btn ${view === 'stats' ? 'active' : ''}`}
          onClick={() => setView('stats')}
        >
          <Trophy size={20} />
          <span>Erfolge</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {view === 'home' && (
          <HomeView
            currentTime={currentTime}
            alarms={alarms}
            alarmTime={alarmTime}
            alarmName={alarmName}
            setAlarmTime={setAlarmTime}
            setAlarmName={setAlarmName}
            addAlarm={addAlarm}
            toggleAlarm={toggleAlarm}
            deleteAlarm={deleteAlarm}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
          />
        )}

        {view === 'collection' && (
          <CollectionView
            collectedMonsters={collectedMonsters}
            points={points}
          />
        )}

        {view === 'stats' && (
          <StatsView
            points={points}
            streak={streak}
            collectedMonsters={collectedMonsters}
          />
        )}
      </main>

      {/* Alarm Modal */}
      {isAlarmRinging && !showGame && (
        <AlarmModal
          message={message}
          onSnooze={snoozeAlarm}
          onDismiss={dismissAlarm}
        />
      )}

      {/* Game Modal */}
      {showGame && (
        <GameModal
          gameType={gameType}
          onComplete={completeGame}
        />
      )}

      {/* Floating Monsters */}
      {collectedMonsters.length > 0 && (
        <div className="floating-monsters">
          {collectedMonsters.slice(0, 5).map((monster, index) => (
            <div
              key={monster.id}
              className="floating-monster"
              style={{
                left: `${10 + index * 15}%`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {monster.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Home View Component
function HomeView({ currentTime, alarms, alarmTime, alarmName, setAlarmTime, setAlarmName, addAlarm, toggleAlarm, deleteAlarm, soundEnabled, setSoundEnabled }) {
  return (
    <div className="home-view">
      {/* Aktuelle Zeit */}
      <div className="time-display">
        <div className="current-time neon-glow">
          {currentTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="current-date">
          {currentTime.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Neuer Wecker */}
      <div className="alarm-creator card">
        <h2>
          <Zap className="icon-inline" />
          Neuer Wecker
        </h2>
        <div className="alarm-form">
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="time-input"
          />
          <input
            type="text"
            value={alarmName}
            onChange={(e) => setAlarmName(e.target.value)}
            placeholder="Name (optional)"
            className="name-input"
          />
          <button onClick={addAlarm} className="btn-primary glow-pulse">
            <Sparkles size={18} />
            Hinzufügen
          </button>
        </div>
        <div className="sound-toggle">
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="btn-icon">
            {soundEnabled ? <Volume2 /> : <VolumeX />}
          </button>
          <span>Sound {soundEnabled ? 'an' : 'aus'}</span>
        </div>
      </div>

      {/* Alarm-Liste */}
      <div className="alarms-list">
        <h2>
          <Moon className="icon-inline" />
          Deine Wecker
        </h2>
        {alarms.length === 0 ? (
          <p className="empty-state">Noch keine Wecker erstellt. Zeit für einen neuen! ✨</p>
        ) : (
          alarms.map(alarm => (
            <div key={alarm.id} className={`alarm-item card ${alarm.enabled ? 'enabled' : 'disabled'}`}>
              <div className="alarm-info">
                <div className="alarm-time">{alarm.time}</div>
                <div className="alarm-name">{alarm.name}</div>
              </div>
              <div className="alarm-controls">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={alarm.enabled}
                    onChange={() => toggleAlarm(alarm.id)}
                  />
                  <span className="slider"></span>
                </label>
                <button onClick={() => deleteAlarm(alarm.id)} className="btn-delete">
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Collection View Component
function CollectionView({ collectedMonsters, points }) {
  return (
    <div className="collection-view">
      <h2 className="section-title">
        <Gift className="icon-inline" />
        Deine Monster-Sammlung
      </h2>
      <div className="monsters-grid">
        {MONSTERS.map(monster => {
          const isCollected = collectedMonsters.find(m => m.id === monster.id);
          return (
            <div
              key={monster.id}
              className={`monster-card card ${isCollected ? 'collected' : 'locked'}`}
              style={{ borderColor: isCollected ? monster.color : '#333' }}
            >
              <div className="monster-emoji">{isCollected ? monster.emoji : '❓'}</div>
              <div className="monster-name">{isCollected ? monster.name : '???'}</div>
              <div className={`monster-rarity rarity-${monster.rarity}`}>
                {isCollected ? monster.rarity : 'Noch nicht freigeschaltet'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Stats View Component
function StatsView({ points, streak, collectedMonsters }) {
  const achievements = [
    { id: 1, title: 'Frühaufsteher', desc: 'Stehe 7 Tage hintereinander auf', unlocked: streak >= 7 },
    { id: 2, title: 'Monster-Sammler', desc: 'Sammle 5 Monster', unlocked: collectedMonsters.length >= 5 },
    { id: 3, title: 'Punktejäger', desc: 'Erreiche 100 Punkte', unlocked: points >= 100 },
    { id: 4, title: 'Vollständigkeit', desc: 'Sammle alle Monster', unlocked: collectedMonsters.length === MONSTERS.length },
    { id: 5, title: 'Streak-Meister', desc: 'Erreiche einen 30-Tage-Streak', unlocked: streak >= 30 },
    { id: 6, title: 'Punktekönig', desc: 'Erreiche 1000 Punkte', unlocked: points >= 1000 },
  ];

  return (
    <div className="stats-view">
      <h2 className="section-title">
        <Trophy className="icon-inline" />
        Deine Erfolge
      </h2>
      
      <div className="stats-overview">
        <div className="stat-card card">
          <Star className="stat-card-icon" />
          <div className="stat-value">{points}</div>
          <div className="stat-label">Gesamtpunkte</div>
        </div>
        <div className="stat-card card">
          <Zap className="stat-card-icon" />
          <div className="stat-value">{streak}</div>
          <div className="stat-label">Tage Streak</div>
        </div>
        <div className="stat-card card">
          <Heart className="stat-card-icon" />
          <div className="stat-value">{collectedMonsters.length}</div>
          <div className="stat-label">Monster gesammelt</div>
        </div>
      </div>

      <div className="achievements-list">
        <h3>Errungenschaften</h3>
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`achievement-item card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          >
            <Trophy className={achievement.unlocked ? 'achievement-icon-unlocked' : 'achievement-icon-locked'} />
            <div className="achievement-info">
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-desc">{achievement.desc}</div>
            </div>
            {achievement.unlocked && <span className="achievement-badge">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Alarm Modal Component
function AlarmModal({ message, onSnooze, onDismiss }) {
  return (
    <div className="modal-overlay">
      <div className="modal alarm-modal">
        <div className="alarm-animation">
          <Sun className="sun-icon rotate" size={80} />
        </div>
        <h2 className="alarm-title neon-glow">Zeit aufzustehen! ⏰</h2>
        <p className="alarm-message">{message}</p>
        <div className="alarm-buttons">
          <button onClick={onSnooze} className="btn-secondary">
            <Moon size={20} />
            5 Min Snooze
          </button>
          <button onClick={onDismiss} className="btn-primary glow-pulse">
            <Sparkles size={20} />
            Aufstehen!
          </button>
        </div>
      </div>
    </div>
  );
}

// Game Modal Component
function GameModal({ gameType, onComplete }) {
  if (gameType === 'math') {
    return <MathGame onComplete={onComplete} />;
  } else if (gameType === 'memory') {
    return <MemoryGame onComplete={onComplete} />;
  } else if (gameType === 'sequence') {
    return <SequenceGame onComplete={onComplete} />;
  }
  return null;
}

// Math Game
function MathGame({ onComplete }) {
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState('');
  const correctAnswer = num1 + num2;

  const handleSubmit = () => {
    if (parseInt(answer) === correctAnswer) {
      alert('🎉 Richtig! Du bist wach!');
      onComplete(true);
    } else {
      alert('❌ Nicht ganz... Versuch es nochmal!');
      setAnswer('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal game-modal">
        <h2 className="game-title">Schnelle Mathe! 🧮</h2>
        <p className="game-instruction">Löse die Aufgabe, um aufzustehen:</p>
        <div className="math-problem">
          <span className="math-number">{num1}</span>
          <span className="math-operator">+</span>
          <span className="math-number">{num2}</span>
          <span className="math-operator">=</span>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="math-input"
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <button onClick={handleSubmit} className="btn-primary glow-pulse">
          Prüfen
        </button>
      </div>
    </div>
  );
}

// Memory Game
function MemoryGame({ onComplete }) {
  const emojis = ['🌟', '💖', '🦄', '✨', '🌈', '🍒'];
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showSequence, setShowSequence] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const newSequence = [];
    for (let i = 0; i < 4; i++) {
      newSequence.push(emojis[Math.floor(Math.random() * emojis.length)]);
    }
    setSequence(newSequence);
    
    setTimeout(() => {
      setShowSequence(false);
      setGameStarted(true);
    }, 3000);
  }, []);

  const handleEmojiClick = (emoji) => {
    if (!gameStarted) return;
    
    const newUserSequence = [...userSequence, emoji];
    setUserSequence(newUserSequence);

    if (newUserSequence.length === sequence.length) {
      if (JSON.stringify(newUserSequence) === JSON.stringify(sequence)) {
        alert('🎉 Perfekt! Du hast dir alles gemerkt!');
        onComplete(true);
      } else {
        alert('❌ Fast! Versuch es nochmal!');
        setUserSequence([]);
        setShowSequence(true);
        setGameStarted(false);
        setTimeout(() => {
          setShowSequence(false);
          setGameStarted(true);
        }, 3000);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal game-modal">
        <h2 className="game-title">Memory Challenge! 🧠</h2>
        <p className="game-instruction">
          {showSequence ? 'Merke dir die Reihenfolge!' : 'Wiederhole die Sequenz!'}
        </p>
        {showSequence && (
          <div className="sequence-display">
            {sequence.map((emoji, index) => (
              <span key={index} className="sequence-emoji bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                {emoji}
              </span>
            ))}
          </div>
        )}
        {!showSequence && (
          <div className="emoji-grid">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="emoji-btn"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        <div className="user-sequence">
          {userSequence.map((emoji, index) => (
            <span key={index} className="user-emoji">{emoji}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sequence Game
function SequenceGame({ onComplete }) {
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [showPattern, setShowPattern] = useState(true);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const newPattern = [];
    for (let i = 0; i < 5; i++) {
      newPattern.push(Math.floor(Math.random() * 4));
    }
    setPattern(newPattern);
    
    playPattern(newPattern);
  }, []);

  const playPattern = async (patternToPlay) => {
    for (let i = 0; i < patternToPlay.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveButton(patternToPlay[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveButton(null);
    }
    setShowPattern(false);
  };

  const handleButtonClick = (index) => {
    if (showPattern) return;
    
    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    if (newUserPattern[newUserPattern.length - 1] !== pattern[newUserPattern.length - 1]) {
      alert('❌ Falsch! Versuch es nochmal!');
      setUserPattern([]);
      setShowPattern(true);
      playPattern(pattern);
      return;
    }

    if (newUserPattern.length === pattern.length) {
      alert('🎉 Perfekt! Du hast das Muster richtig wiederholt!');
      onComplete(true);
    }
  };

  const colors = ['#ff006e', '#7209b7', '#06ffa5', '#ffb703'];

  return (
    <div className="modal-overlay">
      <div className="modal game-modal">
        <h2 className="game-title">Pattern Match! 🎨</h2>
        <p className="game-instruction">
          {showPattern ? 'Schau dir das Muster an!' : 'Wiederhole das Muster!'}
        </p>
        <div className="pattern-grid">
          {[0, 1, 2, 3].map(index => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`pattern-btn ${activeButton === index ? 'active' : ''}`}
              style={{
                backgroundColor: colors[index],
                opacity: activeButton === index ? 1 : 0.5,
              }}
            />
          ))}
        </div>
        <div className="progress-dots">
          {pattern.map((_, index) => (
            <span
              key={index}
              className={`progress-dot ${index < userPattern.length ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
