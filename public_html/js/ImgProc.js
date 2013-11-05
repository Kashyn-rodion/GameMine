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
