package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.repository.BookRepository;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.IdClass;
import java.util.List;
import java.util.Objects;
/**
 * @ClassName BookDaoImpl
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/5 20:20
 */
@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book findById(Integer id){
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public List<Book> getBooks(boolean includeRemove){

        if(includeRemove){
            return bookRepository.findAll();

        }
        return bookRepository.findByRemovedFalse();
    }

    @Override
    public void storeBook(Book book){
        bookRepository.save(book);
    }


    @Override
    public void remove(Integer bookId) {bookRepository.deleteById(bookId);}
}
