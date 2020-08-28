; (function () {
    var username = $("#username");
    var password = $("#password");
    var loginBtn = $("#loginBtn");
    username.blur(function () {
        //获取输入的文本
        var val = username.val();
        //定义正则
        var reg = /^[^\d]\w{6,10}$/;
        //检测文本
        if (!reg.test(val)) {
            $("#usernameTips").text("请输入7~11位的英文字符，不能以数字开头");
        } else {
            $("#usernameTips").text("√");
        }
    })
    password.blur(function () {
        //获取输入的文本
        var val = password.val();
        //定义正则
        var reg = /^[^\d]\w{6,10}$/;
        //检测文本
        if (!reg.test(val)) {
            $("#passwordTips").text("请输入8~12位的数字");
        } else {
            $("#passwordTips").text("√");
        }
    })
    loginBtn.click(function () {
        $.ajax({
            url: "/PHP/login.php",
            type: "post",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            dataType: 'json',
        })
            .then(function (data) {
                if (!data.error) {
                    //先获取url的hash部分 用字符串的slice方法从这个参数截取到最后获取到url
                    //从别的页面跳转到登录页面的就会有hash部分所以截取地址在登录成功后就会跳回到原来的页面去那里，直接在登录页面跳转的就跳转到列表页面
                    var targetURL = location.hash.slice(1) || "./index.html";
                    // alert(data.msg);
                    //登录成功 跳转到列表页面！
                    location.href = targetURL;
                } else {
                    throw new Error(data.msg);
                }
            })
            .catch(function () {
                console.log(data)
            })
    })
})();