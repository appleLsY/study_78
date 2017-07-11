//加分号是引入的jQuery最后封装没有结束符而导致出错，加一个以防错误发生
;(function($){
    var Carousel=function(poster,setting){
        console.log(setting);
    };
    Carousel.prototype={
        //配置参数

    };
    Carousel.init=function(posters,setting){
        var _this_=this;
        posters.each(function(){
            new _this_($(this));
            //此处的this就是前面单个new里面的东西
        });
    };
    //相当于注册，然后在html里面能够正常使用该对象
    window["Carousel"]=Carousel; 
})(jQuery);