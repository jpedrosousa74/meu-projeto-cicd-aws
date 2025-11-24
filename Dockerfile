# Build stage
FROM node:18-alpine AS build

LABEL maintainer="jpedrosousa74@gmail.com"
LABEL description="Projeto CI/CD na AWS"

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências de produção
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar código fonte
COPY src/ ./src/

# Production stage
FROM node:18-alpine

WORKDIR /app

# Instalar dumb-init para signal handling no ECS
RUN apk add --no-cache dumb-init

# Copiar do build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY package*.json ./

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expor porta
EXPOSE 8080

# Health check para ECS
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init como entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Comando
CMD ["node", "src/server.js"]
