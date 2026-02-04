import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form");
const selectedDate = document.getElementById("date");
const clienteName = document.getElementById("client");

const dateToday = dayjs(new Date()).format("YYYY-MM-DD");

selectedDate.value = dateToday;
selectedDate.min = dateToday;

form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        const name = clienteName.value.trim();
        if (!name) {
            return alert("Informe seu nome por favor!");
        }
        const hourSelected = document.querySelector(".hour-selected");
        if (!hourSelected) {
            return alert("Selecione um horário");
        }

        const [hour] = hourSelected.innerText.split(":");
        const when = dayjs(selectedDate.value).add(hour, "hour");

        const id = new Date().getTime();

        await scheduleNew({
            id,
            name,
            when,
        });
    } catch (error) {
        alert("Não foi possível realizar o agendamento!");
        console.log(error);
    }
};
