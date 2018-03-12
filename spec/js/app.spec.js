describe("alexjamesmalcolm.github.io", () => {
	
	const container = document.createElement("div");
	const modalContainer = document.createElement("div");

	let project, anotherProject;
	
	beforeEach(() => {
		container.classList.add("container");
		container.innerHTML = `
		<style>
			nav {
				visibility: hidden;
				opacity: 0;
				transform: translateX(-100px);
			}

			button {
				transform: matrix(0.9, 0, 0, 0.9, 0, 0);
			}
		</style>
		<header>
			<button></button>
			<nav>
				<ul></ul>
			</nav>
		</header>
		<section id="about-me">
			<div class="contents">
				<img class="headshot"/>
			</div>
		</section>
		<section id="projects">
			<button class="previous"></button>
			<div class="projects">
				<article class="project"></article>
				<article class="project"></article>
			</div>
			<button class="next"></button>
		</section>
		`;
		modalContainer.classList.add("modal-container");
		modalContainer.innerHTML = `
		<div class="modal">
			<canvas id="canvas"></canvas>
		</div>
		`;
		document.body.append(modalContainer);
		document.body.append(container);
		initialize();

		project = document.body.querySelector("article.project");
		anotherProject = document.body.querySelectorAll("article.project")[1];
	});

	afterEach(() => {
		container.remove();
		modalContainer.remove();
	});

	describe("toggleMenu()", () => {
		let button, nav, ul, toggleMenuSpy;
		const getStyle = (element) => {
			return window.getComputedStyle(element, null);
		};
		const getVisibilityStyle = (element) => {
			return getStyle(element).getPropertyValue("visibility");
		};
		const getOpacityStyle = (element) => {
			return getStyle(element).getPropertyValue("opacity");
		};
		const getTransformStyle = (element) => {
			return getStyle(element).getPropertyValue("transform");
		};

		beforeEach(() => {
			button = container.querySelector("button");
			nav = container.querySelector("nav");
			toggleMenuSpy = spyOn(window, "toggleMenu").and.callThrough();
		});
		it("toggleMenu should be called when the button in the header is clicked", () => {
			button.click();
			expect(toggleMenuSpy).toHaveBeenCalled();
		});
		it("toggleMenu should give button active class when first turned on", () => {
			toggleMenu();
			expect(button.classList.contains("active")).toEqual(true);
		});
		it("toggleMenu should give nav active class when first turned on", () => {
			toggleMenu();
			expect(nav.classList.contains("active")).toEqual(true);
		});
		it("toggleMenu should remove button active class when turned off", () => {
			toggleMenu();
			toggleMenu();
			expect(button.classList.contains("active")).toEqual(false);
		});
		it("toggleMenu should remove nav active class when turned off", () => {
			toggleMenu();
			toggleMenu();
			expect(nav.classList.contains("active")).toEqual(false);
		});
	});
	describe("toggleModal()", () => {
		let headshot, toggleModalSpy, displayMandelbrotSpy, clearCanvasSpy, modal;
		beforeEach(() => {
			headshot = document.body.querySelector("img.headshot");
			toggleModalSpy = spyOn(window, "toggleModal").and.callThrough();
			displayMandelbrotSpy = spyOn(window, "displayMandelbrot");
			clearCanvasSpy = spyOn(window, "clearCanvas");
			if(modalContainer.classList.contains("active")) {
				modalContainer.classList.remove("active");
			}
			modal = document.body.querySelector("div.modal");
		});
		it("Clicking my face should make the modal appear", () => {
			headshot.click();
			expect(toggleModalSpy).toHaveBeenCalled();
		});
		it("toggleModal should make the div.modal have the active class", () => {
			toggleModal();
			expect(modalContainer.classList.contains("active")).toEqual(true);
		});
		it("toggleModal should remove the active class from div.modal if it already has it", () => {
			toggleModal();
			toggleModal();
			expect(modalContainer.classList.contains("active")).toEqual(false);
		});
		it("toggleModal should call displayMandelbrot", () => {
			toggleModal();
			expect(displayMandelbrotSpy).toHaveBeenCalledTimes(1);
		});
		it("toggleModal twice should call clearCanvas", () => {
			toggleModal();
			toggleModal();
			expect(clearCanvasSpy).toHaveBeenCalledTimes(1);
		});
		it("toggleModal once should not call clearCanvas", () => {
			toggleModal();
			expect(clearCanvasSpy).toHaveBeenCalledTimes(0);
		});
		it("toggleModal should be called by clicking on the modal", () => {
			modal.click();
			expect(toggleModalSpy).toHaveBeenCalled();
		});
		it("displayMandelbrot should be called once for every two toggleModal calls", () => {
			toggleModal();
			toggleModal();
			expect(displayMandelbrotSpy).toHaveBeenCalledTimes(1);
		});
	});
	describe("toggleProjectFlip()", () => {
		let toggleProjectFlipSpy;
		beforeEach(() => {
			toggleProjectFlipSpy = spyOn(window, "toggleProjectFlip").and.callThrough();
		});
		it("toggleProjectFlip should be called when a project is clicked", () => {
			project.click();
			expect(toggleProjectFlipSpy).toHaveBeenCalledWith(project);
		});
		it("toggleProjectFlip should give active class to project", () => {
			toggleProjectFlip(project);
			expect(project.classList.contains("active")).toEqual(true);
		});
		it("toggleProjectFlip should remove active class to project", () => {
			toggleProjectFlip(project);
			toggleProjectFlip(project);
			expect(project.classList.contains("active")).toEqual(false);
		});
		it("toggleProjectFlip should remove the active class from all other projects when adding the active class to a project", () => {
			toggleProjectFlip(project);
			toggleProjectFlip(anotherProject);
			expect(project.classList.contains("active")).toEqual(false);
			expect(anotherProject.classList.contains("active")).toEqual(true);
		});
	});
	describe("nextCarousel", () => {
		let button, nextCarouselSpy;
		beforeEach(() => {
			button = document.body.querySelector("button.next");
			nextCarouselSpy = spyOn(window, "nextCarousel").and.callThrough();
		});
		it("clicking button calls nextCarousel", () => {
			button.click();
			expect(nextCarouselSpy).toHaveBeenCalled();
		});
		it("when project is current then clicking should make anotherProject current", () => {
			project.classList.add("current");
			button.click();
			expect(project.classList.contains("current")).toEqual(false);
			expect(anotherProject.classList.contains("current")).toEqual(true);
		});
		it("When anotherProject is current then clicking should loop back around and make project current", () => {
			anotherProject.classList.add("current");
			button.click();
			expect(project.classList.contains("current")).toEqual(true);
			expect(anotherProject.classList.contains("current")).toEqual(false);
		});
	});
	describe("previousCarousel", () => {});
});