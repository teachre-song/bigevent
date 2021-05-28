$(function () {

    var form = layui.form
    var layer = layui.layer

    // 昵称的验证
    form.verify({
        nickname: function (value) {
            // 判断昵称的长度必须是1~6个字符
            if (value.length > 6) {
                return "昵称必须在1~6个字符之间"
            }
        }
    })

    // 获取用户的基本信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        {
            e.preventDefault();
            initUserInfo();
        }
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败');
                }
                layer.msg('更新用户信息成功');
                window.parent.getUserinfo();
            }
        })
    })


})