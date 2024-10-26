// Author: Jesse Atkinson
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");
const canvas = document.querySelector("#canvas");
const canvasWidth = canvas.width.baseVal.value;
const canvasHeight = canvas.height.baseVal.value;
const maxTargetsInput = document.getElementById("max-targets");
const targetDisplay = document.getElementById("target-display");
startButton.addEventListener("click", startGame);
maxTargetsInput.addEventListener("change", validateInput);

function validateInput() {
	let maxTargets = maxTargetsInput.value;
	targetDisplay.textContent = maxTargets;
	// Check if input is in range of 1 to 30
	if (maxTargets < 1 || maxTargets > 30) {
		alert("Please enter a number between 1 and 30");
		maxTargetsInput.value = "";
		return;
	}
}

function startGame() {
	let maxTargets = document.getElementById("max-targets").value;
	let timer = 0;
	// Reset timer
	timerElement.textContent = timer;

	createTarget();

	function createTarget() {
		// Check if game is over
		if (maxTargets == 0) {
			clearInterval(countdown);
			endGame();
			return;
		}
		startButton.disabled = true;

		// Create new target
		const target = document.createElementNS("http://www.w3.org/2000/svg", "g");
		const circle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		circle.setAttribute("r", "40");
		circle.setAttribute(
			"cx",
			Math.floor(Math.random() * (canvasWidth - 80 - 40 + 1)) + 40
		);
		circle.setAttribute(
			"cy",
			Math.floor(Math.random() * (canvasHeight - 80 - 40 + 1)) + 40
		);

		circle.setAttribute("fill", "red");
		target.appendChild(circle);

		const circle2 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		circle2.setAttribute("r", "30");
		circle2.setAttribute("cx", circle.getAttribute("cx"));
		circle2.setAttribute("cy", circle.getAttribute("cy"));
		circle2.setAttribute("fill", "white");
		target.appendChild(circle2);

		const circle3 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		circle3.setAttribute("r", "20");
		circle3.setAttribute("cx", circle.getAttribute("cx"));
		circle3.setAttribute("cy", circle.getAttribute("cy"));
		circle3.setAttribute("fill", "red");
		target.appendChild(circle3);

		const circle4 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		circle4.setAttribute("r", "10");
		circle4.setAttribute("cx", circle.getAttribute("cx"));
		circle4.setAttribute("cy", circle.getAttribute("cy"));
		circle4.setAttribute("fill", "white");
		target.appendChild(circle4);

		// Mouse event to change the cursor into a crosshair
		target.addEventListener("mouseover", () => {
			canvas.style.cursor = "crosshair";
		});
		// Mouse event to change the cursor back to default and call the target click function
		target.addEventListener("mousedown", (event) => {
			handleTargetClick(event);
			canvas.style.cursor = "default";
		});
		// Add target to canvas
		canvas.appendChild(target);
		targetDisplay.textContent = maxTargets;
		// Decrement max targets
		maxTargets--;
	}

	function handleTargetClick(event) {
		// Remove clicked target
		event.currentTarget.remove();
		// Create new target
		createTarget();
	}

	function endGame() {
		// Display the end game screen modal
		startButton.disabled = false;
		let gameModal = document.querySelector(".modal");
		gameModal.style.display = "block";
		document.getElementById("time-score").textContent = timer;
		// Add an event listener to the close button that will dismiss the modal
		let closeButton = gameOverModal.querySelector(".btn-close");
		closeButton.addEventListener("click", function () {
			// Clear all fields when the modal is closed
			gameOverModal.style.display = "none";
			timer = 0;
			timerElement.textContent = "";
			targetDisplay.textContent = "";
			maxTargetsInput.value = "";
		});
	}

	// Start timer
	const countdown = setInterval(() => {
		timer++;
		timerElement.textContent = timer;
	}, 1000);
}

// Footer animation
const text = document.getElementById("footer-text");
const svg = document.getElementById("footer-svg");

function animateText() {
	const x = parseFloat(text.getAttribute("x"));
	const maxX = parseFloat(svg.getAttribute("viewBox").split(" ")[2]);
	text.setAttribute("fill", "white");
	if (x < maxX) {
		text.setAttribute("x", x + 1);
	} else {
		text.setAttribute("x", 0);
	}
	requestAnimationFrame(animateText);
}

animateText();
