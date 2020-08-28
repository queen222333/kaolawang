var swiper = new Swiper('.swiper-container', {
    zoom: true,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function () {
            console.log('1111111')
        },
        touchStart: function () {
            console.log(123123123)
        },
        reachEnd: function () {
        }
    }
});
$(".price").click(function () {
    $(location).attr('href', './detail.html');
})
$(".img_box").mouseenter(function () {
    $(".icon-xin").show();
});
$(".img_box").mouseleave(function () {
    $(".icon-xin").hide();
});
$("#button-addon2").click(function () {
    $(location).attr('href', './list.html');
})
$(".shopping").click(function () {
    $(location).attr('href', './shoppingCart.html');
})
$(".shopping").css({
    cursor: "pointer",
});