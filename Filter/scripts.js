$(function(){

 $("select").on("change",function(){

  $("img").hide();
  $("."+this.value).show();

 });

});