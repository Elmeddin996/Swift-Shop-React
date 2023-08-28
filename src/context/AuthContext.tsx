import React from "react";
import { ILogin } from "../models";
import { useService } from "../APIs/Services";
import { UseMutateAsyncFunction, useMutation } from "react-query";

interface IAuthContext {
  mutateLoginApp: UseMutateAsyncFunction<void, unknown, ILogin, unknown>; result: string;
}

export const AuthContext = React.createContext<IAuthContext>(null as any);

export const AuthProvider: React.FC<any> = ({ children }: any) => {
  const { authService } = useService();
  const [result, setResult]=React.useState<string>('')

  const { mutateAsync: mutateLoginApp} =
    useMutation((RequestBody: ILogin) => authService.login(RequestBody), {
      onError: () =>
      setResult(`error`)
    });
  return (
    <AuthContext.Provider value={{ mutateLoginApp, result}}>
      {children}
    </AuthContext.Provider>
  );
};
