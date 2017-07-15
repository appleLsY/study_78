//获得焦点时 onfocus
//失去焦点时 onblur
//鼠标输入弹起来的时候 onkeyup

window.onload=function(){
    var list=document.getElementById('list');
    var lis=list.children;
    var timer;

    //删除节点
    function removeNode(node){
        //node.remove();
        node.parentNode.removeChild(node);
    }

    //赞分享
    function praiseBox(box,el){
        var praiseElement=box.getElementsByClassName('praises-total')[0];
        var oldTotal=parseInt(praiseElement.getAttribute('total'));
        var txt=el.innerHTML;
        var newTotal;
        if(txt=='赞'){
            newTotal=oldTotal+1;
            praiseElement.innerHTML=(newTotal==1)?'我觉得很赞':'我和'+oldTotal+'个人觉得很赞';
            el.innerHTML='取消赞';
        }
        else{
            newTotal=oldTotal-1;
            praiseElement.innerHTML=(newTotal==0)?'':newTotal+'个人觉得很赞';
            el.innerHTML='赞';
        }
        praiseElement.setAttribute('total',newTotal);
        praiseElement.style.display=(newTotal==0)?'none':'block';
    }

    //发表评论
    function repalyBox(box){
        var textaarea=box.getElementsByTagName('textarea')[0];
        var list=box.getElementsByClassName('comment-list')[0];
        var div=document.createElement('div');
        div.className='comment-box clearfix';
        div.setAttribute('user',self);
        var html='<img class="myhead" src="images/my.jpg" alt=""/>'+
                 '<div class="comment-content">'+
                 '<p class="comment-text"><span class="user">我：</span>'+textaarea.value+'</p>'+
                 '<p class="comment-time">'+
                 getTime()+
                 '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>'+
                 '<a href="javascript:;" class="comment-operate">删除</a>'+
                 '</p>'+
                 '</div>'
        div.innerHTML=html;
        list.appendChild(div);
        textaarea.value='';
        textaarea.onblur();
    }

    //日期
    function getTime(){
        var t=new Date();
        var y=t.getFullYear();
        var m=t.getMonth()+1 //getMonth是从0开始
        var d=t.getDate();
        var h=t.getHours();
        var mi=t.getMinutes();
        m=m<10?'0'+m:m;
        d=d<10?'0'+d:d;
        h=h<10?'0'+h:h;
        mi=mi<10?'0'+mi:mi;
        return y+'-'+m+'-'+d+' '+h+':'+mi;
    }


    //赞回复
    function praiseReply(el){
        var oldTotal=parseInt(el.getAttribute('total'));
        var my=parseInt(el.getAttribute('my'));
        var newTotal;
        if(my==0){
            newTotal=oldTotal+1;
            el.setAttribute('total',newTotal);
            el.setAttribute('my',1);
            el.innerHTML=newTotal+' 取消赞';
        }
        else{
            newTotal=oldTotal-1;
            el.setAttribute('total',newTotal);
            el.setAttribute('my',0);
            el.innerHTML=newTotal==0?'赞':newTotal+' 赞';
        }
        el.style.display=(newTotal==0)?'':'inline-block';
    }

    //评论回复
    function oprateReply(el){
        var commentBox=el.parentNode.parentNode.parentNode;//评论容器
        var box=commentBox.parentNode.parentNode.parentNode;//分享容器
        var textarea=box.getElementsByTagName('textarea')[0];
        var user=commentBox.getElementsByClassName('user')[0];
        var txt=el.innerHTML;
        if(txt=='回复'){
            textarea.onfocus();
            textarea.value='回复'+user.innerHTML;
            textarea.onkeyup();
        }
        else{
            removeNode(commentBox);
        }
    }


    for(var i=0;i<lis.length;i++){
        lis[i].onclick=function(e){
            e=e||window.event;
            var el=e.srcElement; 
            //根据元素的class判断点击了哪个元素
            switch(el.className){
                case 'close':
                    removeNode(el.parentNode);
                    break;
                //赞分享
                case 'praise':
                //el.parentNode.parentNode.parentNode是赞分享显示的那个li
                    praiseBox(el.parentNode.parentNode.parentNode,el);
                    break;
                //回复按钮灰色
                case 'btn btn-off':
                    clearTimeout(timer);
                    break;
                //回复按钮蓝色
                case 'btn':
                    repalyBox(el.parentNode.parentNode.parentNode);
                    break;
                
                //赞回复
                case 'comment-praise':
                    praiseReply(el);
                    break;

                //评论回复
                case 'comment-operate':
                    oprateReply(el);
                    break;

            }
        }
        //输入框
        var textarea=lis[i].getElementsByTagName('textarea')[0];
        textarea.onfocus=function(){
            this.parentNode.className='text-box text-box-on';
            this.value=this.value=='评论…'?'':this.value;
            this.onkeyup();
        }
        textarea.onblur=function(){
            var me=this;
            if(this.value==''){
                timer=setTimeout(function(){
                    me.parentNode.className='text-box';
                    me.value='评论…';
                },400)
            }
        }
        textarea.onkeyup=function(){
            var len=this.value.length;
            var p=this.parentNode;
            var btn=p.children[1];
            var word=p.children[2];
            //当输入框获得焦点或者没有内容时回复按钮是灰色不可用
            if(len==0||len>140){
                btn.className='btn btn-off';
            }
            else{
                btn.className='btn';
            }
            word.innerHTML=len+'/140';
        }

    }
}