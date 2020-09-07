const cluster = require('cluster');
const debug = require('debug')('dev');
const os = require('os');
const app = require('./app');

const PORT = process.env.PORT || process.env.APP_PORT || 8080;

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  const numWorkers = os.cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i += 1) cluster.fork();

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
    );
    console.log('Starting a new worker');

    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Process ${process.pid} listening to all requests on port ${PORT}`);
  });
}
