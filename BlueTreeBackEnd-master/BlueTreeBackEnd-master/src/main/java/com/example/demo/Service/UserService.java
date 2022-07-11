package com.example.demo.Service;

import com.example.demo.Domain.User;
import com.example.demo.Exception.UserAlreadyExist;
import com.example.demo.Exception.UserNotFound;

import java.util.List;

public interface UserService {
    User saveUser(User user) throws UserAlreadyExist;
    List<User> getAllUser();
    boolean deleteUserbyId(int id);
    User updateUser(User user,int id) throws UserNotFound;

}
