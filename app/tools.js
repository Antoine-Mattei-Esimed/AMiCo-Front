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

function $(
	selector,
	f
) {
	if ( f === undefined ) {
		return document.querySelector( selector );
	} else {
		document.querySelectorAll( selector )
				.forEach( f );
	}
}

/**
 * Méthodes pour le JSON Fetcher
 * @type {{post: string, get: string, delete: string, put: string}}
 */
const methods = {
	post   : "POST",
	put    : "PUT",
	delete : "DELETE",
	get    : "GET"
};

/**
 * JSON Fetcher
 * @param api : string
 * @param method : string used
 * @param url : string
 * @param token : string
 * @param body : string
 * @returns {Promise<unknown>}
 */
function fetchJSON(
	api,
	method,
	url,
	token,
	body
) {
	window.document.body.style.cursor = "wait";
	const headers                     = new Headers();
	if ( token !== undefined ) {
		headers.append(
			"Authorization",
			`Bearer ${ token }`
		);
	}
	if ( method === "GET" ) {
		return new Promise( (
								resolve,
								reject
							) => {
			fetch(
				`${ api }/${ url }`,
				{
					cache   : "no-cache",
					headers : headers
				}
			)
				.then( async r => {
					window.document.body.style.cursor = "auto";
					if ( r.status < 200 || r.status > 299 ) {
						const error = await r.json();
						console.error( error );
						resolve( error );
					} else {
						resolve( r.json() );
					}
				} )
				.catch( err => reject( err ) );
		} );
	} else {
		headers.append(
			"Accept",
			`application/json`
		);
		headers.append(
			"Content-Type",
			`application/json`
		);
		return new Promise( (
								resolve,
								reject
							) => {
			fetch(
				`${ api }/${ url }`,
				{
					method  : method,
					cache   : "no-cache",
					headers : headers,
					body    : body
				}
			)
				.then( async r => {
					window.document.body.style.cursor = "auto";
					if ( r.status < 200 || r.status > 299 ) {
						const error = await r.json();
						console.error( error );
						resolve( error );
					} else {
						resolve( r.json() );
					}
				} )
				.catch(
					err => reject( err )
				);
		} );
	}
}

/**
 * Fonction pour inclure un fichier HTML dans un autre
 * @param selector : string
 * @param url : string
 * @param urlcontroller : string
 */
function include(
	selector,
	url,
	urlcontroller
) {
	fetch( url,
		   { cache : "no-cache" } )
		.then( res => res.text() )
		.then( html => {
			$( `#${ selector }` ).innerHTML = html;
			import(urlcontroller).then( ( controller ) => {
				controller.default();
			} );
		} )
		.catch( function ( err ) {
			console.log( "Failed to fetch page: ",
						 err );
		} );
}

/**
 * Fonction pour naviguer entre les vues
 * @param view : string
 */
function navigate( view ) {
	include( "content",
			 `views/${ view }.html`,
			 `./controllers/${ view }.js` );
}

/**
 * Formateur de date
 * @type {RegExp}
 */
const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function reviver(
	key,
	value
) {
	if ( typeof value === "string" && dateFormat.test( value ) ) {
		return new Date( value );
	}
	return value;
}

/**
 * Fonction pour récupérer un paramètre dans l'URL
 * @param name : string
 * @returns {string}
 */
function getParameterByName( name ) {
	let match = RegExp( "[?&]" + name + "=([^&]*)" )
		.exec( window.location.search );
	return match && decodeURIComponent( match[ 1 ].replace( /\+/g,
															" " ) );
}
