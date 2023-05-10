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
			affichageMessage.innerHTML = "<p style='color: red'>Trop court</p>";
			$( "#registerButton" ).disabled = true;
		} else if ( password.length > 64 ) {
			affichageMessage.innerHTML = "<p style='color: red'>Trop long</p>";
			$( "#registerButton" ).disabled = true;
		}
		
		if ( password.length >= 8 ) strength += 1;
		if ( password.value.match( /([a-z].*[A-Z])|([A-Z].*[a-z])/ ) ) strength += 1;
		if ( password.value.match( /([a-zA-Z])/ ) && password.value.match( /([0-9])/ ) ) strength += 1;
		if ( password.value.match( /([!,%&@#$^*?_~])/ ) ) strength += 1;
		if ( password.value.match( /(.*[!,%&@#$^*?_~].*[!%&@#$^*?_~])/ ) ) strength += 1;
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
			$( "#registerButton" ).disabled = true;
		} else {
			affichageMessageConfirmationMDP.innerHTML = "<p style='color: green'>Les mots de passe correspondent</p>";
			$( "#registerButton" ).disabled = false;
		}
	}
	
	register() {
		let nom = $( "#inputNom" ).value;
		let prenom = $( "#inputPrenom" ).value;
		let dateNaissance = $( "#inputDateNaissance" ).value;
		let adresse = $( "#inputAdresse" ).value;
		let codePostal = $( "#inputCodePostal" ).value;
		let ville = $( "#inputVille" ).value;
		let email = $( "#inputMail" ).value;
		let telephone = $( "#inputPhone" ).value;
		let caAnnuelMax = $( "#inputCAAnnuelMax" ).value;
		let tauxDeCharge = $( "#inputTauxDeCharge" ).value;
		let motDePasse = $( "#pwd" ).value;
		let adresseComplete = adresse + "," + codePostal + "," + ville;
		
		let user = {
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
		
		this.userModel.register( user );
	}
}

export default () => window.registerController = new RegisterController()