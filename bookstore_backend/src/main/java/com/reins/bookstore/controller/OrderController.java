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
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import com.reins.bookstore.compositeKey.OrderModel;

import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;

import javax.transaction.Transactional;
import java.util.*;

class OrderIdComparator implements Comparator<Orders> {

    @Override
    public int compare(Orders o1, Orders o2) {
        return ( o2.getOrderId() - o1.getOrderId());
    }
}
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
    public Msg submitOrders(@RequestBody List<OrderModel> data){

        Integer userId = data.get(0).userId;
        Address address = data.get(0).address;
        Date cur = new Date();
        // Creates a new orderId. Increment by 1 and retrieve
        Orders newOrder = orderService.createOrder(userId,cur,address.getAddressId());
        Integer orderId = newOrder.getOrderId();

        for (OrderModel o:data){
            // Read through the orders. Each Item has the same orderId.
            OrderItems item = new OrderItems(orderId,o.getBookId(),o.getQuantity());
            orderService.addItemToOrder(item);

            // If this order was submitted from the cart, remove the corresponding book from the cart.
            if(o.getFromCart()){
                cartService.deleteItem(o.getId(),o.getBookId());
            }
            //Reduce the inventory
            bookService.reduceInventory(item);

        }
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }

    @RequestMapping("/getOrdersByUserAndDate")
    public List<Orders> getOrdersByUserAndDate(@RequestParam(value ="id") Integer userId, @RequestParam(value="dates") List<Date> dates){

       List<Orders> filtered = orderService.getOrdersByUserAndDate(userId,dates);
        return filtered;
    }

    @RequestMapping("/getOrdersByDate")
    public List<Orders> getOrdersByDate(@RequestParam(value="dates") List<Date> dates){
     List<Orders> filter = orderService.getOrdersByDate(dates);
     return filter;
    }
//
//    @RequestMapping("/getAllOrders")
//    public Page<Orders> getAllOrders(Optional<Integer> page){
//
//        List<Orders> orders = orderService.getAllOrders();
//        System.out.println(orders.get(0).getOrderId());
//        System.out.println("AFTER SPRT");
//        Collections.sort(orders,new OrderIdComparator());
//        System.out.println(orders.get(0).getOrderId());
//        PageRequest pageRequest = PageRequest.of(page.orElse(0), 5);
//        int total = orders.size();
//        int start = Math.toIntExact(pageRequest.getOffset());
//        int end = Math.min((start + pageRequest.getPageSize()), total);
//        List<Orders> output = new ArrayList<>();
//        if (start <= end) {
//            output = orders.subList(start, end);
//        }
//        return new PageImpl<>(
//                output,
//                pageRequest,
//                total
//        );
//    }

    @RequestMapping("/getOrdersByQueryAndDateAndUserAndPage")
    public Page<Orders> getOrdersByQueryAndDateAndUserAndPage(@RequestParam Integer id, @RequestParam Optional<String> query,@RequestParam List<Date> filterDates, @RequestParam Optional<Integer> page ){
        return orderService.getOrdersByQueryAndDateAndUserAndPage(id,query.orElse(""),filterDates,page);
    }

    @Transactional
    @RequestMapping("/deleteOrder")
    public Msg deleteOrder(@RequestParam Integer id){
        boolean status = orderService.deleteOrder(id);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }

}
