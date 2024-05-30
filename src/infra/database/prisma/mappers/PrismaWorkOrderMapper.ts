import { WorkOrder as WorkOrderRaw } from "@prisma/client";
import { WorkOrder } from "src/modules/workOrder/entities/WorkOrder";
import { Box } from "src/modules/workOrder/enum/box.enum";
import { MaintenanceStatus } from "src/modules/workOrder/enum/maitenance-status.enum";
import { TypeOfMaintenance } from "src/modules/workOrder/enum/type-of-maintenance.enum";

export class PrismaWorkOrderMapper {
  static toPrisma({
    id,
    displayId,
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    startWaitingParts,
    endWaitingParts,
    queueDuration,
    maintenanceDuration,
    waitingPartsDuration,
    exitSupervisor,
    fleetId,
    userId,
    typeOfMaintenance,
    status,
    box, 
    createdBy,
    updatedBy,
    createdAt,
    updatedAt
  }: WorkOrder): WorkOrderRaw {
    return {
      id,
      displayId,
      severityLevel,
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      startWaitingParts,
      endWaitingParts,
      queueDuration,
      maintenanceDuration,
      waitingPartsDuration,
      exitSupervisor,
      fleetId,
      userId,
      typeOfMaintenance,
      status,
      box,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    };
  };

  static toDomain({
    id,
    displayId,
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    startWaitingParts,
    endWaitingParts,
    queueDuration,
    maintenanceDuration,
    waitingPartsDuration,
    exitSupervisor,
    createdBy,
    updatedBy,
    fleetId,
    userId,
    typeOfMaintenance,
    status,
    box,
    createdAt,
    updatedAt
  }: WorkOrderRaw): WorkOrder {
    return new WorkOrder({
      displayId,
      severityLevel,
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      startWaitingParts,
      endWaitingParts,
      queueDuration,
      maintenanceDuration,
      waitingPartsDuration,
      exitSupervisor,
      createdBy,
      updatedBy,
      fleetId,
      userId,
      typeOfMaintenance: typeOfMaintenance as TypeOfMaintenance,
      status: status as MaintenanceStatus,
      box: box as Box,
      createdAt,
      updatedAt
    },
      id
    );
  };
};