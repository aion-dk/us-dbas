# syntax=docker/dockerfile:1
FROM 534003348933.dkr.ecr.eu-west-1.amazonaws.com/nodejs:18-dev-latest

WORKDIR /usr/src/app

COPY --link package.json package-lock.json ./

RUN npm ci
RUN npx playwright install --with-deps

COPY . .
