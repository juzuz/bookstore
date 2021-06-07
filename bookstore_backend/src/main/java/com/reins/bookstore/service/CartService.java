package com.reins.bookstore.service;

import com.reins.bookstore.compositeKey.CartId;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;

import java.util.List;


public interface CartService {

    public boolean checkInCart(Integer userId,Integer bookId);
    public Cart getCartItem(Integer userId,Integer bookId);
    public void saveCartItem(Cart item);
    public void deleteItem(Integer userId,Integer bookId);
    public void updateQuantity(Cart item,int quantity);
    public void orderSubmitted(List<CartId> cartItems);

}
