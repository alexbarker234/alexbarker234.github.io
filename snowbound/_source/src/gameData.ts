export interface SaveData {
    version: number;
    frost: number;
    autoClickers: number[]
}

let saveData: SaveData = { version: 0, frost: 0, autoClickers: [] };

export const getGameData = () => saveData;

export const load = () => {
    const localJSON = localStorage.getItem("saveData");
    if (localJSON) saveData = JSON.parse(localJSON); 
};

export const save = () => localStorage.setItem("saveData", JSON.stringify(saveData));
