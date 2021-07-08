package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import com.reins.bookstore.service.OrderService;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import com.reins.bookstore.entity.Orders;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    @Override
    public List<Orders> getAllOrders(){
        return orderDao.getAllOrders();
    }

    @Override
    public Orders createOrder(Integer userId, Date cur, Integer addressId){
        Orders order = new Orders(userId,cur,addressId);
        return orderDao.saveOrder(order);
    }

    @Override
    public boolean deleteOrder(Integer id){
        return orderDao.deleteOrder(id);
    }

    @Override
    public List<Orders> findAllOrdersWithAddress(Integer addressId){
        return orderDao.findAllOrdersWithAddress(addressId);
    }

    @Override
    public void addItemToOrder(OrderItems item){
        orderDao.saveItemToOrder(item);
    }
//

    @Override
    public List<Orders> getOrdersByDate(List<Date> dates){
        if(dates.isEmpty()){
            return null;
        }
        return orderDao.findAllOrdersBetweenDates(dates.get(0),dates.get(1));
    }

    @Override
    public List<Orders> getOrdersByUserAndDate(Integer userId,List<Date> dates){
        if(dates.isEmpty()){
            return null;
        }
        return orderDao.findAllUserOrdersBetweenDates(userId, dates.get(0),dates.get(1));
    }

    @Override
    public Page<Orders> getOrdersByQueryAndDateAndUserAndPage(Integer id, String query, List<Date> filterDates, Optional<Integer> page){
        return orderDao.getOrdersByQueryAndDateAndUserAndPage(id,query,filterDates,page);
    }
}
