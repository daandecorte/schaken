let p = document.querySelector("p");
let color = "gray";
let mousePos;
let teller = 0;

function maakBord() {
    for(let i = 0; i<64;i++) {
        let div = document.createElement("div");
        div.style.height = "87.5px";
        div.style.backgroundColor = color;
        if((i+1)%8==0) {}
        else {
            if(color == "gray") {
                color = "white";
            }
            else color = "gray";
        }
        p.appendChild(div);
    }
}
maakBord();
let divs = document.querySelectorAll("div");
function init() {
    for(let i = 0; i<64;i++) {
        let img = new Image();
        if(i>=8 && i < 16) {img.src = "pieces/pionzwart.png"; img.alt = "zwartpion";}
        if(i>=48 && i < 56) {img.src = "pieces/pionwit.png"; img.alt = "witpion";}
        if(i==0 || i == 7) {img.src = "pieces/torenzwart.png"; img.alt = "toren";}
        if(i==1 || i == 6) {img.src = "pieces/paardzwart.png"; img.alt = "paard";}
        if(i==2 || i == 5) {img.src = "pieces/loperzwart.png"; img.alt = "loper";}
        if(i==3) {img.src = "pieces/koningzwart.png";img.alt = "koning";}
        if(i==4) {img.src = "pieces/koninginzwart.png";img.alt = "koningin";}
        if(i==56 || i == 63) {img.src = "pieces/torenwit.png"; img.alt = "toren";}
        if(i==57 || i == 62) {img.src = "pieces/paardwit.png"; img.alt = "paard";}
        if(i==58 || i == 61) {img.src = "pieces/loperwit.png"; img.alt = "loper";}
        if(i==60) {img.src = "pieces/koningwit.png";img.alt = "koning";}
        if(i==59) {img.src = "pieces/koninginwit.png";img.alt = "koningin";}
        if(img.src) divs[i].appendChild(img);
    }
}
init();

let imgs = document.querySelectorAll("img");

for(let j = 0; j<imgs.length; j++) {
    imgs[j].addEventListener("mousedown", () => {
        drawOptions(imgs[j].alt);
        teller = j;
        for(let i = 0; i<divs.length; i++) {
            divs[i].addEventListener("mouseover", appendFunctie)
        }
    })
    imgs[j].addEventListener("mouseup", () => {
        for(let i = 0; i<divs.length; i++) {
            divs[i].removeEventListener("mouseover", appendFunctie)
        }
        if(divs[mousePos].childElementCount>1) {
            divs[mousePos].removeChild(divs[mousePos].firstChild)
        }
        removeBorder();
    })
}
function appendFunctie() {
    if(divs[mousePos].className == "highlight") divs[mousePos].appendChild(imgs[teller])
}
for(let i = 0; i<divs.length; i++) {
    divs[i].onmouseover = () => {
        mousePos = i;
    };
}

