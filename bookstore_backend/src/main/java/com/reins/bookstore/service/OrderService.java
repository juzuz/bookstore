package com.reins.bookstore.service;

import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.entity.Orders;
import com.reins.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface OrderService {
    public List<Orders> getAllOrders();
    public Orders createOrder(Integer userId, Date cur,Integer addressId);
    public void addItemToOrder(OrderItems item);
    public boolean deleteOrder(Integer id);

    // Function used to find orders that need to update backup address after address id deletion
    public List<Orders> findAllOrdersWithAddress(Integer addressId);
    // Function to filter orders by date and return
    public List<Orders> getOrdersByDate(List<Date> dates);
    public List<Orders> getOrdersByUserAndDate(Integer userId, List<Date> dates);
    public Page<Orders> getOrdersByQueryAndDateAndUserAndPage(Integer id, String query, List<Date> filterDates, Optional<Integer> page);

}
