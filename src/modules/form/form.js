import dayjs from "dayjs";

const form = document.querySelector("form");
const inputDate = document.getElementById("date");

const dateToday = dayjs(new Date()).format("YYYY-MM-DD");

inputDate.value = dateToday;
inputDate.min = dateToday;

form.onsubmit = (event) => {
    event.preventDefault();
}