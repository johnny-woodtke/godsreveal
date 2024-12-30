import * as Sentry from "@sentry/bun";

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: "https://226e2f58c868a0d86fbc7b054d371867@o4508558913372160.ingest.us.sentry.io/4508558933950464",

  // Add Performance Monitoring by setting tracesSampleRate
  // Set tracesSampleRate to 1.0 to capture 100% of transactions
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
});

export default Sentry;
