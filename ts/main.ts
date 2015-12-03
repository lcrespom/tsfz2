import minion from './minion';

const view = $('#view');

$(() => {
	routie({
		'': () => routie('search'),
		'search': () => minion.showView('search', view),
		'users': () => minion.showView('users', view),
		'user/:id': (id) => minion.showView('user-edit', view, id),
		'details/:id': (id) => minion.showView('details', view)
	});

	var isLoading = false;
	const LOAD_POPUP_DELAY = 100;

	minion.config.showLoading = function() {
		isLoading = true;
		setTimeout(function() {
			if (!isLoading) return;
			$('#loading-cover').show();
			$('#loading-popup').show();
		}, LOAD_POPUP_DELAY);
	};

	minion.config.hideLoading = function() {
		isLoading = false;
		$('#loading-cover').hide();
		$('#loading-popup').hide();
	}
});
