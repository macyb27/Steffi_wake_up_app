import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { Button } from './Button';
import confetti from 'canvas-confetti';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const OnboardingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.background};
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const OnboardingCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 3px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large};
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: ${theme.shadows.neon};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 16, 240, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 48px;
  margin: 0 0 16px 0;
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: ${theme.colors.textSecondary};
  margin: 0 0 40px 0;
  line-height: 1.5;
`;

const InputContainer = styled.div`
  margin: 32px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  color: ${theme.colors.text};
  margin-bottom: 12px;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 20px;
  font-family: ${theme.fonts.primary};
  background: ${theme.colors.background};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.medium};
  color: ${theme.colors.text};
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    box-shadow: 0 0 20px rgba(255, 16, 240, 0.3);
    border-color: ${theme.colors.primaryLight};
  }
  
  &::placeholder {
    color: ${theme.colors.textSecondary};
    opacity: 0.7;
  }
`;

const EmojiRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 32px 0;
  font-size: 60px;
`;

const AnimatedEmoji = styled(motion.div)``;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  font-size: 14px;
  margin-top: 16px;
  text-decoration: underline;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      // Celebration!
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#FF10F0', '#FF6EC7', '#00FFFF'],
      });
      
      setTimeout(() => {
        onComplete(name.trim());
      }, 1000);
    }
  };
  
  const handleSkip = () => {
    onComplete('Prinzessin');
  };
  
  return (
    <AnimatePresence>
      <OnboardingOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <OnboardingCard
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Content>
            <Title>Willkommen! 🌈</Title>
            <Subtitle>
              Lass uns deine Wake-Up Experience personalisieren!
            </Subtitle>
            
            <form onSubmit={handleSubmit}>
              <InputContainer>
                <Label>Wie heißt du? ✨</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setShowEmojis(e.target.value.length > 0);
                  }}
                  placeholder="Dein Name..."
                  autoFocus
                  maxLength={20}
                />
              </InputContainer>
              
              {showEmojis && (
                <EmojiRow>
                  <AnimatedEmoji
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    👑
                  </AnimatedEmoji>
                  <AnimatedEmoji
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    💕
                  </AnimatedEmoji>
                  <AnimatedEmoji
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    ✨
                  </AnimatedEmoji>
                </EmojiRow>
              )}
              
              <Button
                type="submit"
                size="large"
                fullWidth
                glow
                disabled={!name.trim()}
              >
                Los geht's! 🎉
              </Button>
            </form>
            
            <SkipButton onClick={handleSkip}>
              Überspringen und als "Prinzessin" fortfahren
            </SkipButton>
          </Content>
        </OnboardingCard>
      </OnboardingOverlay>
    </AnimatePresence>
  );
};