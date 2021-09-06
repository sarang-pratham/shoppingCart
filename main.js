const welcomeHeading = document.querySelector("h1");
const selectedItem = document.querySelector("#item");
const itemList = document.querySelector(".item-list");
const itemQuantity = document.querySelector("#quantity");
const addItemBtn = document.querySelector("#add");
const proceedBtn = document.querySelector(".proceed");

let items = [];
let items_removed = [];
let tax = 0.2;
const itemsAvailable = [
	{ item: "mango", price: 25 },
	{ item: "apple", price: 30 },
	{ item: "banana", price: 15 },
	{ item: "orange", price: 20 },
];

itemsAvailable.forEach((item) => {
	selectedItem.innerHTML += `<option value="${item.item}">${item.item}</option>`;
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
welcomeHeading.innerHTML += ` ${urlParams.get("username")}`;

let value = 0;
addItemBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let item = selectedItem.value;
	let quantity = itemQuantity.value;
	let unit = Number(quantity) * itemsAvailable.find((ele) => ele.item === item).price;
	let net = unit + unit * tax;

	items.push({ item, quantity, unit, net });
	console.log(items);
	createItem(item, quantity);
	selectedItem.value = "";
	itemQuantity.value = "";
});

const createItem = (item, quantity) => {
	let li = document.createElement("li");
	let p = document.createElement("p");
	p.innerHTML = `Item: ${item} <span>Quantity: ${quantity}</span>`;
	let btn = document.createElement("button");
	btn.innerText = "delete";
	btn.value = value;

	btn.addEventListener("click", (e) => {
		e.preventDefault();
		items_removed.push(items[e.target.value]);
		itemList.removeChild(e.target.parentNode);
	});

	li.appendChild(p);
	li.appendChild(btn);

	itemList.appendChild(li);
	value++;
};

proceedBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let final_items;

	if (items_removed.length == 0) {
		final_items = items;
	} else {
		final_items = items.filter(filterItems);
	}

	if (final_items.length !== 0) {
		window.location.href = `/final.html`;
		localStorage.setItem("final_items", JSON.stringify(final_items));
	} else {
		alert("Nothing on your cart!");
	}
});

filterItems = (item) => {
	return !items_removed.includes(item);
};
