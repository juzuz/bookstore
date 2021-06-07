package com.reins.bookstore.daoimpl;
import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.entity.Orders;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDateTime;
/**
 * @ClassName BookDaoImpl
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/5 20:20
 */
@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public List<Orders> getOrders(Integer id){
        if(id==0)
            return orderRepository.findAll();
        return orderRepository.findByUserId(id);
    }

    @Override
    public Orders saveOrder(Orders order){
        return orderRepository.save(order);
    }

    @Override
    public void saveItemsToOrder(List<OrderItems> orderItems){
        orderItemRepository.saveAll(orderItems);
    }

    @Override
    public OrderItems getItemInOrder(OrderItemId orderItemId){
        return orderItemRepository.findById(orderItemId).orElse(null);
    }
}
