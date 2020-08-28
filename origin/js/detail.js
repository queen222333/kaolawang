$("#list_hide").mouseenter(function () {
    $(".list-group-flush").show();
});
$("#list_hide").mouseleave(function () {
    $(".list-group-flush").hide();
});
// 想办法得到URL中的querystring部分的id
// 获取里面的指定部分
var getParam = function (key) {
    var querystring = location.search.slice(1);
    var arr = querystring.split("&");
    for (var i = 0; i < arr.length; i++) {
        var subArr = arr[i].split("=");
        if (key === subArr[0]) {
            return subArr[1];
        }
    }
}
var id = getParam("id");

var box = document.getElementById("box");
$.ajax({
    url: "/PHP/getGoodsInfoById.php",
    type: "get",
    data: {
        id
    },
    dataType: "json"
})
    .then(function ({ error, data }) {
        box.innerHTML = `
        <div class="col-6">
        <div class="card">
            <img src="${data.goods_big_logo}" class="card-img-top" alt="...">
            <div class="card-body">
               
            </div>
          </div>
    </div>
    <div class="col-6 box_right">
    <img src="https://kaola-haitao.oss.kaolacdn.com/c0be3e6c11de4adb9ea90df712da9aea1419662386933i46mbwfo10003.png?x-oss-process=image/resize,w_48/quality,q_85" alt="..."> <span>韩国 | AHC</span>
    <p class="card-text" style=>${data.goods_name}</p>
        <p>【3步解决肌肤问题】：01洗面奶，泡沫丰富软化角质层，抗痘去黑头洗后不紧绷。02爽肤水，提亮肤色平衡肌肤水油，清爽不黏腻。03乳液，滋养粗糙肌肤保湿不粘腻</p>
         <div class="price_tag">
             <h3><span>售价</span><i>${'￥' + data.goods_price
            }</i ></h3 >
    <h3><span>分期</span>3期免息，预计可免3.43元</h3>
    <h3><span>更多组合</span> 男士三件套 | 149元
             神仙水+洁面 | 149元
             神仙水+眼霜 | 149元</h3>   
             <hr/>
             <p><em class="iconfont icon-huangguan"></em>单件可用2豆抵1元</p>  
         </div >
        <h4>库存:${data.goods_number}</h4>
        <h5 class="amount"><span>数量</span>
    <button type="button" class="btn increase" data-id="${data.goods_id}">+</button ><input type="text" class="input-num" id="input_num" value="0" /><button type="button" data-id="${data.goods_id}" class="btn decrease">-</button>
    </h5>
        <button type="button" id="btn" class="btn btn-primary" data-id="${data.goods_id}" >加入购物车</button> 
    </div >
        <div class="goodsinfo">
        <span>商品详情</span>
        ${ data.goods_introduce}  
        </div>     
        `
    })
    .catch(function (data) {
        console.log(data)
    }
    )
var goodsArr = [];
// 获取元素
$.ajax({
    url: "/PHP/getGoods.php",
    type: "get",
    data: {

    },
    dataType: "json"
})
    .then((data) => {
        console.log(data)
        if (!data.error) {
            goodsArr = data.msg;
        } else {
            throw new Error("请求失败");
        }
    })
    .catch((err) => {
        console.log(err)
    })
// var btn = document.getElementById("btn")

// btn.onclick = function () {
//     // 通过e.target判定触发事件的元素是否是加入购物车按钮
//     var goodsID = btn.getAttribute("data-id");
//     // 说明点到的是按钮
//     console.log("当前点的是按钮，商品id是" + goodsID);
//     // 哪个方法可以实现数组查询功能 
//     var goodsInfo = goodsArr.find((value) => {
//         return value.goods_id === goodsID;
//     })
//     // 1 先把本地存储中的数组取出来 
//     var shoppingCartString = localStorage.getItem("shoppingCart") || "[]";
//     // 2 转为数组
//     var shoppingCartArr = JSON.parse(shoppingCartString);
//     // 先判断数组里是否已经有这个对象 
//     var isExists = shoppingCartArr.find(value => value.goods_id === goodsID);
//     // 根据判定结果执行不同的业务逻辑 
//     if (isExists) {
//         isExists.count++;
//     } else {
//         // 3 往数组里加入选中的这个对象
//         goodsInfo.count = 1;
//         shoppingCartArr.push(goodsInfo);
//     }
//     // 4 回转成字符串并存到本地存储里
//     localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
//     // 跳转到购物车页面
//     location.href = "./shoppingCart.html";
// }
// //这个是数量加减按钮
var input_num = document.getElementById("input-num")
var amount = document.getElementsByClassName("amount")
amount.onclick = function (e) {
    if (e.target.className.includes("increase")) {
        // 获取id
        var id = e.target.getAttribute("data-id");
        // 根据id找到对应的数据
        var goodsInfo = shoppingCart.find(value => {
            return value.goods_id === id;
        });
        // 增加数据的count属性值
        goodsInfo.count++;
        input_num.value++
        update();
        return;
    }
    if (e.target.className.includes("decrease")) {
        // 获取id
        var id = e.target.getAttribute("data-id");
        // 根据id找到对应的数据
        var goodsInfo = shoppingCart.find(value => {
            return value.goods_id === id;
        });
        // 增加数据的count属性值
        goodsInfo.count--;
        if (goodsInfo.count <= 0) {
            goodsInfo.count = 0;
        }
        input_num.value++
        if (input_num.value <= 0) {
            input_num.value = 0;
        }
        return;

    }
}