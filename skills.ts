import skills from "./skills.json";

const types = {
    language: { id: "language", title: "Programming Languages" },
    frontEnd: { id: "front-end", title: "Front End" },
    backEnd: { id: "back-end", title: "Back End" },
    misc: { id: "misc", title: "Misc Skills" },
};

export default function initSkills() {
    const skillsContainer = $("#skills-container");

    const skillTypes: { [key: string]: JQuery<HTMLElement> } = {};

    // Build the types of skills
    for (const type of Object.keys(types) as Array<keyof typeof types>) {
        const typeId = types[type].id;
        const $div = $("<div>").addClass("skill-section").attr("id", typeId);

        $("#skills-container").append($div);

        const $title = $("<h2>").html(types[type].title);

        $div.append($title);

        const $list = $("<div>").addClass("skills");

        $div.append($list);

        skillTypes[typeId] = $list;
    }

    // Put each skill inside
    $.each(skills, function (_, skill) {
        $.each(skill.types, function (_, skillType) {
            const $typeDiv = $(skillTypes[skillType]);

            // Create skill div
            const $skillDiv = $("<div>").addClass("skill");

            // Create icon div
            const $iconDiv = $("<div>").addClass("icon");
            const $iconElement = $("<i>").addClass(skill.icon);
            $iconDiv.append($iconElement);

            // Create title div
            const $titleDiv = $("<div>").addClass("title").text(skill.title);

            // Append icon and title divs to skill div
            $skillDiv.append($iconDiv);
            $skillDiv.append($titleDiv);

            // Append skill div to type div
            $typeDiv.append($skillDiv);
        });
    });
}
