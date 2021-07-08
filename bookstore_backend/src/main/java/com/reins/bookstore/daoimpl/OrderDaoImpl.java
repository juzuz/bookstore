package com.reins.bookstore.daoimpl;
import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.entity.Orders;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

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
    public List<Orders> getAllOrders(){
        return orderRepository.findAll();
    }

    @Override
    public boolean deleteOrder(Integer id){
        orderRepository.deleteByOrderId(id);
        return true;
    }

    @Override
    public Orders saveOrder(Orders order){
        return orderRepository.save(order);
    }

    @Override
    public void saveItemToOrder(OrderItems orderItem){
        orderItemRepository.save(orderItem);
    }

    @Override
    public OrderItems getItemInOrder(Integer orderId, Integer bookId){
        return orderItemRepository.findByOrderIdAndBookId(orderId,bookId);
    }

    @Override
    public List<Orders> findAllOrdersWithAddress(Integer addressId){
        return orderRepository.findAllByAddressId(addressId);
    }

    @Override
    public List<Orders> findAllOrdersBetweenDates(Date startDate, Date endDate){

        if(startDate.compareTo(endDate) == 0){
            return orderRepository.findAllByOrderDate(startDate);
        }
        return orderRepository.findAllByOrderDateBetween(startDate,endDate);
    }
    @Override
    public List<Orders> findAllUserOrdersBetweenDates(Integer userId, Date startDate, Date endDate){

        if(startDate.compareTo(endDate) == 0){
            return orderRepository.findAllByUserIdAndOrderDate(userId,startDate);
        }
        return orderRepository.findAllByUserIdAndOrderDateBetween(userId,startDate,endDate);
    }

    @Override
    public Page<Orders> getOrdersByQueryAndDateAndUserAndPage(Integer id, String query, List<Date> filterDates, Optional<Integer> page){

        Set<Integer> orderIds = new HashSet<Integer>();

        //Get All Order Items that contain query and create a list of orderIds.
        if(query != ""){
            List<OrderItems> allItems = orderItemRepository.findAll();
            List<OrderItems> filter = allItems.stream().filter(p -> p.getBook().getName().contains(query)).collect(Collectors.toList());

            for(OrderItems oI: filter){
                orderIds.add(oI.getOrderId());
            }
        }
        else{
            List<OrderItems> allItems = orderItemRepository.findAll();
            for(OrderItems oI: allItems){
                orderIds.add(oI.getOrderId());
            }
        }

        // User Data with Query and Dates
        if(id!=0){
            // No Dates
            if(filterDates.isEmpty()){
                return orderRepository.findByUserIdAndOrderIdIn(id,orderIds, PageRequest.of(
                        page.orElse(0),5, Sort.by("OrderId").descending()
                ));
            }
            // Yes Dates
            else{
                //Same Date
               if(filterDates.get(0).compareTo(filterDates.get(1))== 0){
                    return orderRepository.findAllByUserIdAndOrderDateAndOrderIdIn(id,filterDates.get(0),orderIds,PageRequest.of(
                            page.orElse(0),5,Sort.by("OrderId").descending()
                    ));
               }
               // Diff Date
               else{
                    return orderRepository.findAllByUserIdAndOrderDateBetweenAndOrderIdIn(id,filterDates.get(0),filterDates.get(1),orderIds,PageRequest.of(
                            page.orElse(0),5,Sort.by("OrderId").descending()
                    ));
               }
            }
        }
        else{
            if(filterDates.isEmpty()){
                return orderRepository.findAllByOrderIdIn(orderIds, PageRequest.of(
                        page.orElse(0),5,Sort.by("OrderId").descending()
                ));
            }
            // Yes Dates
            else{
                //Same Date
                if(filterDates.get(0).compareTo(filterDates.get(1))== 0){
                    return orderRepository.findAllByOrderDateAndOrderIdIn(filterDates.get(0),orderIds,PageRequest.of(
                            page.orElse(0),5,Sort.by("OrderId").descending()
                    ));
                }
                // Diff Date
                else{
                    return orderRepository.findAllByOrderDateBetweenAndOrderIdIn(filterDates.get(0),filterDates.get(1),orderIds,PageRequest.of(
                            page.orElse(0),5,Sort.by("OrderId").descending()
                    ));
                }
            }
        }


    }

}
