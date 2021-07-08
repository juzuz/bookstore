package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.compositeKey.OrderModel;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.OrderItems;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * @ClassName BookServiceImpl
 * @Description the Implement of BookService
 * @Author thunderBoy
 * @Date 2019/11/6 16:04
 */

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public void addBook(Book book){
        bookDao.storeBook(book);
    }
    @Override
    public Book findBookById(Integer id) {
        return bookDao.findById(id);
    }

    @Override
    public Page<Book> getBooks(Optional<Integer> page, String query) {
        return bookDao.getBooks(page,query);
    }
    @Override
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
    @Override
    public void reduceInventory(OrderItems item) {
        Book book = bookDao.findById(item.getBookId());
        book.setInventory(book.getInventory() - item.getQuantity());
        bookDao.storeBook(book);
    }

    @Override
    public void bookSoftRemove(Integer bookId){
        // For hard Remove, switch book uncommand remove code.
        Book book = bookDao.findById(bookId);
        book.setRemoved(!book.getRemoved());
        bookDao.storeBook(book);
    }
}