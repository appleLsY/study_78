//页面加载完之后进行的操作
window.onload=function(){
    //获取按钮
    var listBtn=document.getElementById('btn1');
    var carBtn=document.getElementById('btn2');
    var imgs=document.getElementsByTagName('img');
    listBtn.onclick=function(){
        //改变按钮的class值
        listBtn.className='btn-list-on';
        carBtn.className='btn-car-off';
        //改变每一个图片的路径和其父节点的class值
        for(var i=0;i<imgs.length;i++){
            imgs[i].src="./image/small.jpg";
            imgs[i].parentNode.className='a-img small';
        }
    }
    carBtn.onclick=function(){
        //改变按钮的class值
        listBtn.className='btn-list-off';
        carBtn.className='btn-car-on';
        //改变每一个图片的路径和其父节点的class值
        for(var i=0;i<imgs.length;i++){
            imgs[i].src="./image/big.jpg";
            imgs[i].parentNode.className='a-img';
        }
    }
}