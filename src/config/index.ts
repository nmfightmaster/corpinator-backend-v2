import dotenv from "dotenv";
import pkg from "../../package.json" with { type: "json" };
const { version } = pkg;

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
    baseUrl: string;
    compatibilityDate: string;
    userAgent: string;
  };
  session: {
    eveSessionTtlMs: number;
    secret: string;
  };
  cors: {
    origins: string[];
  };
  frontendUrl: string;
  crypto: {
    encryptionKey: string;
  };
  secureCookies: boolean;
  trustProxy: number | false;
}

const requiredVars = [
  "SESSION_SECRET",
  "DATABASE_URL",
  "EVE_CLIENT_ID",
  "EVE_CLIENT_SECRET",
  "EVE_REDIRECT_URI",
  "CORS_ALLOWED_ORIGINS",
  "ENCRYPTION_KEY",
  "EVE_BASE_URL",
  "EVE_COMPATIBILITY_DATE",
  "SECURE_COOKIES",
  "FRONTEND_URL",
  "EVE_EMAIL",
  "EVE_APP_NAME",
  "TRUST_PROXY",
];

for (const varName of requiredVars) {
  if (!process.env[varName]) throw new Error(`${varName} not set.`);
}

const origins = (process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim());

const userAgentComponents = [
  process.env.EVE_EMAIL,
  process.env.EVE_APP_NAME! + "/" + version,
  process.env.EVE_SOURCE_CODE_URL,
  process.env.EVE_DISCORD_USERNAME,
  process.env.EVE_CHARACTER,
];

const userAgent = userAgentComponents.filter(Boolean).join(" ");

const encryptionKey = process.env.ENCRYPTION_KEY!;
if (!(/^[0-9a-f]{64}$/i.test(encryptionKey))) {
  throw new Error("Encryption key must be 32 byte hex value.")
}

const sessionSecret = process.env.SESSION_SECRET!;
if (sessionSecret.length < 64) {
  throw new Error("Session secret must be at least 64 characters.")
}

const falsyValues = ["no", "false", "0"];
const secureCookiesString = process.env.SECURE_COOKIES!.toLowerCase();
const secureCookies = !falsyValues.includes(secureCookiesString);

const trustProxy = process.env.TRUST_PROXY === "1" ? 1 : false;

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "local",
  logs: {
    level: process.env.LOG_LEVEL || "warn",
  },
  api: {
    prefix: "/api",
  },
  databaseUrl: process.env.DATABASE_URL!,
  eve: {
    clientId: process.env.EVE_CLIENT_ID!,
    clientSecret: process.env.EVE_CLIENT_SECRET!,
    redirectUri: process.env.EVE_REDIRECT_URI!,
    baseUrl: process.env.EVE_BASE_URL!,
    compatibilityDate: process.env.EVE_COMPATIBILITY_DATE!,
    userAgent,
  },
  session: {
    eveSessionTtlMs: Number(process.env.EVE_SESSION_TTL_MS) || 86400000,
    secret: sessionSecret,
  },
  cors: {
    origins,
  },
  frontendUrl: process.env.FRONTEND_URL!,
  crypto: {
    encryptionKey,
  },
  secureCookies,
  trustProxy,
};

export default config;
