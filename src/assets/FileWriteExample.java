import java.io.*;

public class FileWriteExample {
    public static void main(String[] args) {
        String filename = "yourFile.txt";
        
        try {
            RandomAccessFile file = new RandomAccessFile(filename, "rw"); // 打开文件为读写模式
            
            long position = 50; // 要定位到的位置
            file.seek(position);
            
            String data = "This is the data to write at the specified position."; // 要写入的数据
            file.write(data.getBytes()); // 写入数据
            
            file.close(); // 关闭文件
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
