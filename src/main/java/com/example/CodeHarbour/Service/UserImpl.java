package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Configuration.JwtProvider;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserImpl implements UserServices{

    @Autowired
    private UserRepo userRepo;

    @Override
    public User findUserProfilebyjwt(String jwt) throws Exception {
        String email= JwtProvider.getemailfromtoken(jwt);
        return findUserbyEmail(email);
    }

    @Override
    public User findUserbyEmail(String email) throws Exception {
        User user=userRepo.findByEmail(email);
        if (user==null){
            throw new Exception("User Was not Found");
        }
        return user;
    }

    @Override
    public User findUserById(Long UserId) throws Exception {
        Optional<User> optionalUser=userRepo.findById(UserId);
        if (optionalUser.isEmpty()){
            throw  new Exception("user not found");
        }
        return optionalUser.get() ;
    }

    @Override
    public User updateUsersProjectSize(User user, int number) {
        user.setProjectSize(user.getProjectSize()+number);

        return userRepo.save(user);
    }
}
