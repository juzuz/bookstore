package com.reins.bookstore.daoimpl;
import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.repository.CartRepository;
import com.reins.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName BookDaoImpl
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/5 20:20
 */
@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart checkInCart(Integer userId, Integer bookId){
        return cartRepository.findByUserIdAndBookId(userId,bookId);
    }

    @Override
    public Cart getCartItem(Integer userId, Integer bookId){
        return cartRepository.findByUserIdAndBookId(userId,bookId);
    }

    @Override
    public void store(Cart item){
        cartRepository.save(item);
    }

    @Override
    public void deleteItem(Integer userId,Integer bookId){
        cartRepository.deleteByUserIdAndBookId(userId,bookId);
    }
}
