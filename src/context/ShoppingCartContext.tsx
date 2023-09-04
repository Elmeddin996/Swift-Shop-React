import React from "react";
import { useService } from "../APIs/Services";
import { useMutation, useQuery } from "react-query";
import { EQueryKeys } from "../enums";
import useLocalStorageState from "use-local-storage-state";
import { IShoppingCartItem } from "../models";

export const ShoppingCartContext = React.createContext(null as any);

export const ShoppingCartProvider: React.FC<any> = ({ children }: any) => {
  const { cartItemService } = useService();

  const { data: mainCart } = useQuery([EQueryKeys.GET_CART_ITEMS], () =>
    cartItemService.getCartItems()
  );

  const { mutateAsync: mutateCartItem } = useMutation(
    (reqBody: IShoppingCartItem) => cartItemService.addCartItem(reqBody)
  );

  const [localCart, setLocalCart] = useLocalStorageState<
    { productId: string; count: number }[]
  >("cart", {
    defaultValue: [],
  });

  return (
    <ShoppingCartContext.Provider value={{ mainCart,mutateCartItem, localCart, setLocalCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
