import { useState, useEffect, useRef } from 'react';

const skipReasons = [
  'Not the right time',
  'I disagree with this',
  'Already handled',
  'Other',
];

export default function SkipFeedback({ onSelect, onClose }) {
  const ref = useRef(null);
  const [otherText, setOtherText] = useState('');
  const [showOther, setShowOther] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSelect = (reason) => {
    if (reason === 'Other') {
      setShowOther(true);
      return;
    }
    onSelect(reason);
  };

  const handleOtherSubmit = () => {
    onSelect(otherText || 'Other');
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: '100%',
        right: 0,
        marginBottom: 6,
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        padding: 6,
        minWidth: 200,
        zIndex: 50,
        animation: 'fade-in-up 0.15s ease-out',
      }}
    >
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--text-3)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '6px 10px 4px',
      }}>
        Why skip?
      </div>
      {!showOther ? (
        skipReasons.map((reason) => (
          <button
            key={reason}
            onClick={() => handleSelect(reason)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '8px 10px',
              fontSize: 13,
              color: 'var(--text-1)',
              background: 'none',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--surface-2)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            {reason}
          </button>
        ))
      ) : (
        <div style={{ padding: '4px 6px 6px' }}>
          <input
            type="text"
            placeholder="Tell us more..."
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleOtherSubmit()}
            autoFocus
            style={{
              width: '100%',
              height: 32,
              padding: '0 10px',
              fontSize: 13,
              border: '1px solid var(--border)',
              borderRadius: 6,
              outline: 'none',
              marginBottom: 6,
            }}
          />
          <button
            onClick={handleOtherSubmit}
            style={{
              width: '100%',
              padding: '6px 0',
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              background: 'var(--brand)',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
