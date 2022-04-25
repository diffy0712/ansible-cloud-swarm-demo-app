FROM node:14.19.0-buster-slim as builder

WORKDIR /app

COPY ./package.json /app
COPY ./yarn.lock /app

ENV NODE_ENV=prod

# Set production flag so dev dependencies aren't installed
RUN yarn install

COPY ./src/ /app/src
COPY ./webpack/ /app/webpack
COPY ./.babelrc /app/
COPY ./tsconfig.json /app/
COPY ./.browserslistrc /app/

# Build the production build
RUN yarn build

## Build php dependencies
FROM nginx:1.20.2 as dist

WORKDIR /app

COPY --from=builder /app/build /app
