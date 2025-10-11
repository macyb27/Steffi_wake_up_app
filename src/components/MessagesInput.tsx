import React, { useEffect, useState } from 'react';

export type MessageItem = { id: string; text: string };

export function MessagesInput({ onChange }: { onChange: (items: MessageItem[]) => void }) {
  const [items, setItems] = useState<MessageItem[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('messages');
      const saved = raw ? JSON.parse(raw) as MessageItem[] : [];
      setItems(saved);
      onChange(saved);
    } catch {}
  }, [onChange]);

  function persist(next: MessageItem[]) {
    setItems(next);
    onChange(next);
    localStorage.setItem('messages', JSON.stringify(next));
  }

  return (
    <div className="glass panel" style={{ marginTop: 16 }}>
      <div className="card-title">Eigene Nachrichten</div>
      <div className="row">
        <input className="input" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Schreibe eine liebevolle Morgen-Nachricht…" />
        <button className="btn neon" onClick={() => {
          if (!text.trim()) return;
          const next = [{ id: String(Date.now()), text: text.trim() }, ...items].slice(0, 30);
          setText('');
          persist(next);
        }}>Hinzufügen</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
        {items.map(i => (
          <li key={i.id}>
            {i.text}
            <button className="btn" style={{ marginLeft: 8 }} onClick={() => persist(items.filter(x => x.id !== i.id))}>Entfernen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
