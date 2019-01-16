
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
    prompt:'请选择',
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
// $('#hh').tabs('add',{

// })

$('#userlist').datagrid({
    // url: './data',
    fitColumns: true,
    toolbar: [{
        iconCls: 'icon-edit',
        text: '新增'
    },'-',{
        iconCls: 'icon-clear',
        text: '删除'
    }],
    pagination: true,
    columns: [
        [{
                field: 'ck',
                title: '□',
                checkbox: true,
                width: 50
            },
            {
                field: 'list',
                title: '#',
                width: 50
            },
            {
                field: 'id',
                title: '配置文件编号',
                width: 150
            },
            {
                field: 'name',
                title: '配置文件名称',
                width: 150
            },
            {
                field: 'type',
                title: '配置文件类型',
                width: 150
            },
            {
                field: 'group',
                title: '用户组',
                width: 100
            },
            {
                field: 'time',
                title: '生成时间',
                width: 100
            },
            {
                field: 'yn',
                title: '有效性',
                width: 100
            },
        ]
    ],


});
$('#page').pagination({
    total:20,
    pageSize:10
});
