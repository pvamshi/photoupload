function getStartResize(eventObject){
	resizer = this;

	if ( resizer.__resizeIsActive ) return;
	eventObject.stopPropagation();
	eventObject.preventDefault();
	resizer.__direction = resizer.style.cursor;
	
	initializeResizeSelection(resizer);
	var borderFrame = $(".capturecontainer")[0];
	borderFrame.resizeStartX	= eventObject.screenX;
	borderFrame.resizeStartY	= eventObject.screenY;

	calculateBoundaries(resizer); // Calculate max/min allowed boundaries over all selected objects;
	
	$( document.body ).on( "mousemove",  getResizer( resizer ));
    $( document.body ).on( "mouseup",  getStopResize( resizer ));
	resizer.__resizeIsActive = true;
}

function calculateBoundaries(resizer)
{
	var minDiffX = 0;
	var maxDiffX = 0;
	var minDiffY = 0;
	var maxDiffY = 0;
	var direction = resizer.id;


	var obj = $(".capturecontainer")[0];
	obj.__minimumWidth =  40;
	obj.__minimumHeight = 40;

	if ( obj )
	{
		
		if ( direction == "topLeftResizer" || direction == "bottomLeftResizer")
		{
			minDiffX = 0 - obj.__orgLeft;
			maxDiffX = obj.offsetWidth + obj.__orgRight;
			maxDiffX = Math.min(maxDiffX, obj.offsetWidth - obj.__minimumWidth);
		}
		else // RIGHT
		{
			maxDiffX = obj.__orgRight;
			minDiffX = 0 - obj.offsetWidth - obj.__orgLeft;
			minDiffX = Math.max(minDiffX, obj.__minimumWidth - obj.offsetWidth );
		}

		obj.__minDiffX = minDiffX;
		obj.__maxDiffX = maxDiffX;

		if ( direction == "topLeftResizer" || direction == "topRightResizer")
		{
			minDiffY = 0 - obj.__orgTop;
			maxDiffY = obj.offsetHeight + obj.__orgBottom;
			maxDiffY = Math.min(maxDiffY, obj.offsetHeight - obj.__minimumHeight);
		}
		else // BOTTOM
		{
			maxDiffY = obj.__orgBottom;
			minDiffY = 0 - obj.offsetHeight - obj.__orgTop;
			minDiffY = Math.max(minDiffY, obj.__minimumHeight - obj.offsetHeight);
		}
		
		obj.__minDiffY = minDiffY;
		obj.__maxDiffY = maxDiffY;
		
	}
}

function initializeResizeSelection(resizer){
	getOriginalDimensions(resizer);
}

