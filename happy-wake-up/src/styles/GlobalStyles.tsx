import { Global, css } from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fredoka:wght@400;500;600;700&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: ${theme.fonts.primary};
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Scrollbar Styling */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.surface};
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.primary};
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.primaryLight};
      }

      /* Animations */
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.8;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes glow {
        0%, 100% {
          box-shadow: ${theme.shadows.neon};
        }
        50% {
          box-shadow: ${theme.shadows.neon}, 0 0 60px rgba(255, 16, 240, 0.8);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        33% {
          transform: translateY(-10px) rotate(-5deg);
        }
        66% {
          transform: translateY(5px) rotate(5deg);
        }
      }

      @keyframes slideIn {
        from {
          transform: translateX(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Neon Text Effect */
      .neon-text {
        text-shadow: 
          0 0 10px ${theme.colors.primary},
          0 0 20px ${theme.colors.primary},
          0 0 30px ${theme.colors.primary},
          0 0 40px ${theme.colors.primaryLight};
      }

      /* Glass Effect */
      .glass {
        background: rgba(26, 26, 26, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 16, 240, 0.2);
      }
    `}
  />
);