$(function () {
    getUserinfo();

    $('#btnLogout').on('click', function () {
        // alert("lf");
        // 提示用户是否确认退出
        var layer = layui.layer;
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清空本地token
            localStorage.removeItem('token');
            // 重新跳转到登录页面
            location.href = 'login.html';
            // 关闭弹出层
            layer.close(index);


        });
    });

})
// 获取用户的基本信息
function getUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 请求头配置对象
        // header: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            // 渲染用户头像
            renderAvatar(res.data);
        }
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status !== 0 && res.responseJSON.message !== "获取用户基本信息成功") {
        //         localStorage.removeItem('token');
        //         location.href = 'login.html'
        //     }
        // }

    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}