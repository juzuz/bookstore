package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Address;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;


public interface AddressDao {

    Address saveAddress(Address address);
    void removeAddress(Integer addressId);
}
