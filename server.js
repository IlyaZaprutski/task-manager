const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(require('./api.js')());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  setTimeout(next, 3000);
});

server.post('/api/createProcess', (req, res) => {
  const db = router.db;

  const process = req.body;

  const processesTable = db.get('processes');
  const jobsTable = db.get('jobs');

  const jobsIds = process.jobs.map((job) => job.id);

  process.jobs.forEach((job) => {
    jobsTable.push(job).write();
  });

  processesTable
    .push({
      ...process,
      jobs: jobsIds,
    })
    .write();

  res.json(process);
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
