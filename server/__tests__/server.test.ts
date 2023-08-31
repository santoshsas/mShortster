import request from 'supertest';
import app from '../index'; // Import your Express app

beforeAll(() => {
  let urlDatabase = {}; // Initialize an empty urlDatabase
  // Populate urlDatabase with valid data
  urlDatabase = {
    'valid-shortcode': {
      url: 'http://example.com/valid-url',
      createdOn: new Date(),
      clicked: 0,
    },
    // Add more valid shortcodes if needed
  };
});

describe('Server Routes', () => {
  it('should respond with a 404 error for an unknown route', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
  });

  it('should create a new short URL without custom shortcode', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(200);
    expect(response.body.shortcode).toBeTruthy();
  });

  it('should create a new short URL with custom shortcode', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ url: 'http://example.com', shortcode: 'valid-shortcode' });

    expect(response.status).toBe(200);
    expect(response.body.shortcode).toBe('valid-shortcode');
  });

  it('should return 400 for invalid URLs', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ url: 'invalid-url' });

    expect(response.status).toBe(400);
  });

  it('should redirect to the original URL for a valid shortcode', async () => {
    // Assuming you have a valid shortcode in urlDatabase
    const response = await request(app).get('/valid-shortcode');
    expect(response.status).toBe(302); // Redirect status code
  });

  it('should return 404 for an invalid shortcode', async () => {
    const response = await request(app).get('/:invalid-shortcode');
    expect(response.status).toBe(404);
  });

  it('should return statistics for a valid shortcode', async () => {
    // Assuming you have a valid shortcode in urlDatabase
    const response = await request(app).get('/valid-shortcode/stats');
    expect(response.status).toBe(200);
    // Add more assertions for the response body
  });

  it('should return 404 for statistics of an invalid shortcode', async () => {
    const response = await request(app).get('/:invalid-shortcode/stats');
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  // Cleanup if needed
  await app.close();
});
