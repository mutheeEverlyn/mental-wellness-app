const request = require('supertest');
const express = require('express');
const testimonialRoutes = require('../routes/testimonialRoutes');

const app = express();
app.use(express.json());
app.use('/testimonials', testimonialRoutes);

describe('GET /testimonials', () => {
  it('should return an array (may be empty) of testimonials', async () => {
    const res = await request(app).get('/testimonials');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
}); 