import {
  CreateEmployeeParams,
  EmployeeListModel,
  EmployeeModel,
} from "../models/employee.model";
import {
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "../models/employee.model";

export default abstract class EmployeeDatasourceContract {
  public abstract getEmployeeList(): Promise<EmployeeListModel | undefined>;
  public abstract createEmployee(
    params: CreateEmployeeParams
  ): Promise<EmployeeModel | undefined>;
  public abstract getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined>;
  public abstract updateEmployeeById(
    params: UpdateEmployeeParams
  ): Promise<EmployeeModel | undefined>;
  public abstract deleteEmployeeById(params: number): Promise<void>;
}
