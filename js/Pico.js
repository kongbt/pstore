var next_page='http://vietalo.com/api.php';
//var next_page='http://picostore.local/api.php';
var root_page='http://vietalo.com/api.php';
//var root_page='http://picostore.local/api.php';
var current_page_index=0;
document.addEventListener("deviceready", onDeviceReady, false);
function onConfirm(buttonIndex) {
        	if (buttonIndex == 1)
            	navigator.app.exitApp();
}

function onDeviceReady(){
	document.addEventListener("backbutton", function(e){
		if($.mobile.activePage.is('#demo-page')){
			navigator.notification.confirm(
				'Do you really want to exit?.', // message
				onConfirm,            // callback to invoke with index of button pressed
				'Message',           // title
				'Yes,No'         // buttonLabels
			);	          
		}
		else {
			navigator.app.backHistory()
		}
	}, false);
}

$(document).ready(function() {
	function app_load(url_page, firsttime,type_cate,cate_id) {
	  $.mobile.showPageLoadingMsg("a", "Loading app for you ...");
			 
	   $( "#left-panel" ).panel( "close" );
	    //$("#content").html("<div id='Loading'> <img alt='' src='img/ajax-loader.gif'>  </div>");
	    $.ajax({
	        type: "POST",
	        url: url_page,
	        data: {
	        		action:'category',
	        		type:type_cate,
	        		_cl_rest:1,
	        		category_id: cate_id
	        	  },
	        dataType:'jsonp',
	        //contentType: 'application/json; charset=utf-8',
	        statusCode: {
	            404: function() {
	                $("#content").html('Không kết nối được đến.');
	            },
	            500: function() {
	                $("#content").html('Có lỗi từ phía server.');
	            }
	        },
	       	error: function (jqXHR, textStatus, errorThrown) {
	                console.log(textStatus + ': ' + errorThrown);
	                alert('Error: '+e);
	             
	        },
	        success: function(data) {
	        	$.mobile.loading( 'hide');
	        	var html_content="";
	        	var template="";
	        	var coms="";
	        	
	        	jQuery.each(data.result, function(index,val) {	        	
	        		var template=$("#app_temp").html();      		
	        		var html = Mustache.render(template, val);        		
	        		html_content=html_content + html;
	        	});   	
	        	
	        	$('#app-detail').html('');
	        	$("#app-hot").html(html_content);
	        	$("#app-hot").listview('refresh');
	        	
	        	if(cate_id != '' && cate_id != 0 && typeof cate_id !== "undefined"){
	        		$('#app-list').attr("title",cate_id);
	        	}else{
	        		$('#app-list').attr("title","");
	        	}
	           // $(html_content).insertBefore("#hot_app");
	       }
	   });
	 }
	
	function search_app_load(url_page, firsttime, keyword ,cate_id) {
	 
	   $.mobile.showPageLoadingMsg("a", "Loading app for you ...");
	   $( "#left-panel" ).panel( "close" );
	    $.ajax({
	        type: "POST",
	        url: url_page,
	        data: {
	        		action:'search',
	        		_cl_rest:1,
	        		keyword: keyword
	        	  },
	        dataType:'jsonp',
	        statusCode: {
	            404: function() {
	                $("#content").html('Không kết nối được đến.');
	            },
	            500: function() {
	                $("#content").html('Có lỗi từ phía server.');
	            }
	        },
	       	error: function (jqXHR, textStatus, errorThrown) {
	                console.log(textStatus + ': ' + errorThrown);
	                alert('Error: '+e);
	             
	        },
	        success: function(data) {
	        	$.mobile.loading( 'hide');
	        	var html_content="";
	        	var template="";
	        	var coms="";
	        	
	        	jQuery.each(data.result, function(index,val) {	        	
	        		var template=$("#app_temp").html();      		
	        		var html = Mustache.render(template, val);        		
	        		html_content=html_content + html;
	        	});   	
	        	
	        	$('#app-detail').html('');
	        	$("#app-hot").html(html_content);
	        	$("#app-hot").listview('refresh');
	        	
	        	if(cate_id != '' && cate_id != 0 && typeof cate_id !== "undefined"){
	        		$('#app-list').attr("title",cate_id);
	        	}
	       }
	   });
	 }
	
	/*load category*/
	function category_load(url_page) { 
		$.mobile.showPageLoadingMsg("a", "Loading app for you ...");
	    $.ajax({
	        type: "POST",
	        url: url_page,
	        data: {
	        	  	  action:'category_list',
	        	  	  _cl_rest:1
        	  	  },
	        dataType:'jsonp',
	        statusCode: {
	            404: function() {
	                $("#content").html('Không kết nối được đến.');
	            },
	            500: function() {
	                $("#content").html('Có lỗi từ phía server.');
	            }
	        },
	       	error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ': ' + errorThrown);
                alert('Error: '+e);
	        },
	        success: function(data) {
	        	var html_content="";
	        	var template="";
	        	
	        	jQuery.each(data.result, function(index,val) {	        	
	        		var template=$("#category_temp").html();      		
	        		var html = Mustache.render(template, val);        		
	        		
	        		html_content=html_content + html;
	        	});   	
		
	        	$("#category-List").html(html_content);	 
	        	$("#category-List").listview('refresh');
	        	console.log(html_content);
	       }
	   });
	 }
	
	/*load app detail*/
	function app_detail_load(url_page,firsttime,app_id) { 
	    $.ajax({
	        type: "POST",
	        url: url_page,
	        data: {
	        		action:'app_detail',
	        		_cl_rest:1,
	        		app_id:app_id
	        	  },
	        dataType:'jsonp',
	        statusCode: {
	            404: function() {
	                $("#content").html('Không kết nối được đến.');
	            },
	            500: function() {
	                $("#content").html('Có lỗi từ phía server.');
	            }
	        },
	       	error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ': ' + errorThrown);
                alert('Error: '+e);
	        },
	        success: function(data) {
	        	var html_content="";
	        	var template="";
	        	
	        	var template=$("#app_detail_temp").html();      		
        		var html = Mustache.render(template, data.result);        		
        		
        		html_content=html_content + html;
        		
        		$('#app-hot').html('');
        		$('#app-list').attr("title","");
	        	$("#app_detail").html(html_content);	        	
	        	//console.log(html_content);
	       }
	   });
	 }
	
	app_load(next_page, true, 1);
	category_load(root_page);
	
	$("#hot").on('click',function(){
		app_load(next_page, true, 2, $("#app-list").attr('title'));
	});
	
	$("#new").on('click',function(){
		app_load(next_page, true, 1, $("#app-list").attr('title'));
	});

	$("#topdown").on('click',function(){
		app_load(next_page, true, 3, $("#app-list").attr('title'));
	});
	
	$("#home").on('click',function(){
		app_load(next_page, true, 1);
	});
	
	/***Get list app when user search****/
	$("#search-app").on('change',function(){
		search_app_load(next_page,true,$(this).val());
 	});
	
	$("#mysearchbox").on('click', function(){
		$("#search-basic").toggle("slow");
	});
	
	$("#searchfooter").on('click', function(){
		$("#search-basic").toggle("slow");
	});
	
	$('body').on('click', 'li', function() {
	});
});