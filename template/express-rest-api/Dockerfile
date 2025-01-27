# Docker image history includes ARG values, so never target this stage directly
FROM node:12-alpine AS unsafe-deps

WORKDIR /workdir

COPY package.json yarn.lock ./

ARG NPM_READ_TOKEN

RUN \
  echo '//registry.npmjs.org/:_authToken=${NPM_READ_TOKEN}' > .npmrc && \
  yarn install --frozen-lockfile --ignore-optional --non-interactive --production && \
  rm .npmrc

###

# Docker image history includes ARG values, so never target this stage directly
FROM unsafe-deps AS unsafe-dev-deps

ARG NPM_READ_TOKEN

RUN \
  echo '//registry.npmjs.org/:_authToken=${NPM_READ_TOKEN}' > .npmrc && \
  yarn install --frozen-lockfile --ignore-optional --non-interactive && \
  rm .npmrc

###

FROM node:12-alpine AS deps

WORKDIR /workdir

COPY --from=unsafe-deps /workdir .

###

FROM node:12-alpine AS dev-deps

WORKDIR /workdir

COPY --from=unsafe-dev-deps /workdir .

###

FROM dev-deps AS build

COPY . .

RUN yarn build

###

FROM node:12-alpine AS runtime

WORKDIR /workdir

COPY --from=build /workdir/lib lib

COPY --from=deps /workdir/node_modules node_modules

ENV NODE_ENV production

ARG PORT=3000
ENV PORT ${PORT}
EXPOSE ${PORT}

CMD node lib/app
