const container = document.querySelector(".container");
const seats = document.querySelectorAll(".rows .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUi();

let ticketPrice = parseInt(movieSelect.value);


const saveMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll(".rows .seat.selected");

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    });
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUi()  {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie Selector event listener
movieSelect.addEventListener("change", (e) => {
    ticketPrice = parseInt(e.target.value);
    saveMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})


// Seat Click event listener
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
})
// Initial count and total set
updateSelectedCount();