import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    logs: { 
        level: string
    };
    api: {
        prefix: string
    };
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    
    nodeEnv: process.env.NODE_ENV || 'development',
    
    logs: {
        level: process.env.LOG_LEVEL || 'warn'
    },

    api: {
        prefix: '/api',
    },
};

export default config;