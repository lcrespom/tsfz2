import minion from '../minion';
import userSvc from '../services/users';

minion.controller('users', {
	searchUsers(elem) {
		minion.rootModel.userFilter = minion.form2obj(elem);
		minion.showView('user-table');
		return false;
	}
});

minion.controller('user-table', {
	preRender() {
		return userSvc.getUsers(minion.rootModel.userFilter).then(users => {
			minion.rootModel.users = users;
		});
	},
	postRender(viewContent: JQuery) {
		$('#modal-delete-btn').click(() => {
			if (!this.delUserId) return;
			console.log('Deleting user:', this.delUserId);
			userSvc.deleteUser(this.delUserId);
		});
	},
	done() {
		$('#modal-delete-btn').unbind('click');
	},
	openDeletePopup(button) {
		this.delUserId = button.attr('data-delete-id');	
	}
});
