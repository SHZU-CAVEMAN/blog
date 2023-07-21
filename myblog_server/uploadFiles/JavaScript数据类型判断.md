2 判断数据类型：
(35条消息) js中判断数据类型的几种实用方法_js判断数据类型的方法_铁锤妹妹@的博客-CSDN博客
	1  typeof，instanceOf，Object.prototype.toString.call( )，  isArray( )，
	typeof它返回值是一个字符串，该字符串说明运算数的类型。返回结果只有以下几种：number，string，boolean，object，undfined，function（还有ES6新增的symbol）
	typeof null 为什么是一个对象，因为
	2  可以使用typeof判断变量是否存在（比如 if(typeof a!=“undfined”){ xxx }），而不要去使用if(a),因为a不存在（未声明）会报错。
	3  无法判断对象和数组，还有null，因为都返回的是object
判断JS数据类型的四种方法 - 一像素 - 博客园 (cnblogs.com) （这一篇写得很好）
	1  instanceof 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。
					var iframe = document.createElement('iframe');
					document.body.appendChild(iframe);
					xArray = window.frames[0].Array;
					var arr = new xArray(1,2,3); // [1,2,3]
					arr instanceof Array; // false
					
针对数组的这个问题，ES5 提供了 Array.isArray() 方法 。该方法用以确认某个对象本身是否为 Array 类型，而不区分该对象在哪个环境中创建。
					if (Array.isArray(value)){
					   //对数组执行某些操作
					}
	Array.isArray() 本质上检测的是对象的 [[Class]] 值，[[Class]] 是对象的一个内部属性，里面包含了对象的类型信息，其格式为 [object Xxx] ，Xxx 就是对应的具体类型 。对于数组而言，[[Class]] 的值就是 [object Array] 。
	2  用constructor 判断
	当执行 var f = new F() 时，F 被当成了构造函数，f 是F的实例对象，此时 F 原型上的 constructor 传递到了 f 上，因此 f.constructor == F。新对象在诞生以后，就具有可追溯的数据类型。
	注意：
	（1）. null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。
	（2）. 函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object。为了规范开发，一般重写 prototype的时候也会重写constructor属性，以保证对象实例的数据类型不被篡改。

(35条消息) 判断JS数据类型的五种方法_js 判断数据类型_要不要买菜啊的博客-CSDN博客
	精度丢失问题：计算机不能准确记录0.1的值 (35条消息) 为什么在计算机的世界里无法正确表示十分之一（0.1）_Tiny黎的博客-CSDN博客