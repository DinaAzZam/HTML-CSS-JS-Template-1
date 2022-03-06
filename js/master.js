// Check if there is local storage color option
let mainColor = localStorage.getItem("color_option");

if(mainColor !== null) {
    document.documentElement.style.setProperty('--main--color', mainColor);
    // Remove Active Class from All Colors List Items
    document.querySelectorAll(".colors-list li").forEach(element => {  
        element.classList.remove("active");
        // Add Active Class On Element with Data-color = local storage item
        if(element.dataset.color === mainColor) {
            // Add Active Class
            element.classList.add("active");
        }
    });
}

// Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background local storage isn't empty
if(backgroundLocalItem !== null) {

    if(backgroundLocalItem === 'true') {
        backgroundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

    // Remove Active Class from All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        
        element.classList.remove("active");

    });
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    
    // Toggle Class Fa Spin For Rotation On Self
    this.classList.toggle("fa-spin");

     // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

    // Click On Every List Item
    li.addEventListener("click", (e) => {
        
        // Set Color On Root
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    });
});


// Switch Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All List Items
randomBackEl.forEach(span => {

    // Click On Every List Item
    span.addEventListener("click", (e) => {
        
        handleActive(e);

        if(e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }
        else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});


// Select Landing Page Element
let page = document.querySelector(".landing-page");

// Get Array of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {

    if(backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // Change Background Image URL
            page.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        
        }, 1000);

    }
}

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = skill.dataset.progress;

    });
  }
};

// Create Popup with The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class to Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay to the body
        document.body.appendChild(overlay);

        // Create the Popup
        let popupBox = document.createElement("div");

        // Add Class to the Popup Box
        popupBox.className = 'popup-box';

        if(img.alt !== null) {

            // Greate Heading
            let imgHeading = document.createElement("h3");

            // Create Text for Heading
            let imgText = document.createTextNode(img.alt);

            // Append the Text to the Heading
            imgHeading.appendChild(imgText);

            // Append the Heading to the Popup Box
            popupBox.appendChild(imgHeading);

        }

        // Create the Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = img.src;

        // Add Image to Popup Box
        popupBox.appendChild(popupImage);

        // Append the Popup Box to the Body
        document.body.appendChild(popupBox);

        // Create the Close Span
        let closeButton = document.createElement("span");

        // Create the Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text to Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class to Close Button
        closeButton.className = 'close-button';

        // Add Close Button to the Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener('click', function(e) {

    if(e.target.className == 'close-button') {

        // Remove the Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();

    }

});


// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
    
            });
    
        });
    });
    
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev){

    // Remove Active Class from All spans
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
            
        element.classList.remove("active");

    });

    // Add Active Class On Self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if(bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if(bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if(span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');

        } else {

            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');

        }

        handleActive(e);

    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");
    
    window.location.reload();
};


// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu and Toggle Button
document.addEventListener("click", (e) => {
    
    if (e.target !== toggleBtn && e.target !== tLinks) {
        
        // Check If Menu is Open
        if (tLinks.classList.contains("open")) {
  
        // Toggle Class "menu-active" on Button
        toggleBtn.classList.toggle("menu-active");
  
        // Toggle Class "open" on Links
        tLinks.classList.toggle("open");
  
        }
  
    }
  
});
  
  // Stop Propagation On Menu 
  tLinks.onclick = function (e) {
    e.stopPropagation();
  }


