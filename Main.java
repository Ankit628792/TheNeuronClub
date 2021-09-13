// import java.util.* ;
// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         System.out.println("Enter the sides of triangle ");
//         int a,b,c,result;
//         System.out.print("Side 1: ");
//         a = sc.nextInt();
//         System.out.print("Side 2: ");
//         b = sc.nextInt();
//         System.out.print("Side 3: ");
//         c = sc.nextInt();
 
//         if((a+b > c) && (b+c > a) && c+a >b) {
//             if((a==b)&&(b==c))
//             System.out.println("It is an Equilateral Triangle");
//             else if((a==b)||(b==c)||(c==a))
//                 System.out.println("It is an isosceles Triangle");
//             else
//                 System.out.println("It is a Scalene Triangle");
//         }
//         else
//             System.out.println("Not a triangle");
//     }
// }



import java.util.* ;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
		int a,b,c,d;
        System.out.println("The Quadratic equation is of the type a(x^2)+bx+c=0");
        System.out.print("Enter the value of a: ");
        a = sc.nextInt();
        System.out.print("Enter the value of b: ");
        b = sc.nextInt();
        System.out.print("Enter the value of c: ");
        c = sc.nextInt();

        d=(b*b) - 4*a*c;

        if((a<0)||(b<0)||(c<0)||(a>100)||(b>100)||(c>100))
            System.out.println("Input should be in range of 1 and 100");
        else if(a==0)
        System.out.println("Not a quadratic equation");
        else if (d==0)
        System.out.println("Roots are equal");
        else if(d<0)
        System.out.println("Imaginary roots");
        else
        System.out.println("Real Roots");

	}

}