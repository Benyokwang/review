# 八股文 文字狱

## HTTP、HTTPS、TCP

### HTTP

​	Hyper Text Transfer Protocol 超文本传输协议 ，是一个客户端和服务器端请求和应答的标准（TCP）。属于网络链路中的应用层

### TCP

​	传输控制协议 - 属于网络链路中的运输层

### HTTPS

​	在HTTP的基础下加入SSL层进行加密，建立一个安全的信息通道，保证网站的真实性

### HTTP、HTTPS区别

http:

1. 信息为明文传输
2. 连接简单，为无状态连接

https:

1. 具有SSL加密协议，数据信息传输更安全
2. 需要认证（ca证书）

![image-20220518222525882](C:\Users\benyo\AppData\Roaming\Typora\typora-user-images\image-20220518222525882.png)

### TCP三次握手

1. 客户端 -> 服务器端，客户端向服务器端发送连接请求，建立连接
2. 服务器端 -> 客户端，服务器端接收请求，返回客户端确认请求
3. 客户端 -> 服务器端，接收请求确认，向服务器端发送确认包

三次握手完成后，客户端和服务器端进入TCP连接成功状态。三次握手过程中不包含数据的传输

### TCP四次挥手

1. 客户端 -> 服务器端，客户端向服务器端发送连接释放报文，确认停止发送数据
2. 服务器端 -> 客户端，服务器端向客户端发出确认报文，开始传输数据
3. 服务器端 -> 客户端，服务器端数据传输完后，向客户端发出连接释放报文
4. 客户端 -> 服务器端，客户端接收到连接释放报文后，向服务器端发出确认报文

### TCP/IP数据传输有序可靠性

主要依靠 `ACK(回复)`和`超时重发`两个机制

1. 为保证数据包的可靠，发送方必须把已发送的数据包保留在缓冲区
2. 为每一个已发送的数据包启动一个超时定时器
3. 在定时器超时之前如果收到了对方发来的应答消息，则释放该数据包占用的缓冲区
4. 超时未收到则进行重传，直到重传次数达到最大限定次数为止

### TCP / UDP 区别

