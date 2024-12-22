

export interface UseCaseInterface<Input,Output> {
  execute(data?: Input): Promise<Output> | Output;
}