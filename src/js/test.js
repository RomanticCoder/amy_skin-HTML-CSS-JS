const startBtn = document.querySelector(".test__btn")
const qna = document.querySelector(".test__qna")
const qBox = document.querySelector(".questionBox")
const aBox = document.querySelector(".answerBox")
const progressBox = document.querySelector(".progressBox")
const progressBar = document.querySelector(".progressBar")

let qnaList;
let qIndex = 0;
let endPoint;

(function init() {
    qna.style.display = "50vh";
    fetch("../src/data/qna.json")
        .then(response => response.json())
        .then(data => {
            qnaList = data.qnaList
            qIndex = 0;
            goNextQuestion(qIndex);
            endPoint = qnaList.length
        })
})();


startBtn.addEventListener("click", () => {
    qna.style.display = "50vh";
    fetch("../src/data/qna.json")
        .then(response => response.json())
        .then(data => {
            qnaList = data.qnaList
            qIndex = 0;
            endPoint = qnaList.length
            goNextQuestion(qIndex);
        })
})

aBox.addEventListener("click", (event) => {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    goNextQuestion(++qIndex)
})


function printProgressBar() {
    progressBar.style.width = `${(100 / endPoint) * (qIndex)}%`
}

function goNextQuestion(qIndex) {
    if (!qnaList[qIndex]) {
        if (qIndex === endPoint) {
            printProgressBar();
        }
        console.log("no more answer set")

        // show result 
        return;
    }
    qBox.innerHTML = qnaList[qIndex].q;
    const answerList = (qnaList[qIndex].a)
    aBox.innerHTML = '';
    answerList.forEach(item => {
        aBox.innerHTML += `<li class="answerBox__item"><button>${item["answer"]}</button></li>`
    });
    printProgressBar();
}