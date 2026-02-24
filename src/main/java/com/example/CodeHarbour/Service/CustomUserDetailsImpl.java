package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Repository.UserRepo;

import com.example.CodeHarbour.Model.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsImpl implements UserDetailsService {

    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user=userRepo.findByEmail(username);

            if(user==null){
                throw new UsernameNotFoundException("user not found with email"+username);
            }
        List<GrantedAuthority> authorities=new ArrayList<>();

            return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }
}
