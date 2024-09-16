import readline from "readline";

// Create interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let interval;
let questionAnswered = false; // Track if the question was answered or skipped

// Questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    options: ["A. Paris", "B. London", "C. Rome", "D. Madrid"],
    answer: "A" // Correct answer
  },
  {
    question: "What is the largest planet in our Solar System?",
    options: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"],
    answer: "C" // Correct answer
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["A. Harper Lee", "B. J.K. Rowling", "C. Mark Twain", "D. Ernest Hemingway"],
    answer: "A" // Correct answer
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["A. H2O", "B. CO2", "C. NaCl", "D. O2"],
    answer: "A" // Correct answer
  },
  {
    question: "Who was the first president of the United States?",
    options: ["A. Abraham Lincoln", "B. George Washington", "C. John Adams", "D. Thomas Jefferson"],
    answer: "B" // Correct answer
  }

  // Add more questions as needed
];

const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let correctAnswers = 0;

// Function to display countdown timer
function countdown(seconds) {
  let timeLeft = seconds;
  interval = setInterval(() => {
    if (!questionAnswered) {
      process.stdout.write('\x1B[2K'); // Clear the current line
      process.stdout.write(`\x1B[0GTime left: ${timeLeft}s `); // Timer display with space
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(interval);
        process.stdout.write('\nTime\'s up!\n');
        handleAnswer(""); // Automatically handle as skipped
      }
    }
  }, 1000);
}

// Function to handle the user's answer
function handleAnswer(answer) {
  questionAnswered = true;
  clearInterval(interval);
  const correctOption = questions[currentQuestionIndex].answer;
  if (answer.toUpperCase() === correctOption) {
    console.log("Correct!");
    correctAnswers++;
  } else if (answer === "") {
    console.log("Skipped!");
  } else {
    console.log("Incorrect!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    askNextQuestion();
  } else {
    endGame();
  }
}

// Function to ask the next question
function askNextQuestion() {
  questionAnswered = false;
  const currentQuestion = questions[currentQuestionIndex];
  const { question, options } = currentQuestion;

  // Clear the line before printing the new question
  process.stdout.write('\x1B[2K'); // Clear the current line
  console.log(`\n${question}`);
  options.forEach(option => console.log(option));

  // Print prompt and start countdown
  console.log("\nYour choice (A, B, C, D): ");
  countdown(10); // Start countdown for 10 seconds

  rl.question('', (answer) => {
    // Move cursor to the next line and print entered choice
    process.stdout.write(`\nEntered choice: ${answer}\n`);
    handleAnswer(answer);
  });
}

// Function to end the game
function endGame() {
  if (correctAnswers >= 4) {
    console.log(`\nCongratulations! You answered ${correctAnswers} out of ${totalQuestions} questions correctly. You win!`);
  } else {
    console.log(`\nYou answered ${correctAnswers} out of ${totalQuestions} questions correctly. You lose!`);
  }
  rl.close();
}

// Start the game
askNextQuestion();
