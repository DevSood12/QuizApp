const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Who is known as the Father of Computers?",
        answers: [
            { text: "Alan Turing", correct: false },
            { text: "Charles Babbage", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false }
        ]
    },
    {
        question: "Which is the smallest prime number?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false }
        ]
    },
    {
        question: "Which language is used for web apps?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false }
        ]
    }
];

const quesEle = document.getElementById('question');
const ansButt = document.getElementById('ans-buttons');
const nxtButt = document.getElementById('next-btn');

let currIdx = 0;
let score = 0;

function startQuiz(){
    currIdx = 0;
    score = 0;
    nxtButt.innerHTML = "Next";
    showQues();
}

function showQues(){
    resetState();
    let currQues = questions[currIdx];
    let quesNo = currIdx + 1;
    quesEle.innerHTML = quesNo + ". " + currQues.question;

    currQues.answers.forEach(answer =>{
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");


        if(answer.correct){
            btn.dataset.correct = "true";
        }

        btn.addEventListener("click", selectAnswer);
        ansButt.appendChild(btn);
    });
}

function resetState(){
    nxtButt.style.display = "none";
    while(ansButt.firstChild){
        ansButt.removeChild(ansButt.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansButt.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nxtButt.style.display = "block";
}

function showScore(){
    resetState();
    quesEle.innerHTML = `You scored ${score} out of ${questions.length}`;
    nxtButt.innerHTML = "Play Again";
    nxtButt.style.display = "block";
}

function handleNext(){
    currIdx++;
    if(currIdx < questions.length){
        showQues();
    } else {
        showScore();
    }
}

nxtButt.addEventListener("click", ()=>{
    if(currIdx < questions.length){
        handleNext();
    } else {
        startQuiz();
    }
});

startQuiz();