1. TCP是面向链接的，而UDP是面向无连接的
2. TCP仅支持单播传输，UDP提供单播，多播，广播的功能
3. TCP的三次握手协议保证了数据的传播可靠性，而UDP不可靠
4. UDP的头部开销比TCP小，数据传输速率更高，实时性更好
5. [TCP、UDP深度剖析](https://juejin.cn/post/6992743999756845087)

### 跨域

原因：浏览器的安全限制，当 协议、域名、端口 三个中任意一个不一致时，即认为产生跨域

解决方案：

- JSONP（抛弃）
  1. 利用HTML中script标签天生的跨域功能
  2. 将需要调取的跨域链接，放在script标签的src中
  3. 使用回调函数进行参数接收
  4. 只能使用在GET请求中
- CORS（安全隐患）
  1. 服务器端通过设置 Access-Control-Allow-Origin 准入许可，对指定的来源地址进行资源共享
- PROXY (常用)
  1. 设置服务器代理
  2. 常用Nginx进行配置
- window.postMessage
  1. H5的新特性
  2. 配置指定的消息传输地址，对消息进行输送

[跨域详解](https://juejin.cn/post/7003232769182547998)

### Cookie、sessionStorage、localStorage

相同点：

1. 储存在客户端

不同点：

1. Cookie的数据大小通常不超过4kb、sessionStorage和localStorage可以达到5M+
2. Cookie可以设置过期时间、sessionStorage数据在浏览器关闭后被清除、localStorage数据永久储存，除非主动删除
3. Cookie中的数据会被自动传输到服务器端，sessionStorage和localStorage只保存在本地



## 浏览器

### 页面加载全过程

1. URL输入
2. 查找缓存： 浏览器缓存 - 系统缓存 - 路由缓存
   1. 浏览器缓存：浏览器会记录DNS一段时间
   2. 操作系统缓存：若浏览器中没有寻找到记录，则调用操作系统，获取最近由操作系统记录过的DNS进行缓存查询
   3. 路由器缓存：若上述两个步骤均无法找到DNS，则会在路由器中进行搜索
3. DNS域名解析：浏览器向DNS系统发起请求，解析该URL中域名对应的IP地址
4. 建立TCP连接：根据IP地址和端口，与服务器建立TCP链接
5. 发起HTTP请求：浏览器发起读取文件的HTTP请求（三次握手策略）
6. 服务器响应并返回请求结果
7. 关闭TCP连接，通过四次挥手释放TCP连接
8. 浏览器渲染：
   1. 构建DOM树
   2. 构建CSS规则树
   3. 浏览器将DOM树和CSS规则树结合，构建成渲染树（render树）
   4. 布局，绘制
9. JS解析：
   1. 创建window对象，即全局执行环境，所有的全局变量和函数属于window的属性和方法，DOM Tree也会映射在window的document对象上，当关闭页面或浏览器时则会被销毁
   2. 加载文件：使用JS引擎分析语法和词法是否合法，如合法则进入预编译
   3. 预编译：寻找所有的全局变量声明 -> 加入到window对象中，赋值为undefined，寻找全局函数声明，并加入到window对象中，将函数体赋值给他
   4. 解释执行：执行到变量就赋值，如果变量没有被定义，就没有被预编译直接赋值，在ES5非严格模式下，将变成window的一个属性，string，int这类型的值将直接放在存储空间里，object将把指针指向变量的存储空间。函数执行，就将函数的环境推入一个环境的栈中，执行完成后再退出，将控制权交还给环境。

### 浏览器重绘重排的区别

##### 重排/回流

1. 当DOM的变化影响了元素的几何信息（位置发生变化），浏览器需要重新计算元素的几何属性，将其安放在界面中正确的位置

##### 重绘

1. 元素的外观发生了变化，但没有改变布局，重新绘制元素外观的过程就是重绘

*重绘不一定发生重排，重排一定发生重绘，重绘重排的代价非常高昂，会破坏用户体验，让UI展示变得缓慢*

### 如何避免重绘重排

1. 集中改变样式，避免一条一条的执行DOM样式修改
2. 不要在循环中改变DOM节点的属性值
3. 为动画的HTML元件使用 fixed 或 absolute 的position，修改的时候不会发生重排
4. 不使用table布局
5. 动画开启GPU加速，translate使用3D变化
6. ** 提升为合成层
   1. 合成层的位图，会交由GPU合成，比CPU处理快
   2. 当需要重绘时，只需要重绘本身，不会影响其他层
   3. 对于transform和opacity，不会触发绘制和布局
   4. 提升合成层最好的方式是使用CSS的will-change属性：`will-change:transform`

### 请求资源304

1. 浏览器请求资源时首先看 `Expires` 和 `Cache-Control` ，Expires 受限于本地时间，如果修改了本地时间，可能造成缓存失效，可以通过 Cache-Control：指定最大的生命周期，此时请求状态依然返回200，但是不会请求数据，并且会显示from cache
2. 强缓存失效，进入协商缓存阶段。首先会验证ETag，ETag可以保证每个资源都是唯一的，

### 进程、线程、协程

#### 进程

​	定义：一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程。是操作系统进行资源分配和调度的一个独立（基本）单位，是操作系统结构的基础-------一段程序的执行过程

​	特征：动态、独立、异步、并发

#### 线程

​	定义：程序执行中一个单一的顺序控制流程。是程序执行流的最小单元，是操作系统能够运算调度的最小单位

​	一个进程可以有多条线程，一条线程只对应一个进程

#### 协程

​	基于线程之上，比线程更加轻量级的存在

## HTML && CSS

### HTML5

​	特点：语义化标签

​	包括：header、nav、main、article、section、aside、footer

语义化标签的有点：

1. 没有css的情况下，也有结构效果
2. 代码结构清晰易读
3. 利于开发和维护
4. 有利于搜索引擎的SEO优化

### CSS

#### 选择器

1. id选择器 #id
2. 类选择器 .class
3. 属性选择器 a[href] (标签[标签下的属性])
4. 伪类选择器 a:hover
5. 标签选择器 div h1
6. 相邻选择器 div+p
7. 子选择器 ul > li 
8. 后代选择器 li a
9. 通配符选择器 *

#### position

 1. fixed

    固定定位，元素相对于浏览器窗口的位置固定，窗口滚动也不会影响元素位置。脱离文档流

 2. absolute

    绝对定位，相对于最近的已定位父元素为参考，若没有则以body为参考，脱离文档流

 3. relative

    相对定位，以原本的位置为参照，可以进行xy方向移动

 4. sticky

    粘性定位，先安装普通文档流定位，然后相对于该元素在流中的BFC和containing block定位

 5. static

    默认定位

#### BFC

​	解释：block formatting context ，块级格式化上下文。解决父元素内各可能脱离文档流的子元素导致的父元素空间内高度塌陷或边距重叠的问题，令脱离文档流的元素也参与父元素的高度计算

​	创建BFC：

​	1、（子）float：left/right。
​	2、（子）position：absolute/fixed。
​	3、（子）display：inline-block；
​	4、（父）display：[flex](https://so.csdn.net/so/search?q=flex&spm=1001.2101.3001.7020)；
​	5、（父）overflow：hidden/[scroll](https://so.csdn.net/so/search?q=scroll&spm=1001.2101.3001.7020)/auto；

使用场景：

1. 去除边距重叠
2. 清除浮动
3. 避免某元素被浮动元素覆盖
4. 避免多列布局由于宽度计算四舍五入而自动换行

#### 水平居中的方法

1. 行内元素
   1. `text-align:center`
2. 确定宽度的块级元素
   1. `margin: 0 auto`
   2. 利用绝对定位和margin-left: (父width) - (子width) / 2
3. 宽度未知的元素
   1. 父元素使用`display: table`再给子元素添加`margin: 0 auto`
   2. `text-align: center`
   3. 绝对定位+transform , `transform: translateX(50%)`
   4. flex+`justify-content: center`

#### 垂直居中的方法

1. 文字类：`line-height`+`height`
2. flex: `align-item: center`
3. transform
4. 父元素`display:table`，子元素`vertical-align:middle`

 

#### 清除浮动的方法

```html
<style>
	/*
    	1. 额外标签法,给需要清浮动的dom中添加一个空元素，并设置clear:both属性
    	优点：通俗易懂，缺点：结构差，增加额外无用标签
    */
    .clear {
        clear: both
    }
    /*
    	2. 给父元素添加overflow：hidden
    	优点：书写简单 缺点：溢出的元素被隐藏
    */
    /*
    	3. 给父元素设置::after伪类,与方法一效果，原理类似
    	优点：结构以及语义化正确 缺点：IE6不兼容
    */
    .father::after {
        content: '';
        display: block;
        visibility: hidden;
        height: 0;
        clear: both
    }
    /*
    	4. 在方法3的基础上添加双伪类元素
    	优点：书写更简单
    */
    .clearfix::before,
    .clearfix::after {
        content: '';
        display: table
    }
    .clearfix::after {
        clear: both;
    }
    .clearfix {
        zoom: 1 /* 兼容IE6 */
    }
    
</style>

<div class="father">
    <div class="son"></div>
    <!-- 1.额外标签法 -->
	<div class="clear"></div>
</div>
```



## JS

### 数据类型  8种

#### 基本数据类型

1. string 
2. number
3. boolean
4. undefined
5. null
6. symbol - 特征值，独一无二，一旦声明无法改变
7. bigInt - 任意精度格式的整数

特点：存在于栈内存中，在内存中占用固定的大小

#### 引用型

1. Object（包含Array，function，Date，RegExp）

特点：存在于堆内存中，由栈内存储存对应的堆内存地址

### 数据类型的检测方式

#### typeof

```js
console.log(typeof 1);		// number
console.log(typeof '1');	// string
console.log(typeof true);	// boolean
console.log(typeof {});		// object
console.log(typeof []);		// object
console.log(typeof function(){})	//object
console.log(typeof null);	// object
console.log(typeof undefined);	// object

// 优点：能快速区分除null undefined外的基本数据类型
// 缺点：不能区分object的具体类型以及null undefined
```

#### instanceof

```js
console.log(1 instanceof Number);				    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true

// 优点：能区分Object的具体类型
// 缺点：不能区分基本数据类型
```

#### Object.prototype.toString.call()

```js
var toString = Object.prototype.toString;
console.log(toString.call(1));                      //[object Number]
console.log(toString.call(true));                   //[object Boolean]
console.log(toString.call('mc'));                   //[object String]
console.log(toString.call([]));                     //[object Array]
console.log(toString.call({}));                     //[object Object]
console.log(toString.call(function(){}));           //[object Function]
console.log(toString.call(undefined));              //[object Undefined]
console.log(toString.call(null));                   //[object Null]

// 优点：可以区分全部数据类型
```



### 变量声明

#### var

```js
/*
	1. 传统的声明变量方式
	2. 没有块的概念，可以跨块访问，不能跨函数访问
	3. 存在变量提升
	4. 在相同作用域内可以重复声明同一变量
	5. 声明的变量与全局对象window有映射关系
*/
// 5 - 
var a = 1
console.log(a) // 1
console.log(window.a) // 1
```

#### let 

```js
/*
	1. ES6新增的变量声明方式
	2. 通常用来定义变量，只能在块级作用域内访问，无法跨块与函数访问
	3. 不存在变量提升
	4. 声明的变量与全局对象window没有映射关系
	5. 在相同作用域内无法重复声明同一变量
*/
// 4 -
let a = 1
console.log(a) // 1
console.log(window.a) // undefined
```

#### const

```js
/*
	1. ES6新增的声明变量方式
	2. 通常用来定义常量，基本数据类型被声明后无法更改，引用类型声明后可以对内部进行修改，但无法对外面的结构进行更改
	3. 不存在变量提升
	4. 声明的变量与全局对象window没有映射关系
	5. 在相同作用域内无法声明同一变量
*/
```

### JS垃圾回收机制

#### 产生

1. 浏览器的内存有限，当堆、栈、上下文结构占用了大量内存时，浏览器的性能将变差，运行缓慢

#### 机制

1. 浏览器的JavaScript有自动的垃圾回收机制（`GC: Garbage Collection`），当变量不被调用时将会被清理掉，释放其占用的内存
2. 过程
   1. 当变量进入执行环境中时，会被浏览器标记为“进入环境”
   2. 当变量离开了执行环境后，会被标记为“离开环境”
   3. 在下一个浏览器垃圾清理周期中，被标记为“离开环境”的变量将被清除，释放内存
3. 不同浏览器的清理原理不一样
   1. 谷歌浏览器：浏览器会不定时的去查找当前内存的引用情况，如果存在变量没有被引用时，浏览器则将其回收
   2. IE浏览器：对当前内容的占用进行计数，每被引用一次则+1，移除占用-1，当计数为0时，浏览器将其回收

#### 手动优化内存

​	JS的垃圾回收机制无法手动触发，只能通过特定的方法将内存进行释放

1. 堆内存：将变量修改为null，即可释放其内存占用
2. 栈内存：在上下文中，把堆内存的占用取消掉

#### 造成内存泄漏的方式

1. 全局变量 - 无法被释放
2. 闭包 - 一直被引用，也无法进行释放
3. DOM元素引用
4. 定时器

### 作用域与作用域链

#### 作用域概念

​	变量与函数的可访问范围，由当前环境与上层环境的一系列变量对象组成

​	函数在创建的时候即形成当前函数的作用域

1. 全局作用域：代码在程序的任何地方都可以被访问，例如window对象
2. 函数作用域：在当前的代码片段内才能被访问

#### 作用域链

当在当前函数作用域中访问不到所需变量时，就会向上级作用域去寻找，直到查找到全局作用域中，查找的过程则形成一条链式结构



### 原型与原型链

原型：prototype



### 闭包

#### 概念：

函数执行时会形成一个私有的上下文，当当前私有上下文中的某个变量被上下文以外的事物所占用，则上下文不会被出栈释放，从而形成不被销毁的上下文，导致内存的泄漏。形成闭包

#### 闭包的作用

1. 保存：当当前上下文不被释放时，存储的变量也不会被释放，可以供上下文调取使用，相对于把这些变量的值保存了起来
2. 保护：构成闭包时，上下文中的私有变量不受外界干扰

#### 优点：

1. 延长局部变量的生命周期

#### 缺点：

1. 函数变量所占用的内存无法被释放，导致内存泄漏



### This指向

```js
/*
    1. 作为普通函数执行时，内部this指向window
*/
function foo() {
  let a = 1;
  console.log('foo-this=>',this)
  // this-> window
}

/*
  2. 作为对象的方法被调用，this指向函数所在的对象
*/
const o = {
  a: 1,
  b: function() {
    console.log('o.b()=>',this)
    // this-> o
  }
}

/*
  3. 构造器的调用，this指向新构建的这个对象
*/

function Person(name,age) {
  this.name = name;
  this.age = age;
  this.logThis = function() {
    console.log('Person=>',this)
  }
}
const loser = new Person('ben',20)
loser.logThis()   // log-loser

/*
  4. 箭头函数
  箭头函数不可以使用arguments对象，可以使用rest参数代替
  箭头函数的this总是指向函数定义生效时所在的对象
*/
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  setInterval(() => this.s1++,1000);
  setInterval(function() {
    this.s2++
  },1000);
}
// var timer = new Timer()

// setTimeout(() => console.log('s1:',timer.s1),3100) // s1=3
// setTimeout(() => console.log('s2:',timer.s2),3100) // s2=0


function foo2() {
  setTimeout(() => {
    console.log('箭头id=>',this)
  }, 100)
  setTimeout(function() {
    console.log('普通函数id=>',this)
  }, 100)
  function fn3() {
    console.log('fn3=>',this)
  }
  fn3() // 指向window
}
var id = 21;

foo2()  // this指向window, 因为此时foo2作为普通函数，this指向window层

foo2.call({id: 42}) // this指向{id: 42}这个对象，因为foo2通过call将作用域改变为{id: 42}这个对象，箭头函数的this永远指向上层作用域

/*
  5. Function.prototype. call、apply、bind
*/

function Fn() {
  this.a = 1;
  this.fn = function() {
    console.log('fn.a=>',this.a)
  }
}

const fn = new Fn()

fn.a = 2

// call - 接收一个参数列表
// fn.fn() // a=2
// fn.fn.call({a:3}) // a=3

// apply - 接收一个数组
// fn.fn.apply(...[{a:5}]) // a=5

// bind - 接收一个对象，但是bind方法不会被自动调用，需要手动调用
// fn.fn.bind({a:6})()   // a=6
```



### arguments对象

定义： 一个对应于传递给函数的参数的类数组，本质是一个对象

```js
function foo(a,b,c) {
    console.log(arguments) // [Arguments]{a,b,c}
}
```



### Object.defineProperty()

概述：这是一个静态方法，会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

语法：

```js
/*
	Object.defineProperty(obj,prop,descriptor) 
	=> obj:要定义属性的对象，
	   prop:要定义或修改的属性key, 
	   descriptor: 属性描述符 - 要定义或修改的属性的描述符
*/
let obj1 = {}
Object.defineProperty(obj1,'prop',{
    value: 42,
    writable: false
})
// obj1: { prop: 42 }
```

默认情况下，使用Object.defineProperty()添加的属性是不可写，不可枚举和不可配置的，但通过**赋值**（Object.key = value）的方法添加的普通属性，会在枚举属性（for...in、Object.keys()）等时，值可以被更改或删除。

对象中的属性描述符主要有两种：

1. 数据描述符：拥有一下可选键（在使用Object.defineProperty()定义属性的情况下，下述所有键都是默认值）

   1. configurable

      是否可配置：默认false，当配置为false时

      1. 该属性的类型不能在数据属性和访问器属性之间更改
      2. 该属性不可被删除
      3. 其描述符的其他属性也不能被更改（但如果配置了可写的数据描述符，则value和writable两个属性值可以修改）

   2. enumerable

      默认false，描述当前属性是否可以在其对象的属性枚举中出现（能否被枚举的意思）

   3. value

      默认undefined，描述该属性的值，可以是任何有效的js值

   4. writable

      默认为false，决定该属性关联的value值能否被修改

2. 访问器描述符：

   1. get（getter）

      默认undefined，用作属性getter的函数，如果没有getter则为undefined。当访问该属性时，将不带参地调用此函数，并将**this**设置为通过该属性访问的对象（因为可能存在继承关系，所以可能访问到不是定义在该属性的对象）。返回值将被用作该属性的值。

   2. set（setter）

      默认undefined，用作属性setter的函数，如果没有setter则为undefined，当该属性被赋值时，将调用此函数，并带有一个参数（要赋给该属性的值），并将**this**，设置为通过该属性分配的对象。

3. **注意**：访问器描述符不能和value，writable同时配置

```js
/*
	因为访问的对象的属性不一定是描述符本身的属性，继承的属性也会被考虑在内，如果需要确保这些默认值得到保留，可以预先冻结描述符对象原型链中的现有对象，明确指定所有选项，或使用Object.create(null)指向null
*/
const obj = {}

// 1. 使用null原型，不继承任何属性
const descriptor = Object.create(null)
descriptor.value = 'static'
Object.defineProperty(obj,'key',descriptor)	// 得到一个默认描述符配置的属性，不可枚举，不可配置，不可写

// 2. 指定配置属性
Object.defineProperty(obj,'key',{
    enumberable: false,
    configurable: false,
    writable: false,
    value: 'static'
})

// 3. 重复利用同一对象
function withValue(value) {
  const d =
    withValue.d ||
    (withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value,
    });

  // 避免重复赋值
  if (d.value !== value) d.value = value;

  return d;
}
// 然后
Object.defineProperty(obj, "key", withValue("static"));

// 也可以使用freeze冻结对象，使其不可再更改
(Object.freeze||Object)(Object.prototype)
```

[MDN详细描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)



## Vue2

#### 响应式原理

```js
/*
	逻辑思路：
	1. 通过observe方法，判断当前变量是否为对象，若不是则返回
	2. 若是对象，则判断这个对象上是否已经绑定过__ob__属性
	3. 若已绑定过，则直接返回
	4. 若未绑定过，则通过new Observer对其进行__ob__绑定
	5. 然后遍历这个对象，把这个对象上的所有属性进行响应式绑定（defineReactive）
	6. 并且对属性下的所有子属性进行递归绑定
	7. 返回这个对象
	
	数组：只改写了七个方法
	1. push
	2. pop
	3. shift
	4. unshift
	5. sort
	6. splice
	7. reverse
*/
```







## 设计模式

设计模式用来干什么的？

设计模式如何分类？

单例模式有什么优缺点？什么时候使用？

代理模式有什么优缺点？什么时候使用？

策略模式有什么优缺点？什么时候使用？

简单工厂、工厂方法、抽象工厂模式有什么区别？

哪些框架用了哪些设计模式？



设计模式是一种解决问题的方案，目的是为了提高代码的可维护性，可复用性，可拓展性。

设计模式应该遵循 的原则：

1. 单一职责原则（SRP）
2. 开闭原则（OCP）
3. 里氏替换原则（LSP）
4. 依赖倒置原则（DIP）
5. 接口隔离原则（ISP）
6. 迪米特法则
7. 合成、聚合复用原则（CARP）

### 常见的设计模式

#### 单例模式

概念：单一实例的意思，只会有一个实例进行状态管理

核心思想：保证一个类只有一个实例，并提供一个全局访问点，所有人访问的都是同一个实例。

代码实现：

```js
let Singleton = (function() {
    let instance;	// 实例存储
    
    // 私有化函数，创建实例
    function createInstance() {
        const car = new Object()
        car.color = 'grey'
        car.describe = function() {
            console.log('i have 400hp, i can run fast')
        }
        return obj
    }
    return {
        getInstance: function() {
            // 判断实例是否已被创建，返回实例
            if (!instance) {
                createInstance()
            }
            return instance
        }
    }
})()
let instance1 = Singleton.getInstance()
let instance2 = Singleton.getInstance()

console.log(instance1 === instance2)  // true

/*
 这里创建的instance1和instance2都是获取到同一个实例.
*/
```

作用：

1. 可以用在全局状态管理中，以便不同组件之间进行数据共享（类似与Vuex状态管理）
2. 可以用来做全局的配置管理，储存一些登录令牌，API地址等死数据
3. 模态框管理，当全局只能同时出现一个模态框时，可以用来确保模态框打开的唯一性
4. 日志记录器
4. 我的流水线实现



#### 工厂模式

简单工厂模式、工厂方法模式、抽象工厂模式

1. 概念：用于封装对象的创建过程，并提供一个统一的接口来实例化对象，而不暴露具体实例化的过程。

2. 核心思想：通过创建类似“加工中心”的工厂以及产品线，实现具体产品的获取，而不需要关心创建这个产品的内部方法。

3. 代码实现：

   ```js
   /*
   	简单工厂模式:
   		静态工厂模式，一个工厂对象创建同一类对象类的实例
   */
   function Factory(career) {
           function User(career, work) {
             this.career = career;
             this.work = work;
           }
   
           let work;
           switch (career) {
             case "coder":
               work = ["写代码", "修Bug"];
               return new User(career, work);
               break;
   
             case "hr":
               work = ["招人", "裁人"];
               return new User(career, work);
               break;
   
             case "boss":
               work = ["吃喝", "玩乐"];
               return new User(career, work);
               break;
             default:
               return new Error("Invalid worker");
               break;
           }
         }
   
         let coder = new Factory('coder')
         let hr = new Factory('hr')
   
         console.log('coder-',coder,'hr-',hr)
   
   
   // 抽象工厂模式
   
   // 抽象一个大产品
   class Car {
       constructor(name) {
           this.name = name
       }
       getInfo: function() {
           console.log("This is a car,it's name is" + this.name)
       }
   }
   
   // 具体产品
   class SportCar extends Car {
       constructor() {
           super("LynkCo_03")
       }
   }
   class Suv extends Car {
       constructor() {
           super("LynkCo_01")
       }
   }
   
   // 抽象一个制造工厂
   class CarFactory {
       createCar(type) {
           switch(type) {
               case 'LynkCo_03':
               	return new SportCar();
               	break;
               case 'LynkCo_01':
               	return new Suv();
                   break;
               deafault:
                   throw new Error('Invalid car type')
           }
       }
   }
   
   // 具体化制造工厂
   const factory = new CarFactory()
   // 具体化产品生产线
   const sportCar = factory.createCar('LynkCo_03')
   const suv = factory.createCar('LynkCo_01')
   
   sportCar.getInfo()	// This is a car, it's name is LynkCo_03
   suv.getInfo()	// This is a car, it's name is LynkCo_01
   ```
   
   作用：
   
   1. 实现业务对象的创建解耦，通过工厂类中暴露的生成方法，传入不同的参数，返回不同的业务需求对象。
   2. 例如Vue中的虚拟dom树生成，就使用了工厂模式，通过compile解析不同的标签，进行标签vnode对象的返回，而不需要关心创建每个标签的内部方法。
   3. 可以用于配置管理，比如请求方法的创建，可以通过配置请求工厂，设置所有必要属性，再创建具体的方法类如post类，get类，分别设置对应的属性。再通过创建请求类，设置创建请求方法，根据方法参数使用不同的方法类。例如用户的权限菜单管理



## 性能优化

LCP（Largest Contentful Paint）和FCP（First Contentful Paint）是用于衡量网页加载性能的两个指标。

1. LCP（Largest Contentful Paint）：LCP是指页面上最大的可见内容元素被完全绘制到屏幕上的时间点。它主要衡量用户可见内容加载完成的速度，通常表示为从页面开始加载到最大内容绘制完成的时间间隔。LCP的目标是在2.5秒内完成，较快的LCP有助于提高用户体验和降低跳失率。

2. FCP（First Contentful Paint）：FCP是指页面上第一个内容元素被绘制到屏幕上的时间点。它表示网页开始展示内容的时间，不论是文本、图像、背景色等。FCP的目标是尽快将首屏内容绘制到屏幕上，通常希望在1秒内完成。

这两个指标都是由Web性能指标API（Performance API）提供的，它们可以通过浏览器的开发者工具（如Chrome DevTools）或一些性能监测工具来测量和分析。通过监测LCP和FCP，可以评估网页加载的速度和用户体验，进而进行优化和改进。

需要注意的是，LCP和FCP只是众多的网页性能指标之一，还有其他指标如TTFB（Time to First Byte，首字节时间）、TTI（Time to Interactive，可交互时间）等，综合考虑这些指标可以更全面地评估网页的加载性能。







埋点：

1. 收集上报数据，（异常、接口、脚本、资源）无埋点方案
2. 方式：window.onerror，addEventListener('unhandleerror')，vue.config.errorHandler，ajax.onerror 404
3. 上报数据
   1. sendBeacon
   2. 发请求
