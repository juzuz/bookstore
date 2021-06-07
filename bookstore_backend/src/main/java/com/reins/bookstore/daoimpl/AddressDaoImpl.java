package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.AddressDao;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.Address;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.repository.AddressRepository;
import com.reins.bookstore.repository.UserAuthRepository;
import com.reins.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 * @ClassName UserDaoImpl
 * @Description the implement of user dao
 * @Author thunderBoy
 * @Date 2019/11/7 13:19
 */
@Repository
public class AddressDaoImpl implements AddressDao {


    @Autowired
    AddressRepository addressRepository;

    @Override
    public Address saveAddress(Address address){
        return addressRepository.save(address);
    }

    @Override
    public void removeAddress(Integer addressId){
        addressRepository.deleteById(addressId);
    }

}
