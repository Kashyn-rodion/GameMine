function getRandomArbitary(min, max)
{
    return Math.random() * (max - min) + min;
}
function CMap(sX, sY)//конструктор карты
{
    this.blocs;
    this.sx = sX;
    this.sy = sY;

    //	this.img = new Image();
    //	this.img.src = 'image/map.jpg';

    this.bl = new Image();
    this.bl.src = 'image/bl.jpg';

    this.bl2 = new Image();
    this.bl2.src = 'image/bl2.jpg';

    this.blg = new Image();
    this.blg.src = 'image/blg.jpg';

    this.bld = new Image();
    this.bld.src = 'image/bld.jpg';

    this.bldO = new Image();
    this.bldO.src = 'image/blDO.jpg';

    this.blk = new Image();
    this.blk.src = 'image/blK.jpg';

    this.fon = new Image();
    this.fon.src = 'image/fon.jpg';
}
function YouLose(wnd)
{
    var ctx = wnd.getContext('2d');
    ctx.font = (parseInt(wnd.height / 11)).toString() + "px Verdana";
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, wnd.width, wnd.height);
    ctx.fillStyle = '#FF0000';
    ctx.fillText('You lose!!!', wnd.width / 4, wnd.height / 2);
}
function YouWin(wnd)
{
    var ctx = wnd.getContext('2d');
    ctx.font = (parseInt(wnd.height / 11)).toString() + "px Verdana";
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, wnd.width, wnd.height);
    ctx.fillStyle = '#00FF00';
    ctx.fillText('You Win!!!', wnd.width / 4, wnd.height / 2);
}
function DrawMap(Map, wnd, player) // отрисовка карты
{
    //if(typeof(Map) != 'undefind')
    //{
    wnd.width = Map.sx * 50;
    wnd.height = Map.sy * 50;

    var ctx = wnd.getContext('2d');
    // ctx.drawImage(Map.img, 0,0,wnd.width,wnd.height);

    for (var i = 0; i < Map.sy; i++)
    {
        for (var j = 0; j < Map.sx; j++)
        {
            // ctx.drawImage(Map.fon, i*50,j*50,50,50);
            switch (Map.blocs[i][j])
            {
                case 0:
                    ctx.drawImage(Map.fon, j * 50, i * 50, 50, 50);
                    // alert('fon');
                    break;
                case 1:
                    ctx.drawImage(Map.bl, j * 50, i * 50, 50, 50);
                    // alert('bl');
                    break;
                case 2:
                    ctx.drawImage(Map.bl2, j * 50, i * 50, 50, 50);
                    // alert('bl2');
                    break;
                case 3:
                    ctx.drawImage(Map.blg, j * 50, i * 50, 50, 50);
                    // alert('blg');
                    break;
                case 4:
                    ctx.drawImage(Map.blk, j * 50, i * 50, 50, 50);
                    // alert('blk');
                    break;
                case 5:
                    if (player.rate >= targetRate)
                        ctx.drawImage(Map.bldO, j * 50, i * 50, 50, 50);
                    else
                        ctx.drawImage(Map.bld, j * 50, i * 50, 50, 50);
                    // alert('bld');
                    break;
            }

        }
    }
    //}
}

function CPlayer(X, Y)// конструктор класса игрок
{
    this.x = X;
    this.y = Y;
    this.Energy = 200;
    this.img = new Image;
    this.img.src = 'image/men.gif';
    this.ball = new Image;
    this.ball.src = 'image/ball.png';
    this.rate = 0;//очки
    this.kir = 300;//запас прочности кирки
    this.tlimit = 60;//запас времени
}
function DrawWay(player, cellSize, wnd, Map)
{
    var px = player.x;
    var py = player.y;
    var tx = targetX;
    var ty = targetY;
    var ctx = wnd.getContext('2d');
    //ctx.drawImage(player.ball, px * cellSize, py * cellSize, cellSize, cellSize);
    var a;
    while (tx != px)
    {
        if (tx < px)
            a = -1;
        else
            a = 1;
        if (Map.blocs[py][px + a] != 2)
        {
            px += a;
        }
        else
        {
            tx = px;
        }

        ctx.drawImage(player.ball, px * cellSize, py * cellSize, cellSize, cellSize);
    }
    while (ty != py)
    {

        if (ty < py)
            a = -1;
        else
            a = 1;
        if (Map.blocs[py + a][px] != 2)
        {
            py += a;
        }
        else
        {
            ty = py;
        }
        ctx.drawImage(player.ball, px * cellSize, py * cellSize, cellSize, cellSize);
    }
}
function DrawPlayer(player, cellSize, wnd)
{
    var ctx = wnd.getContext('2d');
    //ctx.drawImage(player.img,player.x*cellSize,player.y*cellSize,cellSize,cellSize);
    DrawCapImg(ctx, player.img, player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}
function PaintFrame()
{
    //alert('OnPaint');
    //
    var a;
    if (targetX != Player.x)
    {
        if (targetX < Player.x)
            a = -1;
        else
            a = 1;
        if (Map.blocs[Player.y][Player.x + a] != 2)
        {
            Player.x += a;
        }
        else
        {
            targetX = Player.x;
        }

    }
    else
    {
        if (targetY != Player.y)
        {
            if (targetY < Player.y)
                a = -1;
            else
                a = 1;
            if (Map.blocs[Player.y + a][Player.x] != 2)
            {
                Player.y += a;
            }
            else
            {
                targetY = Player.y;
            }
        }
    }

    switch (Map.blocs[Player.y][Player.x])
    {
        case 1:
            //alert('bloc 1');
            Player.Energy -= 3;
            Player.kir -= 5;
            break;
        case 3:
            Player.Energy -= 3;
            Player.kir -= 5;
            Player.rate += parseInt(getRandomArbitary(20, 200));
            break;
        case 4:
            Player.Energy -= 3;
            Player.kir += parseInt(getRandomArbitary(5, 10));
            break;
        case 5:
            if (Player.rate >= targetRate)
            {
                YouWin(example);
                return;
            }
            break;
    }

    if (Player.tlimit > 0)
    {

        Player.tlimit -= 0.4;
        if (Map.blocs[Player.y][Player.x] != 5)
            Map.blocs[Player.y][Player.x] = 0;
        DrawMap(Map, example, Player);
        DrawWay(Player, 50, example, Map);
        DrawPlayer(Player, 50, example);
    }
    else
    {
        //alert('ok');
        Player.tlimit = 0;
        YouLose(example);
    }
    DrawMenu(m_canv, Player, menu, 0, 0, 50 * Map.sx, 50);
    //	alert('Player x='+Player.x + ' y='+Player.y);

}



