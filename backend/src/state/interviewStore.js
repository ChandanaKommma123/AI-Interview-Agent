const sessions = new Map();

export function createSession(sessionId, state) {
  sessions.set(sessionId, state);
}

export function getSession(sessionId) {
  return sessions.get(sessionId);
}

export function updateSession(sessionId, state) {
  sessions.set(sessionId, state);
}

export function deleteSession(sessionId) {
  sessions.delete(sessionId);
}