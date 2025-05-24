import { axiosInstance } from "./instance";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
    const { data } = await axiosInstance.get<CartDTO>("/cart");

    return data;
};

export const updateCartItemQuantity = async (
    cartItemId: number,
    quantity: number
): Promise<CartDTO> => {
    const { data } = await axiosInstance.patch<CartDTO>("/cart/" + cartItemId, {
        quantity,
    });

    return data;
};

export const addCartItem = async (
    values: CreateCartItemValues
): Promise<CartDTO> => {
    const { data } = await axiosInstance.post<CartDTO>("/cart", values);

    return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.delete<CartDTO>("/cart/" + id);

    return data;
};
