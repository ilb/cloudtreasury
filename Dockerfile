# Install dependencies only when needed
FROM node:16.13-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --update libc6-compat openssl openssl-dev
#RUN npm i -g pnpm
WORKDIR /app
#https://github.com/prisma/prisma/issues/3554
ENV PRISMA_BINARIES_MIRROR http://prisma-builds.s3-eu-west-1.amazonaws.com
COPY package.json package-lock.json ./

COPY patches patches

RUN npm install #--frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.13-alpine AS builder
RUN apk add --update libc6-compat openssl openssl-dev
RUN npm i -g npm@10.0.0
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
#FROM node:16.13-alpine AS runner
FROM bcgovimages/alpine-node-libreoffice as runner

#RUN apk update
#RUN apk add --update libc6-compat openssl openssl-dev
#ENV PYTHONUNBUFFERED=1
#RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
#RUN apk add libreoffice

#RUN npm i -g pnpm
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

#RUN apk add py3-setuptools py3-pandas py3-lxml py3-dicttoxml
#RUN mkdir /home/stockvaluation
#RUN wget -qO - https://github.com/ilb/stockvaluation/archive/refs/tags/1.0.1.tar.gz |tar xz -C /home/stockvaluation --strip-components=1
#RUN cd /home/stockvaluation/fairpricecalc && python setup.py install

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD set -e &&  npm run ilb-deploy && npm start
