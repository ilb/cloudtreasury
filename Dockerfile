# Install dependencies only when needed
FROM node:16.17-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --update libc6-compat openssl openssl-dev
WORKDIR /app
COPY package.json package-lock.json ./ 

COPY patches patches

RUN npm install #--frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.17-alpine AS builder
RUN apk add --update libc6-compat openssl openssl-dev
#RUN npm i -g npm
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY *.js *.yaml *.ts? *.json *.lock ./
COPY pages pages
COPY client client
COPY config config
COPY src src
COPY prisma prisma
COPY bin bin


RUN npm run ilb-build
#RUN npm prune --prod

# Production image, copy all the files and run next
#FROM node:16.17-alpine AS runner
#FROM bcgovimages/alpine-node-libreoffice as runner
FROM iconicompany/alpine-node-libreoffice:16.17-alpine as runnner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/package.json /app/package-lock.json /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY prisma prisma
COPY src src
COPY templates templates

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD set -e &&  npm run ilb-deploy && npm start

