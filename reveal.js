class RevealEffect {

	static applyTo(selector, options = {}) {

		let is_pressed = false;

		let _options = {
			original_bg: $(selector).css("background-image"),
			light_color: "rgba(255,255,255,0.25)",
			dark_color: "rgba(30,30,30,0.25)",
			gradient_size: $(selector).outerWidth(),
			click_effect: false,
			is_container: false,
			children: {
				border: ".btn-border",
				el: ".btn",
				light_color: "rgba(255,255,255,0.25)",
				gradient_size: $(selector).outerWidth()
			}
		}

		// update options
		_options = Object.assign(_options, options)


		function drawEffect($element, x, y, light_color, gradient_size, css_light_effect = null) {

			let bg_light;

			if (css_light_effect === null) {

				bg_light = `radial-gradient(circle ${gradient_size}px at ${x}px ${y}px, ${light_color}, rgba(255,255,255,0))`
			}
			else {
				bg_light = css_light_effect
			}
	
			$element.css({ "background-image": bg_light })
		}


		function clearEffect($element) {
			$element.css({ "background-image": _options.original_bg })
		}


		function enableBackgroundEffects($element, light_color, gradient_size) {
			//element background effect --------------------
			$element.mousemove(function (e) {
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top

				if (_options.click_effect && is_pressed) {

					let css_light_effect = `radial-gradient(circle ${gradient_size}px at ${x}px ${y}px, ${light_color}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`

					drawEffect($(this), x, y, light_color, gradient_size, css_light_effect)
				}
				else {
					drawEffect($(this), x, y, light_color, gradient_size)
				}
			})


			$element.mouseleave(function () {
				clearEffect($(this))
			})
		}


		function enableClickEffects($element, light_color, gradient_size) {
			$element.mousedown(function(e) {
				is_pressed = true;
	
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top
	
				let css_light_effect = `radial-gradient(circle ${gradient_size}px at ${x}px ${y}px, ${light_color}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`
	
				drawEffect($(this), x, y, light_color, gradient_size, css_light_effect)
			});
	
			$element.mouseup(function(e) {
				is_pressed = false
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top

				drawEffect($(this), x, y, light_color, gradient_size)
			});
		}



		// element background effect
		if (!_options.is_container) {

			//element background effect --------------------
			enableBackgroundEffects($(selector), _options.light_color, _options.gradient_size)

			//element click effect --------------------
			if (_options.click_effect) {
				enableClickEffects($(selector), _options.light_color, _options.gradient_size)
			}
			
		}
		//container effects
		else {

			//border effect ----------------------------
			$(selector).mousemove(function (e) {

				let items = $(_options.children.border).toArray()

				for (let i = 0; i < items.length; i++) {
					let x = e.pageX - $(items[i]).offset().left
					let y = e.pageY - $(items[i]).offset().top

					drawEffect($(items[i]), x, y, _options.light_color, _options.gradient_size)
				}
			})

			$(selector).mouseleave(function (e) {
				clearEffect($(_options.children.border))
			})


			//element background effect --------------------
			enableBackgroundEffects($(selector).find(_options.children.el), _options.children.light_color, _options.children.gradient_size)

			//element click effect --------------------
			if (_options.click_effect) {
				enableClickEffects($(selector).find(_options.children.el), _options.children.light_color, _options.children.gradient_size)
			}

		}

		
	}

}




RevealEffect.applyTo(".gridbox", {
	light_color: "rgba(0,0,0,0.25)",
	gradient_size: 500,
})
    
RevealEffect.applyTo(".container", {
	light_color: "rgba(255,255,255,0.1)",
	gradient_size: 500,
})
    RevealEffect.applyTo(".brandcolumn", {
	light_color: "rgba(255,255,255,0.9)",
	gradient_size: 500,
})
RevealEffect.applyTo(".button", {
	light_color: "rgba(255,255,255,0.1)",
	gradient_size: 300,
})

RevealEffect.applyTo(".toolbar > .btn", {
	click_effect: true,
})

RevealEffect.applyTo(".navigation-container", {
	light_color: "rgba(255,255,255,0.1)",
	gradient_size: 500,
})

RevealEffect.applyTo(".toolbar > .btn", {
	click_effect: true,
})

RevealEffect.applyTo(".gridbox", {
	click_effect: true,
	light_color: "rgba(255,255,255,0.6)",
	gradient_size: 80,
	is_container: true,
	children: {
		border: ".border",
		el: ".gridbox",
		light_color: "rgba(255,255,255,0.3)",
		gradient_size: 150,
	}
})
