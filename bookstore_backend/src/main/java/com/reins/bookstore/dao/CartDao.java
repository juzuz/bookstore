package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Cart;

public interface CartDao {
    Cart checkInCart(Integer userId, Integer bookId);
    Cart getCartItem(Integer userId, Integer bookId);
    void store(Cart item);
    void deleteItem(Integer userId, Integer bookId);
}
