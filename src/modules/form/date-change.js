import { schedulesDay } from "../schedules/load.js"
const dateSelected = document.getElementById("date");

dateSelected.onchange = () => schedulesDay();