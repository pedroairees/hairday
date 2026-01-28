export function hoursClick() {
    const hours = document.querySelectorAll(".hour-available");

    hours.forEach((available) => {
        available.addEventListener("click", (select) => {
            hours.forEach((hour) => {
                hour.classList.remove("hour-selected");
            });

            select.target.classList.add("hour-selected");
        });
    });
}