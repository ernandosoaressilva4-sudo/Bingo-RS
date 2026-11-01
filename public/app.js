:root {
  --bg: #060b16;
  --bg-soft: #0d172a;
  --panel: rgba(15, 23, 42, 0.82);
  --panel-strong: #101b2f;
  --panel-alt: rgba(17, 24, 39, 0.9);
  --border: rgba(148, 163, 184, 0.18);
  --primary: #f4b942;
  --primary-strong: #f59e0b;
  --success: #34d399;
  --success-soft: rgba(52, 211, 153, 0.14);
  --danger: #f87171;
  --text: #edf2ff;
  --muted: #b0bfd9;
  --shadow: 0 20px 50px rgba(2, 6, 23, 0.45);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top, rgba(244, 185, 66, 0.16), transparent 28%),
    linear-gradient(135deg, #030712, #0b1120 38%, #111827 100%);
  color: var(--text);
}

button,
input,
textarea {
  font: inherit;
}

button {
  transition: all 0.2s ease;
}

.page-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px 56px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.eyebrow,
.section-label {
  margin: 0 0 8px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--primary);
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  letter-spacing: -0.06em;
}

h2 {
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.room-pill {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(244, 185, 66, 0.12);
  border: 1px solid rgba(244, 185, 66, 0.35);
  color: #fef3c7;
  font-weight: 700;
  white-space: nowrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card {
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: var(--shadow);
}

.stat-card span {
  display: block;
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-card strong {
  font-size: clamp(1.4rem, 2.4vw, 2.1rem);
}

.layout {
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(360px, 1.2fr);
  gap: 24px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 22px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
}

.panel-header {
  margin-bottom: 18px;
}

.stack-form,
.client-form {
  display: grid;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

input,
textarea {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(15, 23, 42, 0.72);
  color: var(--text);
  padding: 12px 14px;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: rgba(244, 185, 66, 0.72);
  box-shadow: 0 0 0 4px rgba(244, 185, 66, 0.12);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

button {
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  transform: translateY(-1px);
}

button.primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: #0f172a;
  box-shadow: 0 10px 22px rgba(245, 158, 11, 0.2);
}

button.secondary {
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: var(--text);
}

button.ghost {
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.2);
  color: #d1fae5;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.mini-panel {
  margin-top: 22px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 18px;
  padding: 16px 18px;
}

.mini-panel h3 {
  margin-bottom: 12px;
  font-size: 1rem;
}

.tag-list,
.clients-list,
.winner-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag-list li,
.winner-list li {
  background: rgba(244, 185, 66, 0.12);
  color: #fef3c7;
  border: 1px solid rgba(244, 185, 66, 0.2);
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
}

.clients-list li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(96, 165, 250, 0.2);
  color: #dbeafe;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.9rem;
}

.clients-list button {
  font-size: 0.75rem;
  padding: 7px 10px;
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.32);
  color: #d1fae5;
}

.client-form {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.client-form button {
  align-self: end;
  min-height: 48px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 26px 0 18px;
}

#clientAliasTag {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(96, 165, 250, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.25);
  color: #dbeafe;
  font-weight: 600;
}

.card-board {
  display: grid;
  grid-template-columns: repeat(5, minmax(54px, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.card-cell {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 6px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.15);
  color: var(--text);
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.2;
  word-break: break-word;
  cursor: pointer;
  user-select: none;
}

.card-cell.called {
  background: rgba(244, 185, 66, 0.14);
  border-color: rgba(244, 185, 66, 0.8);
  color: #fef3c7;
}

.card-cell.marked {
  background: rgba(52, 211, 153, 0.2);
  border-color: rgba(52, 211, 153, 0.75);
  color: #d1fae5;
  box-shadow: inset 0 0 0 1px rgba(52, 211, 153, 0.3);
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .page-shell {
    padding-left: 14px;
    padding-right: 14px;
  }

  .stats-grid,
  .client-form {
    grid-template-columns: 1fr;
  }

  .topbar,
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .card-board {
    gap: 8px;
  }

  .card-cell {
    min-height: 68px;
    font-size: 0.7rem;
  }
}
