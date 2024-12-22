import { Service } from "typedi";
import { User } from "../../../../domain/user/entity/user.entity";
import { UserModel } from "../../conf/data/mongo/schemas/user";

@Service()
export class UserRepository {

  async findByProp(prop: string, value: string | number) {
    const filter: Record<string, unknown> = { [prop]: value };
         const transaction = await UserModel.find(filter);
   
         if (!transaction) {
           throw new Error(`Nenhum Usuario encontrado com ${prop} = ${value}.`);
         }
   
         return transaction;
  }

  async create(data: Partial<User>){
    try {
          const user = new UserModel(data);
          await user.save();

          return user as User;
        } catch (error) {
          throw error;
        }
  }
}
