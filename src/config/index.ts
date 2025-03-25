const ENV = process.env;

const config = {
  app: {
    env: ENV.REACT_APP_ENV,
    version: ENV.REACT_APP_VERSION,
    isDev: ENV.REACT_APP_ENV === "development",
    isProd: ENV.REACT_APP_ENV === "production",
    isSandbox: ENV.REACT_APP_ENV === "sandbox",
    public_url: ENV.PUBLIC_URL,
  },
  language: {
    key: "language",
    initial: "ru",
    list: ["uz", "ru", "en"],
  },
  api: {
    base_url: ENV.REACT_APP_API_BASE_URL,
    client: {
      id: ENV.REACT_APP_API_CLIENT_ID,
      secret: ENV.REACT_APP_API_CLIENT_SECRET,
    },
    access_token_key: "access-token",
    refresh_token_key: "refresh-token",
  },
  list: {
    perPage: 20,
  },
  links: {
    support: "",
  },
  sentry: {
    dsn: ENV.REACT_APP_SENTRY_DSN,
  },
};

export default config;
