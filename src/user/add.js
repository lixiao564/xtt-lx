
// $(function () {
//     var data = JSON.parse($("#data").val());
//     $("#username").textbox('setValue', 123);
// });
//判断内容用字符串，最好不要判断对象
var value = $("#data").val();
if (value != "") {
    var data = JSON.parse($("#data").val());
    $('#level').combobox({
        prompt: '教育水平',
        valueField: 'value',
        textField: 'text',
        editable: false,
        required: true,
        data: [{
            value: 'primary',
            text: '小学'
        }, {
            value: 'senior',
            text: '初中'
        }, {
            value: 'junior',
            text: '高中'
        }, {
            value: 'college',
            text: '大学'
        }, {
            value: 'graduated',
            text: '研究生'
        }]
    });
    $.parser.parse();
    $("#username").textbox('setValue', data.name);
    $("#id").textbox('setValue', data.code);
    $("#address").textbox('setValue', data.area);
    $("#level").combobox('setValue', data.education);

}else {
    $('#level').combobox({
        prompt: '教育水平',
        valueField: 'value',
        textField: 'text',
        editable: false,
        required: true,
        data: [{
            value: 'primary',
            text: '小学'
        }, {
            value: 'senior',
            text: '初中'
        }, {
            value: 'junior',
            text: '高中'
        }, {
            value: 'college',
            text: '大学'
        }, {
            value: 'graduated',
            text: '研究生'
        }]
    });
}
// console.log(data1);

