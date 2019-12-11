window.addEventListener('load', function () {
   console.log("loaded");

   let formSubmit = document.getElementById('formSubmit');

   formSubmit.addEventListener('click', function (event) {
      let missionTarget = document.getElementById('missionTarget');
      let launchForm = document.getElementById('launchForm');

      let launchStatusCheck = document.getElementById('launchStatusCheck');
      let launchStatus = document.getElementById('launchStatus');

      let pilotName = document.getElementById('pilotName');
      let copilotName = document.getElementById('copilotName');
      let fuelLevel = document.getElementById('fuelLevel');
      let cargoMass = document.getElementById('cargoMass');

      let faultyItems = document.getElementById('faultyItems');
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');
      let fuelStatus = document.getElementById('fuelStatus');
      let cargoStatus = document.getElementById('cargoStatus');

      let alertStatus = "Please re-enter: \n";

      if (isInvalidString(pilotName) || isInvalidString(copilotName) ||
         isInvalidNumber(fuelLevel) || isInvalidNumber(cargoMass)) {
         event.preventDefault();
         redLight();
         window.alert("Please enter correct values");
      } else {
         // Updates pilots' statuses with names (must be valid to reach this point)
         pilotStatus.innerText = `${pilotName.value} is ready!`;
         copilotStatus.innerText = `${copilotName.value} is ready!`;

         // Updates the fuelStatus if it's < 10k (must be valid to reach this point)
         if (fuelLevel.value < 10000) {
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerText = "INSUFFICIENT FUEL LEVEL";
            redLight();
            event.preventDefault();
         } else {
            // Resets fuelStatus if corrected
            fuelStatus.innerText = 'Fuel level high enough for launch';
         }

         // Updates the cargoStatus if it's > 10k (must be valid to reach this point)
         if (cargoMass.value > 10000) {
            faultyItems.style.visibility = 'visible';
            cargoStatus.innerText = "EXCESSIVE CARGO MASS";
            redLight();
            event.preventDefault();
         } else {
            // Resets cargoStatus if corrected
            cargoStatus.innerText = 'Cargo mass low enough for launch';
         }

         // Greenlights launch if fuelLevel and cargoMass are acceptable
         if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
            launchStatus.innerText = 'Shuttle is ready to launch';
            launchStatus.style.color = 'green';
            faultyItems.style.visibility = 'hidden';
            fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
               response.json().then(function (json) {
                  let destination = Math.floor(Math.random() * json.length);
                  console.log(destination);
                  missionTarget.innerHTML = `<h2>Mission Destination</h2>
                                             <ol>
                                                <li>Name: ${json[destination].name}</li>
                                                <li>Diameter: ${json[destination].diameter}</li>
                                                <li>Star: ${json[destination].star}</li>
                                                <li>Distance from Earth: ${json[destination].distance}</li>
                                                <li>Number of Moons: ${json[destination].moons}</li>
                                             </ol>
                                             <img src="${json[destination].image}">`;
               });
            });
            event.preventDefault();
         }
      }
   });

});

// Checks for valid string, returning true if invalid
function isInvalidString(toCheck) {
   if (!toCheck.value || toCheck.value === '') {
      return true;
   }
   return false;
}

// Checks for valid nunmber, returning true if invalid
function isInvalidNumber(toCheck) {
   if (!toCheck.value || isNaN(Number(toCheck.value))) {
      return true;
   }
   return false;
}

// Sets launchStatus to red and not ready
function redLight() {
   launchStatus.innerText = 'Shuttle is not ready to launch';
   launchStatus.style.color = 'red';
}

// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/