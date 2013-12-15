function CMainMenu()
{
    this.img = new Image();
    this.img.src = 'image/main.png';
    this.x=0;
    this.y=0;
    this.w=0;
    this.h=0;
}
function DrawMainMenu(wnd,x,y,w,h)
{
    canv.width=window.innerWidth;
    canv.height = window.innerHeight;

     var ctx = wnd.getContext('2d');
     ctx.drawImage(m.img, x,y,w,h);   
     m.x = x;
     m.y = y;
     m.w = w;
     m.h = h;
     
}
function OnClic_MainMenu(menu,x,y)
{
    var bx=menu.w*0.39;
    var by=menu.h*0.68;
    var bh=menu.h*0.077;
    var bw=menu.w*0.238;
    if(x>bx && x<bx+bw)
    {
        if(y>by && y<by+bh)
        {
           // alert("All right");    
           document.location.href = "Level1.html";
        }
    }
}