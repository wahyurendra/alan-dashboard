import Cors from 'cors';

// Initializing the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Sesuaikan metode yang diizinkan
  origin: 'http://localhost:3000', // Sesuaikan domain Anda
});

// Helper untuk menjalankan middleware di Next.js
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function corsMiddleware(req: any, res: any) {
  await runMiddleware(req, res, cors);
}
