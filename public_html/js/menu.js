function CMenu()
{
	this.img = new Image();
	this.img.src = 'image/menu.jpg';
	this.w;
	this.h;
	this.mx;
	this.my;
}

function DrawMenu(wnd, player, menu, x, y, w, h)
{
	wnd.width  = w;
	wnd.height = h;
	menu.w=w;
	menu.h=h;
        var bs = w/6;
        var tx=bs*0.37,ty=bs*0.32;
	var space =bs*0.2;
	var ctx = wnd.getContext('2d');
        var fsize=bs*0.17;
	ctx.font=fsize.toString()+"px Verdana";
	ctx.fillStyle = '#FF0000';
	var cur=space/2;
        var str;
	//рисуем фон
	ctx.drawImage(menu.img, 0,0,1,1,x,y,w,h);
	//рисуем жизни
	ctx.drawImage(menu.img, 0,0,100,50,cur,y,bs,h);
	ctx.fillText(player.Energy,cur+tx,y+ty);
	cur+=bs+space;
	//рисуем очки
	ctx.drawImage(menu.img, 100,0,100,50,cur,y,bs,h);
	ctx.fillText(player.rate,cur+tx,y+ty);
	cur+=bs+space;
	//рисуем энергию
	ctx.drawImage(menu.img, 200,0,100,50,cur,y,bs,h);
	ctx.fillText(player.kir.toString(),cur+tx,y+ty);
	cur+=bs+space;
	//рисуем время
	str = player.tlimit.toString();
	str = str.substring(0, 4);
	ctx.drawImage(menu.img, 300,0,100,50,cur,y,bs,h);
	ctx.fillText(str,cur+tx,y+ty);
	cur+=bs+space;
	//рисуем кнопку меню
	ctx.drawImage(menu.img, 400,0,100,50,cur,y,bs,h);
	menu.mx = cur;
	menu.my = y;
}
function OnClic(x,y,menu, g)//функция обработки нажатия на кнопку меню (вызывается в основном коде при помощи jquery
{
	//alert('x='+x+' y='+y+' mx='+menu.mx+' my='+menu.my);
	if(x>=menu.mx && x <=menu.mx+100)
	{
            SaveState(g);
		//alert('Menu');
                document.location.href = "Menu.html";
     	}
}
