const container = document.querySelector('.container');
const seats = document.querySelectorAll('.rows .seats:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.rows .seats.selected');
    const selectedSeatsCount = selectedSeats.length;

    // Convert numbers to strings
    count.innerText = String(selectedSeatsCount);
    total.innerText = String(selectedSeatsCount * ticketPrice);
}
//movie select event
movieSelect.addEventListener('change', e=>{
    ticketPrice = e.target.value;
    updateSelectedCount();
});
//seats click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seats') &&! e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})
