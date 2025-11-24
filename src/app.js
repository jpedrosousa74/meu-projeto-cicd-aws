const express = require('express');
const app = express();

app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from AWS ECS!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    region: process.env.AWS_REGION || 'us-east-1',
    timestamp: new Date().toISOString()
  });
});

// Health check - importante para ECS
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Informações da aplicação
app.get('/info', (req, res) => {
  res.json({
    name: 'meu-projeto-cicd-aws',
    description: 'Projeto CI/CD na AWS com ECS',
    node_version: process.version,
    platform: process.platform,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota para testar variáveis de ambiente
app.get('/env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    AWS_REGION: process.env.AWS_REGION,
    PORT: process.env.PORT || 3000
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
