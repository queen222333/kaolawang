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
            $.ajax({
                url: "/PHP/checkusername.php",
                type: "get",
                data: {
                    username: val
                },
                dataType: "json"
            })
                .then(function (data) {
                    console.log(data) //因为.then接收的就是成功后rosolve的参数。即后台返回的obj
                    if (!data.error) {
                        $("#usernameTips").text("√");
                    } else {
                        $("#usernameTips").text(data.msg);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
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
    $("#loginBtn").click(function () {
        $.ajax({
            url: "/PHP/regist.php",
            type: "post",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            dataType: 'json',
        })
            .then(function (data) {
                if (!data.error) {
                    //成功之后 我们要跳转到登录页面
                    location.href = "./login.html";
                } else {
                    throw new Error(data.msg);
                }
            })
            .catch(function (data) {
                console.log(data)
            })
    })
})();