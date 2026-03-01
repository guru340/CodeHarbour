package com.example.CodeHarbour.Controller;

import com.example.CodeHarbour.Model.PlanType;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Service.UserServices;
import com.example.CodeHarbour.authResponse.PayementLinkResponse;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payement")
public class PayementController {

    @Value("${razorpay.api.key}")
    private String apikey;

    @Value(("${razorpay.api.secret}"))
    private String apiSecert;

    @Autowired
    private UserServices userServices;

    public ResponseEntity<PayementLinkResponse> createPayement(
            @PathVariable PlanType planType,
            @RequestHeader("Authorization")String jwt) throws Exception{

        User user=userServices.findUserProfilebyjwt(jwt);
        int amount=799*100;
        if(planType.equals(PlanType.YEARLY)){
            amount=amount*12;
            amount=(int)(amount*0.7);
        }

            RazorpayClient razorpayClient=new RazorpayClient(apikey,apiSecert);
            JSONObject payementLinkRequest=new JSONObject();
            payementLinkRequest.put("amount",amount);
            payementLinkRequest.put("currency","INR");

            JSONObject customer=new JSONObject();
            customer.put("name",user.getFullName());
            customer.put("email",user.getEmail());
            payementLinkRequest.put("customer",customer);

            JSONObject notify=new JSONObject();
            notify.put("email",true);
            payementLinkRequest.put("notify",notify);

            payementLinkRequest.put("callback_url","http://localhost:5173/upgrade_plan/success?planType"+planType);

            PaymentLink paymentLink=razorpayClient.paymentLink.create(payementLinkRequest);

            String payementLinkId=paymentLink.get("id");
            String payementLinkUrl=paymentLink.get("short_url");

            PayementLinkResponse response=new PayementLinkResponse();
            response.setPayement_link_id(payementLinkId);
            response.setPayement_link_url(payementLinkUrl);


            return new ResponseEntity<>(response, HttpStatus.CREATED);

    }
}
