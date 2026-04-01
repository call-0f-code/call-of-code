FROM node:lts-alpine AS base
WORKDIR /frontend

# -----------------------------
# deps stage - cache dependencies
# -----------------------------
FROM base AS deps

COPY package.json package-lock* ./
RUN npm install --frozen-lockfile

# -----------------------------
# build stage - compile TypeScript to JavaScript
# -----------------------------

FROM deps AS build

# Build-time args (passed via --build-arg)
ARG API_BASE_URL
ARG GITHUB_TOKEN

# API_BASE_URL is used in server-side API routes only (no browser access needed)
# so it must NOT have the NEXT_PUBLIC_ prefix - keep the exact name the code expects
ENV API_BASE_URL=$API_BASE_URL
ENV GITHUB_TOKEN=$GITHUB_TOKEN

COPY . .
RUN npm run build



# -----------------------------
# development stage
# -----------------------------
FROM deps AS development
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# -----------------------------
# production stage
# -----------------------------

    
FROM node:lts-alpine AS production

WORKDIR /var/www/coc-api

RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -s /bin/sh -D bunjs

# Copy everything Next.js needs to run in production
COPY --from=build --chown=bunjs:nodejs /frontend/.next/standalone ./
COPY --from=build --chown=bunjs:nodejs /frontend/.next/static ./.next/static
COPY --from=build --chown=bunjs:nodejs /frontend/public ./public

RUN chown -R bunjs:nodejs /var/www/coc-api

USER bunjs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

ENV PORT=5000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]