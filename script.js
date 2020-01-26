
const responseUrl = "http://любой_домен/filter?size=L&color=5&color=3&manufacturer=aaa&manufacturer=ddd";

let resultArray = responseUrl.split("?")[1].split("&");
let resObj = {
    size: [],
    color: [],
    manufacturer: [],
}
for (let i = 0; i < resultArray.length; i++) {
    let arrRes = resultArray[i].split("=");
    (arrRes[0] === "size") ?
        resObj.size.push(arrRes[1]) :
        (arrRes[0] === "color") ?
            resObj.color.push(arrRes[1]) :
            (arrRes[0] === "manufacturer") ?
                resObj.manufacturer.push(arrRes[1]) :
                console.log("nothing")

}
let radio = document.getElementsByName("radio");
let checkbox = document.getElementsByName("checkbox");
let select = document.getElementsByName("option");
setOptionsOnAttribute(radio, resObj.size);
setOptionsOnAttribute(checkbox, resObj.color);
setOptionsOnAttribute(select, resObj.manufacturer);
let input = document.querySelectorAll("input");
let optionSelect = document.querySelectorAll("select");
setEventListener(input, optionSelect);






function setOptionsOnAttribute(arrInput, arrResponse) {
    arrInput.forEach((element) => {
        arrResponse.forEach((response) => {
            if (element.value == response) {
                element.setAttribute("checked", "checked");
                element.setAttribute("selected", "selected");

            }
        })
    });
}


function setEventListener(...elements) {
    for (let i = 0; i < elements.length; i++) {
        element = Array.from(elements[0]).concat(Array.from(elements[i]));
    }
    element = Array.from(element);

    element.forEach((logInput) => {
        if (logInput.id !== "nonLogging") {
            logInput.addEventListener("change", (event) => {
                loggingChanges(event, element);

            })
        }

    });

    return element;

}


function loggingChanges(event, element) {
    let optionArray = [];
    element.forEach((item) => {
        if (item.checked) {
            optionArray.push(item.value);
        }
        else if (item.tagName == "SELECT") {
            selectValues(Array.from(item), optionArray)
        }
    })
    console.log(generateUrl(optionArray));

    return element;
}
function selectValues(selectInput, arrayWithValues) {
    selectInput.forEach((option) => {
        (option.selected) ?
            arrayWithValues.push(option.value) :
            console.log("false");
    })
}
function generateUrl(arrayWithValuesFull) {
    let colors = [];
    let manufacturer = [];
    for (let i = 1; i < arrayWithValuesFull.length; i++) {
        if (isAN(Number.parseInt(arrayWithValuesFull[i]))) {
            colors.push(`color=${arrayWithValuesFull[i]}`);
        }
        else {
            manufacturer.push(`manufacterer=${arrayWithValuesFull[i]}`)
        }
    }
    colors = colors.join("&");
    manufacturer = manufacturer.join("&");


    loggingUrl = `http://любой_домен/filter?size=${arrayWithValuesFull[0]}&${colors}&${manufacturer}`;
    return loggingUrl;
}
function isAN(value) {
    return (value instanceof Number || typeof value === 'number') && !isNaN(value);
}