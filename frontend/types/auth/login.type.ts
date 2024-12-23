export interface ILogin {
    userid?: string;
    surname: string;
    password: string;
}

export  interface ILoginValidation {
    status: boolean;
    message: string;
}

export interface ILoginResponse {
    getUser: ILogin | ILogin[];
  }