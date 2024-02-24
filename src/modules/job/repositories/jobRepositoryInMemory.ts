import { Job } from "../entities/Job";
import { JobRepository } from "./jobRepository";

export class JobRepositoryInMemory implements JobRepository {
        
  public jobs: Job[] = [];

  async create(job: Job): Promise<void> {
    this.jobs.push(job)
  };

  async findById(id: string): Promise<Job | null> {
    const job = this.jobs.find(job => job.id  === id);

    if(!job) return null;

    return job;
  };

  async save(job: Job): Promise<void> {
    const jobIndex = this.jobs.findIndex(
      currentJob => {
        currentJob.id === job.id
    });

    if(jobIndex >= 0) this.jobs[jobIndex] = job; 
  };

  async delete(id: string): Promise<void> {
    this.jobs = this.jobs.filter(note => note.id !== id);
  };

  async findMany(page: number, perPage: number): Promise<Job[]> {
    return this.jobs.slice((page -1) * perPage, page * perPage);
  };
};