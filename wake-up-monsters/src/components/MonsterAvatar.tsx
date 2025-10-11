import React from 'react'

export type MonsterAvatarProps = {
  size?: number
  mood?: 'sleepy' | 'happy' | 'party'
}

export const MonsterAvatar: React.FC<MonsterAvatarProps> = ({ size = 64, mood = 'happy' }) => {
  const eyeY = mood === 'sleepy' ? 0.5 : 0.45
  const mouthY = mood === 'sleepy' ? 0.7 : mood === 'party' ? 0.62 : 0.6
  const body = {
    fill: 'url(#grad)'
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden focusable={false}>
      <defs>
        <radialGradient id="grad" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#ff95ea" />
          <stop offset="60%" stopColor="#ff35d4" />
          <stop offset="100%" stopColor="#8a2a77" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#glow)">
        <ellipse cx="50" cy="55" rx="34" ry="30" style={body} />
        {/* Ears */}
        <circle cx="25" cy="32" r="8" fill="#ff35d4" />
        <circle cx="75" cy="32" r="8" fill="#ff35d4" />
        {/* Eyes */}
        <ellipse cx="38" cy={`${eyeY * 100}`} rx="6" ry={mood === 'sleepy' ? 1.8 : 4} fill="#fff"/>
        <ellipse cx="62" cy={`${eyeY * 100}`} rx="6" ry={mood === 'sleepy' ? 1.8 : 4} fill="#fff"/>
        {/* Mouth */}
        {mood === 'happy' && (
          <path d={`M35 ${mouthY*100} Q50 ${mouthY*100 + 8} 65 ${mouthY*100}`} stroke="#fff" strokeWidth="3" fill="none" />
        )}
        {mood === 'sleepy' && (
          <path d={`M35 ${mouthY*100} Q50 ${mouthY*100 - 8} 65 ${mouthY*100}`} stroke="#fff" strokeWidth="2" fill="none" opacity="0.85" />
        )}
        {mood === 'party' && (
          <g>
            <path d={`M35 ${mouthY*100} Q50 ${mouthY*100 + 12} 65 ${mouthY*100}`} stroke="#fff" strokeWidth="3" fill="none" />
            <circle cx="50" cy={mouthY*100 + 3} r="3" fill="#34f5c5" />
          </g>
        )}
      </g>
    </svg>
  )
}
