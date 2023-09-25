import React from "react";
import { useService } from "../APIs/Services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EQueryKeys } from "../enums";
import useLocalStorageState from "use-local-storage-state";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCount } from "../features/shoppingCartCount/shoppingCartSlice";

export const ShoppingCartContext = React.createContext(null as any);

export const ShoppingCartProvider: React.FC<any> = ({ children }: any) => {
  const { cartItemService } = useService();
  const queryClient = useQueryClient();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );
  const dispatch = useDispatch()


  const { data: mainCart } = useQuery([EQueryKeys.GET_CART_ITEMS], () =>
    cartItemService.getCartItems()
  );

  const { mutateAsync: mutateCartItem } = useMutation(
    (reqBody) => cartItemService.addCartItem(reqBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_CART_ITEMS]);
      },
    }
  );

  const { mutateAsync: mutateReduceCartItem } = useMutation(
    (reqBody) => cartItemService.reduceCartItem(reqBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_CART_ITEMS]);
      },
    }
  );

  const { mutateAsync: mutateRemoveItem } = useMutation(
    (productId:number) => cartItemService.removeCartItem(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_CART_ITEMS]);
      },
    }
  );

  const [localCart, setLocalCart] = useLocalStorageState<
    { productId: number; count: number }[]
  >("cart", {
    defaultValue: [],
  });

  React.useEffect(()=>{
    if (isAuthenticated) {
      dispatch(setCount(mainCart?.data.length))
    }else{
      dispatch(setCount(localCart?.length))
    }
  },[isAuthenticated,mainCart,localCart, dispatch])


  return (
    <ShoppingCartContext.Provider
      value={{ mainCart, mutateCartItem, localCart, setLocalCart, mutateRemoveItem, mutateReduceCartItem}}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
