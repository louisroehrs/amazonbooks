const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Amazon Books Monorepo...');

// Start the Python backend
console.log('📡 Starting Python backend...');
const backend = spawn('python', ['backend/main.py'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: process.env.BACKEND_PORT || '8000'
  }
});

// Wait a moment for backend to start, then start frontend
setTimeout(() => {
  console.log('🎨 Starting Next.js frontend...');
  const frontend = spawn('npm', ['start'], {
    cwd: path.join(process.cwd(), 'frontend'),
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: process.env.PORT || '3000',
      BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8000'
    }
  });

  frontend.on('close', (code) => {
    console.log(`Frontend exited with code ${code}`);
    process.exit(code);
  });
}, 3000);

backend.on('close', (code) => {
  console.log(`Backend exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  backend.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  backend.kill('SIGTERM');
  process.exit(0);
}); 