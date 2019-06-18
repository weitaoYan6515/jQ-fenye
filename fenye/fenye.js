$(function(){
    var pageNumber=1 ;   //当前页码默认为1
    var pageSum=1  ;   // 总页码默认为1
    var contentData=[] ;    //请求到的数据
    var type='get' ;    //请求类型
    /* var url='./data.json' ;    //请求地址 */
    var url='https://www.apiopen.top/satinApi' ;    //网络请求地址
    /* var data={"Count":10} ;    //本地模拟请求参数 */
    var data={"Count":10,"type":2} ;    //网络请求参数


    var $contentBox=$("#contentBox") ;    //获取内容盒子DOM
    var $buttonBox=$('#buttonBox') ;    //获取按钮盒子DOM

    //封装ajax请求，模拟的本地数据
    function getData(type,url,data){
        /* data.pageNumber=pageNumber ;    //修改本地参数 */
        data.page=pageNumber ;    //修改网络参数
        $.ajax({
            type: type,
            url: url,
            data: data,
			async:false,
            success: function (res) {
                console.log(data)
                console.log(res)
               /*  //本地数据，网络数据请修改
                contentData=res.list[pageNumber-1] ;    //赋值当前页数据 */
                //网络数据
                contentData=res.data
               /*  pageSum=res.count ;    //赋值总页码 */
                pageSum=9 ;    //赋值总页码(接口不返回总页码直接赋值100了)
                // console.log(contentData)
                setDom(contentData) ;   //生成内容结构
                setButton(pageSum) ;    //生成按钮结构
                

                //按钮点击事件
                $("#buttonBox li").click(function(){
                    if($(this).attr("data")){
                        //上一页
                        if($(this).attr("data")=="ss"){
                            if(pageNumber>=2){
                                pageNumber--;
                                getData(type,url,data)
                            }
                            //下一页
                        }else if($(this).attr("data")=="xx"){
                            if(pageNumber<=pageSum-1){
                                pageNumber++;
                                getData(type,url,data)
                            }
                            //页码
                        }else{
                            //不知道为什么-1+1
                            pageNumber=$(this).attr("data")-1
                            pageNumber+=1
                            getData(type,url,data)
                        }
                    }else{
                        console.log('null')
                    }
                    
                    $('html').animate({ scrollTop: 0 }, 1000) ;    //回到顶部
                    
                })
            }
        });
    }


    //生成内容结构
    function setDom(contentData){
        var str='' ;
        contentData.map(function(item){
           /*  //本地数据结构
            str+=`
                <li>${item.name}</li>
            ` */
            //网络数据结构 
            str+=`
                <li>
                    <div>
                        <div>
                            <img src="${item.profile_image}"/>
                            <strong>${item.name}</strong>
                        </div>
                        <span>${item.created_at}</span>
                    </div>
                    <p>${item.text}</p>
                    <div>
                        <div><img src='img/love.png'/><span>${item.love}</span></div>
                        <div><img src='img/hate.png'/><span>${item.hate}</span></div>
                    </div>
                </li>
            `
        })
        str=`<ul>${str}</ul>`
        $contentBox.html(str)
    }

    //生成按钮结构
    function setButton(pageSum){
        var str='' ;
        for(var i = 1 ; i <= pageSum ; i++){
            if(pageNumber<=4){
                //当前页小于等于3展示1，2，3，4，，5，6，last
                if(i<=6||i==pageSum){
                    str+=`
                        <li data="${i}">${i}</li>
                    `
                }
            }else if(pageNumber>=pageSum-3){
                //当前页大于等于last-3展示1，last-5，last-4，last-3,last-2,last-1,last
                if(i>=pageSum-5||i==1){
                    str+=`
                        <li data="${i}">${i}</li>
                    ` 
                }
            }else{
                console.log(i)
                //展示1,last,当前页-2，当前页-1，当前页，当前页+1，当前页+2
                if(i==1||i==pageSum||i==pageNumber-2||i==pageNumber-1||i==pageNumber||i==pageNumber+1||i==pageNumber+2){
                    console.log(i)
                    str+=`
                        <li data="${i}">${i}</li>
                    `
                }
            }
        }
        str=`<ul><li data="ss">上一页</li>${str}<li data="xx">下一页</li></ul>`
        $buttonBox.html(str)

        //遍历每个页码按钮
        for( var i = 1 ; i <= $('#buttonBox li').length-2 ; i++){
            //当前页添加active类名
            if($('#buttonBox li').eq(i).html()==pageNumber){
                $('#buttonBox li').eq(i).siblings().removeClass('active')
                $('#buttonBox li').eq(i).addClass('active')
            }
            //添加省略号
            if(i<=$('#buttonBox li').length-3){     //防止i+1
                if($('#buttonBox li').eq(i).html()!=$('#buttonBox li').eq(i+1).html()-1){
                    $('#buttonBox li').eq(i).after('<span>...</span>')
                }
            }
               
        }
        
    }


    getData(type,url,data)
})