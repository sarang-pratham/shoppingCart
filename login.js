const username = document.querySelector(".username");
const password = document.querySelector(".password");
const loginBtn = document.getElementById("login");
const attemptsDisplay = document.querySelector(".attempts");

let users = [{ username: "pratham", password: "Sarang@11" }];

// console.log(typeof username.value, typeof users[0].username);

let attemptsRemaining = 4;

loginBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (username.value === users[0].username && password.value === users[0].password) {
		console.log(window.location.href);
		window.location.replace(`/main.html?username=${username.value}`);
		return false;
	} else {
		if (attemptsRemaining === 0) {
			attemptsDisplay.innerHTML = `No more attempts !`;
			loginBtn.disabled = true;
			return;
		}
		attemptsRemaining--;
		attemptsDisplay.innerHTML = `${attemptsRemaining + 1} attempts remaining`;
	}
	// return false;
});
