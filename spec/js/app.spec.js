describe("alexjamesmalcolm.github.io", () => {
	
	let container = document.createElement("div");
	
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
		`;
		document.body.append(container);
		initialize();
	});

	afterEach(() => {
		container.remove();
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
});