import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { Button } from './Button';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onNameChange: (name: string) => void;
}

const SettingsOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(5px);
`;

const SettingsModal = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large};
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: ${theme.shadows.neon};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: 32px;
  margin: 0;
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${theme.colors.textSecondary};
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.round};
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 16, 240, 0.1);
    color: ${theme.colors.primary};
  }
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: 12px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 18px;
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
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

const Hint = styled.p`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  margin: 8px 0 0 0;
`;

export const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  currentName,
  onNameChange,
}) => {
  const [name, setName] = useState(currentName);
  const [hasChanges, setHasChanges] = useState(false);
  
  const handleSave = () => {
    if (name.trim() && name !== currentName) {
      onNameChange(name.trim());
    }
    onClose();
  };
  
  const handleCancel = () => {
    setName(currentName);
    setHasChanges(false);
    onClose();
  };
  
  const handleNameChange = (value: string) => {
    setName(value);
    setHasChanges(value !== currentName);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <SettingsOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancel}
        >
          <SettingsModal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Header>
              <Title>Einstellungen ⚙️</Title>
              <CloseButton
                onClick={handleCancel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
            </Header>
            
            <Section>
              <Label>Dein Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Wie heißt du?"
                maxLength={20}
              />
              <Hint>
                Dieser Name wird in personalisierten Nachrichten verwendet
              </Hint>
            </Section>
            
            <ButtonGroup>
              <Button
                variant="secondary"
                onClick={handleCancel}
              >
                Abbrechen
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={!name.trim() || !hasChanges}
                glow
              >
                Speichern
              </Button>
            </ButtonGroup>
          </SettingsModal>
        </SettingsOverlay>
      )}
    </AnimatePresence>
  );
};