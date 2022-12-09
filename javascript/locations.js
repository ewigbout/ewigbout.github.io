window.AllLocations = {
    HOMEROOM: {
        name: "homeroom",
        img: window.images.locations.room,
        actions: [
            {
                name: "drawer",
                img: window.images.actionable.room.nightstand
            },
            {
                name: "bed",
                img: window.images.actionable.room.pillow
            },
            {
                name: "sink",
                img: window.images.actionable.room.sink
            },
            {
                name: "luggage",
                img: window.images.actionable.room.bag
            },
            {
                name: "window",
                img: window.images.actionable.room.window
            },
        ],
        nextLocations: [{
            name: "hallway",
            label: "Exit room"
        }]
    },
    HALLWAY: {
        name: "hallway",
        img: window.images.locations.hallway,
        nextLocations: [{
            name: "homeroom",
            label: "<<"
        },
            {
                name: "elevator lobby",
                label: "Go to elevators"
            }
        ],
        actions: []
    },
    ELEVATOR_LOBBY: {
        name: "elevator lobby",
        img: window.images.locations.elevators_lobby,
        nextLocations: [{
            name: "hallway",
            label: "<<"
        },
            {
                name: "elevator",
                label: "Use elevator"
            },
            {
                name: "stairs",
                label: "Use stairs"
            }
        ],
        actions: []
    },
    ELEVATOR: {
        name: "elevator",
        img: window.images.locations.elevator,
        nextLocations: [
            {
                name: "elevator lobby",
                label: "<<"
            },
            {
                name: "ground floor lobby",
                label: "Down to ground floor"
            }
        ],
        actions: []
    },
    STAIRS: {
        name: "stairs",
        img: window.images.locations.stairs,
        nextLocations: [{
            name: "elevator lobby",
            label: "<<"
        },
            {
                name: "ground floor lobby",
                label: "Down to ground floor"
            }
        ],
        actions: []
    },
    GROUND_FLOOR_LOBBY: {
        name: "ground floor lobby",
        img: window.images.locations.ground_floor,
        nextLocations: [
            {
                name: "elevator",
                label: "Use elevator"
            },
            {
                name: "stairs",
                label: "Use stairs"
            }
        ],
        actions: []
    },
};


// TODO: switch - case
function getLocationByName(name) {
    if (name === "homeroom") {
        return window.AllLocations.HOMEROOM;
    }
    if (name === "hallway") {
        return window.AllLocations.HALLWAY;
    }
    if (name === "elevator lobby") {
        return window.AllLocations.ELEVATOR_LOBBY;
    }
    if (name === "elevator") {
        return window.AllLocations.ELEVATOR;
    }
    if (name === "stairs") {
        return window.AllLocations.STAIRS;
    }
    if (name === "ground floor lobby") {
        return window.AllLocations.GROUND_FLOOR_LOBBY;
    }
    // TODO: error handling
    return window.AllLocations.HOMEROOM;

}

function goTo(location) {
    window.PLAYER.location = location;
    document.getElementById("location-actions").innerHTML = "";
    // TODO: will it create a DOM element every time?
    let locationImg = document.createElement("img");
    locationImg.src = location.img;
    locationImg.height = 400;
    document.getElementById("game-main-img").innerHTML = "";
    document.getElementById("game-main-img").appendChild(locationImg);
    location.actions.forEach(loadLocationAction);
    document.getElementById("next-locations").innerHTML = "";
    location.nextLocations.forEach((locationOption) => {
        let nextLocationTr = document.createElement("tr");
        let nextLocationTd = document.createElement("td");
        let locationOptionButton = document.createElement("button");
        nextLocationTd.appendChild(locationOptionButton);
        nextLocationTr.appendChild(nextLocationTd);
        locationOptionButton.innerHTML = locationOption.label;
        locationOptionButton.addEventListener("click", () => goTo(getLocationByName(locationOption.name)));
        locationOptionButton.className = "location-option-text-button";
        document.getElementById("next-locations").appendChild(nextLocationTr);
    });
}