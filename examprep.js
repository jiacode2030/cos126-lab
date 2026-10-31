/* Exam prep notes, added on top of content.js.
   - notes: an "Exam notes" section inside the matching module (rendered after Common mistakes).
   - quiz: extra questions appended to that module's quiz. trap: true also puts them in the "Exam traps" practice set.
   - keywords: extra search terms for the module.
   - COS.examSections: the vocabulary, handwritten-code, past-exam and checklist sections on the Exam review page.
   HTML strings must escape < > & in prose and in <pre data-java> blocks. */
(function(){
const COS=window.COS,M=id=>COS.modules.find(m=>m.id===id);
const trap=t=>`<p class="trap"><b>Trap:</b> ${t}</p>`;
const add=(id,o)=>{const m=M(id);if(o.notes)m.notes=o.notes;if(o.keywords)m.keywords=(m.keywords||[]).concat(o.keywords);if(o.quiz)m.quiz=m.quiz.concat(o.quiz.map(q=>Object.assign({trap:true},q)));};

/* ---------- 1. Expressions, types, casting ---------- */
add('types',{keywords:['precedence','NaN','Infinity','NumberFormatException','promotion','compound assignment','jshell','Math.round','Math.random'],
notes:`<h3>Rules</h3><ul>
<li><code>int / int</code> truncates toward 0: <code>2/3</code> is 0, <code>10/3</code> is 3, <code>-7/2</code> is −3. Any double operand makes the result a double.</li>
<li>A cast applies only to what comes right after it: <code>(double) 3 / 2</code> is 1.5, but <code>(double) (3 / 2)</code> is 1.0. <code>(int)</code> truncates (<code>(int) 3.99</code> is 3, <code>(int) -3.9</code> is −3). Use <code>Math.round</code> to round.</li>
<li><code>%</code> takes the sign of the left operand: <code>7 % 3</code> is 1, <code>-7 % 3</code> is −1.</li>
<li><code>+</code> goes left to right and becomes concatenation as soon as one side is a String: <code>"1" + 2 + 3</code> is <code>"123"</code>, <code>1 + 2 + "3"</code> is <code>"33"</code>, and <code>"COS" + 4 * 3 + 6</code> is <code>"COS126"</code> (the * happens first).</li>
<li>Precedence, tightest first: <code>!</code>, then <code>* / %</code>, then <code>+ -</code>, then <code>&lt; &lt;= &gt; &gt;=</code>, then <code>== !=</code>, then <code>&amp;&amp;</code>, then <code>||</code>. <code>&amp;&amp;</code> and <code>||</code> short-circuit.</li>
<li>Don't use <code>float</code> in this course. Don't test doubles with == or !=: <code>0.1 + 0.2 == 0.3</code> is false, and <code>Math.sqrt(2.0) * Math.sqrt(2.0)</code> is <code>2.0000000000000004</code>.</li></ul>
<h3>Special values</h3>
<div class="tw"><table class="tbl"><thead><tr><th>Expression</th><th>Result</th></tr></thead><tbody>
<tr><td><code>1 / 0</code> (int)</td><td>run-time ArithmeticException</td></tr>
<tr><td><code>1.0 / 0.0</code></td><td><code>Infinity</code></td></tr>
<tr><td><code>-1.0 / 0.0</code></td><td><code>-Infinity</code></td></tr>
<tr><td><code>0.0 / 0.0</code>, <code>Math.sqrt(-10.0)</code></td><td><code>NaN</code> (and <code>NaN != NaN</code> is true)</td></tr>
<tr><td><code>6.02E23</code></td><td>the double 6.02 × 10²³</td></tr>
<tr><td><code>Math.sqrt(25) / 2</code></td><td><code>2.5</code> (Math.sqrt and Math.pow return doubles)</td></tr>
<tr><td><code>Math.min(1.2, Math.max(2, 8))</code></td><td><code>1.2</code> (a double)</td></tr>
<tr><td><code>(int) (12 * 0.2)</code></td><td><code>2</code> (12 * 0.2 is 2.4000000000000004)</td></tr>
<tr><td><code>Math.round(x)</code> for a double x</td><td>returns a <code>long</code>: cast with <code>(int)</code> to store it in an int</td></tr></tbody></table></div>
<h3>Three ways to convert types</h3><ol>
<li><b>Promotion</b> (automatic, widening only): <code>1.0 * 5</code> is <code>5.0</code>. Anything <code>+</code> a String becomes a String.</li>
<li><b>Casting</b>: <code>(int) 3.14</code>, <code>(double) 3</code>. Narrowing without a cast (<code>int x = 3.14;</code>) is a compile error.</li>
<li><b>Library methods</b>: <code>Integer.parseInt("42")</code>, <code>Double.parseDouble("3.14")</code>. A bad string throws NumberFormatException at run time: <code>parseInt("1.2")</code>, <code>parseInt("abc")</code>, even <code>parseInt(" 5")</code>. <code>parseInt(5 + "2")</code> is 52.</li></ol>
<h3>Other facts</h3><ul>
<li><code>int</code> is 32 bits: −2,147,483,648 to 2,147,483,647. Overflow wraps silently (<code>Integer.MAX_VALUE + 1</code> is <code>Integer.MIN_VALUE</code>), with no exception. <code>long</code> and <code>double</code> are 64 bits.</li>
<li><code>'a' + 1</code> is the int 98, and <code>(char) ('a' + 1)</code> is <code>'b'</code>. <code>'a'</code> is a char; <code>"a"</code> is a String.</li>
<li>For an int x, <code>x += 2.5</code> compiles (compound assignment casts for you), but <code>x = x + 2.5</code> does not.</li>
<li><code>jshell-introcs</code> is an interactive Java prompt for checking expressions. Ctrl-D exits.</li></ul>
${trap('evaluate left to right and write down the type at each step. A mixed expression (int division, then a cast, then a String) is the usual exam trick.')}`,
quiz:[
 {q:'What is the value of <code>(double) (7 / 2) + 1</code>?',a:['4.5','4.0','3.5','4'],c:1,why:'7 / 2 is integer division (3) before the cast. 3 becomes 3.0, and 3.0 + 1 is 4.0.'},
 {q:'What is <code>5 / 2 * 2.0</code>?',a:['5.0','4.0','2.0','4'],c:1,why:'5 / 2 is 2 (integer division) before the multiplication, so 2 * 2.0 = 4.0.'},
 {q:'What is <code>-7 % 3</code>?',a:['1','−1','2','−2'],c:1,why:'% takes the sign of the left operand: −7 % 3 = −1.'},
 {q:'Which expression gives Infinity without an exception?',a:['1 / 0','1.0 / 0.0','Integer.parseInt("inf")','0 / 0'],c:1,why:'Floating-point division by zero gives Infinity. Integer division by zero throws an ArithmeticException.'},
 {q:'<code>int x = 5; x += 2.5;</code> What happens?',a:['Compile error','x becomes 7','x becomes 7.5','Run-time exception'],c:1,why:'Compound assignment includes an implicit cast, so it compiles and x becomes 7. x = x + 2.5 would not compile.'}]});

/* ---------- 2a. Conditionals, Math.random ---------- */
add('conditionals',{keywords:['Math.random','random','else if order','dangling else'],
notes:`<h3>Math.random()</h3><ul>
<li>Returns a double in [0.0, 1.0): it can be 0.0 but never 1.0.</li>
<li><code>(int) (6 * Math.random() + 1)</code> is 1 to 6. <code>(int) (n * Math.random())</code> is 0 to n − 1. <code>Math.random() &lt; p</code> is true with probability p.</li>
<li>Cast placement: <code>(int) Math.random() * 6</code> is always 0. Write <code>(int) (Math.random() * 6)</code>.</li>
<li>If an if / else-if chain tests one random number, store it first: <code>double r = Math.random();</code>. Calling Math.random() in each condition draws a new number every time.</li></ul>
<h3>Conditionals</h3><ul>
<li>In an else-if chain only the first true branch runs. Separate ifs can each run.</li>
<li>Order matters: in <code>if (a &gt;= 0) … else if (a &gt;= 5)</code> the second branch can never run. Put narrower conditions first.</li>
<li><code>if (x = 5)</code> with an int is a compile error. A <code>;</code> right after the condition (<code>if (x &gt; 5);</code>) makes the body empty. Without braces only one statement belongs to the if, and an else attaches to the nearest if.</li></ul>
${trap('when an if / else-if chain tests a random value, check that it draws once and stores the result.')}`,
quiz:[
 {q:'What does <code>(int) Math.random() * 6</code> evaluate to?',a:['0 to 5','1 to 6','Always 0','Compile error'],c:2,why:'The cast applies to Math.random() first, which truncates to 0, and 0 * 6 = 0. Write (int) (Math.random() * 6).'}]});

/* ---------- 2b. Loops, patterns, StdPicture ---------- */
add('loops',{keywords:['stray semicolon','infinite loop','closest value','pattern','StdPicture','duotone','count','sum','max'],
notes:`<h3>Loops</h3><ul>
<li>Use <code>for</code> when you know the count and <code>while</code> when you don't. A while body may run zero times; a for condition is always checked at least once.</li>
<li><code>i &lt; n</code> runs n times; <code>i &lt;= n</code> runs n + 1.</li>
<li>Stray semicolon: <code>for (int i = 0; i &lt; 3; i++); c++;</code> leaves c at 1.</li>
<li>Infinite-loop check: does the loop variable change on <b>every</b> path? A loop that does i++ when i is even and nothing when it's odd never ends.</li>
<li>A variable declared inside a loop or block disappears at its closing brace.</li>
<li>Triangle loops (j from 0 to i) run 1 + 2 + … + n times, so n = 4 gives 10. The halving loop <code>while (i &gt; 1) i = i / 2;</code> starting from 20 runs 4 times (20, 10, 5, 2).</li></ul>
<h3>Patterns</h3><ul>
<li><b>Count:</b> <code>if (cond) count++;</code> <b>Sum:</b> <code>total += x;</code> <b>Flag:</b> <code>boolean found = false;</code> and set it to true when you find it.</li>
<li><b>Max or min:</b> start from the first value (or from infinity) and update when you see something better.</li>
<li><b>Closest value:</b> start from the first value, test <code>delta &lt; bestDelta</code>, and update bestDelta only <b>after</b> the test passes.</li></ul>
<h3>StdPicture</h3><ul>
<li>Static calls: <code>read(fileName)</code>, <code>width()</code>, <code>height()</code>, <code>getRed(col, row)</code>, <code>getGreen</code>, <code>getBlue</code>, <code>setRGB(col, row, r, g, b)</code>, <code>show()</code>.</li>
<li>Column first, then row. The origin is the top left. Loop <code>col &lt; width()</code> and <code>row &lt; height()</code>.</li>
<li>Color values are ints from 0 to 255, so round with <code>(int) Math.round(…)</code>. Brightness for blending between two colors: <code>(0.299 * r + 0.587 * g + 0.114 * b) / 255.0</code>.</li></ul>
<pre data-java>// negative image (practice, not from an assignment)
StdPicture.read(args[0]);
for (int col = 0; col &lt; StdPicture.width(); col++) {
    for (int row = 0; row &lt; StdPicture.height(); row++) {
        int r = StdPicture.getRed(col, row);
        int g = StdPicture.getGreen(col, row);
        int b = StdPicture.getBlue(col, row);
        StdPicture.setRGB(col, row, 255 - r, 255 - g, 255 - b);
    }
}
StdPicture.show();</pre>
${trap('trace loops with a small table. Check the first and last values of the loop variable, and that it changes on every path.')}`,
quiz:[
 {q:'What is c after this runs?',code:`int c = 0;
for (int i = 0; i < 3; i++);
c++;`,a:['0','1','3','4'],c:1,why:'The semicolon after the for header is an empty loop body, so c++ runs once, after the loop.'},
 {q:'In a "closest value" loop, which version is correct?',a:['bestDelta = Math.min(delta, bestDelta); if (delta < bestDelta) result = x;','if (delta < bestDelta) { result = x; bestDelta = delta; }','if (delta > bestDelta) result = x;','result = x; bestDelta = delta;'],c:1,why:'Compare first, then update both. If you update bestDelta before comparing, the comparison can never be true.'}]});

/* ---------- 3. Arrays, aliasing, parameters, 2D ---------- */
add('arrays',{keywords:['aliasing','alias','pass by value','2D array','ragged','transpose','copy','reverse','mutate'],
notes:`<h3>Pass by value: inside vs. the name</h3>
<p><b>Changing what's inside an array affects the caller. Reassigning the parameter name doesn't.</b></p><ul>
<li><code>x = x + 5</code> on an int parameter: the caller's variable is unchanged. To change it, <code>return x;</code> and write <code>a = f(a);</code>.</li>
<li><code>f(a);</code> with the return value ignored: unchanged.</li>
<li><code>arr[0] = 42</code> on an array parameter: the caller's array changes.</li>
<li><code>arr = new int[3]; arr[0] = 42;</code>: the caller's array is unchanged, because arr now points somewhere else.</li>
<li><code>arr[0] = 42; arr = new int[3];</code>: the 42 sticks, because the write happened first.</li>
<li>Passing the same array as both arguments, like <code>f(a, a)</code>, makes the two parameters aliases. Trace the writes in order.</li></ul>
<h3>Aliasing</h3>
<p><code>int[] c = b;</code> makes an alias, not a copy, so <code>c[0] = 99</code> changes <code>b[0]</code>. A real copy is <code>new int[b.length]</code> plus a loop.</p>
<h3>Array facts</h3><ul>
<li>An array's length is <code>a.length</code> (a field, no parentheses). A String's is <code>s.length()</code>. The last index is length − 1.</li>
<li>Defaults are 0, 0.0, false and null. An array holds one type, and its length is fixed once created. Reassigning the variable to a new array of any length is fine.</li>
<li>Reverse in place: loop <code>i &lt; n/2</code> and swap a[i] with a[n−1−i]. Looping to n swaps every pair twice, so the array ends up unchanged. Using a[n−i] throws when i = 0.</li>
<li>A function that writes <code>a[i] = …</code> to its parameter changes the caller's array. One that makes <code>new double[…]</code>, fills it and returns it doesn't.</li></ul>
<h3>2D arrays</h3>
<pre data-java>int[][] a = new int[3][4];     // 3 rows, 4 columns, all 0
// a.length is 3 (rows), a[0].length is 4 (columns), a[row][col] is row first
for (int i = 0; i &lt; a.length; i++)
    for (int j = 0; j &lt; a[i].length; j++)
        a[i][j] = i + j;</pre>
<ul><li>The transpose of an R × C array is a new <code>int[C][R]</code>. Rows can have different lengths (ragged), and <code>new int[3][]</code> makes 3 null rows.</li>
<li><code>int[][] b = a;</code> is one array with two names, and <code>int[] r = a[0];</code> aliases the first row. A real copy needs nested loops.</li>
<li>These don't compile: <code>a + b</code>, <code>-a</code> or <code>a++</code> on arrays; <code>a[1.0]</code>; storing 2.5 in an int[]; <code>int k = d[0];</code> from a double[]; passing an int[] where a double[] is expected; <code>a.length()</code>; using an uninitialized local as an index.</li></ul>
${trap('ask "did the method change what\'s inside, or just repoint its own name?" before you answer any array-parameter question.')}`,
quiz:[
 {q:'What prints?',code:`public static void f(int[] arr) {
    arr[0] = 42;
    arr = new int[3];
    arr[0] = 99;
}
// in main:
int[] a = { 1, 2, 3 };
f(a);
System.out.println(a[0]);`,a:['1','42','99','0'],c:1,why:'arr[0] = 42 runs while arr still points at the caller\'s array, so it sticks. arr = new int[3] then repoints only the local name, so the 99 never reaches a.'},
 {q:'A method adds two arrays element by element, treating missing elements as 0. How long should the result be?',a:['a.length','b.length','a.length + b.length','The longer of the two lengths'],c:3,why:'The arrays overlap position by position, so the result needs the longer length. a.length + b.length would be for putting one array after the other.'},
 {q:'What does this loop do to the array?',code:`for (int i = 0; i < n; i++) {
    String temp = a[i];
    a[i] = a[n-i-1];
    a[n-i-1] = temp;
}`,a:['Reverses it','Leaves it unchanged','Throws ArrayIndexOutOfBounds','Shuffles it'],c:1,why:'Looping to n instead of n/2 swaps every pair twice, which restores the original order.'}]});

/* ---------- 4. Functions ---------- */
add('functions',{keywords:['overloading','return','void','private','side effect','true/false'],
notes:`<h3>Usually true</h3><ul>
<li>A function is a static method. A <code>void</code> function may contain zero, one or many <code>return;</code> statements.</li>
<li>A function can both return a value and have side effects.</li>
<li>A <code>private</code> method can be called from any method in the same class.</li>
<li>Overloading means the same name with different parameter types or a different number of parameters.</li>
<li>Recursion needs a base case. Passing an int to a double parameter is fine (it's promoted).</li></ul>
<h3>Usually false</h3><ul>
<li>"Multiple return statements can return multiple values." Each call runs one return and returns one value.</li>
<li>"A non-void function must have exactly one return." "Side effects require void." "Every if needs an else."</li>
<li>"The last element is a[a.length]." It's <code>a[a.length - 1]</code>.</li>
<li>"Every class's main is called." Only the class you run.</li>
<li>"A client can call a private method." Passing a double to an int parameter is a compile error. A block's local variable isn't visible outside the block.</li></ul>
<h3>Overloading (very testable)</h3><ul>
<li>Same name, different parameter lists: allowed.</li>
<li>Same name and same parameters with a different return type: compile error.</li>
<li>"Two functions with different return types must have different names": false, because different parameters allow the same name.</li>
<li>Two parameters of one function can't share a name.</li></ul>
${trap('for a call inside a call, like g(f(2)), work inside out and write the inner value down before going on.')}`,
quiz:[
 {q:'What is <code>g(f(2))</code>?',code:`public static int f(int n) { return n + g(n); }
public static int g(int n) { return n * 2; }`,a:['4','6','12','18'],c:2,why:'Inside out: f(2) = 2 + g(2) = 2 + 4 = 6, then g(6) = 12.'},
 {q:'True or false: a function with several return statements can return several values at once.',a:['True','False'],c:1,why:'Only one return runs per call, and it returns one value.'}]});

/* ---------- 5. Standard input, args, redirection, piping ---------- */
add('io',{keywords:['readInt','redirection','piping','pipe','args','command-line','readLine','<','>','|'],
notes:`<ul>
<li><code>&lt;</code> sends a file to standard input. <code>&gt;</code> sends standard output to a file (nothing shows in the terminal). <code>|</code> sends the left program's output to the right program's input. Trace left to right and write down each stage's output.</li>
<li>A program that reads StdIn with no <code>&lt;</code> or <code>|</code> waits for the keyboard. A file name given as an argument is not standard input: <code>java Count words.txt</code> just waits.</li>
<li>Command-line arguments are Strings in <code>args[]</code>. Extra arguments are ignored. <code>args[0]</code> with no arguments throws ArrayIndexOutOfBoundsException. <code>java Sum "120 6"</code> passes one argument, which is not standard input.</li>
<li>Every stage of a pipe needs <code>java</code>: <code>… | Sum</code> is an error.</li>
<li><code>readInt()</code> on a token that isn't an int (like "hi") throws; it doesn't return 0. Reading past the end also throws. A second <code>readInt()</code> inside the loop silently skips a token.</li>
<li>Max, sum and count over StdIn need no array. To shift positions by k in an array, use <code>a[(i + k) % len]</code>.</li>
<li>StdIn has no length limit and can be read at any time while the program runs, interleaved with StdOut calls. Only the public methods form an API.</li>
<li><code>StdIn.readLine()</code> right after reading a number returns the rest of that line, often just an empty string.</li></ul>
${trap('when reading a pipeline, write each stage\'s output before moving to the next stage, and check that every stage starts with java.')}`,
quiz:[
 {q:'Count reads standard input. Which command waits for the keyboard instead of reading words.txt?',a:['java Count < words.txt','java Count words.txt','java Count < words.txt | java Sum','java Repeat < words.txt > out.txt'],c:1,why:'Without < or |, words.txt is just a command-line argument, and Count never looks at args.'},
 {q:'Repeat prints each token twice, and data.txt contains 3 and 7. What does <code>java Repeat &lt; data.txt | Sum</code> do?',a:['Prints 110','Prints 10','Fails: Sum isn\'t run with java','Prints 0'],c:2,why:'Every stage of a pipe must start with java. The arithmetic is a decoy.'},
 {q:'Sum reads ints with readInt(). What does <code>java Sum &lt; words.txt</code> do if words.txt contains hi and bye?',a:['Prints 0','Loops forever','Throws a run-time exception','Prints 2'],c:2,why:'readInt() on the token hi can\'t parse an int, so it throws right away.'}]});

/* ---------- 6. Recursion ---------- */
add('recursion',{keywords:['StackOverflowError','memoization','T-tree','pre-order','recurrence','exponential recursion'],
notes:`<ul>
<li>Base case first, and the argument must shrink. A missing base case, a base case checked after the recursive call, or an argument that doesn't shrink all give StackOverflowError.</li>
<li>Tabulate small values first (f(0), f(1), f(2), …) and build up. Apply any operation like <code>% 5</code> at every level. <code>n/2</code> is integer division, so <code>n - n/2</code> is the larger half when n is odd.</li>
<li>Strings build up in call order. Their lengths follow a recurrence, for example L(n) = 2L(n−1) + L(n−2) + 2.</li></ul>
<h3>Growth by structure</h3>
<div class="tw"><table class="tbl"><thead><tr><th>Recursive structure</th><th>Growth</th></tr></thead><tbody>
<tr><td>one call on n − 1</td><td>n (linear)</td></tr>
<tr><td>one call on n / 2</td><td>log n</td></tr>
<tr><td>two calls on n − 1</td><td>2ⁿ (exponential)</td></tr>
<tr><td>f(n − 1) + f(n − 2)</td><td>exponential (about 1.6ⁿ)</td></tr>
<tr><td>two calls on n / 2</td><td>n</td></tr>
<tr><td>three calls on n − 1</td><td>3ⁿ (exponential)</td></tr></tbody></table></div>
<p style="margin-top:12px">When a recursion recomputes the same values (like Fibonacci, or Delannoy numbers with three calls each), brute force is exponential. <b>Memoization</b> saves each answer in a table and checks the table before computing, which makes it fast.</p>
<h3>Recursive graphics: drawing order</h3><ul>
<li>Draw, then recurse: the biggest shape comes first (pre-order). Recurse, then draw: the smallest shapes come first.</li>
<li><code>if (n == 0) return;</code> must come before the recursive calls. Otherwise you get StackOverflowError and nothing is ever drawn.</li>
<li>An H-tree of order n draws 1, 4, 16, 64, … H's per level (1, 5, 21, 85 in total). A T-tree of order n has 2ⁿ − 1 T's (31 for n = 5).</li>
<li>To read a picture paused partway through, work out which subtree holds the k-th shape drawn.</li></ul>
${trap('two recursive calls on n − 1 is exponential, not quadratic. Count the calls with a small tree.')}`,
quiz:[
 {q:'What is the order of growth?',code:`public static int f(int n) {
    if (n == 0) return 0;
    return 1 + f(n - 1) + f(n - 1);
}`,a:['Θ(n)','Θ(n²)','Θ(log n)','Θ(2ⁿ)'],c:3,why:'Two calls on n − 1 double the number of calls at every level, giving about 2ⁿ calls.'},
 {q:'A recursive method\'s base case, <code>if (n == 0) return;</code>, is written <b>after</b> its recursive call. What happens?',a:['It works normally','Compile-time error','StackOverflowError','It returns immediately'],c:2,why:'The recursive call runs before the base case is ever checked, so the calls never stop and the call stack fills up.'},
 {q:'<code>f(n)</code> returns <code>f(n/2) + ":" + n + ":" + f(n - n/2)</code>, with f(1) = "1" and f(0) = "0". What is f(3)?',a:['1:3:1','1:3:1:2:1','1:2:1:3:1','1:3:2'],c:1,why:'f(3) = f(1) + ":3:" + f(2), and f(2) = f(1) + ":2:" + f(1) = 1:2:1. So f(3) = 1:3:1:2:1.'}]});

/* ---------- 7. Order of growth ---------- */
add('performance',{keywords:['loop bounds','Theta','Θ','string concatenation','infinite loop','order of growth'],
notes:`<ul>
<li>Look at the <b>loop bounds</b>, not the body. A loop bounded by constants is Θ(1) even if n appears in the body: <code>for (int i = 0; i &lt; 1000; i++) count = count + n;</code></li>
<li>One loop to n: n. Two nested loops to n: n² (a triangle-shaped pair is still n²). Three nested loops: n³, even if the inner loops start at i (the work is about n³/6).</li>
<li>A variable that doubles or halves each pass gives log n. Inside an n-iteration loop, that's n log n.</li>
<li>A function call in a loop condition runs again on every iteration. Cost = iterations × (condition call + body call). Simplify the bound first: <code>i*i &lt; n*n</code> runs n times, not n².</li>
<li><code>for (i = n; i &gt;= 0; i++)</code> never ends: answer "infinite loop". (Real Java eventually overflows, but the exam wants infinite loop.) With <code>i--</code> it would be fine.</li>
<li><code>s += "x"</code> in a loop is quadratic, because each concatenation copies the whole string.</li>
<li>Doubling test: a ratio of about 2 is linear, 4 quadratic, 8 cubic. 5 s at n = 10,000 and 42 s at n = 20,000 is about ×8, so cubic.</li></ul>
<h3>Worked: a call in the loop condition</h3>
<p>Suppose f1(n) returns n² and takes n² steps. A loop <code>for (int i = 0; i &lt; f1(n); i++) f1(n);</code> runs n² times, and each time costs about 2n² (the condition and the body). Total: Θ(n⁴).</p>
${trap('read the loop bounds, not the body, and simplify the bound before counting.')}`,
quiz:[
 {q:'What is the order of growth?',code:`for (int i = 0; i < 1000; i++)
    count = count + n;`,a:['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],c:0,why:'The loop always runs exactly 1000 times, whatever n is. Look at the bound, not the body.'},
 {q:'What is the order of growth?',code:`for (int i = 0; i * i < n * n; i++)
    count++;`,a:['Θ(log n)','Θ(n)','Θ(n²)','Θ(n⁴)'],c:1,why:'i * i < n * n is the same as i < n, so the loop runs n times.'},
 {q:'What is the order of growth (as the exam intends)?',code:`for (int i = n; i >= 0; i++)
    count++;`,a:['Θ(n)','Θ(1)','Infinite loop','Θ(log n)'],c:2,why:'i goes up, so i >= 0 never fails. (Real Java eventually overflows, but the exam\'s answer is infinite loop.)'}]});

/* ---------- 8. Compile-time vs run-time ---------- */
add('hello',{keywords:['compile-time error','run-time exception','NumberFormatException','ArithmeticException','NullPointerException','StackOverflowError','OutOfMemoryError'],
notes:`<h3>Compile-time error or run-time exception?</h3>
<div class="tw"><table class="tbl"><thead><tr><th>Compile-time error (never runs)</th><th>Run-time exception (compiles, then crashes)</th></tr></thead><tbody>
<tr><td>Type mismatch: <code>int x = 2.5;</code>, an int passed as a String, a double passed as an int</td><td><code>a[-1]</code>, <code>a[a.length]</code>, <code>args[0]</code> with no arguments (ArrayIndexOutOfBounds)</td></tr>
<tr><td>An operator on the wrong types: <code>true &lt;= 3</code>, <code>a + b</code> on arrays, <code>1 &lt; 2 &lt; 3</code></td><td><code>Integer.parseInt("1.2")</code> (NumberFormat)</td></tr>
<tr><td>An uninitialized local, a missing return, an out-of-scope or duplicate variable</td><td><code>x / 0</code> or <code>x % 0</code> with ints (Arithmetic)</td></tr>
<tr><td><code>a.length()</code> on an array, wrong argument types or count</td><td><code>readInt()</code> on a non-int, or past the end of input</td></tr>
<tr><td><code>Math.max(true, false)</code>, reassigning a final, unreachable code after return</td><td>Infinite recursion (StackOverflowError), <code>new int[-1]</code>, calling a method on null (NullPointer), <code>charAt(10)</code> on a short String</td></tr>
<tr><td>Two methods differing only in return type, two parameters with the same name, calling a private method from another class</td><td>A huge allocation (OutOfMemoryError)</td></tr></tbody></table></div>
<p style="margin-top:12px"><b>Looks like an error but isn't:</b> double division by zero gives Infinity; <code>0.0 / 0</code> and <code>Math.sqrt(-1)</code> give NaN; int overflow wraps silently; ignoring a return value compiles fine; an infinite loop just hangs (it's neither kind of error).</p>
${trap('bad parse, bad index and integer division by zero are run-time. A type mismatch is compile-time. An infinite loop is neither.')}`,
quiz:[
 {q:'Which of these is a <b>run-time</b> exception (it compiles, then crashes)?',a:['int x = 2.5;','Integer.parseInt("1.2")','Math.max(true, false)','int n = a.length();  // a is an int[]'],c:1,why:'parseInt("1.2") compiles but throws NumberFormatException when it runs. The others don\'t compile.'},
 {q:'Which is neither a compile-time error nor a run-time exception?',a:['a[a.length]','An infinite loop','An int divided by 0','int k = d[0];  // d is a double[]'],c:1,why:'An infinite loop just hangs. a[a.length] and integer division by zero throw at run time, and the double-to-int assignment doesn\'t compile.'}]});

/* ---------- 9. Strings, Color, Picture ---------- */
add('using-types',{keywords:['immutable','equals','==','substring','charAt','indexOf','mutable','Picture','Color','reference type','primitive'],
notes:`<ul>
<li><b>Primitives</b> (int, boolean, char, double, long) hold the value itself. <b>Reference types</b> (arrays, String, Picture, Color) hold a reference to an object, so <code>Picture b = a;</code> makes an alias. Create objects with <code>new</code>. A method call on null compiles but throws NullPointerException.</li>
<li><b>Strings are immutable.</b> <code>s.toUpperCase();</code> alone does nothing; write <code>s = s.toUpperCase();</code>.</li>
<li><code>==</code> compares references; <code>.equals</code> compares contents. <code>new String("hi") == new String("hi")</code> is false, while <code>.equals</code> gives true.</li>
<li><code>length()</code> has parentheses. <code>charAt(i)</code> returns a char, and <code>charAt(length())</code> throws. <code>substring(i, j)</code> includes i and excludes j: <code>"hello".substring(1, 3)</code> is <code>"el"</code>. <code>indexOf(x)</code> returns −1 if x is absent. Also know <code>compareTo</code>, <code>startsWith</code> and <code>toLowerCase</code>.</li>
<li><code>'a' + 1</code> is the int 98, but <code>"a" + 1</code> is <code>"a1"</code>.</li>
<li><b>Color:</b> <code>new Color(r, g, b)</code> with ints from 0 to 255 (<code>import java.awt.Color;</code>), and <code>getRed()</code>, <code>getGreen()</code>, <code>getBlue()</code>. A Color is immutable: <code>brighter()</code> returns a new one. Out-of-range values throw.</li>
<li><b>Picture:</b> <code>get(col, row)</code> returns a Color, and <code>set(col, row, color)</code> changes a pixel. Column (x) comes first, the origin is the top left, and rows increase downward. A Picture is <b>mutable</b>, so a method that calls set on a Picture argument changes the caller's picture. A String argument can't be changed that way.</li></ul>
${trap('immutable (String, Color) means a method can never change the caller\'s object. Mutable (Picture, arrays) means it can.')}`,
quiz:[
 {q:'What is <code>"hello".substring(1, 3)</code>?',a:['"hel"','"el"','"ell"','"ello"'],c:1,why:'substring(i, j) includes index i and excludes j: indices 1 and 2, which are "el".'}]});

/* ---------- 10. Defining your own data types ---------- */
add('creating-types',{keywords:['shadowing','this','private','API','test client','instance variable','ADT'],
notes:`<p>A data type is a set of values together with operations on those values. Implementing one means writing four things: instance variables (the values), constructors (create and initialize), instance methods (the operations), and a test client (a <code>main()</code> that tests every constructor and method).</p>
<pre data-java>public class Counter {
    private int count;                    // 1. instance variables
    private String name;

    public Counter(String name) {         // 2. constructor
        this.name = name;
        count = 0;
    }

    public void increment() {             // 3. instance methods
        count++;
    }

    public int tally() {
        return count;
    }

    public String toString() {
        return name + ": " + count;
    }

    public static void main(String[] args) {   // 4. test client
        Counter c = new Counter("clicks");
        c.increment();
        c.increment();
        StdOut.println(c.tally());   // 2
        StdOut.println(c);           // clicks: 2
    }
}</pre>
<ul>
<li>The public constructors and methods form the class's API. Private instance variables and helper methods are hidden from clients: <code>c.count</code> from another class is a compile error.</li>
<li>A constructor has the class's name and <b>no return type</b>. <code>public void Counter(…)</code> is just a method.</li>
<li><b>Shadowing:</b> <code>name = name;</code> assigns the parameter to itself, and the field stays null. Write <code>this.name = name;</code>.</li>
<li>A static method has no object, so using an instance variable in one is a compile error.</li>
<li>Objects are references: <code>Counter b = a;</code> is an alias. <code>Counter c = null; c.increment();</code> throws NullPointerException.</li>
<li>Uninitialized instance variables default to 0, 0.0, false and null. <code>println(c)</code> and <code>"x" + c</code> call toString().</li></ul>
${trap('when a parameter has the same name as an instance variable, only this.name refers to the instance variable.')}`,
quiz:[
 {q:'After <code>public Counter(String name) { name = name; }</code> runs, what is the instance variable name?',a:['The passed-in string','null','The empty string','Compile error'],c:1,why:'name = name assigns the parameter to itself (shadowing), so the instance variable keeps its default, null. Write this.name = name.'},
 {q:'A client class writes <code>c.count = 5;</code>, where count is a private instance variable of Counter. What happens?',a:['It works fine','Compile-time error','Run-time exception','count is set to 0'],c:1,why:'Private members aren\'t accessible outside their class, and the compiler rejects the access.'}]});

/* ---------- Exam review page sections ---------- */
COS.examSections=[
{id:'x-checklist',title:'Exam-day checklist',html:`<ul>
<li>Read the whole question first: is it "select all", "best answer" or true/false?</li>
<li>Trace with a small table, not in your head. Mental shortcuts cause the most slips: two readInt() calls in one loop, treating i*i &lt; n² as n² iterations, or answering f(2) when the question asked for g(f(2)).</li>
<li><b>Seven traps:</b><ol>
<li>int / int truncates, and a cast only affects what it touches.</li>
<li>Changing what's inside an array affects the caller; reassigning the name doesn't; primitives need return plus <code>a = f(a)</code>.</li>
<li>Bad parse, bad index and integer division by zero are run-time; a type mismatch is compile-time; an infinite loop is neither.</li>
<li>Every pipe stage needs java, and a file name argument isn't standard input.</li>
<li>Does the loop variable change on every path?</li>
<li>Base case first; two calls on n − 1 is exponential.</li>
<li>Read loop bounds, not the body.</li></ol></li>
<li>Handwritten method: write the signature, the <code>new</code> array of the right length, and the <code>return</code> first. Then fill in the loop, check &lt; vs. &lt;=, and put the base case first in recursion.</li>
<li>Fill bubbles completely and erase fully to change an answer. Multi-select questions can lose points for wrong picks. Skip and come back if stuck. Vocabulary questions are quick points.</li></ul>`},
{id:'x-handwritten',title:'Writing code by hand',html:`<p>The handwritten part of an exam is usually a short method of about 6–7 lines, with the API provided. Practice by covering the code, writing each method from its comment alone, then comparing. Check: the right return type and parameters; a new array created and returned (not the input changed); the right array length; &lt; vs. &lt;=; the base case first in recursion; <code>a.length</code> without parentheses; semicolons.</p>
<p>Most array methods have the same shape: allocate <code>new double[…]</code> of the right length, loop and fill it, then <code>return temp;</code>. Try these, which follow that shape but are not assignment problems:</p>
<ol>
<li><code>public static int[] absAll(int[] a)</code>: a new array with the absolute value of each element.</li>
<li><code>public static double[] runningSum(double[] a)</code>: element i is a[0] + … + a[i].</li>
<li><code>public static int[] everyOther(int[] a)</code>: the elements at indices 0, 2, 4, …</li>
<li><code>public static int countAbove(double[] a, double t)</code>: how many elements are greater than t.</li>
<li><code>public static int[] twice(int[] a)</code>: a repeated twice, so {1, 2} becomes {1, 2, 1, 2}.</li>
<li><code>public static int sumDigits(int n)</code>, recursively: the sum of n's digits (9045 gives 18).</li></ol>
<details><summary>Show solutions</summary>
<pre data-java>public static int[] absAll(int[] a) {
    int[] temp = new int[a.length];
    for (int i = 0; i &lt; temp.length; i++)
        temp[i] = Math.abs(a[i]);
    return temp;
}

public static double[] runningSum(double[] a) {
    double[] temp = new double[a.length];
    double sum = 0.0;
    for (int i = 0; i &lt; a.length; i++) {
        sum += a[i];
        temp[i] = sum;
    }
    return temp;
}

public static int[] everyOther(int[] a) {
    int[] temp = new int[(a.length + 1) / 2];   // rounds up for odd lengths
    for (int i = 0; i &lt; temp.length; i++)
        temp[i] = a[2 * i];
    return temp;
}

public static int countAbove(double[] a, double t) {
    int count = 0;
    for (int i = 0; i &lt; a.length; i++)
        if (a[i] &gt; t) count++;
    return count;
}

public static int[] twice(int[] a) {
    int[] temp = new int[2 * a.length];
    for (int i = 0; i &lt; temp.length; i++)
        temp[i] = a[i % a.length];
    return temp;
}

public static int sumDigits(int n) {
    if (n &lt; 10) return n;                 // base case first
    return n % 10 + sumDigits(n / 10);
}</pre></details>
<p style="margin-top:12px">Recursive graphics methods have their own shape: <code>if (n == 0) return;</code>, compute the new points, draw, then make the recursive calls with a smaller n and size.</p>`},
{id:'x-vocab',title:'Vocabulary',html:`<dl class="vocab">
<dt>Literal</dt><dd>Source code for a fixed value: <code>3.14</code>, <code>"tiger"</code>, <code>'a'</code>, <code>false</code>.</dd>
<dt>Expression</dt><dd>Variables, literals, operators and function calls that evaluate to a value.</dd>
<dt>Variable</dt><dd>A named storage location for a value of one data type. A <b>constant variable</b> can't change (<code>final</code>).</dd>
<dt>Data type</dt><dd>A set of values plus the operations on them.</dd>
<dt>Casting</dt><dd>Converting a value from one type to another.</dd>
<dt>Side effect</dt><dd>An observable action other than computing and returning a value, like printing.</dd>
<dt>Scope</dt><dd>Where in the code a variable can be used.</dd>
<dt>Parameter variable</dt><dd>A variable listed in a method's header. A <b>local variable</b> is declared inside a method.</dd>
<dt>Code block</dt><dd>Statements inside curly braces, treated as one unit.</dd>
<dt>Compilation</dt><dd>Translating Java source into code the machine can run (Java bytecode).</dd>
<dt>Recursion</dt><dd>A function that calls itself.</dd>
<dt>Pass by value</dt><dd>A function gets copies of the argument values.</dd>
<dt>Overloading</dt><dd>The same name with a different ordered list of parameter types.</dd>
<dt>Encapsulation</dt><dd>Hiding the implementation behind an API.</dd>
<dt>API</dt><dd>The method headers and behavior of a library or data type.</dd>
<dt>Library</dt><dd>Related functions in one file, for other programs to use. A <b>client</b> is a program that uses it.</dd>
<dt>Classpath</dt><dd>Where Java looks for user-defined libraries and classes.</dd>
<dt>Command-line arguments</dt><dd>Data given when you launch the program (<code>args[]</code>).</dd>
<dt>Standard input</dt><dd>Data the program receives while it runs.</dd>
<dt>Redirection</dt><dd><code>&lt;</code> and <code>&gt;</code>: use a file instead of the keyboard or screen.</dd>
<dt>Piping</dt><dd><code>|</code>: one program's output becomes another's input.</dd>
<dt>Compile-time error</dt><dd>The program isn't valid Java, so it never runs.</dd>
<dt>Run-time exception</dt><dd>An error while the program is running.</dd></dl>
<p style="margin-top:12px"><b>Easy to mix up:</b> standard input arrives while the program runs, command-line arguments before it starts. A compile-time error means an invalid program; a run-time exception means a crash while running.</p>
<p><b>Data facts:</b> audio is 44,100 samples per second, each a double in [−1.0, +1.0]. Any value can be stored as 0s and 1s. A 2D array can hold a matrix, and a 3D array a video (frames of pixels). A byte is 8 bits, an int 32 bits and a double 64 bits.</p>`},
{id:'x-past',title:'Past exam answers',html:`<p>Short answers to past COS 126 exam questions, for checking your work against the exams posted on the course website. <span class="tag">official key</span> means the answer came from a posted solution. <span class="tag">derived</span> means it was worked out by Claude and is <b>not</b> an official key, so double-check those.</p>
<h3>Fall '24</h3><ul>
<li><b>Q4</b> <span class="tag">derived</span> (a) The loop continues while a == b, so at the end the values are different. (b) The inner loop starts at j = 99 and stops when j == i, so j &gt; i always: it prints <code>0-99</code> and <code>10-20</code>, not <code>0-0</code>, <code>12-6</code>, <code>50-50</code> or <code>99-1</code>. (c) Possible returns: A, B, C, E, F (not D, G, H). D needs |a| == 5 after a is already in [0, 4]; G is unreachable because a &lt; 0 already returned A, so a &gt;= -1 is then always true.</li>
<li><b>Q9</b> (H-tree) <span class="tag">derived</span> <code>1 2 3 4 5 6</code> → D; <code>1 2 4 6 3 5</code> → C; <code>2 1 3 4 5 6</code> → B; <code>1 3 4 5 6 2</code> → E; <code>3 4 1 2 5 6</code> → F (the base case after the recursion gives StackOverflowError).</li>
<li><b>Q10</b> <span class="tag">derived</span> f1 Θ(n²) (F), f2 Θ(n log n) (E), f3 Θ(log n) (B), f4 Θ(n⁴) (H).</li></ul>
<h3>Spring '25</h3><ul>
<li><b>Q3</b> <span class="tag">official key</span> T F T T F F T T T T F F T F T T. In order: StdIn has no length limit (T); StdIn can't be used with args (F); input is accepted at any time (T); interleaving with output (T); public and private methods form the API (F); max needs an array (F); any type can be stored as 0s and 1s (T); data type = values + operations (T); types are known at compile time (T); casting (T); all types use the same memory (F); arrays can hold different types (F); arrays help with large data (T); arrays avoid for loops (F); 2D = matrix (T); 3D = video (T).</li>
<li><b>Q5</b> <span class="tag">official key</span> Every class's main is called (F); recursion (T); multiple returns return multiple values (F); primitives are passed by value (T); overloading by return type alone (F); overloading with same-named parameters (F); void may have 0, 1 or many returns (T); recursion needs a base case (T); double to int parameter is a compile error (T); return with side effects (T); a client calls a private method (F); "feeling good" accepted either way; <code>mix(a, a)</code> equals <code>amplify(a, 2.0)</code> (T); <code>changeSpeed</code> can return the same length (T).</li>
<li><b>Q6</b> <span class="tag">official key</span> Running sum E; random swap D (shuffle); swap-and-restart C (sort ascending); swap on odd i with no change to i F (infinite loop: i goes from 0 to 1 and then sticks).</li>
<li><b>Q7</b> <span class="tag">official key</span> Halving loop B (log n); three nested loops from i G (cubic); <code>for (i = n; i &gt;= 0; i++)</code> J (infinite loop); constant-bound loops A (constant).</li>
<li><b>Q8</b> (T-tree) <span class="tag">official key</span> <code>1 2 3 4 5 6 7</code> → D; <code>1 2 3 4 5 7 6</code> → B; <code>1 2 3 5 4 6 7</code> → D; <code>1 2 3 6 7 4 5</code> → E; <code>2 3 6 7 1 4 5</code> → F.</li></ul>
<h3>Fall '25</h3><ul>
<li><b>Q5</b> (piping) <span class="tag">official key</span> <code>Repeat &lt; words.txt &gt; out.txt</code> T; <code>Repeat words.txt | Count</code> F; <code>Sum &lt; data.txt</code> prints 10 T; <code>Sum "120 6"</code> F; <code>Repeat &lt; words.txt | Count</code> prints 2 T; <code>Sum &lt; words.txt</code> prints 0 F (it throws instead); <code>Repeat &lt; data.txt | Sum</code> F (missing java); <code>Count &lt; words.txt | Sum | Repeat</code> prints 22 T (the stages print 2, then 2, then 22).</li>
<li><b>Q6</b> <span class="tag">official key</span> (a) 1 (reassigning arr doesn't affect a); (b) 10; (c) <code>g(f(2))</code>: f(2) = 2 + g(2) = 6, then g(6) = 12.</li>
<li><b>Q8</b> (recursion) <span class="tag">derived</span> f(2) = <code>1:2:1</code>, f(3) = <code>1:3:1:2:1</code>, f(4) = <code>1:2:1:4:1:2:1</code>. Exactly n tokens equal "1" for n ≥ 1: true. Colons in f(126): a string with n leaves has 2n − 1 tokens, so 250 colons: true. "3" appears in f(65): true (65 → 32, 33 → 16, 17 → … → 5 → 2, 3). f(5) is called exactly 2 times in f(21): false (21 → 10, 11; 10 → 5, 5; 11 → 5, 6: that's 3 calls).</li></ul>
<h3>Spring '26</h3><ul>
<li><b>Q6</b> <span class="tag">official key</span> Closest-value fragment 1 is correct. Fragment 2 is incorrect: it compares the new x's distance against result − x instead of result − target (with target 3.0 and input 10.0 2.5 −2.0 8.0 it ends at 8.0 instead of 2.5). Fragment 3 is incorrect: <code>bestDelta = Math.min(delta, bestDelta)</code> runs before <code>if (delta &lt; bestDelta)</code>, which then can never be true, so result stays 0.0.</li>
<li><b>Q9</b> (recursion) <span class="tag">derived</span> With f(1) = "B" and f(2) = "BCACB", f(3) = "BCACB" + "C" + "B" + "C" + "BCACB", which is not BCACBCACBCACB (so that statement is false). Length L(n) = 2L(n−1) + L(n−2) + 2, so L(5) = 81 ≥ 67: true. Removing line 1 makes f(10) recurse forever (StackOverflowError): true. Swapping lines 3 and 4 changes the string: false. Every result is a palindrome: true.</li>
<li><b>Q10</b> <span class="tag">official key</span> f2 E (n log n), f3 D (n), f4 H (n³).</li></ul>`}
];

COS.exams.push({name:'Exam traps',when:'Mixed topics',trap:true,topics:['Questions built around the traps students fall for most','Parameters, aliasing, casting, piping, loop bounds, recursion','Drawn from the Exam notes in each module']});
COS.pageSearch=[
  {href:'#exams',title:'Exam review',keywords:['exam','midterm','final','practice','vocabulary','glossary','checklist','past exam','handwritten','literal','scope','classpath','encapsulation','traps']},
  {href:'#reference',title:'Java reference',keywords:['reference','cheat sheet','API','StdIn','StdOut','StdDraw','StdRandom','TOY instruction','printf','Stack','Queue','ST']}
];
COS.updated='October 31, 2026';
})();
