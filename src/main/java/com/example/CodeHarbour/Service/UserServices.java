package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.User;

public interface UserServices {
    User findUserProfilebyjwt(String jwt) throws Exception;

    User findUserbyEmail(String email) throws Exception;

    User findUserById(Long UserId)throws Exception;

    User updateUsersProjectSize(User user,int number);
}
