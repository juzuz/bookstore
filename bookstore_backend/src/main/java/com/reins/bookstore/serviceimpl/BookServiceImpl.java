package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.compositeKey.OrderModel;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

/**
 * @ClassName BookServiceImpl
 * @Description the Implement of BookService
 * @Author thunderBoy
 * @Date 2019/11/6 16:04
 */

@Service
public class BookServiceImpl implements BookService {
//
//    @Autowired
//    private BookRepository repository;

    @Autowired
    private BookDao bookDao;

    public void addBook(Book book){
        bookDao.storeBook(book);
    }

    public Book findBookById(Integer id) {
        return bookDao.findById(id);
    }

    public List<Book> getBooks(boolean includeRemove) {
        return bookDao.getBooks(includeRemove);
    }

    public void updateBook(Integer bookId, String name, String author, String type, BigDecimal price, Integer inventory, String description, String isbn) {
        Book book = bookDao.findById(bookId);
        book.setName(name);
        book.setAuthor(author);
        book.setType(type);
        book.setPrice(price);
        book.setInventory(inventory);
        book.setIsbn(isbn);
        book.setDescription(description);
        bookDao.storeBook(book);

    }

    public void reduceInventory(List<OrderItems> orders) {
        for (OrderItems o : orders) {
            Book book = bookDao.findById(o.getBookId());
            book.setInventory(book.getInventory() - o.getQuantity());
            bookDao.storeBook(book);
        }
    }

    @Override
    public void bookSoftRemove(Integer bookId){
//        Book book = bookDao.findById(bookId);
//        book.setRemoved(!book.getRemoved());
//        bookDao.storeBook(book);
        bookDao.remove(bookId);
    }
}