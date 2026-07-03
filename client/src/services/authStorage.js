const STORAGE_KEY = 'doctorappoints.auth';

function getStorageCandidates() {
  return [window.localStorage, window.sessionStorage];
}

export function getStoredAuth() {
  if (typeof window === 'undefined') {
    return null;
  }

  for (const storage of getStorageCandidates()) {
    const rawValue = storage.getItem(STORAGE_KEY);
    if (!rawValue) {
      continue;
    }

    try {
      return JSON.parse(rawValue);
    } catch {
      storage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

export function saveAuth(auth, rememberMe) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);

  const payload = JSON.stringify({
    token: auth.token,
    user: auth.user,
    rememberMe
  });

  const storage = rememberMe ? window.localStorage : window.sessionStorage;
  storage.setItem(STORAGE_KEY, payload);
}

export function clearAuth() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}