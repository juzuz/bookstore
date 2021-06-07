package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders,Integer> {
    public List<Orders> findByUserId(Integer userId);
//    @Query(value = "select o.orderId,b.bookId,o.quantity,o.timeStamp,b.name,b.image from Orders o left join Book b on o.bookId = b.bookId where o.userId = :userId")
//    List<Object[]> getOrders(@Param("userId") Integer userId);
//
//    @Query(value = "select MAX(o.orderId) from Orders o where o.userId = :userId")
//    Integer getNextValidOrderId(@Param("userId") Integer userId);
//
//
//    @Transactional
//    @Modifying
//    @Query(value = "insert into Orders values(:order_id,:user_id,:book_id,:time_stamp,:quantity)",nativeQuery = true)
//    int submitOrder(@Param("order_id") Integer orderId, @Param("user_id") Integer userId, @Param("book_id") Integer bookId, @Param("time_stamp") LocalDateTime timeStamp, @Param("quantity") Integer quantity);
}
