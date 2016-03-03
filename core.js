function DragObject(element) {
	element.dragObject = this;
	DragAndDrop.makeDraggable(element);
}

var DragAndDrop = (function() {
	var dragObject;
	var mouseOffset;
        
	// получить сдвиг target относительно курсора мыши
	function getMouseOffset(target, e) {
		var docPos = getPosition(target);
		return {x:e.pageX - docPos.x, y:e.pageY - docPos.y};
	}

	function mouseUp(){
		dragObject = null;
		document.onmousemove = null;
		document.onmouseup = null;
		document.ondragstart = null;
		document.body.onselectstart = null;
	}

	function mouseMove(e){
		e = fixEventMouse(e);

        	with(dragObject.style) {
			top = e.pageY - mouseOffset.y + 'px';
			left = e.pageX - mouseOffset.x + 'px';
		}
		return false;
	}
        
        function mouseDown(e) {
		e = fixEventMouse(e);
		if (e.which !== 1) return;
                
                switch (this)
                {
                    case document.getElementById('head1'): dragObject = document.getElementById('canvas1'); break;
                    case document.getElementById('head2'): dragObject = document.getElementById('canvas2'); break;
                    case document.getElementById('head3'): dragObject = document.getElementById('canvas3'); break;
                    case document.getElementById('head5'): dragObject = document.getElementById('canvas5'); break;
                    case document.getElementById('canvas4'): dragObject = document.getElementById('canvas4'); break;
                    case w[0]: dragObject = w[0]; break;
		    case w[1]: dragObject = w[1]; break;
		    case w[2]: dragObject = w[2]; break;
                    case w[3]: dragObject = w[3];
                } 
                
		// получить сдвиг элемента относительно курсора мыши
		mouseOffset = getMouseOffset(this, e);

		// эти обработчики отслеживают процесс и окончание переноса
		document.onmousemove = mouseMove;
		document.onmouseup = mouseUp;

		// отменить перенос и выделение текста при клике на тексте
		document.ondragstart = function() { return false; };
		document.body.onselectstart = function() { return false; };
                
		return false;
	}

	return { makeDraggable: function(element){ element.onmousedown = mouseDown; }};
}());

function getPosition(e){
	var left = 0;
	var top  = 0;

	while (e.offsetParent){
		left += e.offsetLeft;
		top  += e.offsetTop;
		e = e.offsetParent;
	}

	left += e.offsetLeft;
	top  += e.offsetTop;

	return {x:left, y:top};
}

function fixEventMouse(e) {
	// получить объект событие для IE
	e = e || window.event;

	// добавить pageX/pageY для IE
	if ( e.pageX === null && e.clientX !== null ) {
		var html = document.documentElement;
		var body = document.body;
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	}

	// добавить which для IE
	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );
	}

	return e;
}

///////////////////////////////////////////////////////////////////////////////Instruments
function drawDashedLine(x1, y1, x2, y2, dashLength) {
    dashLength = dashLength === undefined ? 5 : dashLength;

    var deltaX = x2 - x1;
    var deltaY = y2 - y1;
    var numDashes = Math.floor(
       Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    context.beginPath();
    for (var i=0; i < numDashes; ++i) {
      context[ i % 2 === 0 ? 'moveTo' : 'lineTo' ]
         (x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
    }

    context.stroke();
};  //Рисует пунктирную линию
 
function LineLength (x1, y1, x2, y2) {
    return Math.round(Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)));
}  //Возвращает длину линии

function Angle (x0, y0, x1, y1, x2, y2) { 
    var a = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)),
        b = Math.sqrt((x2-x0)*(x2-x0) + (y2-y0)*(y2-y0)),
        c = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));    
    return Math.round(Math.acos((a*a+b*b-c*c)/(2*a*b)));
} //Возвращает угол 

function AngleX (x0, y0, x1, y1) {    
    if (x1 === x0)
    {
        if (y1 > y0) return Math.PI*0.5;
        else return Math.PI*1.5;
    }
    if (y1 === y0) 
    {
        if (x1 > x0) return 0;
        else return Math.PI;
    }
    if (x1 > x0)
    {
        if (y1 > y0) return Math.atan((y1 - y0)/(x1 - x0));
        else return 2*Math.PI - Math.atan((y0 - y1)/(x1 - x0));
    }
    else
    {
        if (y1 > y0) return Math.PI - Math.atan((y1 - y0)/(x0 - x1));
        else return Math.atan((y0 - y1)/(x0 - x1)) + Math.PI;
    }    
} //Возвращает угол к оси ОХ по часовой стрелке

