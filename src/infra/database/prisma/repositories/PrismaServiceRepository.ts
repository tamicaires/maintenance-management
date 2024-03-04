import { Service } from "src/modules/service/entities/Service";
import { ServiceRepository } from "src/modules/service/repositories/serviceRepository";
import { PrismaServiceMapper } from "../mappers/PrismaServiceMapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
  constructor(private prisma: PrismaService){}

  async create(service: Service): Promise<void> {
    const serviceRaw = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.create({
      data: serviceRaw
    });
  };

  async findById(id: string): Promise<Service | null> {
    const serviceRaw = await this.prisma.service.findUnique({
      where: { id }
    });

    if(!serviceRaw) return null;

    return PrismaServiceMapper.toDomain(serviceRaw);
  };

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({ where: { id } });
  };

  async save(service: Service): Promise<void> {
    const serviceRaw = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.update({
      data: serviceRaw,
      where: { id: serviceRaw.id}
    });
  };

  async findMany(filter: string, page: number, perPage: number): Promise<Service[]> {
    const services = await this.prisma.service.findMany({
      where: {
        serviceName: {
          contains: filter
        }
      },
      take: perPage,
      skip: (page - 1) * perPage
    });

    return services.map(PrismaServiceMapper.toDomain)
  };
};