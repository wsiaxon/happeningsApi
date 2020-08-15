const cluster = require('cluster');
const debug = require('debug')('dev');
const os = require('os');
const app = require('./app');

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  const numWorkers = os.cpus().length;

  debug(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i += 1) cluster.fork();

  cluster.on('online', (worker) => {
    debug(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    debug(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
    );
    debug('Starting a new worker');

    cluster.fork();
  });
} else {
  app.listen(process.env.APP_PORT || 3000, () => {
    debug(`Process ${process.pid} is listening to all incoming requests`);
  });
}
