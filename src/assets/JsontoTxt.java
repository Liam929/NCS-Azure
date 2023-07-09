import java.io.*;
import java.nio.file.*;

public class JsontoTxt {
    public static void main(String[] args) {
        String inputFilename = "input.json";  // 输入文件名
        String outputFilename = "output.txt";  // 输出文件名

        try {
            String jsonContent = new String(Files.readAllBytes(Paths.get(inputFilename)));
            Files.write(Paths.get(outputFilename), jsonContent.getBytes());
        } catch (IOException ex) {
            System.out.println("Error: " + ex.getMessage());
        }
    }
}
