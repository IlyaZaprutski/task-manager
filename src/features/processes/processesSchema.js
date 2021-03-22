import { schema } from 'normalizr';

const jobEntitySchema = new schema.Entity('jobs');

export const processEntitySchema = new schema.Entity('processes', {
  jobs: [jobEntitySchema],
});
