function animateTotalAmount() {
    const targetNumber = document.getElementById('amount-total');
    if (targetNumber.textContent === '') return; // Guard against empty content

    const maxNumber = parseFloat(targetNumber.textContent.replace(/^\$/, ''), 10);
    let currentNumber = 0;

    const increment = maxNumber / 100; 
    const intervalTime = 5;

    const interval = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= maxNumber) {
            currentNumber = maxNumber;
            clearInterval(interval);
        }
        targetNumber.textContent = '$' + currentNumber.toFixed(2);
    }, intervalTime);
}

function getBigger(data) {
    var tempBigger = 0
    data.forEach((element, index) => {
        if (tempBigger < element.amount) {
            tempBigger = element.amount
        }
    })
    return tempBigger
}

function insertData(data) {
    var bigNumber = getBigger(data)
    const percentVal = 82 / bigNumber

    var totalWeek = 0

    data.forEach((element, index) => {
        var test = "height: " + element.amount * percentVal + "%"
        document.getElementById('column-' + element.day).style = "height: " + element.amount * percentVal + "%"
        document.getElementById('amount-' + element.day).textContent = "$" + element.amount
        if (element.amount === bigNumber) 
            document.getElementById('column-' + element.day).className = "column-unique blue";
        else
            document.getElementById('column-' + element.day).className = "column-unique red";

        totalWeek += element.amount
    });

    console.log(totalWeek)
    document.getElementById('amount-total').textContent = "$" + totalWeek

    animateTotalAmount();
}


fetch('./data.json')
.then(response => response.json())
.then(data => insertData(data))
.catch(error => console.error("Error: ", error))