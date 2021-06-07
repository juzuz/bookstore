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
@Data
@Entity
@Table(name = "ORDERS")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "bookId")

public class Orders {

    @Column(name= "order_id")
    private int orderId;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "order_date")
    private Date orderDate;
    @Column(name="name")
    private String name;
    @Column(name = "address")
    private String address;
    @Column(name = "phone")
    private String phone;


    private UserAuth buyer;


    private Set<Book> orderItems = new HashSet<>();



    public Orders() {

    }

    public Orders(Integer userId, Date cur,String name, String address,String phone) {
        this.userId = userId;
        this.orderDate = cur;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }


    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getOrderId() {
        return orderId;
    }
    private void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getUserId(){
        return userId;
    }
    public void setUserId(int id){
        this.userId = id;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getOrderDate() {return orderDate;}
    public void setOrderDate(Date date) { this.orderDate = date;}

    public String getName(){return name;}
    public void setName(String name){this.name = name;}

    public String getAddress(){return address;}
    public void setAddress(String address){this.address = address;}

    public String getPhone(){return phone;}
    public void setPhone(String phone){this.phone = phone;}

    @ManyToMany(cascade ={ CascadeType.MERGE},fetch = FetchType.EAGER)
    @JoinTable(name="ORDERITEMS",
            joinColumns = @JoinColumn(name="order_id",referencedColumnName = "orderId"),
            inverseJoinColumns = @JoinColumn(name="book_id",referencedColumnName = "id")
    )
    public Set<Book> getOrderItems(){
        return orderItems;
    }
    public void setOrderItems(Set<Book> orderItems){
        this.orderItems = orderItems;
    }


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "userId",insertable = false,updatable = false)
    public UserAuth getBuyer(){return buyer;}
    public void setBuyer(UserAuth buyer){this.buyer = buyer;}

}