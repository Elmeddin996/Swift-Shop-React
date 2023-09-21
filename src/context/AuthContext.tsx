import React from "react";
import { ILogin } from "../models";
import { useService } from "../APIs/Services";
import { UseMutateAsyncFunction, useMutation } from "react-query";
import { AxiosResponse } from "axios";

interface IAuthContext {
  mutateLoginApp: UseMutateAsyncFunction<void, unknown, ILogin, unknown>;
  result: string;
  mutatePassword: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, any, unknown>
}

export const AuthContext = React.createContext<IAuthContext>(null as any);

export const AuthProvider: React.FC<any> = ({ children }: any) => {
  const { authService } = useService();
  const [result, setResult] = React.useState<string>("");

  const { mutateAsync: mutateLoginApp } = useMutation(
    (RequestBody: ILogin) => authService.login(RequestBody),
    {
      onError: () => setResult(`error`),
    }
  );

  const { mutateAsync: mutatePassword } = useMutation(
    (reqBody: any) => authService.updatePassword("1",reqBody),
    {
      onError: () => console.log("error"),
    }
  );
  return (
    <AuthContext.Provider value={{ mutateLoginApp, result, mutatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
