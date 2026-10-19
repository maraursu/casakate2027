export function readStore(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStore(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode / blocked storage */
  }
}

export function removeStore(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* private mode / blocked storage */
  }
}