///////////////////////////////////////////////////////////////////////////////Icons

var IconDraw = [
    function (x, y) { //линия
        context2.beginPath();
        context2.moveTo(x+10, y+38);
        context2.lineTo(x+38,y+10);
        context2.stroke();
    },
    function (x, y) { //прямоугольник
        context2.strokeRect(x+10,y+10,28,28);
    },
    function (x, y) { //дуга
        context2.beginPath();
        context2.arc(x+24, y+24, 14, 0.8, 1.5*Math.PI);
        context2.stroke();
    },
    function (x, y) { //окружность
        context2.beginPath();
        context2.arc(x+24, y+24, 14, 0, 2*Math.PI);
        context2.stroke();
    },
    function (x, y) { //?

    },
    function (x, y) {

    },
    function (x, y) {

    },
    function (x, y) { //карандаш

    },
    function (x, y) { //линейка
        context2.beginPath();
        context2.moveTo(x+15, y+43);
        context2.lineTo(x+43,y+15);
        context2.lineTo(x+33,y+5);
        context2.lineTo(x+5,y+33);
        context2.lineTo(x+15,y+43);
        
        context2.moveTo(x+22,y+36);
        context2.lineTo(x+18,y+32);
        context2.moveTo(x+29,y+29);
        context2.lineTo(x+25,y+24);
        context2.moveTo(x+36,y+22);
        context2.lineTo(x+32,y+18);
        context2.stroke();
        
    },
    function (x, y) { //резинка
        context2.strokeRect(x+10,y+10,28,28);   
        context2.fillStyle = "#fff";
        context2.fillRect(x+12,y+12,24,24);
    }
];
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvas_back = document.getElementById('canvas_back'),
    context_back = canvas_back.getContext('2d'),
    canvas2 = document.getElementById('canvas_icon'),
    slidearea = document.getElementById('canvas5'),
    context2 = canvas2.getContext('2d'),
    gridCheckbox = document.getElementById('gridCheckbox'),
    coordsCheckbox = document.getElementById('coordsCheckbox'),
    helpCheckbox = document.getElementById('helpCheckbox'),
    coords = document.getElementById('coords'),
    newslide = document.getElementById('newslide'),
    w = [document.getElementById('w0'), document.getElementById('w1'), document.getElementById('w2'), document.getElementById('w3'), null, null, null, null, null, null],
    w0c = document.getElementById('w0c'), 
    w1c = document.getElementById('w1c'),
    w2c = document.getElementById('w2c'),
    w3c = document.getElementById('w3c');
var slide;
    
var loc = {};
var drawingSurfaceImageData;
var IconList = [
    { x: 15, y: 15 }, { x: 80, y: 15 }, { x: 15, y: 80 }, { x: 80, y: 80 }, 
    { x: 15, y: 145 }, { x: 80, y: 145 }, { x: 15, y: 210 }, { x: 80, y: 210 },
    { x: 15, y: 275 }, { x: 80, y: 275 }];
var SelectedIcon = 0; //инструмент при загрузке
var mousedown = {}; //запомнить где нажата мышка 
var dragging = false; //флаг что тащится какой-то объект
var figuredrawing = false; //флаг что рисуется новый объект
var Rect = {}; //под прямоугольник
var Arc = {}; //под дугу
var State; //стадии рисования фигуры
var t1, t2;


function init() {
    canvas.width = document.getElementById('canvas1').clientWidth;
    canvas.height = document.getElementById('canvas1').clientHeight;
    canvas_back.width = canvas.width;
    canvas_back.height = canvas.height;
    canvas2.width = document.getElementById('canvas2').clientWidth;
    canvas2.height = document.getElementById('canvas2').clientHeight;
    w[0].style.display = 'inline';
    saveDrawingSurface();
    drawGrid();
    Icons();
    
    slide = document.createElement("img");
    slidearea.appendChild(slide);
    slide.style.height = "93%";
}

function drawGrid() {    
    if (gridCheckbox.checked)
    {
           var stepx = 20, stepy = 20;
           context_back.strokeStyle = '#aaa';
           context_back.lineWidth = 0.5;
  
           context_back.beginPath();
           for (var i = stepx + 0.5; i < context_back.canvas.width; i += stepx) {
             context_back.moveTo(i, 0);
             context_back.lineTo(i, context_back.canvas.height);
           }
           context_back.stroke();

           context_back.beginPath();
           for (var i = stepy + 0.5; i < context_back.canvas.height; i += stepy) {
             context_back.moveTo(0, i);
             context_back.lineTo(context_back.canvas.width, i);
           }
           context_back.stroke();
    }
    else context_back.clearRect(0, 0, canvas.width, canvas.height);
}

