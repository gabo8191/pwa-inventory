const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string) || '';

if (!apiBaseUrl) {
  throw new Error(
    'VITE_API_BASE_URL is not defined. Set it in your env files.',
  );
}

export const env = {
  apiBaseUrl,
};
