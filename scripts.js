// Create variable and assign it to an empty array
// Wrap it in an IFFE
var pokemonRepository = (function(){
"use strict";
var repository = [];
var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
var $modalContainer = document.querySelector('#modal-container');

//Function to add new Pokemon data
function add(pokemon) {
repository.push(pokemon);
}

//Function to pull all Pokemon data
function getAll() {
return repository;
}

// Function to add new listing for each pokemon
function addListItem(pokemon) {
var $pokemonList = document.querySelector(".pokemon-list");
// To create a new li-element that contains a button for each pokemon:
var $listItem = document.createElement("li");
var $button = document.createElement("button");
// To append the list item to the unordered list as its child:
$pokemonList.appendChild($listItem);
// To append the button to the list item as its child:
$listItem.appendChild($button);
// The button shows the name from the current pokemon:
$button.innerText = pokemon.name;
$button.classList.add("list-button");
// To give the button a custom button style from styles.css to overwrite default styling:
$listItem.classList.add("button");
// To give the button a function when it's clicked:
$button.addEventListener('click', function(event) {
// Calls function showDetails to show attributes from each pokemon:
showDetails(pokemon);
})
}

// Function to load pokemon list from apiUrl:
function loadList() {
return fetch(apiUrl).then(function (response) {
return response.json();
// If the promise is resolved, then (function(passed parameter) {...
}).then(function (json) {
json.results.forEach(function (item) {
var pokemon = {
name: item.name,
detailsUrl: item.url
};
add(pokemon);
});
// If the promise is rejected, catch (function(passed parameter) {...
}).catch(function(error) {
console.error(error);
})
}

function loadDetails(item) {
var url = item.detailsUrl;
return fetch(url).then(function (response) {
return response.json();
}).then(function(details) {
// details are added to item
item.imageUrl = details.sprites.front_default;
item.height = details.height;
item.types = Object.keys(details.types);
}).catch(function(e) {
console.error(e);
});
}

//showDetails function shows pokemon's details after clicking on pokemons name
function showDetails(item) {
pokemonRepository.loadDetails(item).then(function(){
showModal(item);
console.log(item);
});
}

// Function to show a modal with title and text

function showModal(item) {
//clear all existing modal content
$modalContainer.innerHTML = '';
$modalContainer.classList.add('is-visible');

var modal = document.createElement('div');
modal.classList.add('modal');

// add the new modal content
var closeButtonElement = document.createElement('button');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';
closeButtonElement.addEventListener('click', hideModal);

var modalTitle = document.createElement('h1');
modalTitle.innerText = item.name;
modalTitle.classList.add('modal-title');

var modalHeight = document.createElement('p');
modalHeight.innerText = 'Height: ' + item.height;
modalHeight.classList.add('modal-details')

var modalType = document.createElement('p');
modalType.classList.add('modal-details')
modalType.innerText = 'Type: ' + item.types;

//Pokemon display image in modal
var imageElement = document.createElement('img');
imageElement.classList.add('modal-img');
imageElement.src = item.imageUrl;

modal.appendChild(closeButtonElement);
modal.appendChild(imageElement);
modal.appendChild(modalTitle);
modal.appendChild(modalHeight);
modal.appendChild(modalType);
$modalContainer.appendChild(modal);

}
var $modalContainer
function hideModal() {
var $modalContainer = document.querySelector('#modal-container');
$modalContainer.classList.remove('is-visible');
}

// Hide Modal with escape key
window.addEventListener('keydown', (e) => {
var $modalContainer = document.querySelector('#modal-container');
if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
hideModal();
}
});

// Hide Modal by clicking outside of Modal
$modalContainer.addEventListener('click', (e) => {
// Since this is also triggered when clicking INSIDE the modal container,
// We only want to close if the user clicks directly on the overlay
var target = e.target;
if (target === $modalContainer) {
hideModal();
}
});

// To return the values wich can be accessed to outside the IIFE:
return {
add: add,
getAll: getAll,
addListItem: addListItem,
loadList: loadList,
loadDetails: loadDetails,
showDetails: showDetails,
showModal: showModal,
hideModal: hideModal
};
})();

// To create list of pokemon with pokemon's name on the button:
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);
});
});
