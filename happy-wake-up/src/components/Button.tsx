import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  glow?: boolean;
}

const StyledButton = styled(motion.button)<ButtonProps>`
  font-family: ${theme.fonts.display};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 14px;
          border-radius: ${theme.borderRadius.small};
        `;
      case 'large':
        return `
          padding: 16px 32px;
          font-size: 18px;
          border-radius: ${theme.borderRadius.large};
        `;
      default:
        return `
          padding: 12px 24px;
          font-size: 16px;
          border-radius: ${theme.borderRadius.medium};
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover {
            background: ${theme.colors.primary};
            color: ${theme.colors.text};
            transform: translateY(-2px);
          }
        `;
      case 'glass':
        return `
          background: rgba(255, 16, 240, 0.1);
          backdrop-filter: blur(10px);
          color: ${theme.colors.text};
          border: 1px solid rgba(255, 16, 240, 0.3);
          
          &:hover {
            background: rgba(255, 16, 240, 0.2);
            border-color: rgba(255, 16, 240, 0.5);
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: ${theme.colors.gradient};
          color: ${theme.colors.text};
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.large};
          }
        `;
    }
  }}
  
  ${({ fullWidth }) => fullWidth && `width: 100%;`}
  
  ${({ glow }) => glow && `
    animation: ${theme.animations.glow};
  `}
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
`;

export const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};