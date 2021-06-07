package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import com.reins.bookstore.service.OrderService;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.reins.bookstore.entity.Orders;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * @ClassName BookServiceImpl
 * @Description the Implement of BookService
 * @Author thunderBoy
 * @Date 2019/11/6 16:04
 */

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<Orders> getOrders(Integer id){
        return orderDao.getOrders(id);
    }

    public Orders createOrder(Integer userId, Date cur, String name, String address, String phone){
        Orders order = new Orders(userId,cur,name,address,phone);
        return orderDao.saveOrder(order);
    }

    public void addItemsToOrder(List<OrderItems> items){
        orderDao.saveItemsToOrder(items);
    }

    public int getOrderQuantity(Integer orderId,Integer bookId){
        OrderItems item = orderDao.getItemInOrder(new OrderItemId(orderId,bookId));
        return item.getQuantity();
    }
}
