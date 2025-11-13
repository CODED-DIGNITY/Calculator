const display = document.querySelector("#display");

let firstNum = "";
let secondNum = "";
let op = null;

document.addEventListener("keydown", (e) => {
	const key = e.key;

	if (!isNaN(key) && key != " ") {
		handleNumber(key);
		return;
	}
	if (["+", "-", "/", "*"].includes(key)) {
		handleOperator(key);
		return;
	}
	if (key === "Enter" || key === "=") {
		calculate();
		return;
	}
	if (key === "Backspace") {
		clearOne();
		return;
	}
	if (key === "Escape") {
		clearAll();
		return;
	}
	if (key === ".") {
		handleNumber(".");
		return;
	}
});

function handleNumber(n) {
	if (op === null) {
		firstNum += n;
		updateDisplay(firstNum);
	} else {
		secondNum += n;
		updateDisplay(secondNum);
	}
}

function handleOperator(o) {
	if (firstNum == "") return;
	op = o;
	updateDisplay(op);
}

function clearOne() {
	if (op == null) {
		firstNum = firstNum.slice(0, -1);
		updateDisplay(firstNum || "0");
	} else if (secondNum !== "") {
		secondNum = secondNum.slice(0, -1);
		updateDisplay(secondNum || "0");
	} else {
		op = null;
		updateDisplay(firstNum || "0");
	}
}
function clearAll() {
	firstNum = "";
	secondNum = "";
	op = null;
	updateDisplay("0");
}

function updateDisplay(num) {
	display.value = num;
}

function calculate() {
	const a = Number(firstNum);
	const b = Number(secondNum);

	let result;
	switch (op) {
		case "+":
			result = a + b;
			break;
		case "-":
			result = a - b;
			break;
		case "*":
			result = a * b;
			break;
		case "/":
			result = a / b;
			break;
	}
	firstNum = result.toString();
	secondNum = "";
	op = null;
	updateDisplay(firstNum);
}
