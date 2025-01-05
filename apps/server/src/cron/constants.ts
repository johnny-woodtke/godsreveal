export enum Cron {
  GodsRevealKeepAlive = "God's Reveal Keep Alive",
}

export const Patterns: Record<Cron, string> = {
  [Cron.GodsRevealKeepAlive]: "* */2 * * *", // every 2 minutes
};
