package soen341.backend;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @MessageMapping("/hello/{name}")
    @SendTo("/topic/greetings/{name}")
    public Greeting greeting(@DestinationVariable String name, HelloMessage message) throws Exception {
        // Dynamically use the 'name' variable to personalize the greeting
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }
}
