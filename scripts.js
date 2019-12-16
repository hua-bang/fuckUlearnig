'use strict';

try {
    chrome.extension.onMessage.addListener(function (request, _, response) {
        // console.log(request);
        switch(request.contextMenuId){
            case "fillBlanks":fillBlanks();break;
            case "showAnswer":showAnswer();break;
            case "addSpeed15x":addSpeed15x();break;
            case "fillChoice":fillChoice();break;
            case "fillJudge":fillJudge();break;
        }
        // console.log(response);
        response({farewell: "ok"});
    });
} catch (error) {
    alert("插件加载失败\n原因：" + error);
}

function fillBlanks() {
    var sqList = [];
    var re = [];
    $('.show-answer').each(function (k, v) {
        var id = $(v).attr("id").replace(/[A-Za-z]+/,"")
        console.log(id)
        sqList.push(id)
    });
    
    $(sqList).each(function (k, id) {
        $.ajax({
            async: false,
            type: "get",
            url: 'https://api.ulearning.cn/questionAnswer/' + id,
            datatype: 'json',
            success: function (result) {
                re.push(result.correctAnswerList);
            }
        });
    });
    console.log(re);
    var an = [];
    $(re).each(function (k, v) {
        v.map(function(value){
            an.push(value)
        })
    });
    $(".blank-input").each(function(k,v){
        v.value = an.shift()
    })
    
}
function fillChoice()
{
	var sqList = [];
    var re = [];
    $('.question-wrapper').each(function (k, v) {
        var id = $(v).attr('id');
        $.ajax({
            async: false,
            type: "get",
            url: 'https://api.ulearning.cn/questionAnswer/' + id.replace('question', ''),
            datatype: 'json',
            success: function (result) {
                re.push(result.correctAnswerList);
            }
        });
    });
    console.log(re);
    //console.log(sqList);
    $(re).each(function (k, v) {
        // console.log($('.choice-list')[k]);
        console.log(v);
        var choice_list = $($('.choice-list')[k]).find('div.checkbox');
        for (var i = v.length - 1; i >= 0; i--) {
        	switch(v[i]){
        		case 'A':
        			$(choice_list[0]).trigger("click");
        			break;
        		case 'B':
        			$(choice_list[1]).trigger("click");
        			break;
        		case 'C':
        			$(choice_list[2]).trigger("click");
        			break;
        		case 'D':
        			$(choice_list[3]).trigger("click");
        			break;
        		default:
        			break;
        	}
        }
        console.log($($('.choice-list')[k]).find('div.checkbox'));
    });



}
function showAnswer() {
    var sqList = [];
    var re = [];
    $('.question-wrapper').each(function (k, v) {
        var id = $(v).attr('id');
        sqList.push(id.replace('question', ''));
    });
    //console.log(sqList);
    $(sqList).each(function (k, id) {
        $.ajax({
            async: false,
            type: "get",
            url: 'https://api.ulearning.cn/questionAnswer/' + id,
            datatype: 'json',
            success: function (result) {
                re.push(result.correctAnswerList);
            }
        });
    });
    //console.log(re);
    var an = [];
    $(re).each(function (k, v) {
        an.push(v.join(','));
    });
    var t = $('.question-wrapper').find('.question-title-html');
    t.each(function (k, v) {
        //console.log(v);
        $(v).after('<span style="color:red;">答案：' + an.shift() + '</span>');
    });
}

function addSpeed15x() {
	$('.mejs__speed-selector-input').each(function (k, v) {
		v.value=15.00;
	});
	$('.mejs__speed-selector-label').each(function(k,v){
		v.innerText = '15.00x';
	});
}

function fillJudge(){
    var sqList = [];
    var re = [];
    $('.show-answer').each(function (k, v) {
        var id = $(v).attr("id").replace(/[A-Za-z]+/,"")
        console.log(id)
        sqList.push(id)
    });
    
    $(sqList).each(function (k, id) {
        $.ajax({
            async: false,
            type: "get",
            url: 'https://api.ulearning.cn/questionAnswer/' + id,
            datatype: 'json',
            success: function (result) {
                re.push(result.correctAnswerList);
            }
        });
    });
    console.log(re);
    var an = [];
    $(re).each(function (k, v) {
            an.push(v.toString())
    });
    $('.checking-type').each(function(k,v){
        if(an.shift()=="true")
            $($(v).find(".right-btn")).trigger("click");    
        else
            $($(v).find(".wrong-btn")).trigger("click");    
    })
}