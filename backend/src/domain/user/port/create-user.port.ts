import { UseCaseInterface } from "../../shared/use-cases/use-case.interfacce";
import { User } from "../entity/user.entity";

export interface ICreateUser extends UseCaseInterface<Partial<User>, User>{}