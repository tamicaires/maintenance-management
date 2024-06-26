import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query,
  Request 
} from "@nestjs/common";
import { CreateWorkOrder } from "src/modules/workOrder/useCases/createWorkOrder/createWorkOrder";
import { CreateWorkOrderBody } from "./dtos/createWorkOrderBody";
import { UpdateWorkOrderBody } from "./dtos/updateWorkOrderBody";
import { UpdateWorkOrder } from "src/modules/workOrder/useCases/updateWorkOrder/updateWorkOrder";
import { mapCreateWorkOrderData, mapUpdateWorkOrderData } from "src/utils/workOrderUtils";
import { DeleteWorkOrder } from "src/modules/workOrder/useCases/deleteWorkOrder/deleteWorkOrder";
import { WorkOrderViewModel } from "./viewModels/workOrderViewModel";
import { GetManyWorkOrders } from "src/modules/workOrder/useCases/getManyWorkOrders/getManyWorkOrders";
import { AuthenticatedRequestModel } from "../auth/models/authenticateRequestModel";
import { GetWorkOrderServices } from "src/modules/workOrder/useCases/getWorkOrderWithServices/getWorkOrderWithServices";



@Controller('work-orders')
export class WorkOrderController {
  constructor(
    private createWorkOrder: CreateWorkOrder,
    private updateWorkOrder: UpdateWorkOrder,
    private deleteWorkOrder: DeleteWorkOrder,
    private getManyWorkOrder: GetManyWorkOrders,
    private getWorkOrderServices: GetWorkOrderServices
  ){}

  @Post()
  async create(
    @Request() request: AuthenticatedRequestModel,
    @Body() createWorkOrderBody: CreateWorkOrderBody){
    const currentUser = request.user;
    console.log(createWorkOrderBody)
    const workOrderData = mapCreateWorkOrderData(
      currentUser.id,
      currentUser.name,
      createWorkOrderBody
    );

    const workOrder = await this.createWorkOrder.execute(
      workOrderData
    );
    
    return WorkOrderViewModel.toHttp(workOrder);
  };

  @Put(':id')
  async update(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') workOrderId: string,
    @Body() updateWorkOrderBody: UpdateWorkOrderBody
  ){
    const currentUser = request.user;

    const workOrderData = mapUpdateWorkOrderData(
      workOrderId,
      currentUser.id,
      currentUser.name,
      updateWorkOrderBody
    );
      console.log('controler', workOrderData)
    const workOrder = await this.updateWorkOrder.execute(workOrderData);

    return WorkOrderViewModel.toHttp(workOrder);
  };

  @Delete(':id')
  async delete(@Param('id') workOrderId: string){
    await this.deleteWorkOrder.execute({ workOrderId });
  };

  @Get(':id')
  async getOneWithServices(@Param('id') workOrderId: string){
    const workOrderServices = await this.getWorkOrderServices.execute({
      workOrderId
    });
    
    return workOrderServices;
  };

  @Get()
  async getMany(
    @Query('page') page: string,
    @Query('perPage') perPage: string
  ){
    const workOrders = await this.getManyWorkOrder.execute({
      page,
      perPage
    });

    return workOrders.map(WorkOrderViewModel.toHttp)
  };
};