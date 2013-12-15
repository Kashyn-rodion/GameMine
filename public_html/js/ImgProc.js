function DrawCapImg(wnd, img, x, y, w, h)
{
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
 
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, w, h);
	
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var wndData = wnd.getImageData(x, y, w, h);
	var pixels = imageData.data;
	var pixWnd = wndData.data;
	var a, ma;
	for (var i = 0; i < pixels.length; i += 4) 
	{
	
		a = (pixels[i+3])/255;
		ma = 1-a;
	
		//
		pixWnd[i] = pixWnd[i] * ma + pixels[i] * a;
		pixWnd[i + 1] = pixWnd[i+1] * ma + pixels[i+1] * a;
		pixWnd[i + 2] = pixWnd[i+2] *ma + pixels[i+2] * a;
	}
 	wnd.putImageData(wndData, x, y);
}
function flipImage(image,x,y,width,height, ctx, flipH, flipV) 
{
    var scaleH = flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
        scaleV = flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
        posX = flipH ? (width+x) * -1 : x, // Set x position to -100% if flip horizontal 
        posY = flipV ? (height+y) * -1 : y; // Set y position to -100% if flip vertical
    ctx.save(); // Save the current state
    ctx.scale(scaleH, scaleV); // Set scale to flip the image
    ctx.drawImage(image, posX, posY, width, height); // draw the image
    ctx.restore(); // Restore the last saved state
};