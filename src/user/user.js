// $(function () {
//     $('#list').accordion('getSelected').panel('collapse')
//   });
// 看这个api没有提供初始化时不显示一个，要百度一下看有没有搞得比较好，我这个方法有点延迟
// setTimeout(() => {
//     $('#list').accordion('unselect', 0)
// }, 0);

$('#name').combobox({
    valueField: 'id',
    textField: 'value',
    prompt: '请选择',
    data: [{
        id: 1,
        value: '服务器'
    }, {
        id: 2,
        value: 'Pc终端'
    }, {
        id: 3,
        value: 'win7系统'
    }]
});
$('#date1').datebox({
    required: true
});
$('#date2').datebox({
    required: true
});
$('#btn2').linkbutton({
    iconCls: 'icon-search',
    
});
$('#btn3').linkbutton({
    iconCls: 'icon-reload',
    onClick: function(){
        $('#userlist').datagrid('reload');
    }
});


$('#userlist').datagrid({
    url: '/user/list',
    method: 'get',
    fitColumns: true,
    checkOnSelect: false,
    toolbar: [{
        iconCls: 'icon-add',
        text: '新增',
        handler: addUser
    }, '-', {
        iconCls: 'icon-clear',
        text: '删除',
        handler: deletuser
    }, '-', {
        iconCls: 'icon-edit',
        text: '修改',
        handler: edituser
    }, '-', {
        iconCls: 'icon-search',
        text: '查看',
        handler: lookuser
    }],
    pagination: true,
    columns: [
        [{
            field: 'ck',
            title: '□',
            checkbox: true,
            width: 50,
            align: 'center'
        },
        {
            field: 'name',
            title: '姓名',
            width: 150,
            align: 'center'
        }, {
            field: 'code',
            title: '工号',
            width: 150,
            align: 'center'
        },
        {
            field: 'area',
            title: '地址',
            width: 150,
            align: 'center'
        },
        {
            field: 'education',
            title: '教育水平',
            width: 100,
            align: 'center'
        }

        ]
    ],
    loadFilter: function (data) {
        if (data.code == 0) {
            return data.data;
        } else {
            return {
                total: 0,
                rows: []
            }
        }

    }
});
function addUser() {
    $("#data").val();
    $('#add').dialog({
        title: '添加用户',
        width: 600,
        height: 400,
        href: './add.html',
        // method:'post',    
        modal: true,
        buttons: [{
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                var username = $("#username").textbox('getValue');
                var id = $('#id').textbox('getValue')
                var address = $("#address").textbox('getValue');
                var school = $("#level").combobox('getValue');
                if (username == '' || id == '' || address == '' || school == '') {
                    alert('请输入完整信息！')
                } else {
                    var obj = {
                        name: username,
                        code: id,
                        area: address,
                        education: school
                    };
                    $.ajax({
                        type: 'post',
                        url: '/user/add',
                        data: obj,
                        // 这个没用
                        // dataType: 'dataType',
                        success: function (result) {
                            // 一般这个是要成功之后进行的操作，都放在回调函数里面           
                            $('#add').dialog('close');
                            alert('新增成功！')
                            $('#userlist').datagrid('reload');
                            // console.log(result);
                        }
                    });
                }
            }
        }, {
            text: '关闭',
            iconCls: 'icon-clear',
            handler: function () {
                // 关闭
                $('#add').dialog('close')
            }
        }]
    });
}
function deletuser() {
    var index = $('#userlist').datagrid('getChecked');
    console.log(index);
    if (index.length == 0) {
        alert('没有选中行!');
    } else {
        var result = confirm('确认删除？');
        var str = "";
        if (result) {
            // var ss = [];
            //    for (var i=0; i<index.length; i++){
            //    第一种拼接字符串方法，尾巴容易多一个符号和空白//    str += index[i]._id + ','; 
            //    第二种拼接方法 用数组接收//  ss.push(index[i]._id);       
            //     //  Map
            //    } 
            //第三种用数组接受拼接字符串
            str = index.map(function (item) {
                return item._id;
            }).join(',');
            //    var _id = JSON.parse(str); 
            console.log(str);
            $.ajax({
                type: 'delete',
                url: '/user/delete',
                data: { _id: str },
                success: function (result) {
                    alert('删除成功');
                    $('#userlist').datagrid('reload');
                    console.log(result);
                }
            })
        } else {
            alert('删除失败！');
        }
    }
}
function edituser() {
    var index = $('#userlist').datagrid('getChecked');
    if (index.length == 0) {
        alert('没有选中行!');
    } else if (index.length >= 2) {
        alert('无法修改多行数据！');
    } else {
        //将获取的数据以字符串形式存在主页面
        var obj = index[0];
        var str = JSON.stringify(obj);
        $("#data").val(str);
        //进入面板中再从主页面获取字符串数据
        $('#add').dialog({
            title: '修改用户',
            width: 600,
            height: 400,
            href: './add.html',
            modal: true,
            buttons: [{
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var result = confirm('确认修改？');
                    if (result) {
                        var username = $("#username").textbox('getValue');
                        var id = $("#id").textbox('getValue');
                        var address = $("#address").textbox('getValue');
                        var school = $("#level").combobox('getValue');
                        var obj = {
                            name: username,
                            code: id,
                            area: address,
                            education: school
                        };
                        $.ajax({
                            type: 'put',
                            url: '/user/edit',
                            data: obj,
                            success: function (result) {
                                // 修改页面关闭          
                                $('#add').dialog('close');
                                $("#data").val({});
                                alert('修改成功！')
                                $('#userlist').datagrid('reload');
                            }
                        });
                    } else {
                        alert('修改失败！');
                    }
                }
            }, {
                text: '关闭',
                iconCls: 'icon-clear',
                handler: function () {
                    // 关闭
                    $('#add').dialog('close')
                }
            }]
        });
    }
}
function lookuser() {
    var index = $('#userlist').datagrid('getChecked');
    if (index.length == 0) {
        alert('没有选中行!');
    } else if (index.length >= 2) {
        alert('无法查看多行数据！');
    } else {
        var obj = index[0];
        var str = JSON.stringify(obj);
        $("#data").val(str);
        $("#add").dialog({
            title: '查看用户',
            width: 600,
            height: 400,
            href: './detail.html',
            modal: true,
            buttons: [{
                text: '确认',
                iconCls: 'icon-ok',
                handler: function () {
                    $.ajax({
                        type: 'get',
                        url: '/user/list',
                        data: obj,
                        success: function (result) {
                            // 修改页面关闭          
                            $('#add').dialog('close');
                            $("#data").val({});
                        }
                    });
                }}]
        });
    }
}
