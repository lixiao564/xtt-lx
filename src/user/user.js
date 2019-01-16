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
    iconCls: 'icon-search'
});
$('#btn3').linkbutton({
    iconCls: 'icon-reload'
});


$('#userlist').datagrid({
    url: '/user/list',
    method: 'get',
    fitColumns: true,
    toolbar: [{
        iconCls: 'icon-edit',
        text: '新增',
        handler: addUser
    }, '-', {
        iconCls: 'icon-clear',
        text: '删除',
        handler: function () {

        }
    }],
    // pagination: true,
    columns: [
        [{
            //     field: 'ck',
            //     title: '□',
            //     checkbox: true,
            //     width: 50,
            //     align: 'center'
            // },
            // {
            //     field: 'list',
            //     title: '#',
            //     width: 50,
            //     align: 'center'
            // },
            // {
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
});

function addUser() {
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
                    success: function (resulut) {
                        // 一般这个是要成功之后进行的操作，都放在回调函数里面
                        $('#add').dialog('refresh');
                        console.log(result);
                    }
                });
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
