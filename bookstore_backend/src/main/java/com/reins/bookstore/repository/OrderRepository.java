package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

public interface OrderRepository extends JpaRepository<Orders,Integer> {
    public void deleteByOrderId(Integer id);

    public List<Orders> findAllByAddressId(Integer addressId);
    public List<Orders> findAllByUserIdAndOrderDateBetween(Integer userId, Date startDate, Date endDate);
    public List<Orders> findAllByUserIdAndOrderDate(Integer userId, Date date);
    public List<Orders> findAllByOrderDate(Date date);
    public List<Orders> findAllByOrderDateBetween(Date startDate, Date endDate);

    public Page<Orders> findByUserIdAndOrderIdIn(Integer id,Set<Integer> orderIds, Pageable page);
    public Page<Orders> findAllByUserIdAndOrderDateAndOrderIdIn(Integer id, Date orderDate, Set<Integer> orderIds, Pageable page);
    public Page<Orders> findAllByUserIdAndOrderDateBetweenAndOrderIdIn(Integer id, Date start,Date end, Set<Integer> orderIds, Pageable page);
    public Page<Orders> findAllByOrderIdIn(Set<Integer> orderIds, Pageable page);
    public Page<Orders> findAllByOrderDateAndOrderIdIn(Date date,Set<Integer> orderIds, Pageable page);
    public Page<Orders> findAllByOrderDateBetweenAndOrderIdIn(Date start,Date end,Set<Integer> orderIds, Pageable page);
}
