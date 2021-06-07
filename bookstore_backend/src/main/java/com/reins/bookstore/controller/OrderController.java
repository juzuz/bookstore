package com.reins.bookstore.controller;
import com.reins.bookstore.compositeKey.CartId;
import com.reins.bookstore.entity.Address;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.entity.Orders;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.reins.bookstore.compositeKey.OrderModel;

import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * @ClassName BookController
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/6 16:07
 */
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    private BookService bookService;


    @Transactional
    @RequestMapping("/submitOrders")
    public Msg submitOrders(@Valid @RequestBody List<OrderModel> data){
        int userId = data.get(0).userId;
        Address address = data.get(0).address;
        Date cur = new Date();
        Orders newOrder = orderService.createOrder(userId,cur,address.getName(),address.getAddress(), address.getPhone());
        Integer orderId = newOrder.getOrderId();

        List<OrderItems> items = new ArrayList<>();
        List<CartId> cartItems = new ArrayList<>();

        for (OrderModel o:data){
            OrderItems item = new OrderItems(orderId,o.getBookId(),o.getQuantity());
            CartId cartItem = new CartId(o.getId(),o.getBookId());
            items.add(item);
            cartItems.add(cartItem);
        }
        orderService.addItemsToOrder(items);
        cartService.orderSubmitted(cartItems);
        bookService.reduceInventory(items);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }
    @RequestMapping("/getOrders")
    public List<JSONObject> getOrders(@RequestParam(value = "id", required = false) Integer userId){

        List<Orders> orders = orderService.getOrders(userId);
        List<JSONObject> orderData = new ArrayList<>();
        for(Orders o:orders){
            Integer orderId = o.getOrderId();
            JSONObject orderInfo = new JSONObject();
            orderInfo.put("orderId", orderId);
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            orderInfo.put("purchaseDate",dateFormat.format(o.getOrderDate()));
            orderInfo.put("buyerId",o.getBuyer().getUserId());
            orderInfo.put("buyerUsername",o.getBuyer().getUsername());
            orderInfo.put("receiver",o.getName());
            orderInfo.put("shipping",o.getAddress());
            orderInfo.put("phone",o.getPhone());
            Set<Book> items = o.getOrderItems();

            List<JSONObject> books = new ArrayList<>();
            for (Book b:items){
                JSONObject bookInfo = new JSONObject();
                Integer bookId = b.getId();
                bookInfo.put("bookId",bookId);
                bookInfo.put("image",b.getImage());
                bookInfo.put("title",b.getName());
                bookInfo.put("price",b.getPrice());
                bookInfo.put("qty",orderService.getOrderQuantity(orderId,bookId));
                books.add(bookInfo);
            }
            orderInfo.put("books",books);
            orderData.add(orderInfo);
        }
        return orderData;

    }

}
