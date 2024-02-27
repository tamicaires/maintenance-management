import { Job } from "src/modules/job/entities/Job";
import { JobRepository } from "src/modules/job/repositories/jobRepository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaJobMapper } from "../mappers/PrismaJobMapper";

@Injectable()
export class PrismaJobRepository implements JobRepository {
  constructor(private prisma: PrismaService) {}

  async create(job: Job): Promise<void> {
    const jobRaw = PrismaJobMapper.toPrisma(job);

    await this.prisma.job.create({
      data: jobRaw
    });
  };

  async findById(id: string): Promise<Job | null> {
    const jobRaw = await this.prisma.job.findUnique({ where: { id: id } });

    if(!jobRaw) return null;

    return PrismaJobMapper.toDomain(jobRaw);
  };

  async delete(id: string): Promise<void> {
    await this.prisma.job.delete({
      where: { id }
    });
  };

  async findMany(page: number, perPage: number): Promise<Job[]> {
    const jobs = await this.prisma.job.findMany({
      take: perPage,
      skip: (page -1 ) * perPage
    });

    return jobs?.map(PrismaJobMapper.toDomain)
  };
};