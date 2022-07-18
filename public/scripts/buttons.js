function toggleClassDisplay(elementsClass) {
    let collection = document.getElementsByClassName(elementsClass);

    if (typeof(elementsClass) === "string") {
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].style.display === "block") 
                collection[i].style.display = "none";
            else 
                collection[i].style.display = "block";
        }
    }
    else {
        console.log("personalError : toggleClassDisplay method\
                            does not take string as a parameter");
    }
}

function toggleTimerStartButton(elementId) {
    if (typeof(elementId) === "string") {
        let element = document.getElementById(elementId);
        if (element.innerHTML !== "STOP") {
            document.getElementById(elementId).innerHTML = "STOP";
        }
        else {
            document.getElementById(elementId).innerHTML = "START";
        }
    }
}


function rotateElement(id) {
    let element = document.getElementById(id);
    console.log(element.style.transform);
    if (element.style.transform === "rotate(45deg)") {
        document.getElementById(id).style.transform = "rorate(0deg);"
    }
    else{
        document.getElementById(id).style.transform = "rorate(45deg);"
    }
}


function toggleClassToElement(id, cssClass) {
    if (typeof(id) === "string" && typeof(id) === "string") {
        let classes = document.getElementById(id).className.split(" ");
        if (classes.includes(cssClass)) {
            classes.pop();
        }
        else{
            classes.push(cssClass);
        }
        if (classes.length > 1) {
            document.getElementById(id).className = classes.join(" ");
        }
        else
            document.getElementById(id).className = classes[0];
    }
}

