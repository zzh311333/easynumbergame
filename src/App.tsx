import { useState, useEffect, useCallback } from 'react';
import { levels, TOTAL_LEVELS } from './levels';
import { loadProgress, saveProgress, clearProgress } from './storage';
import './App.css';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [usedHints, setUsedHints] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const progress = loadProgress();
    if (progress) {
      setCurrentLevel(progress.currentLevel);
      setUsedHints(progress.usedHints);
      setIsCompleted(progress.isCompleted);
    }
  }, []);

  const currentLevelData = levels[currentLevel - 1];

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) {
      setMessage({ text: '请输入密码！', type: 'error' });
      return;
    }

    if (inputValue.trim() === currentLevelData.answer) {
      if (currentLevel < TOTAL_LEVELS) {
        const newLevel = currentLevel + 1;
        setCurrentLevel(newLevel);
        setMessage({ text: '密码正确！正在进入下一关...', type: 'success' });
        const newProgress = {
          currentLevel: newLevel,
          usedHints,
          isCompleted: false,
          lastPlayed: new Date().toISOString(),
        };
        saveProgress(newProgress);
      } else {
        setIsCompleted(true);
        setMessage({ text: '🎉 恭喜！您已解锁所有密码！', type: 'success' });
        saveProgress({
          currentLevel,
          usedHints,
          isCompleted: true,
          lastPlayed: new Date().toISOString(),
        });
      }
      setInputValue('');
    } else {
      setMessage({ text: '密码错误，请重新尝试！', type: 'error' });
    }
  }, [inputValue, currentLevel, currentLevelData, usedHints]);

  const handleUseHint = useCallback(() => {
    if (!usedHints.includes(currentLevel)) {
      setUsedHints((prev) => [...prev, currentLevel]);
      setMessage({ text: `💡 规律提示：${currentLevelData.pattern}`, type: 'hint' });
    }
  }, [currentLevel, usedHints, currentLevelData]);

  const handleReset = useCallback(() => {
    clearProgress();
    setCurrentLevel(1);
    setUsedHints([]);
    setIsCompleted(false);
    setInputValue('');
    setMessage({ text: '游戏已重置，从第一关开始吧！', type: 'info' });
  }, []);

  const handleClearInput = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">🔐 数字密码解密</h1>
        <p className="subtitle">破解数字规律 · 解锁终极密码</p>
      </header>

      <main className="main">
        <div className="progress-bar">
          <span className="progress-text">
            闯关进度：{currentLevel} / {TOTAL_LEVELS}
          </span>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(currentLevel / TOTAL_LEVELS) * 100}%` }}
            />
          </div>
        </div>

        {isCompleted ? (
          <div className="victory">
            <h2>🏆 恭喜通关！</h2>
            <p>您已成功破解所有数字密码！</p>
          </div>
        ) : (
          <>
            <div className="level-card">
              <div className="level-header">
                <span className="level-badge">第 {currentLevel} 关</span>
                <span className="level-hint-label">规律提示</span>
              </div>
              <div className="hint-box">
                <pre className="hint-text">{currentLevelData.hint}</pre>
              </div>
            </div>

            <div className="input-area">
              <label className="input-label">请输入密码：</label>
              <input
                type="text"
                className="password-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="输入数字..."
                maxLength={10}
              />
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={handleSubmit}>
                提交密码
              </button>
              <button className="btn btn-secondary" onClick={handleClearInput}>
                清空输入
              </button>
              <button
                className="btn btn-hint"
                onClick={handleUseHint}
                disabled={usedHints.includes(currentLevel)}
              >
                {usedHints.includes(currentLevel) ? '已使用提示' : '获取提示'}
              </button>
            </div>
          </>
        )}

        {message.text && (
          <div className={`message message-${message.type}`}>{message.text}</div>
        )}

        <button className="btn btn-reset" onClick={handleReset}>
          重置游戏
        </button>
      </main>
    </div>
  );
}

export default App;