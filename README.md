# 浏览器主页定制  
> 使用yarn安装 npm会出错很奇怪啊  

**注意：全部配置使用`localStorage`本地缓存，清空网页存储就没了哦**   
**如果不兼容，emmmm 保重**

## 介绍  
### [这里查看](https://rxdey.github.io/via-homepage/example/#/home)

* 为了方便定制 没什么艺术细胞审美捉鸡 主要是参考chrome上的`Infinity 新标签页
`插件
* 使用了`vant ui`库(本来不想用准备手写一些组件，写着写着感觉很浪费人生 XD)
* 添加百度联想词
* 使用`lib-flexible`自适应布局 单位转换是我魔改的`postcss-px-to-viewport-rxdey` ([详情这里](https://github.com/Rxdey/postcss-px-to-viewport)) (移动端pc端兼容)
* 配置全部放在网站缓存哦 **清除网页存储**的话就会全部变不见哦(其它可以清除)
* 添加了一个拾色器打包出来有点大了管他的。
* 都是写着写着想到的所以很乱 😆😆😆😆

## 更新
* 新增配置导入导出 导出为txt文本格式 的json字符串

## 说明  

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7rmgxj30bo0kljst.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>首页</em>
    </p>
</p> 

### 设置项  

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7r3y5j30bf0kdq3m.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>设置</em>
    </p>
</p>

### 选择搜索引擎 (默认项不可变更)  

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7pksij30bc0kdt8z.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>搜索引擎</em>
    </p>
</p>

### 添加搜索引擎  

> 点击加号添加

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7pqusj30bk0kimxm.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>添加搜索引擎</em>
    </p>
</p>

### 编辑搜索引擎  
> 新添加的可以修改

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7pocdj30bh0ki0t3.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>编辑、删除</em>
    </p>
</p>

### 更换背景图  
> 选择本地图片或网络图片 本地图片限制在1.5兆以内

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7r6dtj30bl0km3z5.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>背景图</em>
    </p>
</p>

### 添加导航  

> 点击导航预览可以更改颜色(没有图标默认使用名称前两个字作为图标，有图标优先使用图标)  
> 一页可以放8个 多出来的可以滑动查看

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7u7dzj30bi0khjru.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>添加导航</em>
    </p>
</p>


<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7ulsyj30bm0kk75h.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>添加导航</em>
    </p>
</p>

### 编辑导航  
> 在首页长按图标可以出发编辑选项

<p align="center">
    <img src="https://ws1.sinaimg.cn/large/005O2C54gy1g03hs7umocj30bh0kfdgx.jpg" alt="Sample"  width="30%">
    <p align="center">
        <em>编辑导航</em>
    </p>
</p>  

## 其他  
* 显示logo: 显示隐藏logo  
* 启用logo: 是否启用自定义logo  
* 快捷导航: 显示隐藏导航  
* 启用covor: 默认在背景图上添加了遮罩层让白色logo或者字体更明显关闭此项会给搜索框添加一个黑色边框  
* 黑色字体: emmmmmm





