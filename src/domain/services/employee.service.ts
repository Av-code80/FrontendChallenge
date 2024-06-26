import EmployeeDatasource from "@/data/datasources/employee.datasource";
import EmployeeDatasourceContract from "../contracts/employeeDatasource.contract";
import {
  CreateEmployeeParams,
  EmployeeListModel,
  EmployeeModel,
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "../models/employee.model";

export default class EmployeeService {
  private static _instance: EmployeeService;
  public static getInstance(): EmployeeService {
    if (!EmployeeService._instance) {
      EmployeeService._instance = new EmployeeService();
    }
    return EmployeeService._instance;
  }

  private constructor(
    private datasource: EmployeeDatasourceContract = new EmployeeDatasource()
  ) {}

  public getEmployeeList(): Promise<EmployeeListModel | undefined> {
    return this.datasource.getEmployeeList();
  }

  public async createEmployee(
    params: CreateEmployeeParams
  ): Promise<EmployeeModel> {
    const response = await this.datasource.createEmployee(params);
    if (!response) {
      throw new Error("🚫Failed to create employee");
    }
    return response;
  }

  public getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    if (params.id === undefined) {
      return Promise.resolve(undefined);
    }
    return this.datasource.getEmployeeById(params);
  }

  public async updateEmployeeById(
    params: UpdateEmployeeParams
  ): Promise<UpdateEmployeeParams> {
    try {
      const response = await this.datasource.updateEmployeeById(params);
      if (!response) {
        throw new Error("🚫Failed to update employee");
      }
      return response;
    } catch (error) {
      console.error("🚫Error in updateEmployeeById:", error);
      throw error;
    }
  }

  public deleteEmployeeById(params: number): Promise<void> {
    return this.datasource.deleteEmployeeById(params);
  }
}
