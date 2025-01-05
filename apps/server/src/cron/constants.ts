export enum Cron {
  GodsRevealKeepAlive = "God's Reveal Keep Alive",
}

export const Patterns: Record<Cron, string> = {
  [Cron.GodsRevealKeepAlive]: "* */1 * * *", // every 1 minute
};
