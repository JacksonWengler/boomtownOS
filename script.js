document.addEventListener("DOMContentLoaded", function () {
    var selectedIcon = undefined;
    var biggestIndex = 1;
    var topBar = document.getElementById("top-bar");

    function updateTime() {
        var currentTime = new Date().toLocaleString();
        var timeText = document.querySelector("#theTime");
        timeText.innerHTML = currentTime;
    }

    function addWindowTapHandling(element) {
        element.addEventListener("mousedown", () => handleWindowTap(element));
    }

    function handleWindowTap(element) {
        biggestIndex++;
        element.style.zIndex = biggestIndex;
        topBar.style.zIndex = biggestIndex + 1;
        deselectIcon(selectedIcon);
    }

    function openWindow(element) {
        element.style.display = "flex";
        biggestIndex++;
        element.style.zIndex = biggestIndex;
        topBar.style.zIndex = biggestIndex + 1;
    }

    function closeWindow(element) {
        element.style.display = "none";
    }

    function dragElement(element) {
        var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

        if (document.getElementById(element.id + "header")) {
            document.getElementById(element.id + "header").onmousedown = startDragging;
        } else {
            element.onmousedown = startDragging;
        }

        function startDragging(e) {
            e = e || window.event;
            e.preventDefault();
            initialX = e.clientX;
            initialY = e.clientY;
            document.onmouseup = stopDragging;
            document.onmousemove = dragElement;
        }

        function dragElement(e) {
            e = e || window.event;
            e.preventDefault();
            currentX = initialX - e.clientX;
            currentY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;
            element.style.top = (element.offsetTop - currentY) + "px";
            element.style.left = (element.offsetLeft - currentX) + "px";
        }

        function stopDragging() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function selectIcon(element) {
        element.classList.add("selected");
        selectedIcon = element;
    }

    function deselectIcon(element) {
        if (element) {
            element.classList.remove("selected");
            selectedIcon = undefined;
        }
    }

    function handleIconTap(element) {
        if (element.classList.contains("selected")) {
            deselectIcon(element);
            openWindow(window);
        } else {
            selectIcon(element);
        }
    }

    var welcomeScreen = document.querySelector("#welcomescreen");
    var welcomeScreenOpen = document.querySelector("#top-bar-title");
    var welcomeScreenClose = document.querySelector("#welcomescreenclose");
    var mapsScreen = document.querySelector("#mapscreen");
    var mapsScreenClose = document.querySelector("#mapscreenclose");
    var mapsScreenOpen = document.querySelector("#mapapp");

    welcomeScreenClose.addEventListener("click", () => closeWindow(welcomeScreen));
    welcomeScreenOpen.addEventListener("click", () => openWindow(welcomeScreen));
    mapsScreenClose.addEventListener("click", () => closeWindow(mapsScreen));
    mapsScreenOpen.addEventListener("click", () => openWindow(mapsScreen));

    addWindowTapHandling(mapsScreen);
    addWindowTapHandling(welcomeScreen);

    updateTime();
    setInterval(updateTime, 1000);

    dragElement(welcomeScreen);
    dragElement(mapsScreen);
});