const faker = require('faker');
const { nanoid } = require('nanoid');

const STATUSES = ['running', 'succeeded', 'failed'];

module.exports = () => {
  const data = {
    processes: [],
    jobs: [],
  };

  for (let i = 1; i <= 200; i++) {
    const processId = nanoid();

    const jobsCount = faker.random.number({
      min: 1,
      max: 10,
    });

    const process = {
      id: processId,
      name: faker.system.commonFileName(),
      startTime: faker.date.past().getTime(),
      jobsCount: jobsCount,
    };

    const jobs = new Array(jobsCount).fill(0).map(() => {
      return {
        id: nanoid(),
        processId: processId,
        name: faker.company.companyName(),
        status:
          STATUSES[
            faker.random.number({
              min: 0,
              max: STATUSES.length - 1,
            })
          ],
      };
    });

    data.processes.push(process);
    data.jobs = data.jobs.concat(jobs);
  }

  return data;
};
