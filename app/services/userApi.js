class UserApi {
	constructor() {
		this.api = "http://localhost:3000/users";
		this.token = window.sessionStorage.getItem( "token" );
	}
	
	register( body ) {
		return fetchJSON(
			this.api,
			methods.post,
			"",
			this.token,
			body
		);
	}
}