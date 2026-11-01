* {
  box-sizing: border-box;
}

:root {
  --bg: #0f172a;
  --panel: #111827;
  --panel-soft: #1f2937;
  --primary: #f59e0b;
  --primary-dark: #d97706;
  --text: #e5e7eb;
  --muted: #94a3b8;
  --success: #10b981;
  --card-border: rgba(255, 255, 255, 0.1);
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #020617, #111827 50%, #1f2937);
  color: var(--text);
}

button,
input,
textarea {
  font: inherit;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.eyebrow {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--primary);
  font-size: 12px;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2rem, 3vw, 3rem);
}

.room-pill {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.14);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #fbbf24;
  font-weight: 700;
}

.layout {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(320px, 1.2fr);
  gap: 20px;
}

.panel {
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.35);
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  color: var(--muted);
  font-size: 14px;
}

input,
textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.7);
  color: var(--text);
  padding: 12px 14px;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

button {
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  background: var(--primary);
  color: #0f172a;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.14s ease, background 0.14s ease;
}

button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

button.secondary {
  background: rgba(16, 185, 129, 0.15);
  color: #d1fae5;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 20px 0;
}

.history {
  margin-top: 22px;
}

#historyList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

#historyList li {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.12);
  color: #fef3c7;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.client-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.client-form label:last-of-type {
  grid-column: 1 / -1;
}

.card-wrapper {
  margin-top: 26px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

#clientAliasTag {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #bfdbfe;
  font-size: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.card-board {
  display: grid;
  grid-template-columns: repeat(5, minmax(48px, 1fr));
  gap: 8px;
}

.card-cell {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 12px;
  background: rgba(31, 41, 55, 0.8);
  border: 1px solid var(--card-border);
  font-size: 12px;
  line-height: 1.25;
  word-break: break-word;
}

.card-cell.highlight {
  background: rgba(16, 185, 129, 0.22);
  border-color: rgba(16, 185, 129, 0.8);
  color: #d1fae5;
}

@media (max-width: 820px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .client-form {
    grid-template-columns: 1fr;
  }
}
