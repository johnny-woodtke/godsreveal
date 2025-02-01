ARG BUN_VERSION=1.2.2

# Base image with system dependencies
FROM oven/bun:${BUN_VERSION} AS base
WORKDIR /app
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Prune the monorepo
FROM base AS pruned
ARG YARN_PKG_MANAGER="this.packageManager=\"yarn@1.22.22\""
COPY . .
# Generate yarn.lock from bun.lockb
RUN bun install -y
# Temporarily set package manager to yarn for prune
RUN bunx json -I -f package.json -e ${YARN_PKG_MANAGER}
RUN bunx turbo prune --scope=@godsreveal/server --docker

# Install and run
FROM base AS runner
COPY --from=pruned /app/out/full/ .
# Set package manager back to bun
RUN bunx json -I -f package.json -e "this.packageManager=\"bun@${BUN_VERSION}\""
RUN bun install --frozen-lockfile

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080/tcp

USER bun
WORKDIR /app/apps/server

CMD ["bun", "run", "start"]