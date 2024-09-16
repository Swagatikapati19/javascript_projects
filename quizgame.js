import readline from "readline";

// Create interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let interval;
let questionAnswered = false; // Track if the question was answered or skipped
let invalidAttempts = 0; // Track the number of invalid inputs

// Max allowed invalid attempts
const MAX_INVALID_ATTEMPTS = 3;

// Questions and answers for each difficulty level
const levels = {
  easy: [
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
      question: "Who is the author of the Harry Potter book series?",
      options: ["A. Harper Lee", "B. J.K. Rowling", "C. Mark Twain", "D. Ernest Hemingway"],
      answer: "B" // Correct answer
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
  ],
  medium: [
    {
      question: "What is the currency in China?",
      options: ["A. Yen", "B. Won", "C. Renminbi Yuan", "D. Baht"],
      answer: "C" // Correct answer
    },
    {
      question: "Which element has the chemical symbol 'K'?",
      options: ["A. Krypton", "B. Potassium", "C. Calcium", "D. Iron"],
      answer: "B" // Correct answer
    },
    {
      question: "Who created the Mona Lisa painting?",
      options: ["A. Leonardo da Vinci", "B. Michelangelo", "C. Raphael", "D. Vincent van Gogh"],
      answer: "A" // Correct answer
    },
    {
      question: "What is the smallest country in the world by land area?",
      options: ["A. Monaco", "B. Liechtenstein", "C. San Marino", "D. Vatican City"],
      answer: "D" // Correct answer
    },
    {
      question: "Which planet is known as the Morning Star or Evening Star?",
      options: ["A. Venus", "B. Mars", "C. Jupiter", "D. Mercury"],
      answer: "A" // Correct answer
    }
  ],
  high: [
    {
      question: "Who is credited with developing the general theory of relativity?",
      options: ["A. Niels Bohr", "B. Isaac Newton", "C. Albert Einstein", "D. Galileo Galilei"],
      answer: "C" // Correct answer
    },
    {
      question: "Alexander the Great was ruler of which kingdom?",
      options: ["A. Persia", "B. Macedonia", "C. Rome", "D. Egypt"],
      answer: "B" // Correct answer
    },
    {
      question: "What is the longest river in the world?",
      options: ["A. Amazon", "B. Yangtze", "C. Mississippi", "D. Nile"],
      answer: "D" // Correct answer
    },
    {
      question: "Who was the British Prime Minister during World War I?",
      options: ["A. David Lloyd George", "B. Neville Chamberlain", "C. Winston Churchill", "D. Herbert Asquith"],
      answer: "A" // Correct answer
    },
    {
      question: "Which among these is not a sub-atomic particle?",
      options: ["A. Proton", "B. Neutron", "C. Electron", "D. Photon"],
      answer: "D" // Correct answer
    }
  ]
};

let selectedLevel = [];
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

  const validOptions = ['A', 'B', 'C', 'D'];
  const correctOption = selectedLevel[currentQuestionIndex].answer;

  if (answer === "") {
    console.log(`Skipped! Correct answer: ${correctOption}`);
  } else if (!validOptions.includes(answer.toUpperCase())) {
    invalidAttempts++;
    if (invalidAttempts >= MAX_INVALID_ATTEMPTS) {
      console.log("Too many invalid inputs! Game over.");
      rl.close(); // End the game
      return;
    }
    console.log(`Invalid input, please select from options A-D only. (${invalidAttempts}/${MAX_INVALID_ATTEMPTS})`);
    askNextQuestion(); // Ask the question again without advancing
    return;
  } else if (answer.toUpperCase() === correctOption) {
    console.log("Correct!");
    correctAnswers++;
  } else {
    console.log(`Incorrect! Correct answer: ${correctOption}`);
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < selectedLevel.length) {
    askNextQuestion();
  } else {
    endGame();
  }
}

// Function to ask the next question
function askNextQuestion() {
  questionAnswered = false;
  const currentQuestion = selectedLevel[currentQuestionIndex];
  const { question, options } = currentQuestion;

  console.log(`\n${question}`);
  options.forEach(option => console.log(option));

  // Print prompt and start countdown
  console.log("\nYour choice (A, B, C, D): ");
  countdown(10); // Start countdown for 10 seconds

  rl.question('', (answer) => {
    console.log(`\nEntered choice: ${answer}`);
    handleAnswer(answer);
  });
}

// Function to end the game
function endGame() {
  if (correctAnswers >= 4) {
    console.log(`\nCongratulations! You answered ${correctAnswers} out of ${selectedLevel.length} questions correctly. You win!`);
  } else {
    console.log(`\nYou answered ${correctAnswers} out of ${selectedLevel.length} questions correctly. You lose!`);
  }
  rl.close();
}

// Function to select difficulty level
function selectLevel() {
  console.log("\nSelect difficulty level:\n1. Easy\n2. Medium\n3. High");
  rl.question("Enter your choice (1-3): ", (choice) => {
    if (choice === "1") {
      selectedLevel = levels.easy;
    } else if (choice === "2") {
      selectedLevel = levels.medium;
    } else if (choice === "3") {
      selectedLevel = levels.high;
    } else {
      console.log("Invalid choice, please try again.");
      return selectLevel();
    }
    askNextQuestion();
  });
}

// Start the game by selecting difficulty level
selectLevel();
