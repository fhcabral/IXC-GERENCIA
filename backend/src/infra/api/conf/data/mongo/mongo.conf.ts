import mongoose from "mongoose";
import { Service } from "typedi";

@Service()
export class MongoConf {
  private isConnected = false;

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      console.log("Já conectado ao MongoDB!");
      return;
    }

    try {
      await mongoose.connect(uri, {
      });
      this.isConnected = true;
      console.log("Conexão com o MongoDB bem-sucedida!");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log("Nenhuma conexão ativa com o MongoDB.");
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("Conexão com o MongoDB encerrada.");
    } catch (error) {
      console.error("Erro ao desconectar do MongoDB:", error);
      throw error;
    }
  }

  public isConnectionActive(): boolean {
    return this.isConnected;
  }
}
