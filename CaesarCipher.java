import java.util.*;
public class CaesarCipher {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
		StringBuilder sb = new StringBuilder();

        System.out.print("Enter text : ");
        String text = sc.nextLine();

        System.out.print("Enter shift key value : ");
        int key = sc.nextInt();

        System.out.print("What do you want to do with text?\n1. Encryption\n2. Decryption \n");
        int select = sc.nextInt();

        if(select == 1){
            for(int i=0; i<text.length(); i++)
                sb.append((char)(text.charAt(i) + key));
            System.out.println("The Cipher/Encrypted text: "+ sb);
        }
        
        else if(select == 2){
            for(int i=0; i<text.length(); i++)
                sb.append((char)(text.charAt(i) - key));
            System.out.println("The Decipher/Decrypted text: "+ sb);
        }
        
        else
            System.out.println("Invalid Option");
	}
}