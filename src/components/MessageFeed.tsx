import React, { useMemo } from 'react';

export type MorningMessage = {
  id: string;
  text: string;
};

export function MessageFeed({ messages }: { messages: MorningMessage[] }) {
  const any = messages && messages.length > 0;
  const picks = useMemo(() => any ? messages.slice(0, 3) : defaultMsgs.slice(0, 3), [messages, any]);
  return (
    <div className="glass panel" style={{ marginTop: 16 }}>
      <div className="card-title">Deine Morgen-Messages</div>
      {!any && <div className="kicker">Nutze später die Eingabe, um eigene Nachrichten hinzuzufügen.</div>}
      <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
        {picks.map(m => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

const defaultMsgs: MorningMessage[] = [
  { id: '1', text: 'Heute wird großartig. Du bist großartig.' },
  { id: '2', text: 'Neuer Tag, neue Chancen – let’s glow.' },
  { id: '3', text: 'Dein Lächeln ist dein Superpower.' },
  { id: '4', text: 'Atme tief ein – Neonenergie on!' },
  { id: '5', text: 'Du schaffst das. Immer.' }
];
