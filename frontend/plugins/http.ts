import { LoginService } from "~/services/auth/login";
// import { authStorage } from "~/store/auth/store";

interface IHttp {
//   user: UserService;
  login: LoginService;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const fetcher = $fetch.create({
    baseURL: config.public.apiBase,
    // onRequest({ request, options }) {
    //   const authHeader = {
    //     Authorization: "Bearer " + authStorage().token,
    //   };
    //   options.headers = Object.assign(authHeader, options.headers);
    // },
  });

  const httpServices: IHttp = {
    // user: new UserService(fetcher),
    login: new LoginService(fetcher),
  };

  return {
    provide: {
      http: httpServices,
    },
  };
});
