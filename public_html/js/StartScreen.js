function CMainMenu()
{
    this.img = new Image();
    this.img.src = 'image/main.png';
    this.x=0;
    this.y=0;
    this.w=0;
    this.h=0;
}
function CMenu()
{
    this.img = new Image();
    this.img.src = 'image/menumain.png';
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
           document.location.href = "Menu.html";
        }
    }
}

function OnClic_Menu(menu,x,y)
{
    var bx=menu.w*0.41;
    var by=menu.h*0.35;
    var bh=menu.h*0.43;
    var bw=menu.w*0.65;
    if(x>bx && x<bw)
    {
        if(y>by && y<bh)
        {
            
           document.location.href = "NewGame.html";
        }
        else
        {
            by=menu.h*0.46;
            bh=menu.h*0.54;
            if(y>by && y<bh)
            {
                document.location.href = "Resume.html";
            }
             else
            {
            by=menu.h*0.56;
            bh=menu.h*0.64;
            if(y>by && y<bh)
             {  
            alert('Levels');
             //  document.location.href = "Resume.html";
             }
           }
        }
       
    }

    
    
}