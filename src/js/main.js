var skills = {
	html: 70,
	css: 75,
	javascript: 50,
	bootstrap: 65,
	npm: 80,
	gulp: 70,
	jquery: 45,
	sass: 85
}

function setSkills(skills) {
	var svgValues = $('.svg__value');
	var progressWrapper = $('.skills__skill-wrapper--mobile');
	for (var i = 0; i < svgValues.length; i++) {
		var svgValue = svgValues[i].classList[1],
			valueType = svgValue.split("value--")[1];
		for (var key in skills) {
			// svgValues[i].style.strokeDashoffset = '565.48';
			if (valueType == key) {
				svgValues[i].style.strokeDashoffset = 565.48 - (565.48 * (skills[key] / 100));
			}
		}
	}
	if ($(window).width() <= 576) {
		for (var key in skills) {
			var progressElement = $('<div>', {
				height: 20,
				width: '100%',
				class: 'skills__skill progress',
				css: {
					backgroundColor: '#22252c',
					marginTop: '20px',
					borderRadius: '5px'
				},
				append: $('<div>', {
					text: key,
					class: 'progress-bar',
					height: 20,
					width: skills[key] + '%',
					css: {
						background: 'linear-gradient(to right, $standard-linear-begin, $standard-linear-end)',
						textTransform: 'uppercase',
						borderRadius: '5px'
					}
				})
			});
			progressWrapper.append(progressElement);
		}
	}
}


setSkills(skills);


$('[data-fancybox="gallery"]').fancybox();

$('.nav__social').on('click', function() {
	$(this).find('ul').toggleClass('opened');
});

$('.contact__form').validate({
	rules: {
		name: {required: true},
		email: {required: true},
		message: {required: true}
	},

	messages: {
		name: 'Введите имя',
		email: {
			required: 'Введите email',
			email: 'Некорректный формат email'
		},
		message: 'Введите текст сообщения'
	},

	submitHandler: function(form) {
		ajaxFormSubmit();
	}
});

function ajaxFormSubmit() {
	var string = $('.contact__form').serialize();
	var successBlock = $('.success');
	var successImg = 'img/checknew.gif';

	$.ajax({
		type: 'POST',
		url: 'php/mail.php',
		data: string,

		success: function() {
			$(':input:not([type=hidden])').each(function(index, el) {
				$(this).val('');
				successBlock.css('display', 'block');
				successBlock.css('backgroundImage', 'url(' + successImg + ')');
				setTimeout(function() {
					successBlock.fadeOut('400');
					successBlock.css('backgroundImage', 'none');
				}, 3000);
			});
		}
	});

	return false;
}

var btnMenuMobile = $('.nav__menu--mobile');
var menu = $('.nav__menu');
var menuPoint = menu.find('ul a');

btnMenuMobile.on('click', function() {
	$(this).toggleClass('open');
	if ($(this).hasClass('open')) {
		$(this).css('position', 'fixed');
		$(this).find('.menu__line').css('background', 'linear-gradient(to right, rgba(0, 242, 152, 0.78), rgba(7, 247, 247, 0.78)');
		menu.css('display', 'flex');
		menu.hide();
		menu.fadeIn(600);
		menu.find('.hide').hide();
		$('body').css('overflowY', 'hidden');
	}
	else {
		$(this).find('.menu__line').css('background', 'white');
		$(this).css('position', 'relative');
		$('body').css('overflowY', 'auto');
		if ($(window).width() <= 1121) {
			menu.fadeOut(600);
		}
	}
});

if ($(window).width() <= 1121) {
	menuPoint.on('click', function() {
		btnMenuMobile.css('position', 'relative');
		btnMenuMobile.find('.menu__line').css('background', 'white');
		$('body').css('overflowY', 'auto');
		menu.css('display', 'none');
		btnMenuMobile.removeClass('open');
	});
}
