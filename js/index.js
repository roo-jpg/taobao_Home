window.addEventListener('load',function(){
	
	/**
	 * 图片容器1轮播
	 */
	// 1.获取元素
	var leftBtn = document.querySelector('.leftBtn');
	var rightBtn = document.querySelector('.rightBtn');
	var pic = document.querySelector('.pic');
	var btn = pic.querySelector('.btn');
	var imgs = document.querySelector('.imgs');
	// 图片宽度
	var picWidth = pic.offsetWidth;
	// 2.鼠标经过（离开）图片显示（隐藏）
	imgs.addEventListener('mouseenter',function(){
		btn.style.display = 'block';
		clearInterval(timer);
		timer = null;
	})
	imgs.addEventListener('mouseleave',function(){
		btn.style.display = 'none';
		timer = setInterval(() => {
			rightBtn.click();
		}, 2000);
	})
	var circle = document.querySelector('.circle');
	// 3.动态生成小圆圈  有几张图片,就生成几个小圆圈
	for(var i = 0;i < imgs.children.length;i++){
		// 创建一个span
		var span = document.createElement('span');
		// 记录当前小圆圈的索引号，通过自定义属性
		span.setAttribute('index',i);
		// 把span插入到circle里面
		circle.appendChild(span);
		// 4.小圆圈的排他思想，生成小圆圈的同时绑定点击事件
		span.addEventListener('click',function(){
			// 把所有的span清除active
			for (var i = 0; i < circle.children.length; i++) {
				circle.children[i].className = 'Btn';
			}
			this.className = 'active Btn';
			// 5.点击小圆圈，移动图片,当然移动的是类名为img
			// img的移动距离=小圆圈的索引号*图片的宽度（注意是负值）
			// 点击哪个span，就拿到哪个span的索引号
			var index = this.getAttribute('index');
			// 我们点击哪个span，点击的那个span的索引号就要给num
			num = index;
			// 我们点击哪个span，点击的那个span的索引号就要给circles
			circles = index;
			console.log(index);
			console.log(picWidth);
			animate(imgs, -index * picWidth);
		})
	}
	// 把circle里面的第一个span设置类名为 active
	circle.children[0].className = 'active Btn';
	// 6.克隆第一张图片(a)放到类名为img的最后面
	var first = imgs.children[0].cloneNode(true);
	imgs.appendChild(first);
	// 7.点击右侧按钮，图片滚动一张
	var num = 0;
	// circles控制小圆圈的播放
	var circles = 0;
	// 节流阀
	var flag = true;
	
	// 右侧按钮
	rightBtn.addEventListener('click',function(){
		if(flag){
			flag = false;
			// 如果走到了最后一张，此时，img就要快速复原left为0
			if(num == imgs.children.length - 1){
				imgs.style.left = 0;
				num = 0;
			}
			num ++;
			animate(imgs,-num * picWidth,function(){
				flag = true;	//打开节流阀
			});
			// 8.点击右侧按钮，小圆圈跟随一起变化
			circles ++;
			// 如果circles == 4,说明走到最后克隆到了这张图片，我们就复原
			if(circles == circle.children.length){
				circles = 0;
			}
			circlesChange();
		}
	});

	// 9.左侧按钮
	leftBtn.addEventListener('click',function(){
		if(flag){
			flag = false;
			// 如果走到了最后一张，此时，img就要快速复原left为0
			if(num == 0){
				num = imgs.children.length - 1;
				imgs.style.left = -num * picWidth + 'px';
			}
			num --;
			animate(imgs,-num * picWidth,function(){
				flag = true;
			});
			// 8.点击右侧按钮，小圆圈跟随一起变化
			circles --;
			// 如果circles < 0,说明第一张图片，需要改为第4个圆圈
			if(circles < 0){
				circles = circle.children.length - 1;
			}
			circlesChange();
		}
	})
	function circlesChange(){
		// 先清除其余小圆圈的active
		for(var i = 0;i < circle.children.length;i++){
			circle.children[i].className = 'Btn';
		}
		// 留下当前的小圆圈的active类名
		circle.children[circles].className = 'active Btn';
	}
	// 10.自动播放轮播图
	var timer = setInterval(() => {
		// 手动调用点击事件
		rightBtn.click();
	}, 2000);




	/**
	 * 关闭二维码
	*/
	// 1.获取元素
	var code = document.getElementsByClassName('code');
	var close = document.getElementsByClassName('close');
	// 注册事件
	close[0].onclick = function(){
		code[0].style.display = 'none';
	}

	/**
	 * 右侧固定导航栏
	 */
	var tool = document.querySelector('#tool');
	var first = document.querySelector('#firstScreen');
	// 获取首屏
	var item6 = tool.querySelector('.item6');
	// console.log(firstTop);
	// 2.页面滚动事件
	document.addEventListener('scroll',function(){
		// console.log(window.pageYOffset);
		// 1.当页面被卷曲的头部大于等于526，此时，侧标栏就要改为固定定位
		if(window.pageYOffset >= 526){
			tool.style.position = 'fixed';
			tool.style.top = 75 + 'px';
			item6.style.display = 'block';
		}else{
			tool.style.position = 'absolute';
			tool.style.top = 671 + 'px';
			item6.style.display = 'none';
		}
	})
	// 3. 当我们点击返回顶部按钮，让窗口的页面滚动最上面
	item6.addEventListener('click',function(){
		// window.scroll(x, y);		x, y不需要加单位
		window.scroll(0, 0);
		// 因为是窗口滚动，所以对象是window
		// animate(window, 0);
	})
	// 返回顶部按钮缓慢返回
	// 动画函数
	// function animate(obj, target, callback) {
	// 	// console.log(callback);  callback = function() {}  调用的时候 callback()

	// 	// 先清除以前的定时器，只保留当前的一个定时器执行
	// 	clearInterval(obj.timer);
	// 	obj.timer = setInterval(function() {
	// 		// 步长值写到定时器的里面
	// 		// 把我们步长值改为整数 不要出现小数的问题
	// 		// var step = Math.ceil((target - obj.offsetLeft) / 10);
	// 		var step = (target - window.pageYOffset) / 10;
	// 		step = step > 0 ? Math.ceil(step) : Math.floor(step);
	// 		if (window.pageYOffset == target) {
	// 			// 停止动画 本质是停止定时器
	// 			clearInterval(obj.timer);
	// 			// 回调函数写到定时器结束里面
	// 			// if (callback) {
	// 			//     // 调用函数
	// 			//     callback();
	// 			// }
	// 			callback && callback();
	// 		}
	// 		// 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
	// 		// obj.style.left = window.pageYOffset + step + 'px';
	// 		window.scroll(0, window.pageYOffset + step);
	// 	}, 15);
	// }
	
})
