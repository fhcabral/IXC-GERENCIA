import { Service } from "typedi";
import { User } from "../../../../domain/user/entity/user.entity";
import { UserModel } from "../../conf/data/mongo/schemas/user";

@Service()
export class UserRepository {

  async findByProp(prop: string, value: string | number) {
    const filter: Record<string, unknown> = { [prop]: value };

    console.log(filter)
         const transaction = await UserModel.find(filter);
        console.log(transaction);
         if (!transaction) {
           throw new Error(`Nenhum Usuario encontrado com ${prop} = ${value}.`);
         }
   
         return transaction as unknown as User;
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
