// FROST

import { SaveData, getGameData, save } from "./gameData";
import $ from "jquery";

let data: SaveData = undefined;
// STORE

export function initialiseStore() {
    data = getGameData();
    
    const store = $(".store")
    const upgrades = store.find(".upgrade");
    upgrades.each(function (index) {
        data.autoClickers[index] ??= 0;
        $(this).on("click", function () {
            data.autoClickers[index]++;
            console.log(data)
        });
    });    
}