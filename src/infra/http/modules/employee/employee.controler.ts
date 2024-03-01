import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query 
} from "@nestjs/common";
import { CreateEmployeeBody } from "./dtos/createEmployeeBody";
import { CreateEmployee } from "src/modules/employee/useCases/createEmployeeUseCase/createEmployee";
import { EditEmployeeBody } from "./dtos/editEmployeeBody";
import { EditEmployee } from "src/modules/employee/useCases/editEmployeeUseCase.ts/editEmployee";
import { DeleteEmployee } from "src/modules/employee/useCases/deleteEmployeeUseCase/deleteEmployee";
import { GetEmployee } from "src/modules/employee/useCases/getEmployeeUseCase/getEmployee";
import { EmployeeViewModel } from "./viewModels/EmployeeViewModel";
import { GetManyEmployees } from "src/modules/employee/useCases/getManyEmployeesUseCase/getManyEmployees";

@Controller('employees')
export class EmployeeController {
  constructor(
    private createEmployee: CreateEmployee,
    private editEmployee: EditEmployee,
    private deleteEmployee: DeleteEmployee,
    private getEmployee: GetEmployee,
    private getManyEmployees: GetManyEmployees
  ){}

  @Post()
  async create(@Body() createEmployeeBody: CreateEmployeeBody){
    const { name, workShift, jobTitleId, status } = createEmployeeBody;

    const employee = await this.createEmployee.execute({
      name,
      workShift,
      jobTitleId,
      status
    });

    return employee;
  };

  @Put(':id')
  async edit(
    @Param('id') employeeId: string, 
    @Body() editEmployeeBody: EditEmployeeBody
  ){
    const { name, workShift, jobTitleId, status } = editEmployeeBody;

    await this.editEmployee.execute({
      employeeId,
      name,
      workShift,
      jobTitleId,
      status
    });
  };

  @Delete()
  async delete(@Param() employeeId: string){
    await this.deleteEmployee.execute({
      employeeId
    });
  };

  @Get(':id')
  async getOne(@Param('id') employeeId: string){
    const employee = await this.getEmployee.execute({
      employeeId
    });

    return EmployeeViewModel.toHttp(employee);
  };

  @Get()
  async getMany(
    @Query('page') page: string,
    @Query('perPage') perPage: string 
  ){
    const employees = await this.getManyEmployees.execute({
      page,
      perPage
    });

    return employees.map(EmployeeViewModel.toHttp)
  };
};