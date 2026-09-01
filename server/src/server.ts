import app from './app';
import { env, testDatabaseConnection } from './config';

async function start() {
  console.log(`[Server] Starting in ${env.NODE_ENV} mode...`);

  // Attempt database connection (non-fatal during setup)
  const dbConnected = await testDatabaseConnection();
  if (!dbConnected) {
    console.warn('[Server] Database is not available. API will start without DB.');
    console.warn('[Server] Set up PostgreSQL and run migrations before using DB features.');
  }

  app.listen(env.PORT, () => {
    console.log(`[Server] API running at http://localhost:${env.PORT}`);
    console.log(`[Server] Health check: http://localhost:${env.PORT}/api/health`);
  });
}

start().catch((error) => {
  console.error('[Server] Failed to start:', error);
  process.exit(1);
});
