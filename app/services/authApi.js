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

class AuthApi {
	constructor() {
		this.api   = "http://localhost:3000/auth";
		this.token = window.sessionStorage.getItem( "token" );
	}
	
	login( body ) {
		return fetchJSON(
			this.api,
			methods.post,
			"login",
			this.token,
			body
		);
	}
}