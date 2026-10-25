/* COS 126 Lab content. One entry per lecture, in course order.
   Each module: id, week, date, reading, title, short (rail label), lede, idea (HTML), keys, demos, code, worked, mistakes, quiz.
   HTML strings must escape < > & in prose and in <pre data-java> blocks. Java source in code.src is plain text. */
(function(){
const dbl=x=>Number.isInteger(x)?x.toFixed(1):String(x);
const arr=a=>'{ '+a.join(', ')+' }';
const term=s=>`<div class="outbox"><pre>${s}</pre></div>`;

const weeks=[
  {n:0,label:'Week 0',name:'Getting started'},
  {n:1,label:'Week 1',name:'Conditionals and loops'},
  {n:2,label:'Week 2',name:'Arrays and I/O'},
  {n:3,label:'Week 3',name:'Functions and libraries'},
  {n:4,label:'Week 4',name:'Recursion and performance'},
  {n:5,label:'Week 5',name:'Midterm',blurb:'Midterm review on Mon, Oct 12, then the midterm on Wed, Oct 14. Fall break is Oct 19–23. Practice on the Exam review page.'},
  {n:6,label:'Week 6',name:'Objects'},
  {n:7,label:'Week 7',name:'Design and algorithms'},
  {n:8,label:'Week 8',name:'Data structures and theory'},
  {n:9,label:'Week 9',name:'Machine learning'},
  {n:9.5,label:'Thanksgiving week',name:'Networks'},
  {n:10,label:'Week 10',name:'The TOY machine'},
  {n:11,label:'Week 11',name:'Circuits'},
  {n:12,label:'Reading period',name:'Project and final',blurb:'Optional Atomic review session on Wed, Dec 9. Dean’s Date is Tue, Dec 15.'}
];

const dues=[
  {week:0,date:'2026-09-13',name:'Hello'},
  {week:1,date:'2026-09-20',name:'Conditionals and Loops'},
  {week:2,date:'2026-09-27',name:'Arrays and IO'},
  {week:3,date:'2026-10-04',name:'Functions'},
  {week:4,date:'2026-10-11',name:'Recursive Graphics'},
  {week:5,date:'2026-10-14',name:'Midterm',kind:'Exam'},
  {week:6,date:'2026-11-01',name:'OOP'},
  {week:7,date:'2026-11-08',name:'Guitar Hero'},
  {week:8,date:'2026-11-15',name:'Chat126'},
  {week:9,date:'2026-11-22',name:'Image Classifier'},
  {week:10,date:'2026-12-06',name:'Hamming'},
  {week:12,date:'2026-12-15',name:'Atomic',time:'5pm',kind:'Project due'},
  {week:12,date:'2026-12-20',name:'Final exam',time:'4:00–7:00 pm',kind:'Exam'}
];

const modules=[

/* ===================== WEEK 0 ===================== */
{id:'hello',week:0,date:'2026-09-02',reading:'1.1',title:'Hello, World',
 keywords:['compile','javac','run','error','args','command line'],
 lede:'Every Java program goes through the same cycle: write it, compile it, run it. Learn how a program is put together and what its error messages mean.',
 idea:`<p>A program is a precise list of instructions. You type it into a text file (<code>HelloWorld.java</code>). The <b>compiler</b> (<code>javac</code>) translates it into bytecode (<code>HelloWorld.class</code>), and the <b>Java Virtual Machine</b> (<code>java</code>) runs that bytecode.</p>
 <p>Errors come in two kinds. A <b>compile-time error</b> means the compiler could not understand your code, such as a missing semicolon, so nothing runs. A <b>run-time error</b> means the code compiled but did something illegal while running, such as reading a command-line argument that was never given.</p>`,
 keys:[['javac HelloWorld.java','Compile. Silence means success.'],['java HelloWorld','Run. No .java or .class at the end.'],['args[0]','The first word typed after the class name. Always a String.']],
 demos:[{type:'frames',title:'Edit, compile, run',sub:'Step through what happens in the terminal.',frames:[
   {h:'1. Edit',html:`<p>Write the program in a file whose name matches the class name. Class <code>UseArgument</code> must live in <code>UseArgument.java</code>.</p>`},
   {h:'2. Compile',html:term(`~/cos126&gt; javac UseArgument.java
~/cos126&gt; `)+`<p style="margin-top:10px">No message means it compiled. You now have <code>UseArgument.class</code>. COS 126 setups also provide <code>javac-introcs</code> and <code>java-introcs</code>, which add the course's standard libraries (StdIn, StdOut, StdDraw…).</p>`},
   {h:'3. Run',html:term(`~/cos126&gt; java UseArgument Alice
Hi, Alice. How are you?`)+`<p style="margin-top:10px"><code>Alice</code> is a command-line argument. Inside the program it is <code>args[0]</code>.</p>`},
   {h:'4. A compile-time error',html:term(`~/cos126&gt; javac UseArgument.java
UseArgument.java:5: error: ';' expected
        System.out.println(". How are you?")
                                            ^
1 error`)+`<p style="margin-top:10px">The message names the file, the line (5) and points with <code>^</code> at the spot. No <code>.class</code> file is made, so there is nothing new to run.</p>`},
   {h:'5. A run-time error',html:term(`~/cos126&gt; java UseArgument
Hi, Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 0 out of bounds for length 0
        at UseArgument.main(UseArgument.java:4)`)+`<p style="margin-top:10px">It compiled fine, but no argument was given, so <code>args</code> has length 0 and <code>args[0]</code> does not exist. Notice "Hi, " printed first: the crash happens at line 4, while running.</p>`}
 ]}],
 code:{file:'UseArgument.java',run:'java UseArgument Alice',out:'Hi, Alice. How are you?',src:
`public class UseArgument {
    public static void main(String[] args) {
        System.out.print("Hi, ");
        System.out.print(args[0]);
        System.out.println(". How are you?");
    }
}`,
 notes:[['line 1','The class name must match the file name: UseArgument.java.'],['line 2','Every program starts running at main. Copy this line exactly for now.'],['line 3','print stays on the same line. println ends the line afterward.'],['line 4','args[0] is the first command-line argument.'],['{ }','Curly braces group code. Every { needs a matching }.']]},
 worked:{label:'Read the error message',html:`<p>Error messages look scary but always have the same shape: <b>file:line: error: what went wrong</b>. Fix them in order.</p>
 <ol><li><b>Fix the first error first.</b> One missing brace can cause ten later errors, and they all vanish when you fix the first.</li>
 <li><b>Look at the line before too.</b> A missing <code>;</code> on line 4 is often reported on line 5.</li>
 <li><b>Recompile after every fix.</b> <code>java</code> runs the old <code>.class</code> file until you compile again.</li></ol>
 <p><code>cannot find symbol</code> usually means a typo or wrong capitalization: Java treats <code>system</code> and <code>System</code> as different names.</p>`},
 mistakes:[
  `<p><b>The file name doesn't match the class.</b> <code>public class Hello</code> inside <code>HelloWorld.java</code> fails to compile: "class Hello is public, should be declared in a file named Hello.java".</p>`,
  `<p><b>Running the .class file by name.</b> <code>java HelloWorld.class</code> fails with "Could not find or load main class". Type just the class name: <code>java HelloWorld</code>.</p>`,
  `<p><b>Wrong capitalization.</b> Java is case-sensitive: <code>system.out.println</code> and <code>Main</code> instead of <code>main</code> are both errors.</p>`,
  `<p><b>Forgetting to recompile.</b> You edit the code, run it, and nothing changed. You ran the old bytecode. Compile again.</p>`],
 quiz:[
  {q:'What does <code>javac HelloWorld.java</code> produce when it succeeds?',a:['The output Hello, World','A file HelloWorld.class containing bytecode','A file HelloWorld.exe','Nothing; it only checks spelling'],c:1,why:'javac translates source into Java bytecode in HelloWorld.class. You run it with java HelloWorld.'},
  {q:'You forget a semicolon. When do you find out?',a:['When you compile','When you run the program','Only if that line runs','Never: Java adds it for you'],c:0,why:'A missing semicolon is a syntax error, caught by the compiler. No .class file is produced.'},
  {q:'UseArgument reads <code>args[0]</code>. What happens with <code>java UseArgument</code> (no arguments)?',a:['It won\'t compile','It prints Hi, null','It compiles, then crashes at run time with ArrayIndexOutOfBoundsException','It waits for you to type a name'],c:2,why:'The compiler can\'t know how many arguments you will type. At run time args has length 0, so args[0] is out of bounds.'},
  {q:'What does this print?',code:`System.out.print("A");
System.out.println("B");
System.out.print("C");`,a:['A, B and C on three lines','AB on one line, then C on the next','A on one line, then BC','ABC on one line'],c:1,why:'print doesn\'t end the line. println prints B and then ends the line, so C starts a new one.'}]},

{id:'types',week:0,date:'2026-09-09',reading:'1.2',title:'Built-in data types',short:'Data types',
 keywords:['int','double','boolean','char','String','cast','integer division','overflow','Math','parseInt'],
 lede:'A data type is a set of values and the operations on them. Most early surprises in Java come from integer division, casting and String concatenation.',
 idea:`<p>Every value in Java has a <b>type</b>, and the type decides what an operation means. <code>7 / 2</code> is integer division and gives <code>3</code>. <code>7.0 / 2</code> is floating-point division and gives <code>3.5</code>. The <code>+</code> sign adds numbers but joins (concatenates) Strings.</p>
 <p>Java checks types when it compiles. Some conversions are automatic: an <code>int</code> widens to a <code>double</code>. Others you must ask for: a <b>cast</b> like <code>(int) 3.99</code>, or a method like <code>Integer.parseInt("42")</code>.</p>`,
 keys:[['int','Integers from −2,147,483,648 to 2,147,483,647'],['double','Real numbers, approximately (about 15 digits)'],['boolean','true or false'],['char','One character: \'a\''],['String','A sequence of characters: "Hi"']],
 demos:[{type:'types',items:[
  {e:'7 / 2',v:'3',t:'int',why:'Both operands are ints, so this is integer division. The fractional part is thrown away (truncated toward zero).'},
  {e:'7.0 / 2',v:'3.5',t:'double',why:'One operand is a double, so the int 2 is promoted to 2.0 and the division is floating point.'},
  {e:'7 % 3',v:'1',t:'int',why:'% is the remainder: 7 = 2·3 + 1.'},
  {e:'-7 % 3',v:'-1',t:'int',why:'In Java the remainder takes the sign of the left operand, so −7 % 3 is −1, not 2.'},
  {e:'(double) 7 / 2',v:'3.5',t:'double',why:'A cast binds tighter than /, so 7 becomes 7.0 first, then 7.0 / 2 = 3.5.'},
  {e:'(double) (7 / 2)',v:'3.0',t:'double',why:'The parentheses force integer division first (3), then the cast gives 3.0. Too late to get the .5 back.'},
  {e:'(int) 3.99',v:'3',t:'int',why:'Casting a double to an int truncates toward zero. It does not round.'},
  {e:'(int) -3.99',v:'-3',t:'int',why:'Truncation goes toward zero, so −3.99 becomes −3.'},
  {e:'Math.round(3.5)',v:'4',t:'long',why:'Math.round rounds to the nearest integer (halves round up). Given a double it returns a long.'},
  {e:'"1" + 2 + 3',v:'"123"',t:'String',why:'+ goes left to right. "1" + 2 is the String "12", then "12" + 3 is "123".'},
  {e:'1 + 2 + "3"',v:'"33"',t:'String',why:'Left to right again: 1 + 2 is the int 3, then 3 + "3" is the String "33".'},
  {e:'Integer.parseInt("42") + 1',v:'43',t:'int',why:'parseInt turns the String "42" into the int 42. Command-line arguments are Strings, so you will use this a lot.'},
  {e:"'a' + 1",v:'98',t:'int',why:"A char is stored as an integer code. 'a' is 97, and char + int gives an int."},
  {e:"(char) ('a' + 1)",v:"'b'",t:'char',why:'Cast the int 98 back to a char to get the next letter.'},
  {e:'Integer.MAX_VALUE + 1',v:'-2147483648',t:'int',why:'Overflow. An int has 32 bits, so going past the largest value wraps around to the smallest. Java reports no error.'},
  {e:'0.1 + 0.2',v:'0.30000000000000004',t:'double',why:'doubles are stored in binary, and 0.1 has no exact binary form. Never compare doubles with ==.'},
  {e:'1 / 0',v:'ArithmeticException',t:'run-time error',why:'Integer division by zero crashes the program at run time.'},
  {e:'1.0 / 0',v:'Infinity',t:'double',why:'Floating-point division by zero doesn\'t crash. It gives Infinity.'},
  {e:'Math.sqrt(2)',v:'1.4142135623730951',t:'double',why:'The Math library also has abs, max, min, pow, exp, log, sin, cos and random.'},
  {e:'true && !false',v:'true',t:'boolean',why:'! is not, && is and, || is or. ! binds tightest.'}]}],
 code:{file:'Quadratic.java',run:'java Quadratic -3.0 2.0',out:'2.0\n1.0',intro:'Find the roots of x² + bx + c.',src:
`public class Quadratic {
    public static void main(String[] args) {
        double b = Double.parseDouble(args[0]);
        double c = Double.parseDouble(args[1]);
        double discriminant = b*b - 4.0*c;
        double d = Math.sqrt(discriminant);
        System.out.println((-b + d) / 2.0);
        System.out.println((-b - d) / 2.0);
    }
}`,
 notes:[['line 3','Arguments are Strings. Double.parseDouble converts "-3.0" to the double −3.0.'],['line 5','* happens before −, so this is (b·b) − (4.0·c).'],['line 6','If the discriminant is negative, Math.sqrt returns NaN ("not a number") and both roots print as NaN.'],['line 7','Parentheses matter: −b + d / 2.0 would divide only d.']]},
 worked:{label:'Evaluate step by step',html:`<p>What is the value of <code>(double) (1 + 2) / 4 + "!"</code>?</p>
 <ol><li><code>(1 + 2)</code> is the int <code>3</code>.</li><li>The cast makes it the double <code>3.0</code>.</li><li><code>3.0 / 4</code> is floating-point division: <code>0.75</code>.</li><li><code>0.75 + "!"</code> involves a String, so it's concatenation: <code>"0.75!"</code>.</li></ol>
 <p>For each operator ask two questions: what types are the operands, and which operator goes first?</p>`},
 mistakes:[
  `<p><b>Integer division hiding in an average.</b> With <code>int sum, n</code>, <code>double avg = sum / n;</code> divides as ints first, then stores the truncated result. Write <code>(double) sum / n</code>.</p>`,
  `<p><b>= versus ==.</b> <code>=</code> assigns a value. <code>==</code> compares two values.</p>`,
  `<p><b>Comparing doubles with ==.</b> <code>0.1 + 0.2 == 0.3</code> is <code>false</code>. Check whether the difference is tiny instead: <code>Math.abs(x - y) &lt; 1e-9</code>.</p>`,
  `<p><b>Silent overflow.</b> <code>int</code> wraps around past about 2.1 billion with no warning. Use <code>long</code> for big counts.</p>`],
 quiz:[
  {q:'What is the value of <code>5 / 2 * 2</code>?',a:['5','4','4.0','6'],c:1,why:'5 / 2 is 2 (integer division), and 2 * 2 is 4.'},
  {q:'What does this print?',code:'System.out.println(1 + 2 + "3" + 4 + 5);',a:['15','"3345"','3345','12345'],c:2,why:'Left to right: 1 + 2 = 3, then "33", then "334", then "3345". println prints it without quotes.'},
  {q:'Which line compiles?',a:['int x = 3.0;','double y = 3;','int z = "3";','boolean b = 1;'],c:1,why:'An int widens to a double automatically. Going from double to int loses information, so it needs a cast.'},
  {q:'What is <code>(int) 2.9 + (int) 2.9</code>?',a:['5','5.8','4','6'],c:2,why:'Each cast truncates 2.9 to 2, and 2 + 2 is 4.'}]},

/* ===================== WEEK 1 ===================== */
{id:'conditionals',week:1,date:'2026-09-14',reading:'1.3',title:'Conditionals',
 keywords:['if','else','boolean','&&','||','short-circuit'],
 lede:'if and else let a program choose what to do, based on a boolean expression.',
 idea:`<p>An <code>if</code> statement runs a block only when its condition is <code>true</code>. Add <code>else</code> for the other case, and chain <code>else if</code> to test several cases in order. Java checks the conditions top to bottom and runs <b>only the first</b> branch whose condition is true.</p>
 <p>Conditions are boolean expressions built from comparisons (<code>&lt; &lt;= == != &gt;= &gt;</code>) and logic (<code>&amp;&amp; || !</code>). <code>&amp;&amp;</code> and <code>||</code> <b>short-circuit</b>: if the left side already decides the answer, Java never evaluates the right side.</p>`,
 keys:[['if (x > 0) { … }','Runs only when x > 0'],['else if (…)','Checked only if every test above was false'],['a && b','true only if both are true'],['a || b','true if at least one is true']],
 demos:[{type:'trace',title:'Is it a leap year?',sub:'Pick a year and step through the if/else chain.',input:{kind:'choice',label:'year',options:[2024,1900,2000,2026],value:2024},
  code:`int year = Integer.parseInt(args[0]);
boolean isLeap;
if (year % 400 == 0)       isLeap = true;
else if (year % 100 == 0)  isLeap = false;
else if (year % 4 == 0)    isLeap = true;
else                       isLeap = false;
System.out.println(isLeap);`,
  run(y,t){y=+y;let leap;t.set('year',y);t.step(1,`args[0] is "${y}". parseInt turns it into the int ${y}.`);
   t.set('isLeap','(no value yet)');t.step(2,'isLeap is declared but has no value yet.');
   if(y%400===0){leap=true;t.set('isLeap',leap);t.step(3,`${y} % 400 is 0, so the first test is true. Run this branch and skip every else below it.`);}
   else{t.step(3,`${y} % 400 is ${y%400}, not 0. Move on to the next test.`);
    if(y%100===0){leap=false;t.set('isLeap',leap);t.step(4,`${y} % 100 is 0: a century year that isn't divisible by 400. Not a leap year.`);}
    else{t.step(4,`${y} % 100 is ${y%100}, not 0. Move on to the next test.`);
     if(y%4===0){leap=true;t.set('isLeap',leap);t.step(5,`${y} % 4 is 0, so it's a leap year.`);}
     else{t.step(5,`${y} % 4 is ${y%4}, not 0.`);leap=false;t.set('isLeap',leap);t.step(6,'No test was true, so the final else runs.');}}}
   t.println(String(leap));t.step(7,`Print ${leap}.`);}}],
 code:{file:'LeapYear.java',run:'java LeapYear 2024',out:'true',intro:'The same rule written as a single boolean expression, without if.',src:
`public class LeapYear {
    public static void main(String[] args) {
        int year = Integer.parseInt(args[0]);
        boolean isLeapYear;

        // divisible by 4 but not by 100, or divisible by 400
        isLeapYear = (year % 4 == 0) && (year % 100 != 0);
        isLeapYear = isLeapYear || (year % 400 == 0);

        System.out.println(isLeapYear);
    }
}`,
 notes:[['line 7','&& is true only if both sides are. 1900 % 100 is 0, so 1900 gives false here.'],['line 8','|| rescues years divisible by 400, like 2000.'],['//','A comment. Java ignores everything after // on that line.']]},
 worked:{label:'Order matters in else-if chains',html:`<p>Convert a score to a letter grade:</p>
 <pre data-java>if      (score &gt;= 90) grade = 'A';
else if (score &gt;= 80) grade = 'B';
else if (score &gt;= 70) grade = 'C';
else                  grade = 'F';</pre>
 <p>A score of 85 fails the first test, passes the second, and gets 'B'. The chain stops there, so the <code>&gt;= 70</code> test never runs.</p>
 <p>Now flip the order so <code>score &gt;= 70</code> comes first. Then 95 gets a 'C', because that's the first true test. In an else-if chain, put the <b>most restrictive</b> test first.</p>`},
 mistakes:[
  `<p><b>A semicolon after the condition.</b> <code>if (x &gt; 0);</code> ends the if right there with an empty statement. The block below always runs.</p>`,
  `<p><b>Missing braces.</b> Without <code>{ }</code>, only the <b>next single statement</b> belongs to the if. Indentation doesn't matter to Java.</p>`,
  `<p><b>Separate ifs where you meant else if.</b> Three separate ifs can all run. If the cases should be exclusive, chain them with else.</p>`,
  `<p><b>Writing = instead of ==.</b> <code>if (x = 5)</code> doesn't compile in Java: "incompatible types: int cannot be converted to boolean". That's lucky. Read the message.</p>`],
 quiz:[
  {q:'What does this print?',code:`int x = 15;
if (x > 10)      System.out.print("A");
else if (x > 5)  System.out.print("B");
else             System.out.print("C");`,a:['A','AB','ABC','B'],c:0,why:'x > 10 is true, so A prints and the rest of the chain is skipped, even though x > 5 is also true.'},
  {q:'What does this print when <code>x = -3</code>?',code:`if (x > 0);
    System.out.println("positive");`,a:['Nothing','positive','A compile error','A run-time error'],c:1,why:'The semicolon ends the if with an empty statement. The println is not part of the if, so it always runs.'},
  {q:'With <code>n = 0</code>, what is <code>(n != 0) &amp;&amp; (10 / n &gt; 1)</code>?',a:['true','false','ArithmeticException','It doesn\'t compile'],c:1,why:'n != 0 is false, so && short-circuits and 10 / n is never evaluated. No crash.'},
  {q:'Which is equivalent to <code>!(a &amp;&amp; b)</code>?',a:['!a && !b','!a || !b','a || b','!a && b'],c:1,why:'De Morgan\'s law: "not both" means "at least one is false".'}]},

{id:'loops',week:1,date:'2026-09-16',reading:'1.3',title:'Loops',
 keywords:['while','for','nested','off by one','infinite loop'],
 lede:'while and for loops repeat code. Most loop bugs are off by one, or loops that never stop.',
 idea:`<p>A <code>while</code> loop checks its condition, runs the body if it's true, then checks again, and so on until the condition is false. If the condition is false the very first time, the body never runs.</p>
 <p>A <code>for</code> loop packs the three parts of a counting loop into one line: <b>initialize</b>; <b>condition</b>; <b>update</b>. <code>for (int i = 0; i &lt; n; i++)</code> runs the body exactly n times, with i = 0, 1, …, n − 1.</p>
 <p>To understand any loop, trace it: write each variable in a column and update the table one iteration at a time.</p>`,
 keys:[['while (cond) { … }','Repeat while cond is true'],['for (init; cond; update)','The counting loop'],['i++','Same as i = i + 1'],['sum += x','Same as sum = sum + x']],
 demos:[{type:'trace',title:'Powers of two',sub:'Watch i and power change each time around the loop.',input:{kind:'choice',label:'n',options:[2,4,6],value:4},
  code:`int n = Integer.parseInt(args[0]);
int power = 1;
int i = 0;
while (i <= n) {
    System.out.println(i + " " + power);
    power = 2 * power;
    i = i + 1;
}`,
  run(n,t){n=+n;let p=1,i=0;t.set('n',n);t.step(1,`n is ${n}.`);t.set('power',p);t.step(2,'Start with 2⁰ = 1.');t.set('i',i);t.step(3,'i counts the exponent.');
   while(true){if(i<=n){t.step(4,`Check i &lt;= n: ${i} &lt;= ${n} is true, so run the body.`);}else{t.step(4,`Check i &lt;= n: ${i} &lt;= ${n} is false. Exit the loop.`);break;}
    t.println(i+' '+p);t.step(5,`Print "${i} ${p}".`);p*=2;t.set('power',p);t.step(6,`power doubles to ${p}.`);i++;t.set('i',i);t.step(7,`i goes up to ${i}. Back to the test.`);}}}],
 code:{file:'Harmonic.java',run:'java Harmonic 4',out:'2.083333333333333',intro:'The nth harmonic number 1 + 1/2 + 1/3 + … + 1/n, with a for loop.',src:
`public class Harmonic {
    public static void main(String[] args) {
        int n = Integer.parseInt(args[0]);
        double sum = 0.0;
        for (int i = 1; i <= n; i++) {
            sum += 1.0 / i;
        }
        System.out.println(sum);
    }
}`,
 notes:[['line 5','Start at 1 (not 0, which would divide by zero) and include n with <=.'],['line 6','1.0 / i, not 1 / i. With ints, 1 / 2 is 0 and the sum would stop growing after the first term.'],['line 8','i no longer exists here: a variable declared in the for header only lives inside the loop.']]},
 worked:{label:'Trace a nested loop',html:`<pre data-java>for (int i = 1; i &lt;= 3; i++) {
    for (int j = 1; j &lt;= i; j++)
        System.out.print("*");
    System.out.println();
}</pre>
 <p>The inner loop runs completely for each value of i:</p>
 <div class="tw"><table class="tbl"><thead><tr><th>i</th><th>j takes the values</th><th>line printed</th></tr></thead><tbody><tr><td>1</td><td>1</td><td><code>*</code></td></tr><tr><td>2</td><td>1, 2</td><td><code>**</code></td></tr><tr><td>3</td><td>1, 2, 3</td><td><code>***</code></td></tr></tbody></table></div>
 <p style="margin-top:12px">The print statement runs 1 + 2 + 3 = 6 times. For n rows that's n(n + 1)/2 times, which grows like n².</p>`},
 mistakes:[
  `<p><b>Off by one.</b> <code>for (int i = 0; i &lt;= n; i++)</code> runs n + 1 times, not n. Check the first and last values of i by hand.</p>`,
  `<p><b>An infinite loop.</b> <code>while (i &lt; n) { sum += i; }</code> never changes i, so it never ends. Make sure every loop makes progress toward its exit. Press Ctrl-C to stop a runaway program.</p>`,
  `<p><b>Integer division inside a sum.</b> <code>sum += 1 / i;</code> adds 0 for every i &gt; 1.</p>`,
  `<p><b>Using the loop variable after the loop.</b> A variable declared in the for header doesn't exist after the loop. Declare it before the loop if you need it later.</p>`],
 quiz:[
  {q:'How many times does the body of <code>for (int i = 0; i &lt; 10; i += 3)</code> run?',a:['3','4','10','3.33'],c:1,why:'i takes the values 0, 3, 6 and 9. Then i = 12 fails the test.'},
  {q:'What does this print?',code:`int sum = 0;
for (int i = 1; i <= 4; i++)
    sum += i * i;
System.out.println(sum);`,a:['10','16','30','100'],c:2,why:'1 + 4 + 9 + 16 = 30.'},
  {q:'How many times does the loop body run?',code:`int i = 10;
while (i > 0) {
    i = i / 2;
}`,a:['3','4','5','It never stops'],c:1,why:'i goes 10 → 5 → 2 → 1 → 0. That is 4 runs, and then i > 0 is false.'},
  {q:'Which loop never stops?',a:['for (int i = 0; i < 10; i++) { }','int i = 0; while (i != 10) i += 3;','int i = 10; while (i > 0) i--;','int i = 1; while (i < 100) i *= 2;'],c:1,why:'i goes 0, 3, 6, 9, 12, … and skips right over 10, so i != 10 stays true (until the int overflows and keeps going).'}]},

/* ===================== WEEK 2 ===================== */
{id:'arrays',week:2,date:'2026-09-21',reading:'1.4',title:'Arrays',
 keywords:['array','index','length','2D','shuffle','aliasing','ArrayIndexOutOfBounds'],
 lede:'An array stores a sequence of values of one type and gives you any one of them instantly by its index.',
 idea:`<p>An array holds <b>n</b> values of the same type at indices <b>0 through n − 1</b>. Making one takes three steps: declare (<code>double[] a</code>), create (<code>new double[n]</code>), then initialize. Java fills a new array with default values: 0, 0.0, <code>false</code>, or <code>null</code>.</p>
 <p><code>a.length</code> is the number of elements. Reading <code>a[a.length]</code> is the classic bug: it crashes with an <code>ArrayIndexOutOfBoundsException</code>.</p>
 <p>An array variable holds a <b>reference</b> to the array, not the values themselves. <code>int[] b = a;</code> doesn't copy anything. Now a and b name the same array.</p>`,
 keys:[['double[] a = new double[n];','n doubles, all 0.0'],['int[] p = { 2, 3, 5, 7 };','Declare, create and initialize at once'],['a[a.length - 1]','The last element'],['int[][] g = new int[m][n];','m rows and n columns: g[i][j]']],
 demos:[{type:'shuffle'},
  {type:'trace',title:'Reverse an array in place',sub:'Swap the ends and work inward.',code:`int[] a = { 3, 1, 4, 1, 5 };
int n = a.length;
for (int i = 0; i < n / 2; i++) {
    int temp = a[i];
    a[i] = a[n-1-i];
    a[n-1-i] = temp;
}`,
  run(_,t){const a=[3,1,4,1,5],n=5;t.set('a',arr(a));t.step(1,'Create and fill the array.');t.set('n',n);t.step(2,'a.length is 5.');
   for(let i=0;;i++){t.set('i',i);if(i<Math.floor(n/2))t.step(3,`i &lt; n / 2 is ${i} &lt; 2: true. (n / 2 is integer division, so it's 2.)`);else{t.step(3,`i &lt; n / 2 is ${i} &lt; 2: false. Done. The middle element stays put.`);break;}
    const tmp=a[i];t.set('temp',tmp);t.step(4,`Save a[${i}] = ${tmp} in temp.`);a[i]=a[n-1-i];t.set('a',arr(a));t.step(5,`a[${i}] gets a[${n-1-i}] = ${a[i]}.`);a[n-1-i]=tmp;t.set('a',arr(a));t.step(6,`a[${n-1-i}] gets temp = ${tmp}. Swap done.`);}}}],
 code:{file:'Shuffle.java',run:'java Shuffle 10',intro:'Make the array 0, 1, …, n − 1, then shuffle it into a uniformly random order.',src:
`public class Shuffle {
    public static void main(String[] args) {
        int n = Integer.parseInt(args[0]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++)
            a[i] = i;

        // Knuth shuffle: every ordering is equally likely
        for (int i = 0; i < n; i++) {
            int r = i + (int) (Math.random() * (n - i));
            int temp = a[i];
            a[i] = a[r];
            a[r] = temp;
        }

        for (int i = 0; i < n; i++)
            System.out.print(a[i] + " ");
        System.out.println();
    }
}`,
 notes:[['line 4','Create an array of n ints. Each starts at 0.'],['line 10','Math.random() is in [0, 1), so r is a random int from i to n − 1.'],['lines 11–13','The swap idiom: without the temp variable you would lose one of the two values.']]},
 worked:{label:'Arrays are references',html:`<pre data-java>int[] a = { 1, 2, 3 };
int[] b = a;        // b refers to the SAME array
b[0] = 99;
System.out.println(a[0]);   // 99</pre>
 <p>There is only one array, with two names. To get an independent copy, create a new array and copy element by element:</p>
 <pre data-java>int[] c = new int[a.length];
for (int i = 0; i &lt; a.length; i++)
    c[i] = a[i];</pre>
 <p>For the same reason, <code>a == c</code> is <code>false</code> even though they hold the same values: == compares references, not contents.</p>`},
 mistakes:[
  `<p><b>Going one past the end.</b> Valid indices are 0 to <code>a.length - 1</code>. Use <code>i &lt; a.length</code>, not <code>i &lt;= a.length</code>.</p>`,
  `<p><b>Declaring without creating.</b> <code>int[] a; a[0] = 5;</code> doesn't compile: "variable a might not have been initialized". You need <code>new int[n]</code>.</p>`,
  `<p><b>Printing the array directly.</b> <code>System.out.println(a)</code> prints something like <code>[I@1b6d3586</code>, a reference. Loop over the elements instead.</p>`,
  `<p><b>Thinking = copies an array.</b> It copies the reference. Both names see every change.</p>`],
 quiz:[
  {q:'After <code>int[] a = new int[5];</code>, what does <code>a[5]</code> give?',a:['0','null','ArrayIndexOutOfBoundsException','The last element'],c:2,why:'The indices are 0 through 4. Index 5 is out of bounds, which is a run-time error.'},
  {q:'What does this print?',code:`int[] a = { 1, 2, 3 };
int[] b = a;
b[0] = 7;
System.out.println(a[0]);`,a:['1','7','0','It doesn\'t compile'],c:1,why:'a and b refer to the same array, so changing b[0] changes a[0].'},
  {q:'What is the default value of each element of <code>new boolean[3]</code>?',a:['true','false','null','There is no default; it doesn\'t compile'],c:1,why:'Java initializes array elements: numbers to 0, booleans to false, references to null.'},
  {q:'For <code>int[][] g = new int[3][4];</code>, what are <code>g.length</code> and <code>g[0].length</code>?',a:['4 and 3','3 and 4','12 and 4','3 and 3'],c:1,why:'g is an array of 3 rows, and each row is an array of 4 ints.'}]},

{id:'io',week:2,date:'2026-09-23',reading:'1.5',title:'Input and output',short:'Input and output',
 keywords:['StdIn','StdOut','printf','StdDraw','redirection','piping','standard input'],
 lede:'Programs talk to the outside world through command-line arguments, standard input and output, and standard drawing.',
 idea:`<p><b>Command-line arguments</b> are fixed before the program starts. <b>Standard input</b> (StdIn) is a stream the program reads as it goes, as much as it wants, so it can process more data than would ever fit on the command line. <b>Standard output</b> (StdOut) is where print goes.</p>
 <p>The terminal can connect these streams to files and to other programs, with no change to your code:</p>`,
 keys:[['java Average < data.txt','Redirect standard input: read from the file'],['java RandomSeq 1000 > data.txt','Redirect standard output: write to the file'],['java RandomSeq 1000 | java Average','Pipe: the output of one is the input of the next'],['StdDraw.filledCircle(x, y, r)','Draw in the unit square']],
 demos:[{type:'trace',title:'Average the numbers on standard input',sub:'Type some numbers and step through the read loop.',input:{kind:'text',label:'Standard input',value:'2.5 3.0 6.5'},
  code:`double sum = 0.0;
int n = 0;
while (!StdIn.isEmpty()) {
    double x = StdIn.readDouble();
    sum = sum + x;
    n++;
}
StdOut.println(sum / n);`,
  run(txt,t){const toks=String(txt).trim().split(/\s+/).filter(Boolean);let s=0,n=0,k=0;
   t.set('sum',dbl(s));t.step(1,'sum starts at 0.0.');t.set('n',n);t.step(2,'n counts the values read.');
   while(true){const left=toks.slice(k);if(!left.length){t.step(3,'StdIn.isEmpty() is now true: no input left. Exit the loop.');break;}
    t.step(3,`Input left: ${left.join(' ')}. Not empty, so enter the loop.`);const tok=toks[k++];
    if(tok===''||isNaN(+tok)){t.step(4,`The next token "${tok}" isn't a number. readDouble() throws InputMismatchException and the program crashes.`);return;}
    const x=+tok;t.set('x',dbl(x));t.step(4,`readDouble() reads ${dbl(x)} and removes it from the input.`);s+=x;t.set('sum',dbl(s));t.step(5,`sum is now ${dbl(s)}.`);n++;t.set('n',n);t.step(6,`n is now ${n}.`);}
   if(n===0){t.println('NaN');t.step(8,'No values were read, so this is 0.0 / 0: NaN, "not a number".');}else{t.println(dbl(s/n));t.step(8,`Print ${dbl(s)} / ${n} = ${dbl(s/n)}.`);}}},
  {type:'stddraw'}],
 code:{file:'Average.java',run:'java Average < data.txt',src:
`public class Average {
    public static void main(String[] args) {
        double sum = 0.0;
        int n = 0;
        while (!StdIn.isEmpty()) {
            double x = StdIn.readDouble();
            sum += x;
            n++;
        }
        StdOut.printf("Average is %.5f%n", sum / n);
    }
}`,
 notes:[['line 5','isEmpty() is true when no more input remains. When typing input yourself, end it with Ctrl-D (Mac, Linux) or Ctrl-Z then Enter (Windows).'],['line 6','readDouble() reads the next number. It throws an exception if the next token isn\'t a number.'],['line 10','printf: %.5f means a double with 5 digits after the point, and %n means a newline.']]},
 worked:{label:'printf format codes',html:`<div class="tw"><table class="tbl"><thead><tr><th>Call</th><th>Prints</th><th>Why</th></tr></thead><tbody>
 <tr><td><code>printf("%d", 42)</code></td><td><code>42</code></td><td>%d is an integer</td></tr>
 <tr><td><code>printf("%.2f", Math.PI)</code></td><td><code>3.14</code></td><td>%.2f is a double with 2 decimals</td></tr>
 <tr><td><code>printf("%8.3f|", Math.PI)</code></td><td><code>&nbsp;&nbsp;&nbsp;3.142|</code></td><td>at least 8 characters wide, right-aligned</td></tr>
 <tr><td><code>printf("%5d|", 42)</code></td><td><code>&nbsp;&nbsp;&nbsp;42|</code></td><td>width 5</td></tr>
 <tr><td><code>printf("%-5d|", 42)</code></td><td><code>42&nbsp;&nbsp;&nbsp;|</code></td><td>- means left-align</td></tr>
 <tr><td><code>printf("%s has %d", "a", 3)</code></td><td><code>a has 3</code></td><td>%s is a String; the arguments fill in order</td></tr></tbody></table></div>`},
 mistakes:[
  `<p><b>Reading past the end.</b> Calling <code>StdIn.readInt()</code> with no input left throws <code>NoSuchElementException</code>. Check <code>StdIn.isEmpty()</code> first.</p>`,
  `<p><b>Wrong type of token.</b> <code>readInt()</code> on the token <code>3.5</code> or <code>hello</code> throws <code>InputMismatchException</code>.</p>`,
  `<p><b>Mixing up &lt; and &gt;.</b> <code>&lt;</code> feeds a file <b>into</b> the program. <code>&gt;</code> sends output <b>out</b> to a file, and overwrites it.</p>`,
  `<p><b>StdDraw coordinates.</b> The default canvas is the unit square, with y pointing <b>up</b>. Drawing at (200, 300) puts the shape far off screen unless you call <code>StdDraw.setXscale</code> and <code>setYscale</code> first.</p>`],
 quiz:[
  {q:'What does <code>java RandomSeq 1000 | java Average</code> do?',a:['Runs both programs on the same arguments','Sends RandomSeq\'s standard output into Average\'s standard input','Saves the output to a file named Average','Runs Average 1000 times'],c:1,why:'The pipe | connects the output stream of the first program to the input stream of the second.'},
  {q:'In StdDraw\'s default coordinates, where is the point (1, 0)?',a:['Upper left','Lower right','Upper right','Lower left'],c:1,why:'x runs 0 to 1 left to right, and y runs 0 to 1 bottom to top. So (1, 0) is the lower right corner.'},
  {q:'What does <code>StdOut.printf("%.2f", 2.0 / 3)</code> print?',a:['0.66','0.67','0.6666666666666666','0'],c:1,why:'%.2f rounds to two decimal places: 0.666… becomes 0.67.'},
  {q:'Your program calls <code>StdIn.readInt()</code>, but the next token is <code>hello</code>. What happens?',a:['It returns 0','It skips the token','It throws InputMismatchException','It waits for a number'],c:2,why:'The token can\'t be parsed as an int, so the read fails at run time.'}]},

/* ===================== WEEK 3 ===================== */
{id:'functions',week:3,date:'2026-09-28',reading:'2.1',title:'Functions',
 keywords:['static method','return','parameter','argument','call stack','scope','overloading','pass by value'],
 lede:'A static method packages a computation under a name. Each call gets a fresh set of variables, which disappear when it returns.',
 idea:`<p>A <b>static method</b> takes arguments, computes, and returns a value. Its <b>signature</b>, like <code>public static double hypot(double a, double b)</code>, gives the return type, the name and the parameter types.</p>
 <p>When you call a method, Java <b>copies</b> each argument into the matching parameter (pass by value), pauses the caller, and runs the method in its own <b>frame</b> on the call stack. <code>return</code> sends one value back and destroys the frame. Variables are <b>local</b>: a method can't see another method's variables.</p>
 <p>For an array argument, the copied value is the <i>reference</i>, so the method can change the caller's array elements.</p>`,
 keys:[['public static double f(int x)','Returns a double, takes an int'],['return x * x;','Send a value back and leave the method'],['void','Returns nothing (it\'s used for its side effects)'],['Overloading','Same name, different parameter types']],
 demos:[{type:'trace',title:'The call stack',sub:'Each call gets its own frame. Watch frames appear and disappear.',code:`public static double square(double x) {
    return x * x;
}

public static double hypot(double a, double b) {
    return Math.sqrt(square(a) + square(b));
}

public static void main(String[] args) {
    double c = hypot(3.0, 4.0);
    StdOut.println(c);
}`,
  run(_,t){t.step(10,'main calls hypot(3.0, 4.0). main pauses until hypot returns.');
   t.call('hypot(3.0, 4.0)');t.set('a','3.0');t.set('b','4.0');t.step(5,'A new frame for hypot. The parameters a and b get copies of the arguments.');
   t.step(6,'To compute this, hypot needs square(a) first.');
   t.call('square(3.0)');t.set('x','3.0');t.step(1,'A frame for square. Its x is 3.0.');t.step(2,'Return 3.0 * 3.0 = 9.0. This frame is destroyed.');t.ret();
   t.step(6,'square(a) gave 9.0. Now call square(b).');
   t.call('square(4.0)');t.set('x','4.0');t.step(1,'A different frame for square. This x is 4.0. The old x is gone.');t.step(2,'Return 16.0.');t.ret();
   t.step(6,'Math.sqrt(9.0 + 16.0) = 5.0. hypot returns 5.0, and its frame is destroyed.');t.ret();
   t.set('c','5.0');t.step(10,'Back in main: c is 5.0.');t.println('5.0');t.step(11,'Print 5.0.');}}],
 code:{file:'Gaussian.java',run:'java Gaussian 0',out:'0.3989422804014327',intro:'Two overloaded versions of the Gaussian probability density function.',src:
`public class Gaussian {
    // standard normal probability density function
    public static double pdf(double x) {
        return Math.exp(-x*x / 2) / Math.sqrt(2 * Math.PI);
    }

    // pdf with mean mu and standard deviation sigma
    public static double pdf(double x, double mu, double sigma) {
        return pdf((x - mu) / sigma) / sigma;
    }

    public static void main(String[] args) {
        double z = Double.parseDouble(args[0]);
        StdOut.println(pdf(z));
    }
}`,
 notes:[['line 3','The signature: returns a double, named pdf, takes one double.'],['line 8','Same name with three parameters. Java picks the version by the arguments you pass. That is overloading.'],['line 9','One function calls another. Reuse beats copy and paste.']]},
 worked:{label:'Pass by value',html:`<pre data-java>public static void addOne(int x)   { x++; }
public static void addOne(int[] a) { a[0]++; }

int n = 5;
addOne(n);             // n is still 5
int[] arr = { 5 };
addOne(arr);           // arr[0] is now 6</pre>
 <p>In both calls Java copies the argument. For the int, the copy is the number 5, so the method changes its own copy. For the array, the copy is a reference to the <b>same</b> array, so changes to its elements are visible to the caller.</p>`},
 mistakes:[
  `<p><b>Expecting a method to change a primitive.</b> <code>swap(a, b)</code> on two ints can't work in Java. Return the new value instead: <code>x = f(x);</code></p>`,
  `<p><b>A missing return path.</b> If some path through a non-void method doesn't return, it fails to compile: "missing return statement".</p>`,
  `<p><b>Using another method's variable.</b> Local variables exist only inside their method: "cannot find symbol". Pass the value as an argument.</p>`,
  `<p><b>Ignoring the return value.</b> <code>square(x);</code> on its own line computes the value and throws it away.</p>`],
 quiz:[
  {q:'If <code>square(x)</code> returns <code>x * x</code>, what is <code>square(square(2))</code>?',a:['4','8','16','2'],c:2,why:'The inner call gives 4, then square(4) gives 16.'},
  {q:'What does this print?',code:`public static void change(int x) { x = 10; }
// in main:
int a = 5;
change(a);
System.out.println(a);`,a:['5','10','0','It doesn\'t compile'],c:0,why:'change gets a copy of 5. Setting its own x to 10 doesn\'t affect a.'},
  {q:'What does this print?',code:`public static void change(int[] x) { x[0] = 10; }
// in main:
int[] b = { 5 };
change(b);
System.out.println(b[0]);`,a:['5','10','0','null'],c:1,why:'The copy is a reference to the same array, so the change to x[0] is visible through b.'},
  {q:'Which two methods <b>cannot</b> both exist in the same class?',a:['f(int x) and f(double x)','f(int x) and f(int x, int y)','int f(int x) and double f(int x)','f(String s) and f(int x)'],c:2,why:'Overloads must differ in their parameter types. A different return type alone isn\'t enough, because a call f(3) would be ambiguous.'}]},

{id:'libraries',week:3,date:'2026-09-30',reading:'2.2',title:'Libraries and clients',
 keywords:['API','library','client','StdRandom','StdStats','modular programming'],
 lede:'Split a big program into libraries of static methods. A client uses a library only through its API.',
 idea:`<p><b>Modular programming</b> divides a program into independent pieces. There are three roles:</p>
 <ul><li>The <b>API</b> says <i>what</i> each method does: its signature and a description.</li><li>The <b>implementation</b> is the code that says <i>how</i>.</li><li>A <b>client</b> is any program that uses the API.</li></ul>
 <p>To call a static method in another class, name the class: <code>Gaussian.pdf(x)</code>. Keep the files in the same folder. Give each library its own <code>main</code> to test it on its own (unit testing).</p>`,
 keys:[['StdRandom.uniformInt(a, b)','A random int in [a, b)'],['StdRandom.bernoulli(p)','true with probability p'],['StdRandom.gaussian()','Normal with mean 0, stddev 1'],['StdStats.mean(a)','The average of a[]']],
 demos:[{type:'histogram'}],
 code:{file:'GaussianTable.java',run:'java GaussianTable',out:' -2.0  0.0540\n -1.0  0.2420\n  0.0  0.3989\n  1.0  0.2420\n  2.0  0.0540',intro:'A client of the Gaussian library from the Functions module. It knows only the API, not how pdf works inside.',src:
`public class GaussianTable {
    public static void main(String[] args) {
        // a client: uses Gaussian.pdf() through its API
        for (double x = -2.0; x <= 2.0; x += 1.0) {
            double y = Gaussian.pdf(x);
            StdOut.printf("%5.1f  %.4f%n", x, y);
        }
    }
}`,
 notes:[['line 5','ClassName.methodName(...) calls a static method in another file. Gaussian.java must be in the same folder.'],['line 6','%5.1f: width 5, 1 decimal. %.4f: 4 decimals.']]},
 worked:{label:'Read an API',html:`<p>An API lists signatures with a short description. Part of StdStats:</p>
 <div class="tw"><table class="tbl"><thead><tr><th>Signature</th><th>Description</th></tr></thead><tbody>
 <tr><td><code>static double max(double[] a)</code></td><td>largest value</td></tr><tr><td><code>static double min(double[] a)</code></td><td>smallest value</td></tr>
 <tr><td><code>static double mean(double[] a)</code></td><td>average value</td></tr><tr><td><code>static double stddev(double[] a)</code></td><td>sample standard deviation</td></tr>
 <tr><td><code>static double median(double[] a)</code></td><td>median value</td></tr><tr><td><code>static void plotBars(double[] a)</code></td><td>plot the values as bars</td></tr></tbody></table></div>
 <p style="margin-top:12px">From <code>static double mean(double[] a)</code> you know everything a client needs: call <code>StdStats.mean(values)</code> with a double array and get back a double. You don't need to see the code inside.</p>`},
 mistakes:[
  `<p><b>Leaving off the class name.</b> Calling <code>pdf(x)</code> from a different class gives "cannot find symbol". Write <code>Gaussian.pdf(x)</code>.</p>`,
  `<p><b>The library is in another folder.</b> Java looks in the current folder for <code>Gaussian.java</code> or <code>.class</code>.</p>`,
  `<p><b>Off by one with uniformInt.</b> <code>StdRandom.uniformInt(1, 6)</code> never returns 6: the upper end is excluded. A die roll is <code>uniformInt(1, 7)</code>.</p>`,
  `<p><b>Depending on implementation details.</b> If a client relies on how a library works inside rather than on what the API promises, a later improvement to the library can break the client.</p>`],
 quiz:[
  {q:'How do you call the static method <code>sqrt3</code> in class <code>Lib</code> from a different class?',a:['sqrt3(x)','Lib.sqrt3(x)','new Lib().sqrt3(x)','import sqrt3;'],c:1,why:'Static methods in another class are called as ClassName.method(arguments).'},
  {q:'What is an API?',a:['The source code of a library','A description of the methods a client can call: signatures and behavior','A list of every file in a project','A Java keyword'],c:1,why:'The API is the contract between the implementation and its clients.'},
  {q:'Which values can <code>StdRandom.uniformInt(1, 7)</code> return?',a:['0 to 7','1 to 7','1 to 6','0 to 6'],c:2,why:'The range is [1, 7): 1 is included and 7 is excluded.'},
  {q:'Why give a library its own <code>main</code>?',a:['Java requires it','To test the library on its own','So clients can call it','To make it run faster'],c:1,why:'A main in a library is a test client. It\'s ignored when another program uses the library.'}]},

/* ===================== WEEK 4 ===================== */
{id:'recursion',week:4,date:'2026-10-05',reading:'2.3',title:'Recursion',
 keywords:['base case','recursive','call stack','factorial','gcd','H-tree','fibonacci','StackOverflowError','memoization'],
 lede:'A recursive method calls itself on a smaller problem. It needs a base case, and every call must move toward it.',
 idea:`<p>A recursive method has two parts:</p>
 <ul><li>a <b>base case</b> that answers the smallest problems directly, and</li><li>a <b>reduction step</b> that solves a problem by calling itself on a smaller one.</li></ul>
 <p>Each call gets its own frame on the call stack, with its own copy of n. The calls pile up until one hits the base case, then the returns unwind in reverse order.</p>
 <p>Recursion makes some problems much easier to express: Euclid's gcd, the towers of Hanoi, and recursive graphics like the H-tree. Beware of recomputing the same thing many times, as naive Fibonacci does.</p>`,
 keys:[['if (n == 1) return 1;','The base case: no recursive call'],['return n * factorial(n-1);','The reduction step: a smaller problem'],['StackOverflowError','Too many frames: usually a missing base case']],
 demos:[{type:'trace',title:'factorial(n), frame by frame',sub:'The stack grows down to the base case, then unwinds.',main:'main',input:{kind:'choice',label:'n',options:[3,4,5],value:4},
  code:`public static long factorial(int n) {
    if (n == 1) return 1;
    return n * factorial(n - 1);
}

public static void main(String[] args) {
    StdOut.println(factorial(4));
}`,
  run(n,t){n=+n;t.step(7,`main calls factorial(${n}).`);
   const f=k=>{t.call(`factorial(${k})`);t.set('n',k);t.step(1,`New frame: n = ${k}.`);
    if(k===1){t.step(2,'n == 1: the base case. Return 1 with no more calls.');t.ret();return 1;}
    t.step(2,`n is ${k}, not 1. Not the base case.`);t.step(3,`To return n * factorial(${k-1}), first call factorial(${k-1}). This frame waits.`);
    const r=f(k-1),v=k*r;t.step(3,`factorial(${k-1}) returned ${r}. Return ${k} * ${r} = ${v}.`);t.ret();return v;};
   const v=f(n);t.println(String(v));t.step(7,`Back in main. Print ${v}.`);}},
  {type:'htree'}],
 code:{file:'Htree.java',run:'java Htree 3',intro:'The H-tree from the book. Each call draws one H, then four smaller H-trees centered at its tips.',src:
`public class Htree {
    public static void draw(int n, double size, double x, double y) {
        if (n == 0) return;
        double x0 = x - size/2, x1 = x + size/2;
        double y0 = y - size/2, y1 = y + size/2;
        StdDraw.line(x0, y, x1, y);     // the crossbar
        StdDraw.line(x0, y0, x0, y1);   // left leg
        StdDraw.line(x1, y0, x1, y1);   // right leg
        draw(n-1, size/2, x0, y0);
        draw(n-1, size/2, x0, y1);
        draw(n-1, size/2, x1, y0);
        draw(n-1, size/2, x1, y1);
    }

    public static void main(String[] args) {
        int n = Integer.parseInt(args[0]);
        draw(n, 0.5, 0.5, 0.5);
    }
}`,
 notes:[['line 3','The base case: order 0 draws nothing.'],['lines 9–12','Four recursive calls with order n − 1 and half the size. Each step gets smaller, so the recursion ends.'],['line 17','Start with an H of size 0.5 centered in the unit square.']]},
 worked:{label:'Euclid, and why naive Fibonacci is slow',html:`<p><b>Euclid's algorithm.</b> gcd(p, q) = gcd(q, p % q), with base case gcd(p, 0) = p.</p>
 <pre data-java>public static int gcd(int p, int q) {
    if (q == 0) return p;
    return gcd(q, p % q);
}</pre>
 <p>gcd(1440, 408) → gcd(408, 216) → gcd(216, 192) → gcd(192, 24) → gcd(24, 0) = <b>24</b>. Five calls.</p>
 <p><b>Fibonacci.</b> <code>fib(n) = fib(n-1) + fib(n-2)</code> looks just as innocent. But fib(n−1) recomputes fib(n−2) from scratch, and so on all the way down. The number of calls grows exponentially, and fib(50) takes billions of calls. Fix it by saving each answer in an array the first time you compute it (memoization), or by building up from fib(0) with a loop (dynamic programming).</p>`},
 mistakes:[
  `<p><b>No base case, or one that's never reached.</b> The calls never stop, until Java runs out of stack: <code>StackOverflowError</code>. factorial(0) with base case <code>n == 1</code> calls factorial(−1), factorial(−2), …</p>`,
  `<p><b>Not getting smaller.</b> Every recursive call must move toward the base case. <code>f(n)</code> calling <code>f(n)</code> is an infinite loop in disguise.</p>`,
  `<p><b>Dropping the result.</b> Writing <code>factorial(n-1);</code> without using its return value, or forgetting <code>return</code> in front of the recursive call.</p>`,
  `<p><b>Exponential waste.</b> Two recursive calls on overlapping subproblems (like fib) explode. Count how many calls there are, not just how long the code is.</p>`],
 quiz:[
  {q:'What is <code>mystery(5)</code>?',code:`public static int mystery(int n) {
    if (n <= 0) return 0;
    return n + mystery(n - 2);
}`,a:['15','9','8','5'],c:1,why:'5 + mystery(3) = 5 + 3 + mystery(1) = 5 + 3 + 1 + mystery(−1) = 9 + 0 = 9.'},
  {q:'factorial has base case <code>n == 1</code>. What happens with <code>factorial(0)</code>?',a:['It returns 0','It returns 1','StackOverflowError','It doesn\'t compile'],c:2,why:'0 isn\'t 1, so it calls factorial(−1), then −2, and so on. It never reaches 1, so the stack overflows.'},
  {q:'What does <code>f(3)</code> print?',code:`public static void f(int n) {
    if (n == 0) return;
    f(n - 1);
    System.out.print(n + " ");
}`,a:['3 2 1','1 2 3','3','0 1 2 3'],c:1,why:'Each call prints after its recursive call returns, so the deepest call (n = 1) prints first.'},
  {q:'About how many H shapes does an H-tree of order n draw?',a:['n','4n','2ⁿ','(4ⁿ − 1) / 3'],c:3,why:'1 + 4 + 16 + … + 4ⁿ⁻¹ = (4ⁿ − 1) / 3. Each level multiplies the count by 4.'}]},

{id:'performance',week:4,date:'2026-10-07',reading:'4.1',title:'Performance',
 keywords:['running time','order of growth','doubling','tilde','big O','memory','ThreeSum'],
 lede:'How long will my program take on a bigger input? Measure, find the pattern, then predict.',
 idea:`<p>Use the <b>scientific method</b>: run the program, measure, form a hypothesis, predict, and check the prediction.</p>
 <p>The <b>doubling hypothesis</b>: run with N, 2N, 4N, … and compute the ratio T(2N) / T(N). If the ratio settles near 2ᵇ, the running time grows like N<sup>b</sup>. A ratio of 8 means N³.</p>
 <p>The <b>mathematical model</b>: running time ≈ cost × frequency, summed over operations. Usually one inner-loop statement dominates. Use <b>tilde notation</b> and keep only the leading term: N(N − 1)(N − 2)/6 ~ N³/6.</p>`,
 keys:[['1, log N, N','Constant, logarithmic, linear: fast'],['N log N','Linearithmic: mergesort'],['N², N³','Quadratic, cubic: nested loops'],['2ᴺ','Exponential: hopeless for big N']],
 demos:[{type:'growth'}],
 code:{file:'ThreeSum.java',run:'java ThreeSum < 1Kints.txt',intro:'Count the triples that sum to 0. Three nested loops make it cubic.',src:
`public class ThreeSum {
    // count the triples that sum to 0
    public static int count(int[] a) {
        int n = a.length;
        int count = 0;
        for (int i = 0; i < n; i++)
            for (int j = i+1; j < n; j++)
                for (int k = j+1; k < n; k++)
                    if (a[i] + a[j] + a[k] == 0)
                        count++;
        return count;
    }

    public static void main(String[] args) {
        int[] a = StdIn.readAllInts();
        StdOut.println(count(a));
    }
}`,
 notes:[['line 9','The if runs once per triple i < j < k: n(n−1)(n−2)/6 ~ n³/6 times. That term dominates the running time.'],['lines 6–8','Starting j at i + 1 and k at j + 1 counts each triple once.']]},
 worked:{label:'Predict from measurements',html:`<p>You time ThreeSum:</p>
 <div class="tw"><table class="tbl"><thead><tr><th>N</th><th>T(N)</th><th>ratio</th></tr></thead><tbody><tr><td>1,000</td><td>0.5 s</td><td></td></tr><tr><td>2,000</td><td>4.0 s</td><td>8.0</td></tr><tr><td>4,000</td><td>32.1 s</td><td>8.0</td></tr></tbody></table></div>
 <ol style="margin-top:12px"><li>The ratio is 8 = 2³, so b = 3: T(N) ≈ a·N³.</li><li>Solve for a: 0.5 = a · 1000³, so a = 5 × 10⁻¹⁰.</li><li>Predict N = 8,000: about 32 × 8 = 256 s, a bit over 4 minutes.</li><li>Predict N = 16,000: 5 × 10⁻¹⁰ × 16000³ ≈ 2,048 s, about 34 minutes.</li></ol>
 <p><b>Memory</b> works the same way: an int takes 4 bytes and a double 8. An array of N ints takes about 4N + 24 bytes, and an array of N doubles about 8N + 24.</p>`},
 mistakes:[
  `<p><b>Confusing the ratio with the exponent.</b> A doubling ratio of 8 means N³, not N⁸. The exponent is b = lg(ratio).</p>`,
  `<p><b>Timing tiny inputs.</b> For small N, start-up time and noise dominate. Double until the times are at least a second or so.</p>`,
  `<p><b>Counting everything.</b> You only need the operation in the innermost loop. Lower-order terms vanish for large N.</p>`,
  `<p><b>Thinking log N is slow.</b> lg of one billion is about 30. Logarithmic is nearly as good as constant.</p>`],
 quiz:[
  {q:'Doubling ratios settle around 4. What is the order of growth?',a:['N','N log N','N²','4N'],c:2,why:'4 = 2², so b = 2: quadratic.'},
  {q:'A cubic program takes 2 s for N = 10,000. Estimate N = 20,000.',a:['4 s','8 s','16 s','6 s'],c:2,why:'Doubling N multiplies a cubic running time by 2³ = 8: 2 × 8 = 16 s.'},
  {q:'How many times does the inner if run in ThreeSum, in tilde notation?',a:['~ N³','~ N³ / 6','~ N² / 2','~ 3N'],c:1,why:'It runs once per triple i < j < k: N choose 3 = N(N−1)(N−2)/6 ~ N³/6.'},
  {q:'About how much memory does a <code>double[]</code> of length 1,000 use?',a:['1,000 bytes','4,024 bytes','8,024 bytes','64,000 bytes'],c:2,why:'8 bytes per double plus about 24 bytes of overhead: 8N + 24.'}]},

/* ===================== WEEK 6 ===================== */
{id:'using-types',week:6,date:'2026-10-26',reading:'3.1',title:'Using data types',
 keywords:['object','reference','String','Color','Picture','constructor','instance method','new','null'],
 lede:'Objects bundle data with the operations on it. You use a data type through its API: create objects with new, then call instance methods on them.',
 idea:`<p>Until now every variable held a primitive value, like an int or a double. A <b>reference type</b> is a data type whose values are <b>objects</b>: String, Color, Picture, and later your own.</p>
 <p>Create an object with <code>new</code> and a <b>constructor</b>: <code>Color red = new Color(255, 0, 0);</code>. Then call <b>instance methods</b> on it with a dot: <code>red.getRed()</code>. Unlike a static method, an instance method acts on a particular object.</p>
 <p>A reference variable holds an <b>arrow</b> to the object, not the object itself. Two variables can point to the same object, and a variable can hold <code>null</code>, which points to nothing.</p>`,
 keys:[['String s = "Hi";','A String object (Strings don\'t need new)'],['Color c = new Color(r, g, b);','new calls a constructor'],['s.charAt(0)','An instance method, called on the object s'],['Picture p = new Picture("x.png");','Image processing: p.get(col, row)']],
 demos:[{type:'strings'}],
 code:{file:'Grayscale.java',run:'java Grayscale mandrill.jpg',intro:'Turn a color picture gray by replacing each pixel with its luminance.',src:
`import java.awt.Color;

public class Grayscale {
    public static void main(String[] args) {
        Picture picture = new Picture(args[0]);
        for (int col = 0; col < picture.width(); col++) {
            for (int row = 0; row < picture.height(); row++) {
                Color color = picture.get(col, row);
                int r = color.getRed();
                int g = color.getGreen();
                int b = color.getBlue();
                int y = (int) Math.round(0.299*r + 0.587*g + 0.114*b);
                picture.set(col, row, new Color(y, y, y));
            }
        }
        picture.show();
    }
}`,
 notes:[['line 1','Color lives in the java.awt package, so you import it.'],['line 5','new Picture(filename) is a constructor call. It reads the image file.'],['line 8','get returns a reference to a Color object.'],['line 12','Luminance weights green most, because our eyes are most sensitive to it.'],['line 13','A new Color with equal red, green and blue is a shade of gray.']]},
 worked:{label:'Strings are immutable',html:`<pre data-java>String s = "hello";
s.toUpperCase();
System.out.println(s);     // hello  (unchanged!)
s = s.toUpperCase();
System.out.println(s);     // HELLO</pre>
 <p>String methods never change the String they're called on. They return a <b>new</b> String. To keep the result, assign it.</p>
 <p>Compare Strings with <code>equals</code>, not ==:</p>
 <pre data-java>String a = new String("hi");
String b = new String("hi");
a == b         // false: two different objects
a.equals(b)    // true: same characters</pre>`},
 mistakes:[
  `<p><b>Comparing Strings with ==.</b> == asks "same object?". Use <code>s.equals(t)</code> to ask "same characters?".</p>`,
  `<p><b>Ignoring a returned String.</b> <code>s.trim();</code> alone does nothing useful. Write <code>s = s.trim();</code>.</p>`,
  `<p><b>Calling a method on null.</b> If a reference variable is <code>null</code>, calling any method on it throws <code>NullPointerException</code>.</p>`,
  `<p><b>Forgetting the import.</b> Using Color without <code>import java.awt.Color;</code> gives "cannot find symbol".</p>`],
 quiz:[
  {q:'What does this print?',code:`String s = "COS126";
System.out.println(s.substring(1, 4));`,a:['COS1','OS1','OS12','COS'],c:1,why:'substring(1, 4) takes the characters at indices 1, 2 and 3: O, S, 1. The end index is excluded.'},
  {q:'What does this print?',code:`String s = "hello";
s.toUpperCase();
System.out.println(s);`,a:['HELLO','hello','Hello','It doesn\'t compile'],c:1,why:'Strings are immutable. toUpperCase returns a new String, and this code throws it away.'},
  {q:'<code>String a = new String("hi"), b = new String("hi");</code> Which is true?',a:['a == b is true','a.equals(b) is true and a == b is false','Both are false','Both are true'],c:1,why:'They are two different objects (so == is false) with the same characters (so equals is true).'},
  {q:'What happens when you call a method on a variable whose value is <code>null</code>?',a:['It returns null','Nothing happens','NullPointerException','It doesn\'t compile'],c:2,why:'There\'s no object to act on, so Java throws a NullPointerException at run time.'}]},

{id:'creating-types',week:6,date:'2026-10-28',reading:'3.2',title:'Creating data types',
 keywords:['class','instance variable','constructor','instance method','this','private','toString','Charge'],
 lede:'Write your own class: instance variables hold each object’s data, a constructor sets them up, and instance methods act on them.',
 idea:`<p>A data type is a class with three ingredients:</p>
 <ul><li><b>Instance variables</b> (declared <code>private</code>, outside any method): every object gets its own copy.</li><li>A <b>constructor</b>: same name as the class, no return type. It runs when someone writes <code>new</code>.</li><li><b>Instance methods</b>: no <code>static</code>. They can use the instance variables of the object they were called on.</li></ul>
 <p>Inside an instance method, <code>this</code> means "the object this method was called on". Writing <code>count</code> is short for <code>this.count</code>.</p>`,
 keys:[['private double rx, ry;','Instance variables: one copy per object'],['public Charge(double x0, …)','Constructor: no return type'],['public double potentialAt(…)','Instance method: no static'],['public String toString()','Used automatically by println and +']],
 demos:[{type:'trace',title:'Two objects, two sets of instance variables',sub:'Watch the objects (dashed boxes) separately from the variables that point to them.',code:`public class Counter {
    private final String name;
    private int count;

    public Counter(String id) {
        name = id;
        count = 0;
    }

    public void increment() {
        count++;
    }

    public int tally() {
        return count;
    }

    public static void main(String[] args) {
        Counter heads = new Counter("heads");
        Counter tails = new Counter("tails");
        heads.increment();
        heads.increment();
        tails.increment();
        StdOut.println(heads.tally() + " " + tails.tally());
    }
}`,
  run(_,t){t.step(18,'The program starts in main.');
   const make=(v,id,obj)=>{t.obj(obj,'Counter',{name:'null',count:'0'});t.call(`Counter("${id}")`);t.set('id',`"${id}"`);t.set('this','→ '+obj);t.step(5,`new makes object ${obj} with default values, then runs the constructor on it.`);
    t.obj(obj,'Counter',{name:`"${id}"`});t.step(6,`name = id sets ${obj}'s name.`);t.step(7,'count = 0 (already 0, but now it\'s explicit).');t.ret();t.set(v,'→ '+obj);};
   make('heads','heads','#1');t.step(19,'heads now refers to object #1.');
   make('tails','tails','#2');t.step(20,'tails refers to a different object, #2, with its own name and count.');
   let h=0;const inc=(v,obj,line)=>{t.step(line,`Call increment() on the object ${v} refers to (${obj}).`);t.call(v+'.increment()');t.set('this','→ '+obj);
    if(obj==='#1')h++;t.obj(obj,'Counter',{count:obj==='#1'?h:1});t.step(11,`count++ changes ${obj}.count only.`);t.ret();};
   inc('heads','#1',21);inc('heads','#1',22);inc('tails','#2',23);
   t.println('2 1');t.step(24,'heads.tally() returns 2 and tails.tally() returns 1. Print "2 1".');}}],
 code:{file:'Charge.java',run:'java Charge',out:'21.3 at (0.51, 0.63)\n81.9 at (0.13, 0.94)',intro:'The Charge data type from the book: a point charge in the plane.',src:
`public class Charge {
    private final double rx, ry;   // position
    private final double q;        // charge

    public Charge(double x0, double y0, double q0) {
        rx = x0;
        ry = y0;
        q  = q0;
    }

    public double potentialAt(double x, double y) {
        double k = 8.99e09;
        double dx = x - rx;
        double dy = y - ry;
        return k * q / Math.sqrt(dx*dx + dy*dy);
    }

    public String toString() {
        return q + " at (" + rx + ", " + ry + ")";
    }

    public static void main(String[] args) {
        Charge c1 = new Charge(0.51, 0.63, 21.3);
        Charge c2 = new Charge(0.13, 0.94, 81.9);
        StdOut.println(c1);
        StdOut.println(c2);
    }
}`,
 notes:[['lines 2–3','Instance variables: private, so only Charge\'s own code can touch them. final, so they\'re set once and never change.'],['line 5','The constructor has the class name and no return type.'],['line 11','An instance method. rx, ry and q belong to whichever charge it was called on.'],['line 18','println(c1) calls c1.toString() automatically.'],['line 22','main is a test client inside the class.']]},
 worked:{label:'static or not?',html:`<div class="tw"><table class="tbl"><thead><tr><th></th><th>Static</th><th>Instance (no static)</th></tr></thead><tbody>
 <tr><td>Belongs to</td><td>the class</td><td>each object</td></tr>
 <tr><td>Called as</td><td><code>Math.sqrt(x)</code></td><td><code>c1.potentialAt(x, y)</code></td></tr>
 <tr><td>Can use instance variables?</td><td>no: there is no "this" object</td><td>yes: those of the object it was called on</td></tr>
 <tr><td>Variables</td><td><code>static int total;</code> is shared by all objects</td><td><code>private int count;</code> gives each object its own copy</td></tr></tbody></table></div>
 <p style="margin-top:12px">This is why main can't simply call <code>increment()</code>: main is static, so there's no object to increment. Create one first: <code>heads.increment()</code>.</p>`},
 mistakes:[
  `<p><b>Redeclaring an instance variable in the constructor.</b> <code>double rx = x0;</code> creates a new <i>local</i> variable that vanishes when the constructor ends. The instance variable stays 0.0. Write <code>rx = x0;</code>.</p>`,
  `<p><b>A return type on the constructor.</b> <code>public void Charge(…)</code> is a method that happens to share the class's name, not a constructor. Then <code>new Charge(1, 2, 3)</code> doesn't compile.</p>`,
  `<p><b>static on instance variables.</b> <code>private static int count;</code> makes one count shared by every Counter.</p>`,
  `<p><b>Public instance variables.</b> Clients start depending on your representation, and you can never change it. Keep them private.</p>`],
 quiz:[
  {q:'What does <code>new Point(3.0).getX()</code> return?',code:`public class Point {
    private double x;
    public Point(double x0) { double x = x0; }
    public double getX() { return x; }
}`,a:['3.0','0.0','It doesn\'t compile','NullPointerException'],c:1,why:'double x = x0 declares a local variable that shadows the instance variable. The instance variable x keeps its default value, 0.0.'},
  {q:'What is wrong with <code>public void Point(double x0) { … }</code> as a constructor?',a:['Nothing','The void makes it a method, not a constructor','Constructors must be private','Constructors must be static'],c:1,why:'Constructors have no return type at all, not even void.'},
  {q:'In the Counter demo, suppose <code>count</code> were declared <code>private static int count;</code>. After heads.increment() twice and tails.increment() once, what is heads.tally()?',a:['1','2','3','0'],c:2,why:'A static variable is shared by all Counter objects, so all three increments hit the same count.'},
  {q:'When is <code>toString()</code> called automatically?',a:['Never','When the object is printed or joined to a String with +','When the object is created','When the program ends'],c:1,why:'println(c) and "..." + c both call c.toString() for you.'}]},

/* ===================== WEEK 7 ===================== */
{id:'designing-types',week:7,date:'2026-11-02',reading:'3.3',title:'Designing data types',
 keywords:['encapsulation','immutable','final','interface','Comparable','compareTo','equals','aliasing','defensive copy'],
 lede:'A good data type hides its representation, doesn’t change when it shouldn’t, and does exactly what its API promises.',
 idea:`<p><b>Encapsulation</b>: make the instance variables private so clients can only use the API. Then you can change the representation later (say, a complex number from rectangular to polar form) without breaking any client.</p>
 <p><b>Immutability</b>: an immutable object never changes after it is constructed. String, Color and Charge are immutable. They are easier to reason about, safe to share, and safe to use as keys. Make all instance variables <code>private final</code>, write no methods that change them, and make <b>defensive copies</b> of any arrays you are given.</p>
 <p><b>Interfaces</b>: <code>implements Comparable&lt;T&gt;</code> promises a <code>compareTo</code> method, so sorting and searching code can work on your type.</p>`,
 keys:[['private','Clients can\'t see or change the representation'],['final','Assigned only once'],['implements Comparable<T>','Promise a compareTo(T that) method'],['a.equals(b)','Same value? (a == b asks: same object?)']],
 demos:[{type:'trace',title:'Aliasing: two names, one object',sub:'Assignment copies the arrow, not the object.',code:`Counter a = new Counter("a");
Counter b = new Counter("b");
Counter c = a;
c.increment();
StdOut.println(a.tally());
StdOut.println(a == c);
b = a;`,
  run(_,t){t.obj('#1','Counter',{name:'"a"',count:0});t.set('a','→ #1');t.step(1,'Create object #1. a points to it.');
   t.obj('#2','Counter',{name:'"b"',count:0});t.set('b','→ #2');t.step(2,'Create object #2. b points to it.');
   t.set('c','→ #1');t.step(3,'c = a copies the arrow. No new object: c and a are aliases for #1.');
   t.obj('#1','Counter',{count:1});t.step(4,'Increment through c. The object changed is #1, the same one a points to.');
   t.println('1');t.step(5,'a.tally() is 1, even though we never wrote a.increment().');
   t.println('true');t.step(6,'a == c compares arrows. They point to the same object, so it\'s true.');
   t.set('b','→ #1');t.gone('#2');t.step(7,'Now b points to #1 as well. Nothing refers to #2 any more, so it\'s garbage, and Java will reclaim its memory.');}}],
 code:{file:'Vector.java',intro:'An immutable spatial vector. Every operation returns a new Vector instead of changing this one.',src:
`public class Vector {
    private final double[] coords;

    public Vector(double[] a) {
        // defensive copy: later changes to a[] can't change this Vector
        coords = new double[a.length];
        for (int i = 0; i < a.length; i++)
            coords[i] = a[i];
    }

    public Vector plus(Vector that) {
        double[] sum = new double[coords.length];
        for (int i = 0; i < coords.length; i++)
            sum[i] = coords[i] + that.coords[i];
        return new Vector(sum);
    }

    public double dot(Vector that) {
        double sum = 0.0;
        for (int i = 0; i < coords.length; i++)
            sum += coords[i] * that.coords[i];
        return sum;
    }

    public double magnitude() {
        return Math.sqrt(this.dot(this));
    }
}`,
 notes:[['line 2','final means the reference can\'t change. The array\'s contents still could, which is why the constructor copies.'],['line 6','If we stored a directly, the client could change a[0] later and secretly change our Vector.'],['line 14','that.coords is allowed: private means private to the class, not to the object.'],['line 15','Return a new object instead of modifying this one.']]},
 worked:{label:'Implement Comparable',html:`<pre data-java>public class Student implements Comparable&lt;Student&gt; {
    private final String name;
    private final int year;

    public Student(String name, int year) {
        this.name = name;
        this.year = year;
    }

    // negative if this &lt; that, zero if equal, positive if this &gt; that
    public int compareTo(Student that) {
        return Integer.compare(this.year, that.year);
    }
}</pre>
 <p>Now an array of Students can be sorted by any code that sorts Comparable objects. Note <code>this.name = name;</code>: the parameter has the same name as the instance variable, so <code>this.</code> picks out the instance variable.</p>`},
 mistakes:[
  `<p><b>Thinking final makes an array immutable.</b> <code>private final double[] coords</code> stops reassignment of the reference, not changes like <code>coords[0] = 5</code>.</p>`,
  `<p><b>Handing out your internals.</b> A getter that returns <code>coords</code> directly lets clients change your "immutable" object. Return a copy.</p>`,
  `<p><b>Using == for objects.</b> It compares references. Use <code>equals</code> to compare values.</p>`,
  `<p><b>An inconsistent compareTo.</b> If a.compareTo(b) &lt; 0 then b.compareTo(a) must be &gt; 0. Subtracting large ints (<code>this.x - that.x</code>) can overflow. Use <code>Integer.compare</code>.</p>`],
 quiz:[
  {q:'What does <code>a.tally()</code> return?',code:`Counter a = new Counter("a");
Counter b = a;
b.increment();`,a:['0','1','2','It depends on b'],c:1,why:'a and b are aliases for the same object, so incrementing through b changes what a sees.'},
  {q:'Which design makes a class immutable?',a:['All instance variables public','private final instance variables, no methods that change them, and defensive copies of mutable inputs','A static constructor','A toString method'],c:1,why:'All three parts matter. Without defensive copies, an outside alias to an array could still change the object.'},
  {q:'<code>x.compareTo(y)</code> returns a negative number. What does it mean?',a:['x is less than y','x equals y','x is greater than y','There was an error'],c:0,why:'Negative means less than, zero means equal, positive means greater than.'},
  {q:'Why keep instance variables private?',a:['It makes the code faster','So you can change the representation without breaking any client','Java requires it','So static methods can use them'],c:1,why:'Encapsulation: clients depend only on the API, so the implementation is free to change.'}]},

{id:'algorithms',week:7,date:'2026-11-04',reading:'4.2',title:'Sorting and searching',short:'Algorithms',
 keywords:['binary search','insertion sort','mergesort','sorting','searching','compareTo','N log N'],
 lede:'Binary search finds a key among a billion sorted items in about 30 compares. Mergesort sorts in N log N time.',
 idea:`<p><b>Binary search</b> works on a <b>sorted</b> array, like a game of twenty questions. Compare the key with the middle element, and throw away the half that can't contain it. It takes about lg N compares: 20 for a million items, 30 for a billion.</p>
 <p><b>Insertion sort</b> moves each new element left until it is in place. It makes about N²/4 compares on random data, which is fine for small or nearly sorted arrays and hopeless for a million items.</p>
 <p><b>Mergesort</b> sorts each half recursively, then merges the two sorted halves. It takes about N lg N compares and needs an extra array.</p>`,
 keys:[['Binary search','~ lg N compares (array must be sorted)'],['Insertion sort','~ N²/4 compares on random data'],['Mergesort','~ N lg N compares, plus an extra array'],['Comparable','Sort any type that has compareTo()']],
 demos:[{type:'binsearch'},{type:'sort'}],
 code:{file:'BinarySearch.java',intro:'Search a sorted array of Strings. compareTo tells which half to keep.',src:
`public class BinarySearch {
    // return the index of key in sorted array a[], or -1 if it isn't there
    public static int search(String key, String[] a) {
        int lo = 0, hi = a.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int cmp = key.compareTo(a[mid]);
            if      (cmp < 0) hi = mid - 1;
            else if (cmp > 0) lo = mid + 1;
            else              return mid;
        }
        return -1;
    }
}`,
 notes:[['line 4','The invariant: if key is anywhere in a[], it\'s in a[lo..hi].'],['line 6','lo + (hi − lo) / 2 avoids the overflow that (lo + hi) / 2 can cause for huge arrays.'],['lines 8–9','mid itself has been checked, so the new range excludes it. That guarantees progress.'],['line 12','lo > hi means the range is empty: not found.']]},
 worked:{label:'Mergesort and why it is N log N',html:`<pre data-java>public static void sort(Comparable[] a, Comparable[] aux, int lo, int hi) {
    if (hi &lt;= lo) return;              // 0 or 1 element: already sorted
    int mid = lo + (hi - lo) / 2;
    sort(a, aux, lo, mid);              // sort the left half
    sort(a, aux, mid + 1, hi);          // sort the right half
    merge(a, aux, lo, mid, hi);         // merge the two sorted halves
}</pre>
 <p>Picture the recursion as a tree. The top level merges N items. The next level does two merges of N/2 items, which is N again, and so on. Each level costs about N compares, and halving N until you reach 1 takes lg N levels. Total: <b>N lg N</b>.</p>
 <p>For N = 1,000,000: insertion sort makes about N²/4 = 2.5 × 10¹¹ compares, and mergesort about 2 × 10⁷. That is over 10,000 times fewer.</p>`},
 mistakes:[
  `<p><b>Binary search on unsorted data.</b> It returns wrong answers without any error. Sort first.</p>`,
  `<p><b>Not making progress.</b> Writing <code>lo = mid</code> instead of <code>lo = mid + 1</code> can loop forever when lo and hi are next to each other.</p>`,
  `<p><b>Comparing Strings with &lt;.</b> It doesn't compile for objects. Use <code>a.compareTo(b) &lt; 0</code>.</p>`,
  `<p><b>Assuming insertion sort is always slow.</b> On an array that is already sorted it makes only N − 1 compares.</p>`],
 quiz:[
  {q:'At most about how many compares does binary search need on 1,000,000 sorted items?',a:['1,000,000','1,000','20','6'],c:2,why:'lg(1,000,000) ≈ 20, since 2²⁰ ≈ 1,000,000.'},
  {q:'How many compares does insertion sort make on an already sorted array of N items?',a:['About N','About N²/4','About N lg N','0'],c:0,why:'Each new element is compared once with its left neighbor and stays put: N − 1 compares.'},
  {q:'For a million random items, how do insertion sort and mergesort compare?',a:['About the same','Insertion sort is faster','Mergesort, by a factor of more than 10,000','Mergesort, by a factor of 2'],c:2,why:'About 2.5 × 10¹¹ compares versus about 2 × 10⁷.'},
  {q:'What does binary search require?',a:['An array of ints','A sorted array','An array with an even length','No duplicate values'],c:1,why:'Discarding half the array only works if everything on one side of the middle is smaller and everything on the other side is larger.'}]},

/* ===================== WEEK 8 ===================== */
{id:'data-structures',week:8,date:'2026-11-09',reading:'4.3',title:'Stacks and queues',short:'Data structures',
 keywords:['stack','queue','push','pop','enqueue','dequeue','linked list','resizing array','generics','Dijkstra','Node'],
 lede:'Stacks and queues hold collections of items. Linked lists and resizing arrays keep every operation fast, at any size.',
 idea:`<p>A <b>stack</b> is last in, first out (LIFO): <code>push</code> adds to the top and <code>pop</code> removes from the top, like a pile of plates. A <b>queue</b> is first in, first out (FIFO): <code>enqueue</code> adds at the back and <code>dequeue</code> removes from the front, like a line at a store.</p>
 <p><b>Generics</b> let one implementation hold any type: <code>Stack&lt;String&gt;</code>, <code>Queue&lt;Integer&gt;</code>. Primitive types need their wrapper type (Integer for int), and Java converts automatically (autoboxing).</p>
 <p>Two implementations make every operation constant time. A <b>linked list</b> chains Node objects, each holding an item and a reference to the next node. A <b>resizing array</b> doubles when full and halves when one-quarter full.</p>`,
 keys:[['Stack<String> s = new Stack<String>();','Last in, first out'],['Queue<Integer> q = new Queue<Integer>();','First in, first out'],['for (String x : s)','Iterate over every item'],['Node { Item item; Node next; }','The building block of a linked list']],
 demos:[{type:'stackq'},{type:'dijkstra'}],
 code:{file:'Stack.java',intro:'A generic stack built on a linked list. push and pop each change only the first node.',src:
`public class Stack<Item> {
    private Node first;   // top of the stack
    private int n;        // number of items

    private class Node {
        Item item;
        Node next;
    }

    public boolean isEmpty() { return first == null; }
    public int size()        { return n; }

    public void push(Item item) {
        Node oldFirst = first;
        first = new Node();
        first.item = item;
        first.next = oldFirst;
        n++;
    }

    public Item pop() {
        Item item = first.item;
        first = first.next;
        n--;
        return item;
    }
}`,
 notes:[['line 1','Item is a type parameter. Stack<String> fills in String everywhere Item appears.'],['line 5','A nested class used only inside Stack.'],['lines 14–17','Save the old first node, make a new one, and link it in front.'],['line 23','The old first node is now unreachable, and Java reclaims it. Popping an empty stack here would throw NullPointerException; the library version throws NoSuchElementException instead.']]},
 worked:{label:'Why resizing arrays are fast on average',html:`<p>An array has a fixed length. To grow a stack, create an array twice the size and copy everything over. Copying is expensive, so why is this fast?</p>
 <ol><li>Starting from length 1, the copies happen when the array fills at sizes 1, 2, 4, 8, …, N/2.</li><li>The total number of items copied is 1 + 2 + 4 + … + N/2 &lt; N.</li><li>So N pushes cost less than N writes plus N copies: a <b>constant amortized</b> cost per push.</li></ol>
 <p>Shrink when the array is <b>one-quarter</b> full, not half full. Otherwise pushing and popping right at the boundary would trigger a full copy on every operation.</p>`},
 mistakes:[
  `<p><b>Popping an empty stack.</b> Check <code>isEmpty()</code> first. The library version throws <code>NoSuchElementException</code>.</p>`,
  `<p><b>Stack&lt;int&gt;.</b> Generic type parameters must be reference types. Write <code>Stack&lt;Integer&gt;</code>.</p>`,
  `<p><b>Losing the rest of the list.</b> In push, setting <code>first = new Node()</code> before saving the old first node throws away the whole stack.</p>`,
  `<p><b>Mixing up the ends.</b> A queue adds at the back and removes from the front. Draw the list with first and last arrows before you code.</p>`],
 quiz:[
  {q:'push a, push b, pop, push c, pop, pop. In what order were the items popped?',a:['a, b, c','b, c, a','c, b, a','b, a, c'],c:1,why:'pop gives b (the top). Then c is pushed and popped. a is left, and the last pop gives a.'},
  {q:'enqueue a, b, c, then dequeue twice. What comes out?',a:['c, b','a, b','a, c','b, c'],c:1,why:'A queue is first in, first out, so a then b.'},
  {q:'Why can\'t you write <code>Stack&lt;int&gt;</code>?',a:['ints are too small','Type parameters must be reference types, so use Integer and autoboxing','Stacks can only hold Strings','You can; it\'s fine'],c:1,why:'Generics work with objects. Java boxes and unboxes ints for you when you use Stack<Integer>.'},
  {q:'What does Dijkstra\'s two-stack algorithm compute for <code>( 2 * ( 3 + 4 ) )</code>?',a:['10','14','24','9'],c:1,why:'At the first ) it computes 3 + 4 = 7. At the second ) it computes 2 * 7 = 14.'}]},

{id:'theory',week:8,date:'2026-11-11',reading:'5.3–5.4',title:'Theory of computing',short:'Theory of computing',
 keywords:['Turing machine','universality','Church-Turing','halting problem','computability','undecidable'],
 lede:'What can computers do at all? Turing machines model every computer, and some problems, like the halting problem, no program can ever solve.',
 idea:`<p>A <b>Turing machine</b> is the simplest model of a computer: an infinite tape of cells, a head that reads and writes one cell at a time, a finite set of states, and a table of rules. Despite its simplicity, it can compute anything your laptop can.</p>
 <p><b>Universality</b>: a <b>universal Turing machine</b> takes the description of any machine plus an input, and simulates it. That's the idea behind stored-program computers: one machine that runs any program. Java, TOY and your phone are all universal.</p>
 <p>The <b>Church–Turing thesis</b> says Turing machines capture everything that can be computed by any physical process. It's a claim about nature, not a theorem. It has held up so far.</p>
 <p><b>Computability</b>: some problems have no algorithm at all. The <b>halting problem</b> (given a program and its input, will it ever stop?) is <b>undecidable</b>. The proof uses a contradiction, shown below.</p>`,
 keys:[['Tape, head, states, rules','Everything a Turing machine has'],['Universal','Simulates any machine from its description'],['Church–Turing thesis','TMs can do whatever any computer can'],['Undecidable','No program can solve it for every input']],
 demos:[{type:'tm'}],
 code:{file:'Halting.java (thought experiment)',intro:'Suppose someone wrote halts(). The method strange() shows that it can\'t exist. (This isn\'t runnable Java: that\'s the point.)',src:
`// Suppose this existed and always gave the right answer:
public static boolean halts(String f, String x) {
    // true if program f halts on input x, false if it runs forever
}

public static void strange(String f) {
    if (halts(f, f))
        while (true) { }    // loop forever
    // otherwise halt right away
}

// Now ask: what does strange(strange) do?`,
 notes:[['line 7','strange asks halts() what program f would do when given its own text as input.'],['line 8','Then it does the opposite: if f would halt, strange loops forever.'],['line 12','Feed strange its own text, and both possible answers lead to a contradiction (see below).']]},
 worked:{label:'The contradiction, step by step',html:`<ol><li>Suppose <code>halts(f, x)</code> correctly decides, for every program f and input x, whether f halts on x.</li>
 <li>Build <code>strange(f)</code>: it loops forever if <code>halts(f, f)</code> is true, and halts otherwise.</li>
 <li>Run <code>strange(strange)</code>. If it halts, then <code>halts(strange, strange)</code> was true, so strange went into the infinite loop: it doesn't halt. Contradiction.</li>
 <li>If it runs forever, then <code>halts(strange, strange)</code> was false, so strange halted right away. Contradiction.</li>
 <li>Every case is impossible, so the assumption was wrong: <b>no program halts() can exist.</b></li></ol>
 <p>The consequence: no tool can find every infinite loop or every bug in every program. And many other problems can be proven undecidable by showing that solving them would solve the halting problem (a <b>reduction</b>).</p>`},
 mistakes:[
  `<p><b>"Undecidable" means "slow".</b> No. It means <i>no algorithm exists at all</i>, however fast the computer or however long you wait. (Problems that are solvable but take too long are <i>intractable</i>: that's the P vs. NP question.)</p>`,
  `<p><b>"Just run it and see."</b> If the program halts, you find out. If it hasn't halted yet, you can never be sure it won't in another second.</p>`,
  `<p><b>Treating the Church–Turing thesis as proven.</b> It's a hypothesis about what physical machines can do, supported by every model anyone has ever built.</p>`,
  `<p><b>Thinking universality means speed.</b> A universal Turing machine can simulate your laptop, just very slowly. Universality is about what can be computed, not how fast.</p>`],
 quiz:[
  {q:'What does it mean that the halting problem is undecidable?',a:['It takes exponential time','No program can correctly decide, for every program and input, whether it halts','Some programs can\'t be compiled','Only Turing machines can solve it'],c:1,why:'It\'s about existence: no algorithm works on all inputs.'},
  {q:'What is the Church–Turing thesis?',a:['A theorem proved by Turing','A hypothesis that Turing machines can compute anything any physical device can','A programming language','A proof that P ≠ NP'],c:1,why:'It can\'t be proven mathematically because it\'s a statement about the physical world.'},
  {q:'What does a universal Turing machine do?',a:['Runs faster than any other machine','Takes the description of any Turing machine and its input, and simulates it','Solves the halting problem','Has infinitely many states'],c:1,why:'It\'s a single machine that can act like any other one: a stored-program computer.'},
  {q:'The demo machine adds 1 to a binary number. Starting from 0111, what does it leave on the tape?',a:['0110','1000','1111','10000'],c:1,why:'The trailing 1s turn into 0s as the carry moves left, and then the 0 becomes 1: 0111 + 1 = 1000.'}]},

/* ===================== WEEK 9 ===================== */
{id:'ml',week:9,date:'2026-11-16',reading:'Machine Learning Paradigms',title:'Intro to machine learning',short:'Machine learning',
 keywords:['supervised','unsupervised','reinforcement','classification','regression','perceptron','training','test','overfitting','features'],
 lede:'Instead of writing the rules yourself, let the program learn them from examples.',
 idea:`<p>Three paradigms:</p>
 <ul><li><b>Supervised learning</b>: learn from labeled examples. <i>Classification</i> predicts a category (spam or not spam, which digit). <i>Regression</i> predicts a number (a price).</li>
 <li><b>Unsupervised learning</b>: find structure in unlabeled data, for example grouping similar items (clustering).</li>
 <li><b>Reinforcement learning</b>: an agent learns by trial and error from rewards.</li></ul>
 <p>Each example is described by <b>features</b>, such as the pixel values of an image. Train on a <b>training set</b>, then measure accuracy on a separate <b>test set</b> the model has never seen. That checks whether it <b>generalizes</b> instead of memorizing (<b>overfitting</b>).</p>
 <p>The <b>perceptron</b> is the simplest classifier. It computes a weighted sum of the features and predicts +1 if the sum is positive, −1 otherwise. When it gets a training example wrong, it adds the example (times its label) to the weights. If the data can be separated by a line (or a plane), it is guaranteed to find a separating one.</p>`,
 keys:[['w · x = Σ wᵢxᵢ','The weighted sum (a dot product)'],['predict: +1 if w · x > 0, else −1','The perceptron\'s decision'],['on a mistake: w ← w + y·x','The update rule (y is the true label, ±1)'],['test set','Data held back to measure real accuracy']],
 demos:[{type:'perceptron'}],
 code:{file:'Predict.java',intro:'The perceptron\'s prediction is a dot product and a sign. (Building the full classifier is the Image Classifier assignment, so it isn\'t here.)',src:
`// predict the label (+1 or -1) of feature vector x, given weights w
public static int predict(double[] w, double[] x) {
    double sum = 0.0;
    for (int i = 0; i < w.length; i++)
        sum += w[i] * x[i];      // the weighted sum: a dot product
    if (sum > 0) return +1;
    else         return -1;
}`,
 notes:[['line 5','Each feature votes with strength w[i]. Large positive weights push toward +1.'],['line 6','The decision boundary is where the sum is exactly 0. In two dimensions that\'s a line, as in the demo.']]},
 worked:{label:'Three perceptron updates by hand',html:`<p>Start with w = [0, 0, 0]. The first feature is always 1, which lets the boundary shift away from the origin (it acts as a bias).</p>
 <ol><li>x = [1, 2, −1], label +1. w · x = 0, which isn't &gt; 0, so it predicts −1. <b>Wrong</b>: w ← w + x = [1, 2, −1].</li>
 <li>x = [1, −1, 3], label −1. w · x = 1 − 2 − 3 = −4, so it predicts −1. <b>Right</b>: no change.</li>
 <li>x = [1, 1, 2], label −1. w · x = 1 + 2 − 2 = 1, so it predicts +1. <b>Wrong</b>: w ← w − x = [0, 1, −3].</li></ol>
 <p>Check: with w = [0, 1, −3], example 3 now gives 0 + 1 − 6 = −5, so it predicts −1. Correct. Each update moves the boundary toward classifying the mistaken example correctly.</p>`},
 mistakes:[
  `<p><b>Testing on the training data.</b> A model can score 100% on examples it memorized and still fail on new ones. Always measure on a held-out test set.</p>`,
  `<p><b>Overfitting.</b> A model that's too flexible learns the noise in its training set. Simpler models often generalize better.</p>`,
  `<p><b>Expecting a perceptron to separate anything.</b> If no line separates the classes (for example XOR), the perceptron never stops making mistakes.</p>`,
  `<p><b>Trusting accuracy on unbalanced data.</b> If 99% of emails aren't spam, a model that always says "not spam" is 99% accurate and useless.</p>`],
 quiz:[
  {q:'You have emails labeled spam or not spam and want to label new ones. What kind of learning is this?',a:['Unsupervised clustering','Supervised classification','Reinforcement learning','Regression'],c:1,why:'Labeled examples make it supervised, and predicting a category makes it classification.'},
  {q:'You want to group customers by behavior, with no labels. What kind of learning is this?',a:['Supervised classification','Unsupervised (clustering)','Regression','Reinforcement learning'],c:1,why:'There are no labels to learn from, so you look for structure: clusters.'},
  {q:'A perceptron has w = [1, −2]. It sees x = [3, 1] with label −1. What happens?',a:['It predicts −1, correct, no update','It predicts +1, wrong, so w becomes [−2, −3]','It predicts +1, wrong, so w becomes [4, −1]','It predicts 0'],c:1,why:'w · x = 3 − 2 = 1 > 0, so it predicts +1. The label is −1, so w ← w − x = [1 − 3, −2 − 1] = [−2, −3].'},
  {q:'Why keep a separate test set?',a:['Training is faster with less data','To measure how well the model works on data it hasn\'t seen','Java requires two arrays','To make the weights smaller'],c:1,why:'Accuracy on the training data overstates how well the model generalizes.'}]},

{id:'deep',week:9,date:'2026-11-18',title:'Intro to deep learning',short:'Deep learning',
 keywords:['neural network','neuron','activation','ReLU','sigmoid','layer','gradient descent','backpropagation','loss'],
 lede:'Stack many simple neurons in layers and train them all together. That is deep learning, the idea behind image recognition and chatbots.',
 idea:`<p>An artificial <b>neuron</b> computes a weighted sum of its inputs plus a <b>bias</b>, then applies an <b>activation function</b> such as ReLU (max(0, z)) or sigmoid. A perceptron is a neuron with a step activation.</p>
 <p>A <b>neural network</b> arranges neurons in <b>layers</b>: an input layer, one or more <b>hidden layers</b>, and an output layer. "Deep" means many hidden layers. The activation must be <b>nonlinear</b>: without that, any stack of layers collapses into a single linear function, no more powerful than one layer.</p>
 <p><b>Training</b> defines a <b>loss</b> that measures how wrong the outputs are, then uses <b>gradient descent</b> to nudge every weight a little in the direction that lowers the loss. <b>Backpropagation</b> computes all those directions efficiently, working backward from the output. It takes lots of data and a lot of computation (GPUs).</p>`,
 keys:[['z = w · x + b','The weighted sum plus a bias'],['ReLU(z) = max(0, z)','A simple, popular activation'],['loss','A number measuring how wrong the network is'],['gradient descent','Repeatedly step the weights downhill on the loss']],
 demos:[{type:'neuron'}],
 code:{file:'Layer.java',intro:'A forward pass through one fully connected layer with ReLU. A network applies layers one after another.',src:
`// out[j] = ReLU( b[j] + sum over i of w[j][i] * in[i] )
public static double[] layer(double[][] w, double[] b, double[] in) {
    double[] out = new double[b.length];
    for (int j = 0; j < b.length; j++) {
        double z = b[j];
        for (int i = 0; i < in.length; i++)
            z += w[j][i] * in[i];
        out[j] = Math.max(0.0, z);      // ReLU activation
    }
    return out;
}`,
 notes:[['line 4','One neuron per output j. Each has its own row of weights w[j] and its own bias b[j].'],['line 8','Without this nonlinearity, stacking layers would add nothing.'],['line 10','The output of one layer is the input to the next.']]},
 worked:{label:'Why hidden layers matter: XOR',html:`<p>XOR is 1 when exactly one input is 1. No single line separates its 1s from its 0s, so no single perceptron can learn it. Two hidden neurons can (step(z) is 1 if z &gt; 0, else 0):</p>
 <ul><li>h₁ = step(x₁ + x₂ − 0.5): this is OR.</li><li>h₂ = step(x₁ + x₂ − 1.5): this is AND.</li><li>out = step(h₁ − h₂ − 0.5): OR but not AND.</li></ul>
 <div class="tw"><table class="tbl"><thead><tr><th>x₁</th><th>x₂</th><th>h₁</th><th>h₂</th><th>out</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr></tbody></table></div>
 <p style="margin-top:12px">The hidden layer creates new features (OR, AND) that make the problem linearly separable. Deep networks learn such features automatically during training.</p>`},
 mistakes:[
  `<p><b>"More layers is always better."</b> Bigger networks need more data and can overfit. Size is a trade-off.</p>`,
  `<p><b>Linear activations.</b> Without a nonlinear activation, a deep network is just one linear function.</p>`,
  `<p><b>Forgetting the bias.</b> Without b, every boundary has to pass through the origin.</p>`,
  `<p><b>"The network understands."</b> It finds statistical patterns that reduce the loss on its training data. It can be confidently wrong on inputs unlike that data.</p>`],
 quiz:[
  {q:'Why do neural networks need nonlinear activation functions?',a:['To make training faster','Without them, any number of layers equals a single linear function','To keep the outputs positive','Java requires them'],c:1,why:'A composition of linear functions is linear. Nonlinearity is what lets depth add power.'},
  {q:'What does gradient descent do?',a:['Picks random weights until one works','Adjusts the weights a small step in the direction that reduces the loss','Removes neurons','Sorts the training data'],c:1,why:'The gradient says which way the loss increases, so you step the opposite way.'},
  {q:'A ReLU neuron has w = (2, −1), b = 0.5 and input x = (1, 3). What is its output?',a:['−0.5','0','0.5','3.5'],c:1,why:'z = 2·1 − 1·3 + 0.5 = −0.5, and ReLU gives max(0, −0.5) = 0.'},
  {q:'Can a single perceptron learn XOR?',a:['Yes, with enough training','No: XOR isn\'t linearly separable','Only with a bias','Only with sigmoid'],c:1,why:'No single line separates (0,1) and (1,0) from (0,0) and (1,1). You need a hidden layer.'}]},

{id:'networks',week:9.5,date:'2026-11-23',title:'Intro to networks',short:'Networks',
 keywords:['internet','packet','IP address','DNS','TCP','UDP','HTTP','router','protocol','layers'],
 lede:'How does a message cross the planet? It gets cut into packets, addressed, routed hop by hop, and put back together.',
 idea:`<p>The Internet is a network of networks. Data travels in <b>packets</b>, small chunks that each carry a destination address and may take different routes. This is called packet switching.</p>
 <p>The work is split into <b>layers</b>, each relying on the one below:</p>
 <ul><li><b>Application</b>: HTTP (the web), DNS (names), email.</li><li><b>Transport</b>: TCP gives reliable, in-order delivery by resending lost packets. UDP is faster but makes no promises.</li><li><b>Network</b>: IP addresses and <b>routing</b> from router to router.</li><li><b>Link</b>: the physical hop, such as Wi-Fi or Ethernet.</li></ul>
 <p><b>DNS</b> turns a name like <code>www.princeton.edu</code> into a numeric IP address. An IPv4 address is 32 bits; IPv6 uses 128.</p>`,
 keys:[['Packet','A small chunk of data with an address'],['IP address','32 bits (IPv4) or 128 bits (IPv6)'],['TCP','Reliable and in order'],['DNS','Names → IP addresses']],
 demos:[{type:'frames',title:'What happens when you open a web page',sub:'Step through one page load.',frames:[
   {h:'1. DNS lookup',html:'<p>Your computer asks a DNS server: "What is the IP address of <code>www.example.com</code>?" It gets back a number like <code>93.184.215.14</code>. Answers are cached, so the next lookup is instant.</p>'},
   {h:'2. Open a TCP connection',html:'<p>Your computer and the server exchange three short messages (SYN, SYN-ACK, ACK) to set up a connection. From now on TCP numbers every packet so it can detect losses and resend.</p>'},
   {h:'3. Secure it (HTTPS)',html:'<p>For <code>https://</code>, the two sides agree on encryption keys (TLS). Anyone in between can see <i>which server</i> you talk to, but not <i>what</i> you send.</p>'},
   {h:'4. Send the HTTP request',html:'<p>The browser sends a short text message:</p>'+term('GET /index.html HTTP/1.1\nHost: www.example.com')},
   {h:'5. Packets hop through routers',html:'<p>The request and the response are split into packets. Each router looks at a packet\'s destination address and forwards it one hop closer. A trip across the country might pass through 10–20 routers in a few dozen milliseconds.</p>'},
   {h:'6. Reassemble and render',html:'<p>Packets may arrive out of order or get lost. TCP reorders them and requests the missing ones again, then hands the complete page to the browser, which may need more requests for images and scripts.</p>'}]}],
 code:{file:'WebPeek.java',run:'java WebPeek https://example.com',intro:'The In library reads from a URL as easily as from a file. Every step in the demo happens inside that constructor.',src:
`public class WebPeek {
    public static void main(String[] args) {
        // In can read from a file name or a URL
        In in = new In(args[0]);
        String page = in.readAll();
        StdOut.println(page.length() + " characters");
        StdOut.println(page.substring(0, Math.min(200, page.length())));
    }
}`,
 notes:[['line 4','DNS, TCP, TLS and HTTP all happen here, hidden behind one constructor: abstraction in action.'],['line 7','Math.min avoids an exception if the page is shorter than 200 characters.']]},
 worked:{label:'An IP address in binary',html:`<p>An IPv4 address is 32 bits, written as four 8-bit numbers (0–255):</p>
 <div class="tw"><table class="tbl"><thead><tr><th>Decimal</th><th>128</th><th>112</th><th>0</th><th>1</th></tr></thead><tbody><tr><td>Binary</td><td><code>10000000</code></td><td><code>01110000</code></td><td><code>00000000</code></td><td><code>00000001</code></td></tr></tbody></table></div>
 <p style="margin-top:12px">112 = 64 + 32 + 16, so its bits are 0111 0000. 32 bits allow 2³² ≈ 4.3 billion addresses, fewer than the number of devices on Earth. That's why IPv6, with 2¹²⁸ addresses, exists.</p>`},
 mistakes:[
  `<p><b>Treating the Internet and the Web as the same thing.</b> The Web (HTTP pages) is one application that runs on the Internet, alongside email, video calls and games.</p>`,
  `<p><b>Mixing up bandwidth and latency.</b> Bandwidth is how much data per second. Latency is how long one packet takes. A huge download needs bandwidth; a video call needs low latency.</p>`,
  `<p><b>Thinking HTTPS hides everything.</b> It encrypts the content, but the server you connect to is still visible.</p>`,
  `<p><b>Thinking TCP is always better.</b> For live audio and video, a late packet is useless, so UDP's speed wins over TCP's retries.</p>`],
 quiz:[
  {q:'What does DNS do?',a:['Encrypts web traffic','Translates domain names into IP addresses','Routes packets','Compresses images'],c:1,why:'DNS is the Internet\'s phone book: names in, numbers out.'},
  {q:'Which protocol guarantees reliable, in-order delivery?',a:['IP','UDP','TCP','DNS'],c:2,why:'TCP numbers packets, acknowledges them and resends lost ones. IP alone is best-effort.'},
  {q:'How many bits are in an IPv4 address?',a:['8','16','32','128'],c:2,why:'Four 8-bit numbers: 32 bits. IPv6 uses 128.'},
  {q:'A live video call can tolerate a few lost packets but not delay. Which transport fits better?',a:['TCP','UDP','DNS','HTTP'],c:1,why:'UDP doesn\'t wait to resend lost packets, which keeps delay low.'}]},

/* ===================== WEEK 10 ===================== */
{id:'toy1',week:10,date:'2026-11-30',reading:'6.1–6.2',title:'The TOY machine',short:'TOY I',
 keywords:['TOY','machine language','register','memory','PC','hex','binary','two\'s complement','fetch execute','opcode'],
 lede:'TOY is an imaginary but complete computer: 16 registers, 256 words of memory and 16 instructions. Learn to read its machine language.',
 idea:`<p>Everything in TOY is a 16-bit <b>word</b>, written as 4 hex digits. Hex digits run 0–9 then A–F (10–15), and each hex digit is exactly 4 bits.</p>
 <p>The machine has 256 words of <b>memory</b> M[00]…M[FF], 16 <b>registers</b> R[0]…R[F] (R[0] is always 0), and a <b>program counter</b> (PC) that holds the address of the next instruction. Programs start at address 10.</p>
 <p>The <b>fetch–execute cycle</b> repeats forever: fetch the word M[PC], add 1 to the PC, then execute the instruction. The first hex digit is the <b>opcode</b>. The rest name registers (<code>d s t</code>) or a memory address (<code>d addr</code>).</p>
 <p>Negative numbers use <b>two's complement</b>: to negate, flip every bit and add 1. FFFF is −1, and the range is −32,768 to 32,767.</p>`,
 keys:[['1CAB','opcode 1 (add): R[C] ← R[A] + R[B]'],['8A15','opcode 8 (load): R[A] ← M[15]'],['9C17','opcode 9 (store): M[17] ← R[C]'],['7A05','opcode 7 (load address): R[A] ← 0005']],
 demos:[{type:'toy',programs:[
  {name:'Add two numbers',src:`10: 8A15   load a
11: 8B16   load b
12: 1CAB   add
13: 9C17   store the sum
14: 0000   halt
15: 0008   data: a = 8
16: 0005   data: b = 5
17: 0000   data: the sum goes here`},
  {name:'A negative result',src:`10: 8A15   load a
11: 8B16   load b
12: 2CAB   subtract: a - b
13: 9C17   store
14: 0000   halt
15: 0005   data: a = 5
16: 0008   data: b = 8
17: 0000   data: 5 - 8 = -3 = FFFD`}]}],
 code:{file:'add.toy',intro:'The first demo program, with the effect of each instruction.',src:
`10: 8A15   R[A] <- M[15]        // load a
11: 8B16   R[B] <- M[16]        // load b
12: 1CAB   R[C] <- R[A] + R[B]  // add
13: 9C17   M[17] <- R[C]        // store the sum
14: 0000   halt
15: 0008   // a = 8
16: 0005   // b = 5
17: 0000   // the sum (000D) goes here`,
 notes:[['8A15','Opcode 8 means load. d = A is the register, and 15 is the memory address.'],['1CAB','Opcode 1 means add. d = C, s = A, t = B.'],['000D','8 + 5 = 13, which is D in hex.']]},
 worked:{label:'Two\'s complement by hand',html:`<p>What is −3 as a 16-bit TOY word?</p>
 <ol><li>Write +3 in binary: <code>0000 0000 0000 0011</code>.</li><li>Flip every bit: <code>1111 1111 1111 1100</code>.</li><li>Add 1: <code>1111 1111 1111 1101</code>.</li><li>Group into hex: <code>F F F D</code>, so <b>FFFD</b>.</li></ol>
 <p>Check: FFFD + 0003 = 10000, and the leading 1 doesn't fit in 16 bits, so the sum is 0000. The same adding circuit works for negative numbers, which is why computers use two's complement.</p>
 <div class="tw"><table class="tbl"><thead><tr><th>Hex</th><th>0</th><th>5</th><th>9</th><th>A</th><th>C</th><th>F</th></tr></thead><tbody><tr><td>Binary</td><td>0000</td><td>0101</td><td>1001</td><td>1010</td><td>1100</td><td>1111</td></tr><tr><td>Decimal</td><td>0</td><td>5</td><td>9</td><td>10</td><td>12</td><td>15</td></tr></tbody></table></div>`},
 mistakes:[
  `<p><b>Load versus load address.</b> <code>7A05</code> puts the <i>number</i> 0005 in R[A]. <code>8A05</code> puts the <i>contents</i> of M[05] in R[A].</p>`,
  `<p><b>Writing to R[0].</b> R[0] is always 0. Anything you store there is lost.</p>`,
  `<p><b>Hex arithmetic slips.</b> 9 + 1 = A, F + 1 = 10, and 10 in hex is sixteen.</p>`,
  `<p><b>Forgetting the PC moves first.</b> The PC is incremented <i>before</i> the instruction executes, so it already points to the next instruction while the current one runs.</p>`],
 quiz:[
  {q:'What does the instruction <code>1234</code> do?',a:['R[1] ← R[2] + R[3] + R[4]','R[2] ← R[3] + R[4]','M[34] ← R[2]','Jump to address 34'],c:1,why:'Opcode 1 is add, with d = 2, s = 3, t = 4.'},
  {q:'What is FFFF as a 16-bit two\'s complement number?',a:['65,535','−1','−32,768','0'],c:1,why:'Flip the bits of FFFF to get 0000, add 1 to get 0001, so FFFF is −1.'},
  {q:'How do <code>7A05</code> and <code>8A05</code> differ?',a:['They are the same','7A05 sets R[A] to 5; 8A05 loads the word stored at M[05]','7A05 stores; 8A05 loads','8A05 adds 5'],c:1,why:'Opcode 7 loads the address itself as a number. Opcode 8 loads from memory at that address.'},
  {q:'What is 1F + 1 in hex?',a:['1G','20','2F','110'],c:1,why:'F + 1 = 10 in hex, so carry the 1: 1F + 1 = 20.'}]},

{id:'toy2',week:10,date:'2026-12-02',reading:'6.3–6.4',title:'Programming in TOY',short:'TOY II',
 keywords:['TOY','branch','loop','standard input','FF','indirect','jump and link','function','Hamming'],
 lede:'Branches turn TOY into a real programming language: loops, standard input and output at address FF, arrays and functions.',
 idea:`<p>Two <b>branch</b> instructions change the PC: <code>C</code> (branch if zero) and <code>D</code> (branch if positive). Since R[0] is always 0, <code>C0xx</code> is an unconditional jump to xx. Loops are just branches backward.</p>
 <p><b>Standard input and output</b> live at address FF. Loading from M[FF] reads the next word of standard input, and storing to M[FF] writes a word to standard output.</p>
 <p><b>Indirect</b> load and store (<code>A</code>, <code>B</code>) use a register as the address, which is how you step through an array. <b>Functions</b> use <code>F</code> (jump and link: save the return address in a register, then jump) and <code>E</code> (jump to the address in a register) to return.</p>`,
 keys:[['CB18','if (R[B] == 0) PC ← 18'],['C014','PC ← 14 (always, since R[0] = 0)'],['8AFF','Read a word of standard input into R[A]'],['F830 … E800','Call a function at 30, then return']],
 demos:[{type:'toy',programs:[
  {name:'Multiply (loop)',src:`10: 8A30   load a
11: 8B31   load b
12: 7C00   c = 0
13: 7101   R[1] = 1
14: CB18   if b == 0 goto 18
15: 1CCA   c = c + a
16: 2BB1   b = b - 1
17: C014   goto 14
18: 9C32   store c
19: 0000   halt
30: 0003   data: a = 3
31: 0009   data: b = 9
32: 0000   data: a * b goes here`},
  {name:'Sum standard input',stdin:'0005 0003 000A 0000',src:`10: 7C00   sum = 0
11: 8AFF   read a word into R[A]
12: CA15   if it is 0, goto 15
13: 1CCA   sum = sum + R[A]
14: C011   goto 11
15: 9CFF   write sum to standard output
16: 0000   halt`}]}],
 code:{file:'multiply.toy',intro:'Multiply by repeated addition. Compare it with the Java loop it implements, in the next section.',src:
`10: 8A30   R[A] <- M[30]          // a
11: 8B31   R[B] <- M[31]          // b
12: 7C00   R[C] <- 0000           // c = 0
13: 7101   R[1] <- 0001           // the constant 1
14: CB18   if (R[B] == 0) PC <- 18
15: 1CCA   R[C] <- R[C] + R[A]    // c += a
16: 2BB1   R[B] <- R[B] - R[1]    // b--
17: C014   PC <- 14               // back to the test
18: 9C32   M[32] <- R[C]          // store the product
19: 0000   halt`,
 notes:[['14','The loop test comes first, like a while loop. With b = 0 the body never runs.'],['17','Branch-if-zero on R[0], which is always 0: an unconditional jump.'],['data','3 × 9 = 27 = 001B in hex.']]},
 worked:{label:'Translate Java to TOY',html:`<pre data-java>c = 0;
while (b != 0) {
    c = c + a;
    b = b - 1;
}</pre>
 <div class="tw"><table class="tbl"><thead><tr><th>Java</th><th>TOY</th></tr></thead><tbody>
 <tr><td><code>c = 0;</code></td><td><code>12: 7C00</code></td></tr>
 <tr><td><code>while (b != 0)</code></td><td><code>14: CB18</code>: if b is 0, jump past the loop</td></tr>
 <tr><td><code>c = c + a;</code></td><td><code>15: 1CCA</code></td></tr>
 <tr><td><code>b = b - 1;</code></td><td><code>16: 2BB1</code> (needs the constant 1 in R[1])</td></tr>
 <tr><td>end of loop body</td><td><code>17: C014</code>: jump back to the test</td></tr></tbody></table></div>
 <p style="margin-top:12px">Every while loop becomes a test that branches <i>out</i>, followed by a body that ends with a jump <i>back</i> to the test.</p>`},
 mistakes:[
  `<p><b>Branch-if-positive is not "not zero".</b> <code>D</code> branches only when the register is &gt; 0. A negative value falls through.</p>`,
  `<p><b>Off-by-one branch targets.</b> Count addresses in hex: after 19 comes 1A, not 20.</p>`,
  `<p><b>Forgetting a loop's update.</b> Without <code>2BB1</code>, b never reaches 0, and the program never halts.</p>`,
  `<p><b>Clobbering registers in a function.</b> If a function uses a register the caller relies on, the caller's value is gone. Agree on which registers each part uses.</p>`],
 quiz:[
  {q:'What does <code>C014</code> do?',a:['Jump to 14 only if R[0] is not zero','Always jump to 14','Store R[0] in M[14]','Halt'],c:1,why:'R[0] is always 0, so "branch if R[0] is zero" always branches.'},
  {q:'What does <code>8AFF</code> do?',a:['R[A] ← FF','Reads the next word of standard input into R[A]','Writes R[A] to standard output','Halts'],c:1,why:'Loading from address FF reads from standard input.'},
  {q:'What does the multiply program do if b = 0?',a:['Loops forever','Branches straight to 18 and stores 0','Crashes','Stores a'],c:1,why:'The test at 14 sees b == 0 before running the body, so c stays 0.'},
  {q:'What does <code>F830</code> do?',a:['R[8] ← 30','R[8] ← PC (the return address), then PC ← 30','PC ← R[8]','M[30] ← R[8]'],c:1,why:'Jump and link saves where to come back to, then jumps to the function at 30. Later, E800 returns.'}]},

/* ===================== WEEK 11 ===================== */
{id:'circuits',week:11,date:'2026-12-07',reading:'7.1, 7.3',title:'Circuits',
 keywords:['boolean','logic gate','AND','OR','NOT','XOR','NAND','truth table','sum of products','adder','multiplexer','decoder'],
 lede:'Underneath every computer is Boolean logic built from switches. Combine gates into circuits that add, select and decode.',
 idea:`<p>A <b>Boolean function</b> maps 0/1 inputs to 0/1 outputs. You can describe any one with a <b>truth table</b>, which has 2ⁿ rows for n inputs.</p>
 <p><b>Gates</b> compute the basic functions: AND, OR, NOT, and also XOR (1 if the inputs differ). Each gate is built from a few transistors acting as switches. NAND alone is <b>universal</b>: every other gate can be made from NANDs.</p>
 <p><b>Sum of products</b> builds a circuit for any truth table: for each row that outputs 1, AND together the inputs (negating the 0s), then OR all those terms together.</p>
 <p><b>Combinational circuits</b> combine gates: a <b>decoder</b> turns a binary number into one active wire, a <b>multiplexer</b> selects one of several inputs, and an <b>adder</b> adds binary numbers. TOY's arithmetic unit is built from these.</p>`,
 keys:[['AND, OR, NOT','The basic gates'],['XOR','1 when the inputs differ'],['NAND','Universal: it can build every other gate'],['Full adder','sum = a ⊕ b ⊕ c, carry = MAJ(a, b, c)']],
 demos:[{type:'adder'}],
 code:{file:'FullAdder.java',run:'java FullAdder',out:'0 0 0 | 0 0\n0 0 1 | 1 0\n0 1 0 | 1 0\n0 1 1 | 0 1\n1 0 0 | 1 0\n1 0 1 | 0 1\n1 1 0 | 0 1\n1 1 1 | 1 1',intro:'A full adder written as Java boolean functions, printing its truth table.',src:
`public class FullAdder {
    public static boolean xor(boolean a, boolean b) { return a != b; }
    public static boolean majority(boolean a, boolean b, boolean c) {
        return (a && b) || (a && c) || (b && c);
    }

    private static int bit(boolean x) { return x ? 1 : 0; }

    public static void main(String[] args) {
        // a b cin | sum cout
        for (int i = 0; i < 8; i++) {
            boolean a = (i & 4) != 0, b = (i & 2) != 0, c = (i & 1) != 0;
            boolean sum  = xor(xor(a, b), c);
            boolean cout = majority(a, b, c);
            StdOut.println(bit(a) + " " + bit(b) + " " + bit(c) + " | " + bit(sum) + " " + bit(cout));
        }
    }
}`,
 notes:[['line 2','For booleans, != is XOR.'],['line 4','The carry is 1 when at least two of the three inputs are 1: the majority function.'],['line 12','The bits of i (0 to 7) list every row of the truth table.']]},
 worked:{label:'Sum of products for majority',html:`<p>MAJ(a, b, c) is 1 when at least two inputs are 1. Its truth table has four 1 rows: 011, 101, 110, 111.</p>
 <ol><li>Write one AND term per 1 row, with a prime (′) on each input that is 0: a′bc + ab′c + abc′ + abc.</li><li>That expression already works as a circuit: four 3-input AND gates feeding one OR gate.</li><li>It simplifies to <b>ab + ac + bc</b>, the form used in the code above.</li></ol>
 <p>The same recipe works for any truth table, so any Boolean function can be built from AND, OR and NOT.</p>`},
 mistakes:[
  `<p><b>OR versus XOR.</b> 1 OR 1 = 1, but 1 XOR 1 = 0. The sum bit of an adder uses XOR.</p>`,
  `<p><b>Dropping the carry.</b> Each column of an adder takes a carry in from the column to its right. A half adder (no carry in) only works for the rightmost bit.</p>`,
  `<p><b>Missing rows in sum of products.</b> You need one term for <i>every</i> row that outputs 1.</p>`,
  `<p><b>Thinking gates run one after another.</b> In a combinational circuit all the gates work at once. The outputs settle as soon as signals pass through, after a small delay.</p>`],
 quiz:[
  {q:'What is NAND(1, 1)?',a:['1','0','2','It depends on the wiring'],c:1,why:'NAND is NOT AND. 1 AND 1 is 1, so NAND gives 0.'},
  {q:'A full adder gets a = 1, b = 1, cin = 1. What are sum and cout?',a:['sum 0, cout 1','sum 1, cout 1','sum 1, cout 0','sum 0, cout 0'],c:1,why:'1 + 1 + 1 = 3 = binary 11: the sum bit is 1 and the carry is 1.'},
  {q:'How many rows does a truth table with 4 inputs have?',a:['4','8','16','32'],c:2,why:'Each input doubles the number of rows: 2⁴ = 16.'},
  {q:'In 4-bit binary, what is 0111 + 0001?',a:['0110','1000','1111','0000'],c:1,why:'7 + 1 = 8. The carries ripple through the three 1s, giving 1000.'}]}
];

const reference=`
<h2>Primitive types</h2>
<div class="tw"><table class="tbl"><thead><tr><th>Type</th><th>Values</th><th>Example literals</th><th>Size</th></tr></thead><tbody>
<tr><td><code>int</code></td><td>−2³¹ to 2³¹ − 1</td><td><code>42</code>, <code>-7</code></td><td>4 bytes</td></tr>
<tr><td><code>long</code></td><td>−2⁶³ to 2⁶³ − 1</td><td><code>42L</code></td><td>8 bytes</td></tr>
<tr><td><code>double</code></td><td>real numbers, about 15 digits</td><td><code>3.14</code>, <code>6.02e23</code></td><td>8 bytes</td></tr>
<tr><td><code>boolean</code></td><td>true or false</td><td><code>true</code></td><td>1 byte</td></tr>
<tr><td><code>char</code></td><td>characters</td><td><code>'a'</code>, <code>'\\n'</code></td><td>2 bytes</td></tr></tbody></table></div>

<h2>Operators, from tightest to loosest</h2>
<div class="tw"><table class="tbl"><thead><tr><th>Operators</th><th>Meaning</th></tr></thead><tbody>
<tr><td><code>!</code> <code>++</code> <code>--</code> <code>(int)</code></td><td>not, increment, decrement, cast</td></tr>
<tr><td><code>*</code> <code>/</code> <code>%</code></td><td>multiply, divide, remainder</td></tr>
<tr><td><code>+</code> <code>-</code></td><td>add, subtract (+ also joins Strings)</td></tr>
<tr><td><code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code></td><td>compare</td></tr>
<tr><td><code>==</code> <code>!=</code></td><td>equal, not equal</td></tr>
<tr><td><code>&amp;&amp;</code> then <code>||</code></td><td>and, or (short-circuit)</td></tr>
<tr><td><code>=</code> <code>+=</code> <code>-=</code> <code>*=</code></td><td>assignment</td></tr></tbody></table></div>

<h2>String</h2>
<div class="tw"><table class="tbl"><thead><tr><th>Call</th><th>Returns</th></tr></thead><tbody>
<tr><td><code>s.length()</code></td><td>number of characters</td></tr>
<tr><td><code>s.charAt(i)</code></td><td>the character at index i</td></tr>
<tr><td><code>s.substring(i, j)</code></td><td>characters i through j − 1</td></tr>
<tr><td><code>s.indexOf(t)</code></td><td>index of the first t, or −1</td></tr>
<tr><td><code>s.equals(t)</code></td><td>same characters?</td></tr>
<tr><td><code>s.compareTo(t)</code></td><td>negative, zero or positive (dictionary order)</td></tr>
<tr><td><code>s.toUpperCase()</code>, <code>s.trim()</code></td><td>a new String</td></tr>
<tr><td><code>Integer.parseInt(s)</code>, <code>Double.parseDouble(s)</code></td><td>String to number</td></tr></tbody></table></div>

<h2>Math</h2>
<div class="keys"><div class="key"><b>Math.abs(x)  Math.max(a, b)  Math.min(a, b)</b>absolute value, larger, smaller</div><div class="key"><b>Math.sqrt(x)  Math.pow(a, b)</b>square root, aᵇ</div><div class="key"><b>Math.exp(x)  Math.log(x)</b>eˣ and the natural log</div><div class="key"><b>Math.sin(x)  Math.cos(x)</b>x in radians</div><div class="key"><b>Math.random()</b>a double in [0, 1)</div><div class="key"><b>Math.round(x)  Math.PI</b>nearest integer (a long), π</div></div>

<h2>Standard libraries</h2>
<div class="tw"><table class="tbl"><thead><tr><th>Library</th><th>Most used</th></tr></thead><tbody>
<tr><td>StdIn</td><td><code>isEmpty()</code> <code>readInt()</code> <code>readDouble()</code> <code>readString()</code> <code>readLine()</code> <code>readAllInts()</code></td></tr>
<tr><td>StdOut</td><td><code>print(x)</code> <code>println(x)</code> <code>printf(fmt, ...)</code></td></tr>
<tr><td>StdDraw</td><td><code>line(x0, y0, x1, y1)</code> <code>point(x, y)</code> <code>circle(x, y, r)</code> <code>filledCircle(x, y, r)</code> <code>square(x, y, r)</code> <code>text(x, y, s)</code> <code>setXscale(a, b)</code> <code>setPenColor(c)</code> <code>setPenRadius(r)</code> <code>enableDoubleBuffering()</code> <code>show()</code> <code>pause(ms)</code> <code>clear()</code></td></tr>
<tr><td>StdRandom</td><td><code>uniformInt(n)</code> <code>uniformInt(a, b)</code> <code>uniformDouble(a, b)</code> <code>bernoulli(p)</code> <code>gaussian()</code> <code>shuffle(a)</code></td></tr>
<tr><td>StdStats</td><td><code>mean(a)</code> <code>stddev(a)</code> <code>min(a)</code> <code>max(a)</code> <code>median(a)</code></td></tr>
<tr><td>StdAudio</td><td><code>play(double[] samples)</code>, sampled at <code>StdAudio.SAMPLE_RATE</code> = 44,100 per second</td></tr>
<tr><td>Picture</td><td><code>new Picture(filename)</code> <code>width()</code> <code>height()</code> <code>get(col, row)</code> <code>set(col, row, color)</code> <code>show()</code></td></tr>
<tr><td>In</td><td><code>new In(fileOrUrl)</code> <code>readInt()</code> <code>readLine()</code> <code>readAll()</code> <code>isEmpty()</code></td></tr></tbody></table></div>

<h2>Collections</h2>
<div class="tw"><table class="tbl"><thead><tr><th>Type</th><th>Operations</th></tr></thead><tbody>
<tr><td><code>Stack&lt;Item&gt;</code></td><td><code>push(item)</code> <code>pop()</code> <code>peek()</code> <code>isEmpty()</code> <code>size()</code></td></tr>
<tr><td><code>Queue&lt;Item&gt;</code></td><td><code>enqueue(item)</code> <code>dequeue()</code> <code>peek()</code> <code>isEmpty()</code> <code>size()</code></td></tr>
<tr><td><code>ST&lt;Key, Value&gt;</code></td><td><code>put(key, val)</code> <code>get(key)</code> <code>contains(key)</code> <code>remove(key)</code> <code>size()</code> <code>keys()</code></td></tr></tbody></table></div>

<h2>Orders of growth</h2>
<div class="tw"><table class="tbl"><thead><tr><th>Order</th><th>Name</th><th>Typical code</th><th>T(2N) / T(N)</th></tr></thead><tbody>
<tr><td>1</td><td>constant</td><td>one statement</td><td>1</td></tr><tr><td>log N</td><td>logarithmic</td><td>binary search</td><td>≈ 1</td></tr>
<tr><td>N</td><td>linear</td><td>one loop</td><td>2</td></tr><tr><td>N log N</td><td>linearithmic</td><td>mergesort</td><td>≈ 2</td></tr>
<tr><td>N²</td><td>quadratic</td><td>two nested loops</td><td>4</td></tr><tr><td>N³</td><td>cubic</td><td>three nested loops</td><td>8</td></tr>
<tr><td>2ᴺ</td><td>exponential</td><td>try every subset</td><td>2ᴺ: doubling N squares the time</td></tr></tbody></table></div>

<h2>TOY instruction set</h2>
<div class="tw"><table class="tbl"><thead><tr><th>Op</th><th>Instruction</th><th>Effect</th></tr></thead><tbody>
<tr><td><code>0</code></td><td>halt</td><td>stop</td></tr>
<tr><td><code>1</code></td><td>add</td><td>R[d] ← R[s] + R[t]</td></tr>
<tr><td><code>2</code></td><td>subtract</td><td>R[d] ← R[s] − R[t]</td></tr>
<tr><td><code>3</code></td><td>and</td><td>R[d] ← R[s] &amp; R[t]</td></tr>
<tr><td><code>4</code></td><td>xor</td><td>R[d] ← R[s] ^ R[t]</td></tr>
<tr><td><code>5</code></td><td>shift left</td><td>R[d] ← R[s] &lt;&lt; R[t]</td></tr>
<tr><td><code>6</code></td><td>shift right</td><td>R[d] ← R[s] &gt;&gt; R[t]</td></tr>
<tr><td><code>7</code></td><td>load address</td><td>R[d] ← addr</td></tr>
<tr><td><code>8</code></td><td>load</td><td>R[d] ← M[addr] (addr FF reads standard input)</td></tr>
<tr><td><code>9</code></td><td>store</td><td>M[addr] ← R[d] (addr FF writes standard output)</td></tr>
<tr><td><code>A</code></td><td>load indirect</td><td>R[d] ← M[R[t]]</td></tr>
<tr><td><code>B</code></td><td>store indirect</td><td>M[R[t]] ← R[d]</td></tr>
<tr><td><code>C</code></td><td>branch zero</td><td>if (R[d] == 0) PC ← addr</td></tr>
<tr><td><code>D</code></td><td>branch positive</td><td>if (R[d] &gt; 0) PC ← addr</td></tr>
<tr><td><code>E</code></td><td>jump register</td><td>PC ← R[d]</td></tr>
<tr><td><code>F</code></td><td>jump and link</td><td>R[d] ← PC; PC ← addr</td></tr></tbody></table></div>
<p class="note" style="margin-top:14px">Program execution starts at address 10. R[0] is always 0. Words are 16 bits; negative numbers use two's complement.</p>`;

window.COS={
  updated:'October 25, 2026',
  weeks,dues,modules,reference,
  examIntro:'Each practice set draws 10 questions at random from the modules the exam covers. Check the course website for the official coverage, format and rules.',
  exams:[
    {name:'Midterm',when:'Wed, Oct 14',weeks:[0,1,2,3,4],topics:['Data types, conditionals and loops','Arrays and input/output','Functions and libraries','Recursion','Performance and order of growth']},
    {name:'Final exam',when:'Sun, Dec 20 · 4:00–7:00 pm',weeks:[0,1,2,3,4,6,7,8,9,9.5,10,11],topics:['Everything on the midterm','Using, creating and designing data types','Sorting, searching, stacks and queues','Theory of computing','Machine learning and networks','TOY and circuits']}
  ]
};
})();