function getMousePosition(e, a) {
    return {
          x: e.clientX - a.left,
          y: e.clientY - a.top
        };
}

function saveDrawingSurface() {
   drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
   context.putImageData(drawingSurfaceImageData, 0, 0);
}

function drawGuideLines(x, y) {
    context.strokeStyle = '#00a';
    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, canvas.height);
    context.moveTo(0,y + 0.5);
    context.lineTo(canvas.width, y + 0.5);
    context.stroke();
}

function hideHelpBox () {
    if (helpCheckbox.checked) w[SelectedIcon].style.display = "inline";
    else w[SelectedIcon].style.display = "none";
}

function Icons () { 
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.lineWidth = 2;
    context2.strokeStyle = "#fff";
    IconDraw[SelectedIcon](IconList[SelectedIcon].x, IconList[SelectedIcon].y);
    
    context2.save();
    context2.shadowOffsetX = 4;
    context2.shadowOffsetY = 4;
    context2.shadowBlur = 4;    
    context2.shadowColor = "#777"; 
    context2.fillStyle = "#000";
    context2.fillRect(IconList[SelectedIcon].x, IconList[SelectedIcon].y, 48, 48);
    IconDraw[SelectedIcon](IconList[SelectedIcon].x, IconList[SelectedIcon].y,"#fff");
        
    context2.shadowColor = "#aaa"; 
    context2.fillStyle = "#eee";    
    for (var i = 0; i < IconList.length; i++) if (i !== SelectedIcon) context2.fillRect(IconList[i].x, IconList[i].y, 48, 48);
    
    context2.restore();
    context2.strokeStyle = "#000";
    for (var i = 0; i < IconList.length; i++) if (i !== SelectedIcon) IconDraw[i](IconList[i].x, IconList[i].y);
}

function IconSelect (e) {
    e = fixEventMouse(e);  
    loc = getMousePosition(e, canvas2.getBoundingClientRect());
    for (var i =  0; i < IconList.length; i++)
        if (loc.x > IconList[i].x && loc.x < IconList[i].x+50 && loc.y > IconList[i].y && loc.y < IconList[i].y+50) 
        { 
            if (i !== SelectedIcon)
            {
                if (helpCheckbox.checked)
                {
                    if (w[SelectedIcon] !== null) w[SelectedIcon].style.display = "none";
                    if (w[i] !== null) w[i].style.display = "inline";
                }
                SelectedIcon = i;
                State = 0;
                figuredrawing = false;
            }                        
            break; 
        }
    Icons();
}

function UpdateDrawing (loc) {
    context.lineWidth = 2;
    context.strokeStyle = "#000";
    switch (SelectedIcon)
    {
        case 0: {
                context.beginPath();
                context.moveTo(mousedown.x, mousedown.y);
                context.lineTo(loc.x, loc.y);
                context.stroke();
                w0c.innerHTML = 'Длина: ' + LineLength(mousedown.x, mousedown.y, loc.x, loc.y);  
                break;
        }
        case 1: {
                Rect.width  = Math.abs(loc.x - mousedown.x);
                Rect.height = Math.abs(loc.y - mousedown.y);
                if (loc.x > mousedown.x) Rect.left = mousedown.x;
                else Rect.left = loc.x;
                if (loc.y > mousedown.y) Rect.top = mousedown.y;
                else Rect.top = loc.y;
                context.strokeRect(Rect.left, Rect.top, Rect.width, Rect.height);
                w1c.innerHTML = 'Ширина: ' + Rect.width + '<br>Высота: ' + Rect.height;
                break;                
        }
        case 2: {
                if (State === 1) {
                    drawDashedLine(Arc.x0, Arc.y0, loc.x, loc.y);
                    w2c.innerHTML = 'Радиус: ' + LineLength(Arc.x0, Arc.y0, loc.x, loc.y) + '<br>Угол (гр): 0';
                }
                else if (State === 2 || State === 3)
                {
                    if (State === 2) drawDashedLine(Arc.x0, Arc.y0, Arc.x1, Arc.y1);                    

                    t1 = AngleX(Arc.x0, Arc.y0, Arc.x1, Arc.y1);
                    t2 = AngleX(Arc.x0, Arc.y0, loc.x, loc.y);
                    context.beginPath();                     
                    if (t1 - t2 > Math.PI) t1 -= 2*Math.PI;
                    else if (t1 - t2 < -Math.PI) t2 -= 2*Math.PI;
                    if (t1 > t2) context.arc(Arc.x0, Arc.y0, Arc.r, t2, t1);
                    else context.arc(Arc.x0, Arc.y0, Arc.r, t1, t2);
                    context.stroke();
                    w2c.innerHTML = 'Радиус: ' + Arc.r + '<br>Угол (гр): ' + Math.round(Math.abs(t2-t1)*180/Math.PI);                    
                }
                break;                
        }
        case 3: {
                Arc.r = LineLength(mousedown.x, mousedown.y, loc.x, loc.y);
                context.beginPath();                    
                context.arc(mousedown.x, mousedown.y, Arc.r, 0, 2*Math.PI);
                context.stroke();
                w3c.innerHTML = 'Радиус: ' + Arc.r;                
                break;                
        }
        case 8: {
                
                break;                
        }
        case 9: {
                
                break;                
        }
    }
}

