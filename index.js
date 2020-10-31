let search = document.getElementById('search')
const pad = document.getElementById('pad')
const starBtns = document.getElementsByClassName('starBtns')[0]

let restaurants;
let reviews;
// let currentStart = 0;
let starCounter = 0;


const getRestaurants = async () =>{
	const response = await fetch("http://localhost:3000/restaurants");
	restaurants = await response.json();

	// generateRestaurants(restaurants)
}
const getReviews = async () =>{
	const response = await fetch("http://localhost:3000/reviews");
	reviews = await response.json();

	// generateRestaurants(restaurants)
}

getRestaurants()
getReviews()


const searchCriteria = (e) =>{
	pad.innerHTML = ''
	const searchItem = e.target.value.toLowerCase();
	filteredRestaurants = restaurants.filter((curRestaurant) =>{
		return curRestaurant.name.toLowerCase().includes(searchItem)
		})
	generateRestaurants(filteredRestaurants)
	}

const searchByRate =  (filtered) =>{
	//  console.log(filtered)
	starCounter = 0; 
	filtered.forEach((f)=>{
		return starCounter += f.stars
		}) 
		starCounter /= filtered.length
		starCounter = Math.round(starCounter)
		console.log(starCounter)
		return starCounter
	}

const generateRestaurants = (x) =>{
	const pad = document.getElementById('pad')
	const mappedRestaurants = x.map((curRestaurant) => {
	
		let getThisReview = reviews.filter((curId)=>{
		return curRestaurant.id === curId.restaurantId
	})
	// console.log(getThisReview)
	searchByRate(getThisReview)

		return `
<div class="col-12 px-0 mx-0 row">	
		<div class="restaurantTab mb-1 col row p-3 bg-light">

			<div class="resPic col-2 p-0" style="background: url('${curRestaurant.imgUrl}') no-repeat; background-size: contain"> </div>
			<div class="restaurantInfo col row p-0">
				<div class=" bg-light col-12 h3 py-2"> ${curRestaurant.name} </div>
				<div class=" bg-light col-12 py-2"> ${curRestaurant.address} </div>
				<div class="stars col-12 starsContainer text-center" style="background: url('images/img${starCounter}stars.png') no-repeat; background-size: contain"></div>
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


if (search!=""){
search.addEventListener('keyup', searchCriteria  );}
else{
	getRestaurants()
	getReviews()
}
