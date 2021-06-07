package com.reins.bookstore.repository;
import com.reins.bookstore.compositeKey.CartId;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId> {
    Cart findByUserIdAndBookId(Integer userId,Integer bookId);

    void deleteByUserIdAndBookId(Integer userId,Integer bookId);

}
