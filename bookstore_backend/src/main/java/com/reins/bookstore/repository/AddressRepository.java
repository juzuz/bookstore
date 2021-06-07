package com.reins.bookstore.repository;

import com.reins.bookstore.compositeKey.AddressId;
import com.reins.bookstore.compositeKey.OrderItemId;
import com.reins.bookstore.entity.Address;
import com.reins.bookstore.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Integer> {
//    public void deleteByUserIdAndAddress(Integer userId,String address);
}
