let search = document.getElementById('search')


let restaurants;
let reviews;


const getRestaurants = async () =>{
	const response = await fetch("http://localhost:3000/restaurants");
	restaurants = await response.json();
	generateRestaurants(restaurants)
};



const searchCriteria = (e) =>{
	const searchItem = e.target.value;
	filteredItems = restaurants.filter((curRestaurant) =>{
		return searchItem === curRestaurant.name /*Aqui deberia buscar dentro del .nombre? como??*/
		generateRestaurants(searchCriteria)
		})
	}
	


const generateRestaurants = (x) =>{
	const pad = document.getElementById('pad')

	// let curRestaurant = search.value
	const mappedRestaurants = x.map((curRestaurant) => {
		return `
<div class="col-12 px-0 mx-0 row">	
		<div class="restaurantTab mb-1 col row p-3 bg-light">

			<div class="resPic col-2 p-0"> </div>
			<div class="restaurantInfo col row p-0">
				<div class=" bg-light col-12 h3 py-2"> ${curRestaurant.name} </div>
				<div class=" bg-light col-12 py-2"> ${curRestaurant.address} </div>
				<div class="stars col-12 starsContainer col text-center"></div>

			</div>

			<div class="ratings col-2 row bg-dark p-0 text-center" >
				<input type="button" class="reviews col-12 h4 bg-info text-dark" value ="Reviews">
				<input type="button" class="rate col-12 h4 bg-success text-dark" value ="Rate it">

			</div> 
			
			</div>
		</div>`
	})
		pad.innerHTML = mappedRestaurants.join('')

};
getRestaurants()
search.addEventListener('keyup', searchCriteria);


// const postReview = async () =>{
	
// 	const newReview = {
// 		restaurantId: 2,
// 		stars: 1,
// 		text: 'They keep rising their prices, quality is the same',
// 		}

// 	await fetch("http://localhost:3000/reviews", {
// 		method: "POST",
// 		body: JSON.stringify(newReview),
// 		headers: {	
// 			accept: 'application/json', 
// 					'Content-Type': "application/json",
// 				},

// 	});
// };




