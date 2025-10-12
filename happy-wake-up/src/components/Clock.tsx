import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { theme } from '../styles/theme';

const ClockContainer = styled(motion.div)`
  text-align: center;
  margin: 40px 0;
`;

const TimeDisplay = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 120px;
  font-weight: 700;
  margin: 0;
  background: ${theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: ${theme.colors.glowPink};
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const DateDisplay = styled.p`
  font-size: 24px;
  color: ${theme.colors.textSecondary};
  margin: 8px 0 0 0;
  font-weight: 300;
`;

const SecondHand = styled(motion.div)`
  width: 2px;
  height: 40px;
  background: ${theme.colors.accent};
  margin: 0 auto;
  border-radius: 1px;
  box-shadow: ${theme.colors.glowCyan};
`;

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <ClockContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TimeDisplay>
        {format(time, 'HH:mm')}
      </TimeDisplay>
      <SecondHand
        animate={{ rotate: (time.getSeconds() * 6) }}
        transition={{ type: "spring", stiffness: 60 }}
      />
      <DateDisplay>
        {format(time, 'EEEE, d. MMMM yyyy', { locale: de })}
      </DateDisplay>
    </ClockContainer>
  );
};