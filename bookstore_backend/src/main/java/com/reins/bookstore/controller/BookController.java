package com.reins.bookstore.controller;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;


import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @ClassName BookController
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/6 16:07
 */
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/addBook")
    public Msg addBook(@ModelAttribute("book") Book book){
        bookService.addBook(book);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);

    }



    @RequestMapping("/getBooks")
    public Page<Book> getBooks(@RequestParam Optional<Integer> page, Optional<String> query) {
        return bookService.getBooks(page,query.orElse(""));
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){

        return bookService.findBookById(id);
    }

    @RequestMapping("/updateBook")
    public Msg updateBook(@RequestParam("id") Integer bookId, @RequestParam("title") String name, @RequestParam("author") String author,
                          @RequestParam("type") String type, @RequestParam("price") BigDecimal price, @RequestParam("inventory") Integer inventory,
                          @RequestParam("description") String description, @RequestParam("isbn") String isbn
                         ){
        bookService.updateBook(bookId,name,author,type,price,inventory,description,isbn);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }

    @RequestMapping("/setRemoved")
    public Msg setRemoved(@RequestParam("bookId") Integer bookId)
    {
        try{
            bookService.bookSoftRemove(bookId);
        }
        catch(Exception e){
            System.out.println(e);
        }
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }

}
