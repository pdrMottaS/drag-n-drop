var svg = document.getElementById("mySvg");
var text = document.getElementById("myText");

/*svg.addEventListener("click",function(event){
    console.log("ativado");
    createText(event.clientX,event.clientY);
})*/

document.getElementById("field").addEventListener("focusout",function(event){
    console.log("focus out");
})

svg.addEventListener("dragover",function(event){
    event.preventDefault();
})

svg.addEventListener("drop",function(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    if(data=="myText"){
        createText(event.clientX,event.clientY);
    }
})

svg.addEventListener("DOMNodeInserted",function(event){
    if(event.relatedNode.id=="mySvg"){
        for(var i=0;i<svg.children.length;i++){
            var svgElement = svg.children[i].id;
            
        }
    }
})

text.addEventListener("dragstart",function(event){
    event.dataTransfer.setData("text", event.target.id);
})

function createText(x,y){
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    element.appendChild(document.createTextNode("Digite seu texto..."));
    element.setAttribute("x",x);
    element.setAttribute("y",y);
    element.setAttribute("id","seq"+svg.childElementCount);
    element.setAttribute("fill","black");
    element.setAttribute("font-size","16")
    element.setAttribute("font-family","Arial, Helvetica, sans-serif");
    svg.appendChild(element);
    editText(element,true);
}

function editText(element,add){

    if(add){
        element.addEventListener("click",function(){
            editText(element,false)
        })
    }

    if(document.getElementById("field").childElementCount>0){
        while (document.getElementById("field").firstChild) {
            document.getElementById("field").removeChild(document.getElementById("field").firstChild);
        }
    }

    //font option
    var selectFont = document.createElement("select");
    fonts = ["Roboto","Oswald","Grandstander","Montserrat","Architects Daughter","Playfair Display","Pacifico","Anton","Dancing Script","Indie Flower","Fredoka One","Lobster","Bangers"];
    for(var i=0;i<fonts.length;i++){
        var option = document.createElement("option");
        option.value=fonts[i];
        option.innerHTML = fonts[i];
        selectFont.appendChild(option);
    }
    selectFont.addEventListener("change",function(event){
        element.attributes[5].value=selectFont.value;
    })

    //size option
    var selectSizes = document.createElement("select");
    sizes = ["8","9","10","11","12","14","16","18","20","22","24","26","28","36","48","72"];
    for(var i=0;i<sizes.length;i++){
        var option = document.createElement("option");
        option.value=sizes[i];
        option.innerHTML = sizes[i];
        selectSizes.appendChild(option);
    }
    selectSizes.addEventListener("change",function(event){
        element.attributes[4].value=selectSizes.value;
    })

    //color option
    var selectColor = document.createElement("select");
    colors = ['black','white','blue','yellow','red'];
    for(var i=0;i<colors.length;i++){
        var option = document.createElement("option");
        option.value=colors[i];
        option.innerHTML = colors[i];
        selectColor.appendChild(option);
    }
    selectColor.addEventListener("change",function(event){
        element.attributes.fill.value=selectColor.value;
    })

    //move buttons 
    var buttonUp = document.createElement("button");
    buttonUp.innerHTML="U";
    buttonUp.addEventListener("click",function(event){
        var up = parseInt(element.attributes.y.value)-10;
        element.attributes.y.value=String(up);
    })
    var buttonDown = document.createElement("button");
    buttonDown.innerHTML="D";
    buttonDown.addEventListener("click",function(event){
        var down = parseInt(element.attributes.y.value)+10;
        element.attributes.y.value=String(down);
    })
    var buttonLeft = document.createElement("button");
    buttonLeft.innerHTML="L";
    buttonLeft.addEventListener("click",function(event){
        var left = parseInt(element.attributes.x.value)-10;
        element.attributes.x.value=String(left);
    })
    var buttonRight = document.createElement("button");
    buttonRight.innerHTML="R";
    buttonRight.addEventListener("click",function(event){
        var right = parseInt(element.attributes.x.value)+10;
        element.attributes.x.value=String(right);
    })

    //input text
    var input = document.createElement("input");
    if(add){
        input.placeholder="Digite seu texto...";
    }else{
        input.value=element.innerHTML;
    }

    //excluir button
    var button = document.createElement("button");
    button.innerHTML="Excluir";

    document.getElementById("field").appendChild(input);
    document.getElementById("field").appendChild(button);
    document.getElementById("field").appendChild(buttonUp);
    document.getElementById("field").appendChild(buttonDown);
    document.getElementById("field").appendChild(buttonLeft);
    document.getElementById("field").appendChild(buttonRight);
    document.getElementById("field").appendChild(selectColor);
    document.getElementById("field").appendChild(selectSizes);
    document.getElementById("field").appendChild(selectFont);
    document.getElementById("field").focus();
    input.addEventListener("keyup",function(event){
        if(event.key=="Enter"){
            document.getElementById("field").removeChild(input);
            document.getElementById("field").removeChild(button);
            document.getElementById("field").removeChild(buttonUp);
            document.getElementById("field").removeChild(buttonDown);
            document.getElementById("field").removeChild(buttonLeft);
            document.getElementById("field").removeChild(buttonRight);
            document.getElementById("field").removeChild(selectColor);
            document.getElementById("field").removeChild(selectSizes);
            document.getElementById("field").removeChild(selectFont);
        }else{
            element.innerHTML=event.target.value;
        }
    })

    button.addEventListener("click",function(event){
        svg.removeChild(element);
        document.getElementById("field").removeChild(input);
        document.getElementById("field").removeChild(button);
        document.getElementById("field").removeChild(buttonUp);
        document.getElementById("field").removeChild(buttonDown);
        document.getElementById("field").removeChild(buttonLeft);
        document.getElementById("field").removeChild(buttonRight);
        document.getElementById("field").removeChild(selectColor);
        document.getElementById("field").removeChild(selectSizes);
        document.getElementById("field").removeChild(selectFont);
    })


}