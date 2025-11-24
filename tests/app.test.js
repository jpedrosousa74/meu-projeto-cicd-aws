const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  
  describe('GET /', () => {
    test('should return welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('AWS ECS');
    });
  });

  describe('GET /health', () => {
    test('should return 200 and healthy status', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('healthy');
    });
  });

  describe('GET /info', () => {
    test('should return app information', async () => {
      const response = await request(app).get('/info');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name');
    });
  });

  describe('GET /env', () => {
    test('should return environment variables', async () => {
      const response = await request(app).get('/env');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('PORT');
    });
  });

  describe('GET /nonexistent', () => {
    test('should return 404', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.statusCode).toBe(404);
    });
  });
});
