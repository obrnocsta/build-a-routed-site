import { EventEmitter } from "node:events";
import { alert } from "../utils/alert.js";

export const event = new EventEmitter();

event.on("sighting-added", alert);
