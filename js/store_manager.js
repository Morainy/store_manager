$("select option").click(function(){
    var id = $(this).attr("value");
     $("div").hide();//把之前显示的先隐藏
    $("#"+id+"").show();
});