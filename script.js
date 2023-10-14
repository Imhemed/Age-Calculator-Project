const form = document.querySelector("#form");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const dayError = document.querySelector(".dayError");
const monthError = document.querySelector(".monthError");
const yearError = document.querySelector(".yearError");
const dayCounter = document.querySelector(".daycounter");
const monthCounter = document.querySelector(".monthcounter");
const yearCounter = document.querySelector(".yearcounter");
let date = new Date();
form.addEventListener("submit", (e) => {
	day = Number(dayInput.value);
	month = Number(monthInput.value);
	year = Number(yearInput.value);
	correctNumber(day, month, year);
	if (correctNumber(day, month, year)) {
		let currnetDay = date.getDate();
		let currentMonth = date.getMonth() + 1;
		let currentYear = date.getFullYear();
		if (currnetDay < day) {
			currnetDay = currnetDay + 30;
			currentMonth = currentMonth - 1;
		}
		if (currentMonth < month) {
			currentMonth = currentMonth + 12;
			currentYear = currentYear - 1;
		}
		console.log(currnetDay - day);
		counterAnimation(currnetDay - day, dayCounter);
		counterAnimation(currentMonth - month, monthCounter);
		counterAnimation(currentYear - year, yearCounter);
		// 	dayCounter.innerText = currnetDay - day;
		// 	monthCounter.innerText = currentMonth - month;
		// 	yearCounter.innerText = currentYear - year;
	}
	e.preventDefault();
});

function correctNumber(day, month, year) {
	if (
		numberRange(day, dayError, 31, 1) &&
		numberRange(month, monthError, 12, 1) &&
		numberRange(year, yearError, date.getFullYear(), 1920)
	) {
		let bday = `${day}/${month}/${year}`;
		return valDate(bday);
	} else {
		return false;
	}
}

function numberRange(value, error, bigValue, smallValue) {
	if (value <= bigValue && value >= smallValue) {
		return true;
	} else {
		error.innerText = "Invalid Date";

		return false;
	}
}

// from online
// console.log(valDate("30/2/2023"));
function valDate(date) {
	let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

	// Matching the date through regular expression
	if (date.match(dateformat)) {
		let operator = date.split("/");

		// Extract the string into month, date and year
		let datepart = [];
		if (operator.length > 1) {
			datepart = date.split("/");
		}
		let day = parseInt(datepart[0]);
		let month = parseInt(datepart[1]);
		let year = parseInt(datepart[2]);

		// Create a list of days of a month
		let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (month == 1 || month > 2) {
			if (day > ListofDays[month - 1]) {
				//to check if the date is out of range

				return false;
			}
		} else if (month == 2) {
			let leapYear = false;
			if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
			if (leapYear == false && day >= 29) {
				return false;
			} else if (leapYear == true && day > 29) {
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}

function counterAnimation(number, error) {
	let counter = 0;
	const counterInterval = setInterval(count, 100);
	function count() {
		error.innerText = `${counter++}`;
		if (counter > number) {
			console.log("1");
			clearInterval(counterInterval);
			return true;
		}
	}
}
