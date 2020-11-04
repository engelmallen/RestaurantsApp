let search = document.getElementById('search')
const pad = document.getElementById('pad')
const formContainer = document.getElementById('formContainer')
const starBtns = document.getElementsByClassName('starBtns')[0]

let restaurants;
let reviews;
let starCounter = 0;
let ratingRestaurant;

const closeForm = () =>{
	formContainer.innerHTML = ''
}

const getRestaurants = async () =>{
	const response = await fetch("http://localhost:3000/restaurants");
	restaurants = await response.json();
	}

const getReviews = async () =>{
	const response = await fetch("http://localhost:3000/reviews");
	reviews = await response.json();
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

const sortIt = ( a, b ) =>{
  if ( a.stars < b.stars ){
    return 1;
  }
  if ( a.stars > b.stars ){
    return -1;
  }
  return 0;
}

const searchByRate =  (filtered) =>{
	starCounter = 0; 
	filtered.sort(sortIt).forEach((f)=>{
		return starCounter += f.stars
		}) 
		starCounter /= filtered.length
		starCounter = Math.round(starCounter)
		return starCounter
	}



const generateReviews = (curReview) =>{
	var mappedReviews = curReview.map((mapped) =>{
		return `
		<div class="custumerReview border-bottom border-top-1 col-12 bg-white py-2">
					<div class="userName h6 col font-weight-bold px-2"> Mr.User </div>
					<div class="stars col-4" style="background: url('images/img${mapped.stars}stars.png') no-repeat; background-size: contain"></div>	
		
					<div class="userRevew col-12 border-top-1" > 
						${mapped.text}
					</div>
		
				</div>`

	})
	return mappedReviews.join('')
	console.log(mappedReviews)
}

const postReview = async () =>{
	const postingReview = {
		userName: userName.value,
		restaurantId: ratingRestaurant.id,
		stars: rateByUser.value,
		text: myReview.value,
	}
	await fetch("http://localhost:3000/reviews",{
		method: "POST",
		body: JSON.stringify(postingReview),
		headers:{
		Accept:"application/json", "Content-Type": "application/json",
		},
	});
	await closeForm()
};

const summonForm = (currentRateId) =>{
	 		const fillRatingRestaurant = () => {
	 			for (var i = 0; i < restaurants.length; i++) {
	 				if(restaurants[i].id === currentRateId)	{
	 					ratingRestaurant = restaurants[i]}
	 				}
	 			}
	 		fillRatingRestaurant()
	formContainer.innerHTML = ''
	formContainer.innerHTML = `
		<div id="formRating" class="bg-light p-3 rounded container border-5 border-warning row">
				<div class="h3 text-weight-bold text-center col-11"> Tell Us About <strong> ${ratingRestaurant.name} </strong> </div>
				<div class="btn-danger float-right px-1 py-2 text-light text-center col">X</div>
				<input id="userName" type="text" placeholder="name" class="col-6 py-1 col-4">
				<div>
					<label for="rateByUser col-2">Rate:</label>
						<select id="rateByUser" name="rateByUser" >
					  		<option value="1"> <a href="">1</a> </option>
					  		<option value="2"> <a href="">2</a> </option>
					  		<option value="3"> <a href="">3</a> </option>
					  		<option value="4"> <a href="">4</a> </option>
					  		<option value="5"> <a href="">5</a> </option>
						</select>
				</div>
				<input id="myReview" type="text" placeholder="Write a Review" class="col-12 py-1 my-2">
				<input id="submitReview" type="submit" value="submit" class="px-2 btn-success my-2">			
		</div>`
	const submitReview = document.getElementById('submitReview')
	// submitReview.addEventListener('click', postReview(currentRateId))	
}

const generateRestaurants = (x) =>{
	const pad = document.getElementById('pad')
	const mappedRestaurants = x.map((curRestaurant,curReviewer) => {
	
		let getThisReview = reviews.filter((curId)=>{
		return curRestaurant.id === curId.restaurantId

	})
	searchByRate(getThisReview)
	curReviewer = generateReviews(getThisReview)
	let currentRestaurantId = curRestaurant.id

		return `
<div class="col-12 px-0 mx-0 mb-2 row">	
		<div class="restaurantTab col-12 w-100 row m-0 p-3 bg-light rounded-top ">

			<div class="resPic col-2 p-0 ">
			<img src="${curRestaurant.imgUrl}" width="100%">
			</div>
			<div class="restaurantInfo col row px-5">
				<div class=" bg-light col-12 h3 py-2"> ${curRestaurant.name} </div>
				<div class=" bg-light col-12 py-2 pl-0"> ${curRestaurant.address} </div>
				<div class="stars col-12 starsContainer text-center" style="background: url('images/img${starCounter}stars.png') no-repeat; background-size: contain"></div>
			</div>

			<div class="ratings col-2 row py-2 text-center" >
				<input type="button" class="btnReviews col-12 h4 bg-info text-dark" value ="Reviews">
				<input type="button" class="rate col-12 h4 bg-success text-dark" name="${currentRestaurantId}" value ="Rate it">
			</div>
			
			</div>
			<div class="row col-12 w-100 m-0 p-0"> ${curReviewer} </div> 
		</div>`

	})

		pad.innerHTML = mappedRestaurants.join('')
		actionRate()
};

const actionRate = () =>{
		let rate = document.getElementsByClassName('rate')
		// console.log(rate)
		for (var i = 0; i < rate.length; i++) {
			rate[i].addEventListener('click', (e)=>{
			// console.log(e.target.name)
			summonForm(parseInt(e.target.name))
			})
		}
		

		// rate.addEventListener('click', (e)=>{
		// 	for (var i = 0; i < e.length; i++) {
		// console.log(e.target.name)	
		// }
	// })


}

if (search!=""){
search.addEventListener('keyup', searchCriteria  );}
else{
	getRestaurants()
	getReviews()
	generateRestaurants()
}
