package com.reins.bookstore.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @ClassName Book
 * @Description Book Entity
 * @Author thunderBoy
 * @Date 2019/11/5 19:19
 */
@Entity
@Table(name = "ORDERS")
@Data
public class Orders {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name= "order_id")
    private Integer orderId;
    @Column(name = "user_id")
    private Integer userId;
    @Temporal(TemporalType.DATE)
    @Column(name = "order_date")
    private Date orderDate;
    @Column(name = "address_id")
    private Integer addressId;
    @Column(name = "address_backup")
    private String addressBackup;


    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "user_id", referencedColumnName = "userId",insertable = false,updatable = false)
    private UserAuth buyer;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="order_id",insertable = false,updatable = false)
    private Set<OrderItems> orderItems = new HashSet<>();

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "address_id", referencedColumnName = "addressId",insertable = false,updatable = false)
    private Address address;



    public Orders() {

    }

    public Orders(Integer userId, Date cur, Integer addressId) {
        this.userId = userId;
        this.orderDate = cur;
        this.addressId = addressId;
    }

    public Set<OrderItems> getOrderItems(){
        return orderItems;
    }
    public void setOrderItems(Set<OrderItems> orderItems){
        this.orderItems = orderItems;
    }


    public String getBuyer(){return buyer.getUsername();}
}