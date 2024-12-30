import * as Sentry from "@sentry/bun";

const dsn = Bun.env.SENTRY_DSN;
if (!dsn) {
  throw new Error("SENTRY_DSN is not set");
}

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn,

  // Add Performance Monitoring by setting tracesSampleRate
  // Set tracesSampleRate to 1.0 to capture 100% of transactions
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
});

export default Sentry;
