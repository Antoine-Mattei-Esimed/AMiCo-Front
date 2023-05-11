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

class RegisterController
	extends BaseController {
	constructor() {
		super();
		this.userModel = new UserModel();
	}
	
	checkStrength(
		password,
		affichageMessage
	) {
		let strength = 0;
		if ( password.length < 8 ) {
			affichageMessage.innerHTML      = "<p style='color: red'>Trop court</p>";
			$( "#registerButton" ).disabled = true;
		} else if ( password.length > 64 ) {
			affichageMessage.innerHTML      = "<p style='color: red'>Trop long</p>";
			$( "#registerButton" ).disabled = true;
		}
		
		if ( password.length >= 8 ) {
			strength += 1;
		}
		if ( password.value.match( /([a-z].*[A-Z])|([A-Z].*[a-z])/ ) ) {
			strength += 1;
		}
		if ( password.value.match( /([a-zA-Z])/ ) && password.value.match( /([0-9])/ ) ) {
			strength += 1;
		}
		if ( password.value.match( /([!,%&@#$^*?_~])/ ) ) {
			strength += 1;
		}
		if ( password.value.match( /(.*[!,%&@#$^*?_~].*[!%&@#$^*?_~])/ ) ) {
			strength += 1;
		}
		if ( strength < 2 ) {
			affichageMessage.innerHTML = "<p style='color: red'>Faible</p>";
		} else if ( strength === 2 ) {
			affichageMessage.innerHTML = "<p style='color: orange'>Bien</p>";
		} else {
			affichageMessage.innerHTML = "<p style='color: green'>Fort</p>";
		}
	}
	
	checkPassword(
		password,
		confirmPassword,
		affichageMessageConfirmationMDP
	) {
		if ( password.value !== confirmPassword.value ) {
			affichageMessageConfirmationMDP.innerHTML =
				"<p style='color: red'>Les mots de passe ne correspondent pas</p>";
			$( "#registerButton" ).disabled           = true;
		} else {
			affichageMessageConfirmationMDP.innerHTML = "<p style='color: green'>Les mots de passe correspondent</p>";
			$( "#registerButton" ).disabled           = false;
		}
	}
	
	async register() {
		let nom             = $( "#inputNom" ).value;
		let prenom          = $( "#inputPrenom" ).value;
		let dateNaissance   = $( "#inputDateNaissance" ).value;
		let adresse         = $( "#inputAdresse" ).value;
		let codePostal      = $( "#inputCodePostal" ).value;
		let ville           = $( "#inputVille" ).value;
		let email           = $( "#inputMail" ).value;
		let telephone       = $( "#inputPhone" ).value;
		let caAnnuelMax     = $( "#inputCAAnnuelMax" ).value;
		let tauxDeCharge    = $( "#inputTauxDeCharge" ).value;
		let motDePasse      = $( "#pwd" ).value;
		let adresseComplete = adresse + "," + codePostal + "," + ville;
		
		const user   = {
			nom,
			prenom,
			dateNaissance,
			adresseComplete,
			email,
			telephone,
			caAnnuelMax,
			tauxDeCharge,
			motDePasse
		};
		const result = await this.userModel.register( user );
		if ( result.success ) {
			this.toast( "toast-success",
						result.success,
						"Votre compte a bien été créé." );
		} else {
			this.toast( "toast-fail",
						result.success,
						"Erreur : Votre compte n'a pas pu être créé." );
		}
	}
}

export default () => window.registerController = new RegisterController()