package com.reins.bookstore.dao;
import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.entity.Orders;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface OrderDao {
    List<Orders> getAllOrders();
    Orders saveOrder(Orders order);
    boolean deleteOrder(Integer id);
    void saveItemToOrder(OrderItems orderItem);
    OrderItems getItemInOrder(Integer orderId, Integer bookId);
    List<Orders> findAllOrdersWithAddress(Integer addressId);
    List<Orders> findAllOrdersBetweenDates(Date startDate, Date endDate);
    List<Orders> findAllUserOrdersBetweenDates(Integer userId, Date startDate, Date endDate);
    public Page<Orders> getOrdersByQueryAndDateAndUserAndPage(Integer id, String query, List<Date> filterDates, Optional<Integer> page);

}
