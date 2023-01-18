import pino from "pino";
import config from './config';

const log = pino(config.NODE_ENV === "development" ? {
  transport: {
    target: "pino-pretty"
  }
} : {})

export default log;
