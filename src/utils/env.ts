const envVars = [
  "NODE_ENV",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
  "GOOGLE_OAUTH_CLIENT_ID",
  "GOOGLE_OAUTH_CLIENT_SECRET",
] as const;

const env = envVars.reduce(
  (prev, curr) => ({ ...prev, [curr]: process.env[curr] }),
  {}
);

Object.entries(env).forEach(([key, val]) => {
  if (!val) {
    throw new Error(`Cannot parse environment variable: ${key} is not set.`);
  }
});

export default env as {
  [key in typeof envVars[number]]: NonNullable<typeof process.env[key]>;
};
