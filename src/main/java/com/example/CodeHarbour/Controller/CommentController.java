    package com.example.CodeHarbour.Controller;
    
    import com.example.CodeHarbour.Model.Comments;
    import com.example.CodeHarbour.Model.User;
    import com.example.CodeHarbour.Request.CreateCommentRequest;
    import com.example.CodeHarbour.Service.CommentSerivce;
    import com.example.CodeHarbour.Service.UserServices;
    import com.example.CodeHarbour.authResponse.MessageResponse;
    import org.apache.coyote.Response;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.UnsatisfiedServletRequestParameterException;
    import org.springframework.web.bind.annotation.*;
    
    import java.util.List;
    
    @RestController
    @RequestMapping("/api/comments")
    public class CommentController {
    
        @Autowired
        private CommentSerivce commentSerivce;
    
        @Autowired
        private UserServices userServices;
    
         @PostMapping
        public ResponseEntity<Comments> createComments(
                @RequestBody CreateCommentRequest req,
                @RequestHeader("Authorization")String jwt
         ) throws Exception{
             User user=userServices.findUserProfilebyjwt(jwt);
             Comments comment=commentSerivce.createComment(req.getIssueid(),user.getId(),req.getContent());
             return new ResponseEntity<>(comment, HttpStatus.CREATED);
         }
    
         @DeleteMapping("/{commentId}")
        public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,
                                                             @RequestHeader("Authorization") String jwt)throws Exception{
             User user=userServices.findUserProfilebyjwt(jwt);
             commentSerivce.deleteComment(commentId,user.getId());
             MessageResponse messageResponse=new MessageResponse("Comment Delete Successfully");
             return new ResponseEntity<>(messageResponse,HttpStatus.OK);
    
    
         }
         @GetMapping("/{issueId}")
        public ResponseEntity<List<Comments>> getCommentsByIssueId(@PathVariable Long issueId){
             List<Comments> comments=commentSerivce.findCommentByIssueId(issueId);
             return new ResponseEntity<>(comments,HttpStatus.OK);
         }
    
    }
    
