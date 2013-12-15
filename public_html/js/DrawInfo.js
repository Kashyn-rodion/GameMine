function CStat()
{
    this.fon = new Image();
    this.fon.src = 'image/ifon.jpg';
    this.stat = new Image();
    this.stat.src = 'image/statisticsWFN.png';
}
function ShowStatistic(ctx, cstat, x, y, w, h, player)
{
        ctx.drawImage(cstat.fon, x, y, w, h);
        var dx, dy, dw, dh;
        dw = w*0.53;
        dh = h*0.72;
        dx = parseInt((w/2) - (dw/2));
        dy = y;
        ctx.drawImage(cstat.stat, dx, dy, dw, dh);
        //выведем текст
        var fsize=dw*0.09;
        //var fsize=25;
	ctx.font=fsize.toString()+"px Verdana";
	ctx.fillStyle = '#FF0000';
        
        ctx.fillText(player.rate.toString(),dx+dw/2,dy+dh*0.48);
        ctx.fillText(player.Energy.toString(),dx+dw/2,dy+dh*0.59);
        ctx.fillText(player.kir.toString(),dx+dw/2,dy+dh*0.7);
        str = player.tlimit.toString().substring(0, 4);
        ctx.fillText(str,dx+dw/2,dy+dh*0.79);
        
}

