package com.example.CodeHarbour.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;

import java.util.Collection;
import java.util.Date;

import static com.example.CodeHarbour.Configuration.JWTConstraint.SECERT_KEY;
import static tools.jackson.databind.type.LogicalType.Collection;

public class JwtProvider {
        static   SecretKey key = Keys.hmacShaKeyFor(SECERT_KEY.getBytes());
//


    public static String generatetoken(Authentication auth){
        String jwt=Jwts.builder().setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+86400000))
                .claim("email",auth.getName()).signWith(key).compact();

        return jwt;
    }

    public static String getemailfromtoken(String jwt){
        Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(jwt)
            .getPayload();

        return String.valueOf(claims.get("email"));

    }



}
