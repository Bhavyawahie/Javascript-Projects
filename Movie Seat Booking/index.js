const container = document.querySelector(".container");
const seats = document.querySelectorAll(".rows .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value);

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll(".rows .seat.selected")
    
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie Selector event listener
movieSelect.addEventListener("change", (e) => {
    ticketPrice = parseInt(e.target.value);
    updateSelectedCount();
})


// Seat Click event listener
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
})