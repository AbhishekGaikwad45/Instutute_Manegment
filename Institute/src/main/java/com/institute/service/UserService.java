package com.institute.service;

import com.institute.model.User;
import com.institute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private UserRepository userRepository;


    // USER SIGNUP
    public String registerUser(User user) {

        User existing = repo.findByEmail(user.getEmail());

        if (existing != null) {
            return "Email already exists!";
        }

        // You said no password encryption → keeping plain text
        repo.save(user);
        return "Signup Successful";
    }

    // USER LOGIN
    public String loginUser(String email, String password) {

        User user = repo.findByEmail(email);

        if (user == null) {
            return "User Not Found!";
        }

        if (!user.getPassword().equals(password)) {
            return "Incorrect Password!";
        }

        return "Login Successful";
    }

    public boolean checkEmailExists(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;   // <-- FIXED
    }

}
