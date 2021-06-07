package com.reins.bookstore.service;

import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.entity.Orders;
import com.reins.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public interface OrderService {
    public List<Orders> getOrders(Integer userId);
    public Orders createOrder(Integer userId, Date cur,String name,String address,String phone);
    public void addItemsToOrder(List<OrderItems> items);
    public int getOrderQuantity(Integer orderId,Integer bookId);

}
