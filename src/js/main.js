
// filter
const productSection = document.querySelector("#products")
const productCategories = document.querySelector(".product__categories");
const firstCategory = productCategories.querySelector(".category__btn")
const productContainer = document.querySelector(".product_container");
const products = document.querySelectorAll('.product');

function selectCategory(target) {
    handleCategoryClick(target, target.dataset.filter)
}

selectCategory(firstCategory)

function handleCategoryClick(target, filter) {
    // const filter = target.dataset.filter;
    if (!filter) {
        return;
    }
    productContainer.classList.add('anim-out');

    const categoryBtns = document.querySelectorAll(".category__btn");
    categoryBtns.forEach((btn) => {
        btn.classList.remove("selected");
    })
    target.classList.add("selected");

    setTimeout(() => {
        products.forEach((product) => {
            const type = product.dataset.type;
            if (type.includes(filter)) {
                product.classList.remove('invisible');
            } else {
                product.classList.add('invisible');
            }
        })
        productContainer.classList.remove('anim-out');

    }, 300)
}
productCategories.addEventListener("click", (e) => handleCategoryClick(e.target, e.target.dataset.filter))



// test //

const startBtn = document.querySelector(".test__btn")
const qna = document.querySelector(".test__qna")
const qnaContainer = document.querySelector(".qna__container")
const qBox = document.querySelector(".questionBox")
const aBox = document.querySelector(".answerBox")
const progressBox = document.querySelector(".progressBox")
const progressBar = document.querySelector(".progressBar")
const resultContainer = document.querySelector(".qna__result")
const resultBox = resultContainer.querySelector(".side_heading")
const resultBtn = resultContainer.querySelector(".result__btn")

let qnaList;
let qIndex = 0;
let endPoint;

console.log("test: 3/17/2022 2:43pm")
fetch("../../qna.json").then(console.log("data received from json file"))

startBtn.addEventListener("click", () => {
    qna.style.display = "block"
    // qnaContainer.style.display = "50vh";
    qnaContainer.style.display = "block"
    resultContainer.style.display = "none"
    fetch("../../qna.json")
        .then(response => response.json())
        .then(data => {
            qnaList = data.qnaList
            qIndex = 0;
            endPoint = qnaList.length
            goNextQuestion(qIndex);
            qna.scrollIntoView({ behavior: "smooth", block: "center" });
        })
})

aBox.addEventListener("click", (event) => {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    goNextQuestion(++qIndex)
})

resultBtn.addEventListener("click", (e) => {
    productSection.scrollIntoView()
    const categories = productCategories.querySelectorAll(".category__btn")
    categories.forEach((category) => {
        const filter = "000"
        console.log(category.dataset.filter)
        if (category.dataset.filter !== filter) {
            return
        }
        selectCategory(category)
    }
    )
    handleCategoryClick()
})

function goResult() {
    progressBar.style.width = `100%`
    qna.style.display = "block"
    qnaContainer.style.display = "none"
    resultContainer.style.display = "block"
    // resultBox.innerHTML = '<h4 class="side_heading">Red Label Bundel</h4>'
}

function printProgressBar() {
    progressBar.style.width = `${(100 / endPoint) * (qIndex + 1)}%`
}

function goNextQuestion(qIndex) {
    if (!qnaList[qIndex]) {
        if (qIndex === endPoint) {
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
