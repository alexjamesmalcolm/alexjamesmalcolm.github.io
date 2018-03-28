function initialize() {
	const button = document.body.querySelector(".container header button");
	button.addEventListener("click", () => {
		toggleMenu();
	});
	const headshot = document.body.querySelector("img.headshot");
	headshot.addEventListener("click", () => {
		toggleModal();
	});
	const modal = document.body.querySelector("div.modal");
	modal.addEventListener("click", () => {
		toggleModal();
	});
	const projects = document.body.querySelectorAll("article.project");
	for (let i = 0; i < projects.length; i++) {
		let project = projects[i];
		project.addEventListener("click", () => {
			toggleProjectFlip(project);
		});
	}
	const nextCarouselButton = document.body.querySelector("button.next");
	nextCarouselButton.addEventListener("click", () => {
		nextCarousel();
	});
	const previousCarouselButton = document.body.querySelector("button.previous");
	previousCarouselButton.addEventListener("click", () => {
		previousCarousel();
	});
	minimizeWrapping();
}

function toggleMenu() {
	const button = document.body.querySelector(".container header button");
	if(button.classList.contains("active")) {
		button.classList.remove("active");
	} else {
		button.classList.add("active");
	}
	const nav = document.body.querySelector(".container header nav");
	if(nav.classList.contains("active")) {
		nav.classList.remove("active");
	} else {
		nav.classList.add("active");
	}
}

function toggleModal() {
	const modalContainer = document.body.querySelector("div.modal-container");
	const classList = modalContainer.classList;
	const containsActiveClass = classList.contains("active");
	const modal = modalContainer.querySelector("div.modal");
	if(containsActiveClass) {
		classList.remove("active");
		const duration = getTransitionDuration(modal);
		setTimeout(() => {
			clearCanvas();
		}, parseInt(duration) * 1000);
	} else {
		classList.add("active");
		displayMandelbrot();
	}
}

function toggleProjectFlip(project) {
	if(project.classList.contains("active")) {
		project.classList.remove("active");
	} else {
		const projects = document.body.querySelectorAll("article.project");
		for (var i = 0; i < projects.length; i++) {
			const pjct = projects[i];
			if(pjct.classList.contains("active")) {
				pjct.classList.remove("active");
			}
		}
		project.classList.add("active");
	}
}

function nextCarousel() {
	const currentProject = document.body.querySelector("article.project.current");
	let nextProject = currentProject.nextElementSibling;
	if(!nextProject) {
		nextProject = currentProject.parentElement.firstElementChild;
	}
	currentProject.classList.remove("current");
	nextProject.classList.add("current");
}

function previousCarousel() {
	const currentProject = document.body.querySelector("article.project.current");
	let previousProject = currentProject.previousElementSibling;
	if(!previousProject) {
		previousProject = currentProject.parentElement.lastElementChild;
	}
	currentProject.classList.remove("current");
	previousProject.classList.add("current");
}

const getTransitionDuration = (element) => {
	return window.getComputedStyle(element, null).getPropertyValue("transition-duration");
};

const getVisibilityStyle = (element) => {
	return window.getComputedStyle(element, null).getPropertyValue("visibility");
};

const getOpacityStyle = (element) => {
	return window.getComputedStyle(element, null).getPropertyValue("opacity");
};