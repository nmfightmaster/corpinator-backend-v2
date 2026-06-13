import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  logs: {
    level: string;
  };
  api: {
    prefix: string;
  };
  databaseUrl: string;
  eve: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "local",
  logs: {
    level: process.env.LOG_LEVEL || "warn",
  },
  api: {
    prefix: "/api",
  },
  databaseUrl: process.env.DATABASE_URL || "",
  eve: {
    clientId: process.env.EVE_CLIENT_ID || "",
    clientSecret: process.env.EVE_CLIENT_SECRET || "",
    redirectUri: process.env.EVE_REDIRECT_URI || "",
  },
};

export default config;
