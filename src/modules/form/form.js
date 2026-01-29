import dayjs from "dayjs";

const form = document.querySelector("form");
const inputDate = document.getElementById("date");
const clienteName = document.getElementById("client");

const dateToday = dayjs(new Date()).format("YYYY-MM-DD");

inputDate.value = dateToday;
inputDate.min = dateToday;

form.onsubmit = (event) => {
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
    console.log(hour);
    const when = dayjs(dateToday.value).add(hour, "hour");
    console.log(when);
  } catch (error) {
    alert("Não foi possível realizar o agendamento!");
    console.log(error);
  }
};
