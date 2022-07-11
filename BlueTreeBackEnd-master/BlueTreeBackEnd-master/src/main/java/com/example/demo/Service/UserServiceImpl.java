package com.example.demo.Service;

import com.example.demo.Domain.User;
import com.example.demo.Exception.UserAlreadyExist;
import com.example.demo.Exception.UserNotFound;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExist {
        Object temp = userRepository.findByName(user.getName());
        if(temp!=null){
            throw new UserAlreadyExist();
        }
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public boolean deleteUserbyId(int id) {
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public User updateUser(User user, int id) throws UserNotFound {
        if(userRepository.findById(id).isEmpty()){
            throw new UserNotFound();
        }
        return userRepository.save(user);
    }
}