function drawOptions(pion) {
    let coord;
    let counter;
    switch(pion) {
        case "witpion":
            coord = coordinaatBerekenen(mousePos);
            if(coord[1] == 6) {
                maakBorder(divs[posBerekenen(coord[0], coord[1]-2)]);
            }
            maakBorder(divs[mousePos]);
            if(coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0], coord[1]-1)]);
            if(coord[0]+1<=7&&coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0]+1, coord[1]-1)]);
            if(coord[0]-1>=0&&coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0]-1, coord[1]-1)]);
            //drawOptions("pion");
            break;
        case "zwartpion":
            coord = coordinaatBerekenen(mousePos);
            if(coord[1] == 1) {
                maakBorder(divs[posBerekenen(coord[0], coord[1]+2)]);
            }
            maakBorder(divs[mousePos]);
            if(coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0], coord[1]+1)]);
            if(coord[0]-1>=0&&coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0]-1, coord[1]+1)]);
            if(coord[0]+1<=7&&coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0]+1, coord[1]+1)]);
            //drawOptions("pion");
            break;
        case "pion":
            break;
        case "loper":
            coord = coordinaatBerekenen(mousePos);
            counterx=coord[0];
            countery=coord[1];
            while(true) {
                if(counterx<=7&&countery<=7) maakBorder(divs[posBerekenen(counterx++, countery++)]);
                else break;
            }
            counterx=coord[0];
            countery=coord[1];
            while(true) {
                if(counterx<=7&&countery>=0) maakBorder(divs[posBerekenen(counterx++, countery--)]);
                else break;
            }
            counterx=coord[0];
            countery=coord[1];
            while(true) {
                if(counterx>=0&&countery<=7) maakBorder(divs[posBerekenen(counterx--, countery++)]);
                else break;
            }
            counterx=coord[0];
            countery=coord[1];
            while(true) {
                if(counterx>=0&&countery>=0) maakBorder(divs[posBerekenen(counterx--, countery--)]);
                else break;
            }
            break;
        case "paard":
            coord = coordinaatBerekenen(mousePos);
            maakBorder(divs[mousePos]);
            if(coord[0]+2<=7&&coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0]+2, coord[1]+1)]);
            if(coord[0]-2>=0&&coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0]-2, coord[1]+1)]);
            if(coord[0]+1<=7&&coord[1]-2>=0) maakBorder(divs[posBerekenen(coord[0]+1, coord[1]-2)]);
            if(coord[0]-1>=0&&coord[1]-2>=0) maakBorder(divs[posBerekenen(coord[0]-1, coord[1]-2)]);
            if(coord[0]+1<=7&&coord[1]+2<=7) maakBorder(divs[posBerekenen(coord[0]+1, coord[1]+2)]);
            if(coord[0]-1>=0&&coord[1]+2<=7) maakBorder(divs[posBerekenen(coord[0]-1, coord[1]+2)]);
            if(coord[0]+2<=7&&coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0]+2, coord[1]-1)]);
            if(coord[0]-2>=0&&coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0]-2, coord[1]-1)]);
            break;
        case "koning":
            coord = coordinaatBerekenen(mousePos);
            maakBorder(divs[mousePos]);

            if(coord[0]+1<=7&&coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0]+1, coord[1]+1)]);
            if(coord[0]-1>=0&&coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0]-1, coord[1]+1)]);
            if(coord[0]+1<=7&&coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0]+1, coord[1]-1)]);
            if(coord[0]-1>=0&&coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0]-1, coord[1]-1)]);

            if(coord[0]+1<=7) maakBorder(divs[posBerekenen(coord[0]+1, coord[1])]);
            if(coord[0]-1>=0) maakBorder(divs[posBerekenen(coord[0]-1, coord[1])]);
            if(coord[1]+1<=7) maakBorder(divs[posBerekenen(coord[0], coord[1]+1)]);
            if(coord[1]-1>=0) maakBorder(divs[posBerekenen(coord[0], coord[1]-1)]);
            drawOptions("pion");
            break;
        case "koningin":
            drawOptions("toren");
            drawOptions("loper");
            break;
        case "toren":
            coord = coordinaatBerekenen(mousePos);
            counter = coord[0];
            while(true) {
                if(counter>7) break;
                maakBorder(divs[posBerekenen(counter++, coord[1])]);
            }
            counter = coord[0];
            while(true) {
                if(counter<0) break;
                maakBorder(divs[posBerekenen(counter--, coord[1])]);
            }
            counter = coord[1];
            while(true) {
                if(counter>7) break;
                maakBorder(divs[posBerekenen(coord[0], counter++)]);
            }
            counter = coord[1];
            while(true) {
                if(counter<0) break;
                maakBorder(divs[posBerekenen(coord[0], counter--)]);
            }
            break;
    }
}
function maakBorder(el) {
    el.classList.add("highlight");
}
function removeBorder() {
    divs.forEach((el) => {
        el.classList.remove("highlight");
    })
}
function coordinaatBerekenen(pos) {
    let y = Math.floor(pos/8);
    let x = pos-(y*8);
    return [x, y];
}
function posBerekenen(x, y) {
    let pos = ((x+1)+(y*8))-1;
    return pos;
}