console.log("script.js connected!");

document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js connected!");

    let userAnswers = {}; // Use 'let' so it can be reset
    const questionBlocks = document.querySelectorAll(".question-block");
    const showResultContainer = document.getElementById("show-result-container");
    const showResultBtn = document.getElementById("show-result");
    const resultContainer = document.getElementById("result-container");
    const resultText = document.getElementById("result-text");
    const restartBtn = document.getElementById("restart-btn");

    const genreDescriptions = {
        action: "Action! You love high energy, epic adventures, and thrills.",
        comedy: "Comedy! You enjoy laughs, fun, and lighthearted stories.",
        drama: "Drama! You appreciate deep, emotional, and thought-provoking stories.",
        horror: "Horror! You’re drawn to suspense, fear, and the dark side of cinema."
    };

    // --- Logic for Question Buttons ---
    questionBlocks.forEach((block, index) => {
        const buttons = block.querySelectorAll(".answer-btn");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                // 1. Remove 'selected' from siblings
                buttons.forEach(btn => btn.classList.remove("selected"));
                // 2. Add 'selected' to clicked button
                button.classList.add("selected");
                
                // 3. Store the answer
                // We get the ID from the parent container (e.g., "question-1")
                const questionId = block.closest('.container').id;
                userAnswers[questionId] = button.dataset.answer;
                
                // 4. Hide the current question's container
                block.closest('.container').classList.add("d-none");

                // 5. Show the next question or the result button
                const nextQuestionIndex = index + 1;
                if (nextQuestionIndex < questionBlocks.length) {
                    // Find the next question container and show it
                    const nextQuestionId = `question-${nextQuestionIndex + 1}`;
                    document.getElementById(nextQuestionId).classList.remove("d-none");
                } else {
                    // This was the last question, show the "Show Result" button
                    showResultContainer.classList.remove("d-none");
                }
            });
        });
    });

    // --- Logic for "Show Result" Button ---
    showResultBtn.addEventListener("click", () => {
        const tally = { action: 0, comedy: 0, drama: 0, horror: 0 };
        
        // Tally up the answers
        for (const answer of Object.values(userAnswers)) {
            if (tally[answer] !== undefined) {
                tally[answer]++;
            }
        }

        let maxCount = 0;
        let finalGenre = "";

        // Find the genre with the highest count
        for (const [genre, count] of Object.entries(tally)) {
            if (count > maxCount) {
                maxCount = count;
                finalGenre = genre;
            }
        }

        // Display the result
        if (finalGenre) {
            resultText.textContent = genreDescriptions[finalGenre];
        } else {
            // Fallback in case something went wrong
            resultText.textContent = "Hmm, couldn't determine your result. Please try again!";
        }
        
        // Hide the "Show Result" button
        showResultContainer.classList.add("d-none");
        // Show the final result container
        resultContainer.classList.remove("d-none");
    });

    // --- Logic for "Restart" Button ---
    restartBtn.addEventListener("click", () => {
        // 1. Reset the answers object
        userAnswers = {};

        // 2. Hide the result container
        resultContainer.classList.add("d-none");

        // 3. Hide all question containers
        questionBlocks.forEach(block => {
            block.closest('.container').classList.add("d-none");
        });

        // 4. Show the first question
        document.getElementById("question-1").classList.remove("d-none");

        // 5. Remove 'selected' class from all buttons
        document.querySelectorAll(".answer-btn").forEach(btn => {
            btn.classList.remove("selected");
        });
    });
});
