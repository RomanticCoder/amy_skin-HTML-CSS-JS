const startBtn = document.querySelector(".test__btn")
const qna = document.querySelector(".test__qna")
const qnaContainer = document.querySelector(".qna__container")
const qBox = document.querySelector(".questionBox")
const aBox = document.querySelector(".answerBox")
const progressBox = document.querySelector(".progressBox")
const progressBar = document.querySelector(".progressBar")
const resultContainer = document.querySelector(".qna__result")
const resultBox = resultContainer.querySelector(".side__heading")

let qnaList;
let qIndex = 0;
let endPoint;

// goResult();


startBtn.addEventListener("click", () => {
    qna.style.display = "block"
    // qnaContainer.style.display = "50vh";
    qnaContainer.style.display = "block"
    resultContainer.style.display = "none"
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

function goResult() {
    qna.style.display = "block"
    qnaContainer.style.display = "none"
    resultContainer.style.display = "block"
    resultBox.innerHTML = '<h4 class="side_heading">Red Label Bundel</h4>'
}

function printProgressBar() {
    progressBar.style.width = `${(100 / endPoint) * (qIndex + 1)}%`
}

function goNextQuestion(qIndex) {
    if (!qnaList[qIndex]) {
        if (qIndex === endPoint) {
            printProgressBar();
            goResult();
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