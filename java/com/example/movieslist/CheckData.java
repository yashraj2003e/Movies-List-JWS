package com.example.movieslist;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.FileOutputStream;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

@WebService
public class CheckData {

    @WebMethod
    public int ValidateUserData(String username,String password) {
        try {
            File xmlFile = new File("C:\\Users\\yashg\\IdeaProjects\\MoviesList\\src\\main\\java\\com\\example\\movieslist\\users.xml");
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(xmlFile);

            NodeList userList = document.getElementsByTagName("user");

            Element userElement = (Element) userList.item(0);

            String userName = userElement.getElementsByTagName("username").item(0).getTextContent();
            String userPassword = userElement.getElementsByTagName("password").item(0).getTextContent();

            if(userName.equals(username) && userPassword.equals(password)) {
                    return 1;
            }
            return 0;
        }
        catch(Exception error) {
            return 2;
        }
    }
}
