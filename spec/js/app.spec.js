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
		it("toggleMenu should make the nav visibility:visible when it's already invisible", () => {
			toggleMenu();
			expect(getVisibilityStyle(nav)).toEqual("visible");
		});
		it("toggleMenu should make the nav visibility:hidden when it's already visible", () => {
			toggleMenu();
			toggleMenu();
			expect(getVisibilityStyle(nav)).toEqual("hidden");
		});
		it("toggleMenu should make the nav opacity:1 when it's already invisible", () => {
			toggleMenu();
			expect(getOpacityStyle(nav)).toEqual("1");
		});
		it("toggleMenu should make the nav opacity:0 when it's already visible", () => {
			toggleMenu();
			toggleMenu();
			expect(getOpacityStyle(nav)).toEqual("0");
		});
		it("toggleMenu should set transformation to none if already invisible", () => {
			toggleMenu();
			expect(getTransformStyle(nav)).toEqual("none");
		});
		it("toggleMenu should return translation to -100px if already visible", () => {
			toggleMenu();
			toggleMenu();
			expect(getTransformStyle(nav)).toEqual("matrix(1, 0, 0, 1, 0, -100)");
		});
		it("toggleMenu should be called when the button in the header is clicked", () => {
			button.click();
			expect(toggleMenuSpy).toHaveBeenCalled();
		});
		it("toggleMenu should rotate button when turned on", () => {
			toggleMenu();
			expect(getTransformStyle(button)).toEqual("matrix(0, 0.9, -0.9, 0, 0, 0)");
		});
		it("toggleMenu should rotate button back when turned off", () => {
			toggleMenu();
			toggleMenu();
			expect(getTransformStyle(button)).toEqual("matrix(0.9, 0, 0, 0.9, 0, 0)");
		});
	});
});