/*
 * AMiCo - Logiciel de gestion de micro-entreprises.
 * Copyright (c) 2023 - Antoine Mattei
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import BaseController from "./basecontroller.js";

class LoginController
	extends BaseController {
	constructor() {
		super();
		this.userModel = new UserModel();
	}
	
	async login() {
		let email    = $( "#inputMailLogin" ).value;
		let password = $( "#inputPasswordLogin" ).value;
		
		const user = {
			email,
			password
		};
		
		const result = await this.userModel.login( user );
		
		if ( result.success ) {
			this.toast( "toast-success",
						result.success,
						"Vous êtes bien connectés." );
			window.sessionStorage.setItem( "token",
										   result.success );
			navigate( "index" );
		} else {
			if ( result.fail === "Unauthorized" ) {
				console.log( "Erreur 49" );
				this.toast( "toast-fail",
							result.success,
							"Erreur : Utilisateur ou mot de passe incorrect." );
			} else {
				this.toast( "toast-fail",
							result.fail,
							`Erreur : ${ result.fail }` );
			}
		}
	}
}

export default () => window.loginController = new LoginController()