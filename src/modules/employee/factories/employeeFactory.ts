import { Employee } from "../entities/Employee";
import { EmployeeStatus } from "../enum/employee-status.enum";


type Override = Partial<Employee>

export const makeEmployee = ({ id, ...override }: Override) => {
  return new Employee({
    name: 'Elves Caires',
    workShift: 'Manhã',
    jobId: '12355',
    status: EmployeeStatus.ATIVO,
    ...override
  },
  id
  );
};