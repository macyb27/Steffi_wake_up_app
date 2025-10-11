import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
// Temporarily remove react-icons
import { Alarm, DayOfWeek } from '../types';
import { theme } from '../styles/theme';
import { getMonsterById } from '../utils/monsters';

interface AlarmCardProps {
  alarm: Alarm;
  onToggle: (id: string) => void;
  onEdit: (alarm: Alarm) => void;
  onDelete: (id: string) => void;
}

const Card = styled(motion.div)<{ enabled: boolean }>`
  background: ${({ enabled }) => enabled ? theme.colors.surface : theme.colors.background};
  border: 2px solid ${({ enabled }) => enabled ? theme.colors.primary : theme.colors.surfaceLight};
  border-radius: ${theme.borderRadius.large};
  padding: 20px;
  margin-bottom: 16px;
  opacity: ${({ enabled }) => enabled ? 1 : 0.6};
  transition: all 0.3s ease;
  
  ${({ enabled }) => enabled && `
    box-shadow: ${theme.shadows.medium};
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Time = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: 8px;
  border-radius: ${theme.borderRadius.small};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary};
    background: rgba(255, 16, 240, 0.1);
  }
`;

const ToggleButton = styled(motion.button)<{ enabled: boolean }>`
  background: ${({ enabled }) => enabled ? theme.colors.primary : theme.colors.surfaceLight};
  border: none;
  color: ${theme.colors.text};
  cursor: pointer;
  padding: 8px;
  border-radius: ${theme.borderRadius.small};
  transition: all 0.2s ease;
  font-size: 20px;
`;

const Label = styled.p`
  font-size: 18px;
  color: ${theme.colors.text};
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const DaysContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const DayBadge = styled.div<{ active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  background: ${({ active }) => active ? theme.colors.primary : theme.colors.surfaceLight};
  color: ${({ active }) => active ? theme.colors.text : theme.colors.textSecondary};
  transition: all 0.2s ease;
`;

const MonsterPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
`;

const Tag = styled.div`
  background: rgba(255, 16, 240, 0.2);
  color: ${theme.colors.primary};
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.small};
  font-size: 12px;
  font-weight: 600;
`;

const dayNames = ['S', 'M', 'D', 'M', 'D', 'F', 'S'];

export const AlarmCard: React.FC<AlarmCardProps> = ({
  alarm,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const monster = getMonsterById(alarm.monsterId);
  
  return (
    <Card
      enabled={alarm.enabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <Header>
        <Time>{alarm.time}</Time>
        <Actions>
          <ToggleButton
            enabled={alarm.enabled}
            onClick={() => onToggle(alarm.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {alarm.enabled ? <FiBell /> : <FiBellOff />}
          </ToggleButton>
          <IconButton
            onClick={() => onEdit(alarm)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiEdit size={20} />
          </IconButton>
          <IconButton
            onClick={() => onDelete(alarm.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiTrash2 size={20} />
          </IconButton>
        </Actions>
      </Header>
      
      {alarm.label && <Label>{alarm.label}</Label>}
      
      <Details>
        <DaysContainer>
          {dayNames.map((day, index) => (
            <DayBadge
              key={index}
              active={alarm.repeat.includes(index as DayOfWeek)}
            >
              {day}
            </DayBadge>
          ))}
        </DaysContainer>
        
        {monster && (
          <MonsterPreview>
            <span>{monster.emoji}</span>
            <span style={{ fontSize: '14px' }}>{monster.name}</span>
          </MonsterPreview>
        )}
        
        {alarm.miniGameRequired && (
          <Tag>Mini-Spiel erforderlich</Tag>
        )}
      </Details>
    </Card>
  );
};