function MouseMove(e) {    
    e = fixEventMouse(e);  
    loc = getMousePosition(e, canvas.getBoundingClientRect());
    coords.innerHTML = '(' + loc.x + ', ' + loc.y + ')';    
    restoreDrawingSurface();
    if (coordsCheckbox.checked) drawGuideLines(loc.x, loc.y);  
    if (figuredrawing) UpdateDrawing(loc);
}
 
function MouseDown (e) {
    e = fixEventMouse(e);  
    loc = getMousePosition(e, canvas.getBoundingClientRect());    
    mousedown.x = loc.x;
    mousedown.y = loc.y;   
    switch (SelectedIcon)
    {
        case 0: case 1: case 3: {
                figuredrawing = true;
                break;
        }
        case 2: {
                if (State === 0) { Arc.x0 = mousedown.x; Arc.y0 = mousedown.y; figuredrawing = true; }
                if (State === 1) { Arc.x1 = mousedown.x; Arc.y1 = mousedown.y; Arc.r = LineLength(Arc.x0,Arc.y0,Arc.x1,Arc.y1); }
                if (State === 2) { Arc.x2 = mousedown.x; Arc.y2 = mousedown.y; }
                break;
        }      
        case 3: {
                
                break;
        }
        case 8: {
                
                break;
        }     
        case 9: {
                context.clearRect(0, 0, canvas.width, canvas.height);
                saveDrawingSurface(); 
                break;
        }     
    
    }    
}

function MouseUp (e) {
    e = fixEventMouse(e);    
    loc = getMousePosition(e, canvas.getBoundingClientRect());
    switch (SelectedIcon)
    {
        case 0: case 1: case 3: {
                if (Math.abs(loc.x - mousedown.x) > 3 || Math.abs(loc.y - mousedown.y) > 3) 
                {        
                    restoreDrawingSurface();
                    UpdateDrawing(loc);
                    saveDrawingSurface();                                        
                }
                figuredrawing = false;    
                break;
            }
        case 2: {      
                if (State === 0) State = 1;
                else if (State === 1 && Arc.r > 3) State = 2; 
                else if (State === 2 && LineLength(Arc.x1, Arc.y1, Arc.x2, Arc.y2) > 3) 
                { 
                    State = 3;
                    restoreDrawingSurface();
                    UpdateDrawing(loc);
                    saveDrawingSurface();  
                    figuredrawing = false; 
                    State = 0; 
                }                
                break;
            }
    }      
}

function MouseClick (e) {
 
}

//////////////////////////////////////////////////////////////////////////////////////Show
function NewSlide () {    
    slide.src = canvas.toDataURL();    
}

//////////////////////////////////////////////////////////////////////////////////////Events
addEvent(gridCheckbox, 'change', drawGrid); //gridCheckbox.onchange = function () { drawGrid(); };
addEvent(helpCheckbox, 'change', hideHelpBox);
addEvent(canvas, 'mousemove', MouseMove);
addEvent(canvas, 'mousedown', MouseDown);
addEvent(canvas, 'mouseup', MouseUp);
addEvent(canvas, 'click', MouseClick);
addEvent(canvas2, 'click', IconSelect);
addEvent(newslide, 'click', NewSlide);
//////////////////////////////////////////////////////////////////////////////////////Coords