function getOriginalDimensions(){
	var obj = $(".capturecontainer")[0]
	obj.__orgWidth = parseInt($(obj).css("width"));
	obj.__orgHeight = parseInt($(obj).css("height"));
	obj.__orgTop = parseInt($(obj).css("top"));
	obj.__orgLeft = parseInt($(obj).css("left"));
	obj.__orgRight = parseInt($("#editImageContainer").css("width")) - obj.__orgLeft - parseInt($(".capturecontainer").css("width"));
	obj.__orgBottom = parseInt($("#editImageContainer").css("height")) - obj.__orgTop - parseInt($(".capturecontainer").css("height"));


}
//onmousemove
function getResizer( resizer ){

	return function( eventObject ){
		eventObject.stopPropagation();
		eventObject.preventDefault();

		var obj = $(".capturecontainer")[0];
		
		var diffWidth = eventObject.screenX - obj.resizeStartX;
		var diffHeight = eventObject.screenY - obj.resizeStartY;

		diffWidth = Math.max(diffWidth,obj.__minDiffX); 
		diffWidth = Math.min(diffWidth,obj.__maxDiffX);
		diffHeight = Math.max(diffHeight,obj.__minDiffY);
		diffHeight = Math.min(diffHeight,obj.__maxDiffY);


		if(resizer.id == "topLeftResizer"){
			$(obj).css("width", obj.__orgWidth + (-diffWidth) + "px");
			$(obj).css("height", obj.__orgHeight + (-diffHeight) + "px");
			$(obj).css("left", obj.__orgLeft + diffWidth + "px");
			$(obj).css("top", obj.__orgTop + diffHeight + "px");

			$(".outercapturecontainer").css("width", obj.__orgWidth + (-diffWidth) + "px");
			$(".outercapturecontainer").css("height", obj.__orgHeight + (-diffHeight) + "px");
			$(".outercapturecontainer").css("left", obj.__orgLeft + diffWidth -1 + "px");
			$(".outercapturecontainer").css("top", obj.__orgTop + diffHeight -1 + "px");

			$("#topLeftResizer").css("left", parseInt($(obj).css("left")) - 15 + "px");
	      	$("#topLeftResizer").css("top", parseInt($(obj).css("top")) - 15 + "px");

	      	$("#topRightResizer").css("top", parseInt($(obj).css("top")) - 15 + "px");

	      	$("#bottomLeftResizer").css("left", parseInt($(obj).css("left")) - 15 + "px");
	      	$("#bottomLeftResizer").css("top", parseInt($("#topLeftResizer").css("top")) + parseInt($(obj).css("height")) + "px");

	      	$("#topTransparent").css("height", $(obj).css("top"));
	      	$("#leftTransparent").css("width", $(obj).css("left"));
	      	$("#leftTransparent").css("height", $(obj).css("height"));
	      	$("#leftTransparent").css("top", $(obj).css("top"));
	      	$("#rightTransparent").css("height", $(obj).css("height"));
	      	$("#rightTransparent").css("top", $(obj).css("top"));



		}else if(resizer.id == "topRightResizer"){
			$(obj).css("width", obj.__orgWidth + (diffWidth) + "px");
			$(obj).css("height", obj.__orgHeight + (-diffHeight) + "px");
			//$(obj).css("left", obj.__orgLeft + diffWidth + "px");
			$(obj).css("top", obj.__orgTop + diffHeight + "px");

			$(".outercapturecontainer").css("width", obj.__orgWidth + (diffWidth) + "px");
			$(".outercapturecontainer").css("height", obj.__orgHeight + (-diffHeight) + "px");
			//$(".outercapturecontainer").css("left", obj.__orgLeft + diffWidth -1 + "px");
			$(".outercapturecontainer").css("top", obj.__orgTop + diffHeight -1 + "px");

			$("#topRightResizer").css("left", parseInt($(obj).css("width")) + parseInt($("#topLeftResizer").css("left")) + "px");
	      	$("#topRightResizer").css("top", parseInt($(obj).css("top")) - 15 + "px");

	      	$("#topLeftResizer").css("top", parseInt($(obj).css("top")) - 15 + "px");

	      	$("#bottomRightResizer").css("left", $("#topRightResizer").css("left"));

	      	$("#topTransparent").css("height", $(obj).css("top"));
	      	$("#leftTransparent").css("width", $(obj).css("left"));
	      	$("#leftTransparent").css("height", $(obj).css("height"));
	      	$("#leftTransparent").css("top", $(obj).css("top"));
	      	$("#rightTransparent").css("height", $(obj).css("height"));
	      	$("#rightTransparent").css("top", $(obj).css("top"));
	      	$("#rightTransparent").css("width", parseInt($("#editImageContainer").css("width")) - (parseInt($(obj).css("left")) + parseInt($(obj).css("width"))) + "px");
	        $("#rightTransparent").css("left", parseInt($(obj).css("left")) + parseInt($(obj).css("width")) + "px");

		}else if(resizer.id == "bottomRightResizer"){
			$(obj).css("width", obj.__orgWidth + (diffWidth) + "px");
			$(obj).css("height", obj.__orgHeight + diffHeight + "px");

			$(".outercapturecontainer").css("width", obj.__orgWidth + (diffWidth) -1 + "px");
			$(".outercapturecontainer").css("height", obj.__orgHeight + diffHeight -1 + "px");

			$("#topRightResizer").css("left", parseInt($(obj).css("width")) + parseInt($("#topLeftResizer").css("left")) + "px");

	      	$("#bottomRightResizer").css("left", $("#topRightResizer").css("left"));
	      	$("#bottomRightResizer").css("top", parseInt($("#topLeftResizer").css("top")) + parseInt($(obj).css("height")) + "px");

	      	$("#bottomLeftResizer").css("top", $("#bottomRightResizer").css("top"));

	      	$("#leftTransparent").css("height", $(obj).css("height"));
	      	$("#rightTransparent").css("height", $(obj).css("height"));
	      	$("#rightTransparent").css("width", parseInt($("#editImageContainer").css("width")) - (parseInt($(obj).css("left")) + parseInt($(obj).css("width"))) + "px");
	      	$("#rightTransparent").css("left", (parseInt($(obj).css("left")) + parseInt($(obj).css("width"))) + "px");
	      	$("#bottomTransparent").css("height", parseInt($("#editImageContainer").css("height")) - ( parseInt($(obj).css("top")) + parseInt($(obj).css("height")) ) + "px");
	      	$("#bottomTransparent").css("top", parseInt($(obj).css("top")) + parseInt($(obj).css("height")) + "px");

		}else if(resizer.id == "bottomLeftResizer"){
			$(obj).css("width", obj.__orgWidth + (-diffWidth) + "px");
			$(obj).css("height", obj.__orgHeight + diffHeight + "px");
			$(obj).css("left", obj.__orgLeft + (diffWidth) + "px");

			$(".outercapturecontainer").css("width", obj.__orgWidth + (-diffWidth) - 1 + "px");
			$(".outercapturecontainer").css("height", obj.__orgHeight + diffHeight - 1 + "px");
			$(".outercapturecontainer").css("left", obj.__orgLeft + (diffWidth) + "px");

	      	$("#bottomRightResizer").css("top", parseInt($("#topLeftResizer").css("top")) + parseInt($(obj).css("height")) + "px");

	      	$("#topLeftResizer").css("left", parseInt($(obj).css("left")) - 15 + "px");

	      	$("#bottomLeftResizer").css("top", $("#bottomRightResizer").css("top"));
	      	$("#bottomLeftResizer").css("left", parseInt($(obj).css("left")) - 15 + "px");

	      	$("#leftTransparent").css("height", $(obj).css("height"));
	      	$("#leftTransparent").css("width", parseInt($(obj).css("left")) + "px");
	      	$("#rightTransparent").css("height", $(obj).css("height"));
	      	
	      	$("#bottomTransparent").css("height", parseInt($("#editImageContainer").css("height")) - ( parseInt($(obj).css("top")) + parseInt($(obj).css("height")) ) + "px");
	      	$("#bottomTransparent").css("top", parseInt($(obj).css("top")) + parseInt($(obj).css("height")) + "px");
		}
	}
}

function getStopResize(resizer){
	return function( eventObject ){
		if ( resizer.__resizeIsActive)
		{
			eventObject.stopPropagation();
			eventObject.preventDefault();
			$( document.body ).off( "mousemove");
			resizer.__resizeIsActive = false;
		}
	}
}