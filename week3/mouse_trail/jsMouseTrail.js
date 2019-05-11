window.addEventListener("mousemove", event => {
    // Get Dots
    let dot1 = document.getElementById("dot1");
    let dot2 = document.getElementById("dot2");
    let dot3 = document.getElementById("dot3");
    let dot4 = document.getElementById("dot4");
    let dot5 = document.getElementById("dot5");

    // Get the position of the mouse
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    // Retrieve the old positions of the dots
    let dot1location = [ dot1.style.left, dot1.style.top ];
    let dot2location = [ dot2.style.left, dot2.style.top ];
    let dot3location = [ dot3.style.left, dot3.style.top ];
    let dot4location = [ dot4.style.left, dot4.style.top ];

    // Set the new positions for each dot
    dot1.style.left = mouseX + "px";
    dot1.style.top = mouseY + "px";
    dot2.style.left = dot1location[0];
    dot2.style.top = dot1location[1];
    dot3.style.left = dot2location[0];
    dot3.style.top = dot2location[1];
    dot4.style.left = dot3location[0];
    dot4.style.top = dot3location[1];
    dot5.style.left = dot4location[0];
    dot5.style.top = dot4location[1];
});