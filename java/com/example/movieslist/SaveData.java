package com.example.movieslist;

import jakarta.jws.WebService;
import jakarta.jws.WebMethod;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.FileOutputStream;

@WebService
public class SaveData {

    @WebMethod
    public String saveList(String movies) {
        String[] moviesArr = movies.split(";");

        try {
            File xmlFile = new File("C:\\Users\\yashg\\IdeaProjects\\MoviesList\\src\\main\\java\\com\\example\\movieslist\\movies.xml");

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(xmlFile);

            Element moviesList = document.createElement("movies");

            for(int i=0;i<moviesArr.length;i++) {
                Element movie = document.createElement("movie");
                movie.appendChild(document.createTextNode(moviesArr[i]));
                moviesList.appendChild(movie);
            }

            Element movies1 = document.getDocumentElement();
            movies1.appendChild(moviesList);

            FileOutputStream fileOutputStream = new FileOutputStream(xmlFile);
            javax.xml.transform.Transformer transformer = javax.xml.transform.TransformerFactory.newInstance().newTransformer();
            transformer.transform(new javax.xml.transform.dom.DOMSource(document),new javax.xml.transform.stream.StreamResult(fileOutputStream));

            return "1";
        }
        catch(Exception error) {
            return "-1";
        }

    }


}
