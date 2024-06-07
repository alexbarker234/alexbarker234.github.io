$(window).on("load", function () {
    handleMeteors();
    handleButtons();
    handleFadeIn();

    loadSkills();
});

const handleMeteors = () => {
    const meteorShower = $("#meteor-shower");
    console.log(meteorShower);
    setInterval(function () {
        if (Math.random() > 0.5) return;
        let meteor = $("<div>").addClass("meteor");

        const offset = window.innerWidth / 4;
        const startX = offset + Math.floor(Math.random() * (window.innerWidth - offset));
        const startY = -100;

        // Calculate random ending position
        const move = 800;

        const endX = startX - move;
        const endY = move;

        meteor.css("left", `${startX}px`);
        meteor.css("top", `${startY}px`);
        // start animation
        setTimeout(function () {
            meteor.css("left", `${endX}px`);
            meteor.css("top", `${endY}px`);
        }, 5);

        // remove
        setTimeout(function () {
            meteor.remove();
        }, 600);
        meteorShower.append(meteor);
    }, 200);
};
const handleButtons = () => {
    const projectButtons = $(".selector");
    const projectsDiv = $(".projects");
    const projects = $(".project");
    const animLength = 700; // needs to sync up to css
    projectButtons.each(function (index) {
        $(this).on("click", function () {
            const id = $(this).attr("id");
            projectsDiv.addClass("fade");
            setTimeout(() => projectsDiv.removeClass("fade"), animLength);
            setTimeout(() => {
                // show all
                if (!id) {
                    projects.each(function () {
                        $(this).removeClass("disabled");
                    });
                }
                // show as specified by id
                else {
                    const selected = id.substring(1, id.length);
                    projects.each(function () {
                        const project = $(this);
                        if (project.hasClass(selected)) project.removeClass("disabled");
                        else project.addClass("disabled");
                    });
                }
            }, animLength / 2);
        });
    });
};
const handleFadeIn = () => {
    /** Fade in when bottom of screen is half down */
    function isElementInView(elem) {
        var elementCentre = $(elem).offset().top + $(elem).outerHeight();
        var windowBottom = $(window).scrollTop() + $(window).height();

        // MOBILE - fade in appearing at top
        if ($(window).width() < 600) {
            return windowBottom > $(elem).offset().top + 200;
        }

        return windowBottom > elementCentre - elem.offsetHeight / 2;
    }

    const sections = $(".section");
    function handleScroll() {
        sections.each(function () {
            if (isElementInView(this)) {
                $(this).addClass("shown");
            }
        });
    }

    handleScroll();
    $(window).on("scroll", handleScroll);
};

const types = {
    language: { id: "language", title: "Programming Languages" },
    frontEnd: { id: "front-end", title: "Front End" },
    backEnd: { id: "back-end", title: "Back End" },
    misc: { id: "misc", title: "Misc Skills" },
};

const skills = [
    {
        id: "C#",
        icon: "devicon-csharp-plain",
        title: "C#",
        types: [types.language],
    },
    {
        id: "ASP.NET",
        icon: "devicon-dot-net-plain",
        title: "ASP.NET",
        types: [types.backEnd],
    },
    {
        id: "Python",
        icon: "devicon-python-plain",
        title: "Python",
        types: [types.language],
    },
    {
        id: "CSS",
        icon: "devicon-css3-plain",
        title: "CSS",
        types: [types.frontEnd],
    },
    {
        id: "Sass",
        icon: "devicon-sass-original",
        title: "Sass",
        types: [types.frontEnd],
    },
    {
        id: "TailwindCSS",
        icon: "devicon-tailwindcss-original",
        title: "Tailwind",
        types: [types.frontEnd],
    },
    {
        id: "HTML",
        icon: "devicon-html5-plain",
        title: "HTML",
        types: [types.frontEnd],
    },
    {
        id: "JavaScript",
        icon: "devicon-javascript-plain",
        title: "JavaScript",
        types: [types.frontEnd, types.language],
    },
    {
        id: "TypeScript",
        icon: "devicon-typescript-plain",
        title: "TypeScript",
        types: [types.backEnd, types.language],
    },
    {
        id: "Bash",
        icon: "devicon-bash-plain",
        title: "Bash",
        types: [types.language],
    },
    {
        id: "NodeJS",
        icon: "devicon-nodejs-plain",
        title: "NodeJS",
        types: [types.backEnd],
    },
    {
        id: "React",
        icon: "devicon-react-original",
        title: "React",
        types: [types.frontEnd],
    },
    {
        id: "Next.js",
        icon: "devicon-nextjs-original-wordmark",
        title: "Next.js",
        types: [types.backEnd],
    },
    {
        id: "Jira",
        icon: "devicon-jira-plain",
        title: "Jira",
        types: [types.misc],
    },
    {
        id: "DevOps",
        icon: "devicon-azuredevops-plain",
        title: "Azure Devops",
        types: [types.misc],
    },
    {
        id: "GitHub",
        icon: "devicon-github-original",
        title: "GitHub",
        types: [types.misc],
    },
    {
        id: "Git",
        icon: "devicon-git-plain",
        title: "Git",
        types: [types.misc],
    },
];

const loadSkills = () => {
    const skillsContainer = document.getElementById("skills-container");

    const skillTypes = {};

    for (const type in types) {
        const typeId = types[type].id;
        const div = document.createElement("div");
        div.classList.add("skill-section");
        div.id = typeId;
        skillsContainer.appendChild(div);

        const title = document.createElement("h2");
        title.innerHTML = types[type].title;
        div.appendChild(title);

        const list = document.createElement("div");
        list.classList.add("skills");
        div.appendChild(list);

        skillTypes[typeId] = list;
    }

    skills.forEach((skill) => {
        skill.types.forEach((skillType) => {
            const typeDiv = skillTypes[skillType.id];

            const skillDiv = document.createElement("div");
            skillDiv.classList.add("skill");

            const iconDiv = document.createElement("div");
            iconDiv.classList.add("icon");
            const iconElement = document.createElement("i");
            iconElement.classList.add(skill.icon);
            iconDiv.appendChild(iconElement);

            const titleDiv = document.createElement("div");
            titleDiv.classList.add("title");
            titleDiv.textContent = skill.title;

            skillDiv.appendChild(iconDiv);
            skillDiv.appendChild(titleDiv);

            typeDiv.appendChild(skillDiv);
        });
    });
};
