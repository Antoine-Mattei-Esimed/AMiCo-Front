class UserModel {
	constructor() {
		this.api = new UserApi();
	}
	
	register( body ) {
		return this.api.register( JSON.stringify( body ) );
	}
}