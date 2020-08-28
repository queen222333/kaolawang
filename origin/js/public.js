$("#erweima").mouseenter(function() {
    $("#kaola_img").show();
 });
 $("#erweima").mouseleave(function() {
    $("#kaola_img").hide();
 });
 $("#header").on("click", ".ul", function() {
    $(this).child().color="white";           
 });
 $(".list-group").on("mouseenter", ".list-group-item", function() {
    $(this).parent().next().show(); 
    $(this).css({
        backgroundColor:"white",
        color:"red",
    })         
 });
 $(".list-group").on("mouseleave", ".list-group-item", function() {
    $(this).parent().next().hide();    
    $(this).css({
        backgroundColor:"red",
        color:"white",
    })       
 });