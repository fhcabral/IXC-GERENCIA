import { UseCaseInterface } from "../../shared/use-cases/use-case.interfacce";
import { User } from "../entity/user.entity";

export interface IGetUser extends UseCaseInterface<Partial<User>, User>{}