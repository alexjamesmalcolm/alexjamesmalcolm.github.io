function initialize() {
	const button = document.body.querySelector(".container header button");
	button.addEventListener("click", () => {
		toggleMenu();
	});
}

function toggleMenu() {
	const nav = document.body.querySelector(".container header nav");
	const button = document.body.querySelector(".container header button");
	const visibilityStyle = getVisibilityStyle(nav);
	if(visibilityStyle == "visible") {
		nav.style.visibility = "hidden";
		nav.style.opacity = "0";
		nav.style.transform = "matrix(1, 0, 0, 1, 0, -100)";
		button.style.transform = "matrix(0.9, 0, 0, 0.9, 0, 0)";
	} else {
		nav.style.visibility = "visible";
		nav.style.opacity = "1";
		nav.style.transform = "none";
		button.style.transform = "matrix(0, 0.9, -0.9, 0, 0, 0)";
	}
}

const getVisibilityStyle = (element) => {
	return window.getComputedStyle(element, null).getPropertyValue("visibility");
};

const getOpacityStyle = (element) => {
	return window.getComputedStyle(element, null).getPropertyValue("opacity");
};