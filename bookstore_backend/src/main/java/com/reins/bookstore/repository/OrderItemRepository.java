package com.reins.bookstore.repository;

import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItems, Integer> {
    OrderItems findByOrderIdAndBookId(Integer orderId,Integer bookId);

}
