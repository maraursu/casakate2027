export function asset(path: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, "")}`;
}

export function apiUrl(path: string) {
  const root = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${root}${path.startsWith("/") ? path : `/${path}`}`;
}
