package com.reins.bookstore.dao;
import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.entity.Orders;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderDao {
    List<Orders> getOrders(Integer userId);
    Orders saveOrder(Orders order);
    void saveItemsToOrder(List<OrderItems> orderItems);
    OrderItems getItemInOrder(OrderItemId orderItemId);

}
