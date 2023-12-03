FROM node:alpine AS build

RUN npm i -g pnpm turbo
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json pnpm-lock.yaml ./

# apps
COPY apps/web/package.json ./apps/web/package.json

# packages
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

RUN pnpm install

COPY . ./

RUN turbo run build
COPY apps/web/.next ./apps/web/.next

CMD ["turbo", "run", "dev"]