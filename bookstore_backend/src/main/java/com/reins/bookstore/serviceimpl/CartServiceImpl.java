package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.compositeKey.CartId;
import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.repository.CartRepository;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @ClassName UserServiceImpl
 * @Description the implement of user service
 * @Author thunderBoy
 * @Date 2019/11/7 13:16
 */
@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository repository;

    @Autowired
    private CartDao cartDao;

    public boolean checkInCart(Integer userId,Integer bookId){
        Cart cartItem = cartDao.checkInCart(userId,bookId);
        return (cartItem !=null);
    }

    public Cart getCartItem(Integer userId,Integer bookId){
        return cartDao.getCartItem( userId, bookId);

    };

    public void saveCartItem(Cart item){
        cartDao.store(item);
    }

    public void deleteItem(Integer userId, Integer bookId){
        cartDao.deleteItem(userId, bookId);
    }

    public void updateQuantity(Cart item,int quantity){
        item.setQuantity(quantity);
        cartDao.store(item);
    }

    public void orderSubmitted(List<CartId> cartItems){
        for (CartId item:cartItems){
            cartDao.deleteItem(item.getUserId(),item.getBookId());
        }
    }

}
