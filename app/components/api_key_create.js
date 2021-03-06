require('app/components/modal');

Balanced.ApiKeyCreateModalComponent = Balanced.ModalComponent.extend({
	keyName: '',
	actions: {
		createKey: function() {
			this.hide();
			var self = this;
			Balanced.APIKey.create({
				meta: {
					name: self.keyName
				}
			}).save()
				.then(function(newKey) {
					self.get('keys').unshiftObject(newKey);
					self.set('keyName', '');
					Balanced.UserMarketplace.create({
						uri: Balanced.Auth.user.api_keys_uri,
						secret: newKey.get('secret')
					}).save();
				});
		}
	}
});
