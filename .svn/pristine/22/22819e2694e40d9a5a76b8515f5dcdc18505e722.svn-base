# ---------- Build Stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# COPY package.json .
COPY package.json* ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_APP_BASE_URL
ENV NEXT_PUBLIC_APP_BASE_URL=$NEXT_PUBLIC_APP_BASE_URL

RUN npm run build:uat

# ---------- Production Stage ----------
FROM node:22-alpine AS production

WORKDIR /app

ENV HOSTNAME=0.0.0.0
ENV PORT=5001

# Copy standalone output
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 5001

CMD ["node", "server.js"]
