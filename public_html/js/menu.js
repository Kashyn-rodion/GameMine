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
	var space = w/5-100;
	var ctx = wnd.getContext('2d');
	ctx.font="16px Verdana";
	ctx.fillStyle = '#FF0000';
	var cur=0;
	var str;
	//рисуем фон
	ctx.drawImage(menu.img, 0,0,1,1,x,y,w,h);
	//рисуем жизни
	ctx.drawImage(menu.img, 0,0,100,50,cur,y,100,h);
	ctx.fillText(player.Energy,cur+30,y+32);
	cur+=100+space;
	//рисуем очки
	ctx.drawImage(menu.img, 100,0,100,50,cur,y,100,h);
	ctx.fillText(player.rate,cur+37,y+32);
	cur+=100+space;
	//рисуем энергию
	ctx.drawImage(menu.img, 200,0,100,50,cur,y,100,h);
	ctx.fillText(player.kir.toString(),cur+37,y+32);
	cur+=100+space;
	//рисуем время
	str = player.tlimit.toString();
	str = str.substring(0, 4);
	ctx.drawImage(menu.img, 300,0,100,50,cur,y,100,h);
	ctx.fillText(str,cur+37,y+32);
	cur+=100+space;
	//рисуем кнопку меню
	ctx.drawImage(menu.img, 400,0,100,50,cur,y,100,h);
	menu.mx = cur;
	menu.my = y;
}
function OnClic(x,y,menu, g)//функция обработки нажатия на кнопку меню (вызывается в основном коде при помощи jquery
{
	//alert('x='+x+' y='+y+' mx='+menu.mx+' my='+menu.my);
	if(x>=menu.mx && x <=menu.mx+100)
	{
            SaveState(g);
		alert('Menu');
     	}
}
