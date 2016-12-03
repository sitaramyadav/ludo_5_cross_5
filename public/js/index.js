$(document).ready(function() {

	var animating = false,
		submitPhase1 = 1100,
		submitPhase2 = 400,
		logoutPhase1 = 800,
		$login = $(".login"),
		$register = $(".register"),
		$loadButton = $('.login__submit'),
		$username = $('input[name = "username"]'),
		$pass = $('input[name = "pass"]');

	function ripple(elem, e) {
		$(".ripple").remove();
		var elTop = elem.offset().top,
			elLeft = elem.offset().left,
			x = e.pageX - elLeft,
			y = e.pageY - elTop;
		var $ripple = $("<div class='ripple'></div>");
		$ripple.css({
			top: y,
			left: x
		});
		elem.append($ripple);
	}

	$(document).on("click", ".login__signup", function(e) {
		if (animating) return;
		animating = true;
		var that = this;
		ripple($loadButton, e);
		$loadButton.addClass("processing");
		setTimeout(function() {
			$(that).addClass("success");
			setTimeout(function() {
				$register.show();
				$register.css("top");
				$register.addClass("active");
			}, submitPhase2 - 70);
			setTimeout(function() {
				$login.hide();
				$login.addClass("inactive");
				animating = false;
				$(that).removeClass("success processing");
			}, submitPhase2);
		}, submitPhase1);
	});

	$(document).on("click", ".login__submit", function(e) {
		var credentials = {
			username: $username.val(),
			pass: $pass.val()
		};
		$.post("/login", credentials, function(res) {
			if (res.success)
				window.location = '/chooseGame';
			// show some error message
		}, 'json');
	});

	$(document).on("click", ".register__submit", function(e) {
		var username = $('input[name = "new-username"]').val();
		var newPass = $('input[name = "new-pass"]').val();
		var credentials = {
			username: username
		};
		if (newPass == $('input[name = "confirm-pass"]').val()) {
			credentials.password = newPass;
			$.post("/register", credentials, function(res) {
				if (res.success)
					window.location = '/chooseGame';
			}, 'json');
		}
	});
});
