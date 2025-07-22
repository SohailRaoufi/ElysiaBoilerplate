FROM oven/bun:1.1.13-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:1.1.13-alpine

WORKDIR /app

COPY package*.json ./
RUN bun install --production

# Copy only the build output and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["bun", "run", "dist/index.js"]
