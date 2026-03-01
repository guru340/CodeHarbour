package com.example.CodeHarbour.Controller;

import com.example.CodeHarbour.Configuration.JwtProvider;
import com.example.CodeHarbour.Model.Subscription;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Repository.UserRepo;
import com.example.CodeHarbour.Request.LoginRequest;
import com.example.CodeHarbour.Service.CustomUserDetailsImpl;
import com.example.CodeHarbour.Service.SubscriptionService;
import com.example.CodeHarbour.authResponse.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.jaas.JaasAuthenticationCallbackHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsImpl customUserDetails;

    @Autowired
    private SubscriptionService subscriptionService;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws Exception{
        User isUSerExists=userRepo.findByEmail(user.getEmail());

        if(isUSerExists!=null){
            throw new Exception("email already exist with another account");
        }

        User createuser=new User();
        createuser.setEmail(user.getEmail());
        createuser.setPassword(passwordEncoder.encode(user.getPassword()));
        createuser.setFullName(user.getFullName());

        User saveUser=userRepo.save(createuser);
        subscriptionService.createSubscription(saveUser);

        Authentication authentication=new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt= JwtProvider.generatetoken(authentication);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setMessage("signup sucess");
        authResponse.setJwt(jwt);


        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse>signing(@RequestBody LoginRequest loginRequest){

        String username=loginRequest.getEmail();
        String password=loginRequest.getPassword();

        Authentication authentication=authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt= JwtProvider.generatetoken(authentication);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setMessage("signinng sucessfully");
        authResponse.setJwt(jwt);


        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails= customUserDetails.loadUserByUsername(username);

        if (userDetails==null){
            throw  new BadCredentialsException("Invalid UserName");
        }
        if (!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
