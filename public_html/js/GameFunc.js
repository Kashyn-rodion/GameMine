function CGameInfo(player, map)//конструктор структуры данных, которая сохраняет все данные об игре
{
   this.Player = player;
   this.Map = map;
}
function SaveState(game)
{
    var str = '';
    str+=game.Player.x.toString()+';';
    str+=game.Player.y.toString()+';';
    str+=game.Player.Energy.toString()+';';
    str+=game.Player.rate.toString()+';';
    str+=game.Player.kir.toString()+';';
    str+=game.Player.tlimit.toString()+';';
    //запишим объект Map
    str+=game.Map.sx+';';
    str+=game.Map.sy+';';
    for(i=0;i<game.Map.sy;i++)
    {
        for(j=0;j<game.Map.sy;j++)        
        {
            str+=game.Map.blocs[i][j].toString()+';';            
        }
    }
    localStorage.setItem('GameMine',str);
}
function GetVal(str, pos)
{
    var res;
    tmp='';
            while(str[pos]!=';'&& pos<str.length)
            {
                tmp+=str[pos];        
                pos++;
            }
            pos++;
     res = [parseInt(tmp),pos];
    return res;
 }
function LoadState()
{
    var res;
    var d = localStorage.getItem('GameMine');
    if(d == null || d == undefined)
    {
      return null;
    }
    else
    {
        pos=0;
        var tmp;
        tmp=GetVal(d,pos);
        x=tmp[0];
        pos = tmp[1];
        tmp=GetVal(d,pos);
        y=tmp[0];
        pos = tmp[1];
        pl = new CPlayer(x,y);
        tmp=GetVal(d,pos);
        pl.Energy = tmp[0];
        pos = tmp[1];  
        tmp=GetVal(d,pos);
        pl.rate = tmp[0];
        pos = tmp[1];  
        tmp=GetVal(d,pos);
        pl.kir = tmp[0];
        pos = tmp[1];  
        tmp=GetVal(d,pos);
        pl.tlimit = tmp[0];
        pos = tmp[1];  
        //считаем карту
        tmp=GetVal(d,pos);
        pos = tmp[1];  
        x=tmp[0];
        tmp=GetVal(d,pos);
        pos = tmp[1];  
        y=tmp[0];
        map = new CMap(x,y);
         map.blocs = new Array(y)
         
         for(i=0;i<y;i++)
        {
            map.blocs[i]=new Array(x);
            for(j=0;j<x;j++)
            {
                tmp=GetVal(d,pos);
                pos = tmp[1];  
                map.blocs[i][j]=tmp[0];                
            }
        }
        res = new CGameInfo(pl,map);
         return res;
     }
        
}

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
    this.bld.src = 'image/blokD.jpg';

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
function YouWin(wnd,player,stat)
{
    var ctx = wnd.getContext('2d');
   
    ShowStatistic(ctx,stat,0,0,wnd.width,wnd.height, player );
    /*ctx.font = (parseInt(wnd.height / 11)).toString() + "px Verdana";
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, wnd.width, wnd.height);
    ctx.fillStyle = '#00FF00';
    ctx.fillText('You Win!!!', wnd.width / 4, wnd.height / 2);*/
}
function DrawMap(Map, wnd, cellSize, player) // отрисовка карты
{
    //if(typeof(Map) != 'undefind')
    //{
    wnd.width = Map.sx * cellSize;
    wnd.height = Map.sy * cellSize;

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
                    ctx.drawImage(Map.fon, j * cellSize, i * cellSize, cellSize, cellSize);
                    // alert('fon');
                    break;
                case 1:
                    ctx.drawImage(Map.bl, j * cellSize, i * cellSize, cellSize, cellSize);
                    // alert('bl');
                    break;
                case 2:
                    ctx.drawImage(Map.bl2, j * cellSize, i * cellSize, cellSize, cellSize);
                    // alert('bl2');
                    break;
                case 3:
                    ctx.drawImage(Map.blg, j * cellSize, i * cellSize, cellSize, cellSize);
                    // alert('blg');
                    break;
                case 4:
                    ctx.drawImage(Map.blk, j * cellSize, i * cellSize, cellSize, cellSize);
                    // alert('blk');
                    break;
                case 5:
                    if (player.rate >= targetRate)
                        ctx.drawImage(Map.bldO, j * cellSize, i * cellSize, cellSize, cellSize);
                    else
                        ctx.drawImage(Map.bld, j * cellSize, i * cellSize, cellSize, cellSize);
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
function DrawPlayer(player, cellSize, way, wnd)
{
    var ctx = wnd.getContext('2d');
    if(way)
        ctx.drawImage(player.img,player.x*cellSize,player.y*cellSize,cellSize,cellSize);
    else
    {
       flipImage(player.img,player.x*cellSize,player.y*cellSize,cellSize,cellSize,ctx,-1,0);
    }
//    DrawCapFlipImg(ctx, player.img, player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}
function PaintFrame(cellSize, game)
{
    if(window.innerWidth<window.innerHeight)
                {
                    if(game.Map.sx>game.Map.sy)
                       CellSize = window.innerWidth/(game.Map.sx+1.5);
                   else
                       CellSize = window.innerWidth/(game.Map.sy+1.5);
                }
                else
                {
                    if(game.Map.sx>game.Map.sy)
                       CellSize = window.innerHeight/(game.Map.sx+1.5);
                   else
                       CellSize = window.innerHeight/(game.Map.sy+1.5);
               }
                CellSize=parseInt(CellSize);
    example.width = CellSize*game.Map.sx;
    example.height = CellSize*game.Map.sy;
       DrawMenu(m_canv, game.Player, menu, 0, 0, cellSize * game.Map.sx, cellSize);
    if(status==1)
    {     
        YouLose(example);
    }
    if(status==2)
    {
        YouWin(example,game.Player,infoimage);
    }
  if(wait==0)
  {
    var way=true;
    var a;
    if (targetX != game.Player.x)
    {
        if (targetX < game.Player.x)
        {
            a = -1;
            way=false;
        }
        else
        {
            a = 1;
            way = true;
        }
        if (game.Map.blocs[game.Player.y][game.Player.x + a] != 2)
        {
            game.Player.x += a;
        }
        else
        {
            targetX = game.Player.x;
        }

    }
    else
    {
        if (targetY != game.Player.y)
        {
            if (targetY < game.Player.y)
            {
                a = -1;
                way=false;
            }
            else
            {
                a = 1;
                way = true;
            }
            if (game.Map.blocs[game.Player.y + a][game.Player.x] != 2)
            {
                game.Player.y += a;
            }
            else
            {
                targetY = game.Player.y;
            }
        }
    }

    switch (game.Map.blocs[game.Player.y][game.Player.x])
    {
        case 1:
            //alert('bloc 1');
            game.Player.Energy -= 3;
            game.Player.kir -= 5;
            wait=2;
            break;
        case 2:
            wait=0;
            break;
        case 3:
            game.Player.Energy -= 3;
            game.Player.kir -= 5;
            game.Player.rate += parseInt(getRandomArbitary(20, 200));
            wait=2;
            break;
        case 4:
            game.Player.Energy -= 3;
            game.Player.kir += parseInt(getRandomArbitary(5, 10));
            wait=2;
            break;
        case 5:
            if (game.Player.rate >= targetRate)
            {
               // YouWin(example,game.Player,infoimage);
               status=2;
                return;
            }
            break;
    }
    }
    else
        wait--;
    if (game.Player.tlimit > 0)
    {

        game.Player.tlimit -= 0.4;
        if (game.Map.blocs[game.Player.y][game.Player.x] != 5)
            game.Map.blocs[game.Player.y][game.Player.x] = 0;
        DrawMap(game.Map, example, cellSize, game.Player);
        DrawWay(game.Player, cellSize, example, game.Map);
        DrawPlayer(game.Player, cellSize,way ,example);
    }
    else
    {
        //alert('ok');
        game.Player.tlimit = 0;
        //YouLose(example);
        status=1;
    }
    //DrawMenu(m_canv, game.Player, menu, 0, 0, cellSize * game.Map.sx, cellSize);
    //	alert('Player x='+Player.x + ' y='+Player.y);
   
}



