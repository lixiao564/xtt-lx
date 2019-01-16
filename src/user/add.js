
$('#level').combobox({
    prompt:'教育水平',
    valueField:'value',    
    textField:'text',
    data: [{
        value: 'primary',
        text: '小学'
    },{
        value: 'senior',
        text: '初中'
    },{
        value: 'junior',
        text: '高中'
    },{
        value: 'college',
        text: '大学'
    },{
        value: 'graduated',
        text: '研究生'
    }] 
});