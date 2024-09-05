const container = document.querySelector('.container');
const seats = document.querySelectorAll('.rows .seats'); // Select all seats
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value; // Set initial ticket price

populateUI();

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
};

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.rows .seats.selected');
    const selectedSeatsCount = selectedSeats.length;

    // Map the indexes of selected seats
    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat); // Get the index of each selected seat within the 'seats' NodeList
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Update the UI with the number of selected seats and total price
    count.innerText = String(selectedSeatsCount);
    total.innerText = String(selectedSeatsCount * ticketPrice);
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value; // Convert the selected movie's value to a number
    const movieIndex = e.target.selectedIndex; // Get the index of the selected movie

    // Save movie data to localStorage
    setMovieData(movieIndex, ticketPrice);

    updateSelectedCount(); // Update the seat count and total price after movie change
});

// Seats click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seats') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
updateSelectedCount();