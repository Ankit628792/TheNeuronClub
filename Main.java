import java.util.* ;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the sides of triangle ");
        int a,b,c,result;
        System.out.print("Side 1: ");
        a = sc.nextInt();
        System.out.print("Side 2: ");
        b = sc.nextInt();
        System.out.print("Side 3: ");
        c = sc.nextInt();
 
        if((a+b > c) && (b+c > a) && c+a >b) {
            if((a==b)&&(b==c))
            System.out.println("It is an Equilateral Triangle");
            else if((a==b)||(b==c)||(c==a))
                System.out.println("It is an isosceles Triangle");
            else
                System.out.println("It is a Scalene Triangle");
        }
        else
            System.out.println("Not a triangle");
    }
}
