const displayController = (() => {
    // Get the grid container
    const gridContainer = document.getElementById('grid-container');
    // Get the controll elements (Buttons, sliders, etc)
    const paintButton = document.getElementById('paint-btn');
    const rainbowButton = document.getElementById('rainbow-btn');
    const eraseButton = document.getElementById('erase-btn');
    const borderButton = document.getElementById('border-btn');
    const clearButton = document.getElementById('clear-btn');
    const colorInput = document.getElementById('color-input');
    const sizeInput = document.getElementById('size-range');

    // Declare Variables
    let gridSize = 15;
    let borderState = true;
    let paintMode = 'paint';
    let color = '#000000';
    let mouseClicked = false;


    // Set the grid container style such that it adjust dynamically
    function setGridContainerStyle(gridSize){
        const style = `
        display: grid;
        grid-template-columns: repeat(${gridSize}, 1fr);
        grid-template-rows: repeat(${gridSize}, 1fr);
        `;

        gridContainer.setAttribute('style', style);
    };


    // Create a NxN grid dynamically by insterting div elements with a class of grid-item
    function createGrid(gridSize){
        for (let i=0; i<gridSize; i++){
            for (let j=0; j<gridSize; j++){
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                // Add or remove borders based on the borderState flag
                if (borderState) {
                    gridItem.classList.add('grid-item-border');
                };
                // Add the grid item to the DOM
                gridContainer.appendChild(gridItem);
            };
        };

        // Set the grid style
        setGridContainerStyle(gridSize);
        // Add event listeners
        addGridEventListeners();
    };

    // Clear the grid by setting its inner html to an empty string
    function clearGrid(){
        gridContainer.innerHTML = '';
    };

    // Reset the grid by clearing the grid and recreating it
    function resetGrid(){
        clearGrid();
        createGrid(gridSize);
    };


    // Handle the border toggle 
    function handleBorderToggle(){
        gridContainer.classList.toggle('grid-border');
        borderButton.classList.toggle('active-btn');
        document.querySelectorAll('.grid-item').forEach(gridItem => gridItem.classList.toggle('grid-item-border'));
        borderState = borderState ? false : true;
    };

    // Handle the color input
    function handleColorInput(val){
        color = val;
        console.log(color)
    }

    // Handle paint mode buttons 
    function handlePaintMode(mode){
        paintButton.classList.remove('active-btn');
        eraseButton.classList.remove('active-btn');
        rainbowButton.classList.remove('active-btn');

        paintMode = mode;
        if (paintMode === 'paint'){
            paintButton.classList.add('active-btn');
        } else if (paintMode === 'erase') {
            eraseButton.classList.add('active-btn');
        } else {
            rainbowButton.classList.add('active-btn');
        };
    };

    // Update Size Input Text
    function handleSizeInputText(val){
        sizeInput.nextElementSibling.innerHTML = `${val}x${val}`
    };

    // Handle Size Input
    function handleSizeInput(val){
        gridSize = val;
        handleSizeInputText(val);
        resetGrid();
    }


    // Add the event listeners to the controll elements
    function addMenuEventListeners(){

        // Color Input
        //colorInput.addEventListener('click', (e) => handleColorInput(e.target.value));
        colorInput.addEventListener('input', (e) => handleColorInput(e.target.value));
        colorInput.addEventListener('change', (e) => handleColorInput(e.target.value));

        // Paint Mode Buttons
        paintButton.addEventListener('click', () => handlePaintMode('paint'));
        eraseButton.addEventListener('click', () => handlePaintMode('erase'));
        rainbowButton.addEventListener('click', () => handlePaintMode('rainbow'));

        // Border Button
        borderButton.addEventListener('click', handleBorderToggle);

        // Size Input
        sizeInput.addEventListener('input', (e) => handleSizeInputText(e.target.value));
        sizeInput.addEventListener('change', (e) => handleSizeInput(e.target.value));

        // Clear Button
        clearButton.addEventListener('click', resetGrid);

    };

    // Creates a random hex color
    function randomHexColor(){
        const hexChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','A','B', 'C', 'D', 'E', 'F'];
        let hexCode = '#';
        for (let i=0; i< 6; i++){
            let index = Math.floor(Math.random() * hexChar.length -1);
            hexCode += hexChar[index];
        };
        return hexCode;
    };

    // Handle painting the grid items
    function handlePaintGridItem(e){
        console.log(color)
        if (e.type ==='mouseover' && !mouseClicked) return;

        if (paintMode === 'paint') {
            e.target.style.backgroundColor = color;
        }else if (paintMode === 'erase'){
            e.target.style.backgroundColor = '';
        }else{
            e.target.style.backgroundColor = randomHexColor();
        };
    };

    // Add Grid Event Listeners 
    function addGridEventListeners(){
        // Grid Container Listeners
        gridContainer.addEventListener('mousedown', ()=>{mouseClicked=true});
        gridContainer.addEventListener('mouseup', () => {mouseClicked=false});
        gridContainer.addEventListener('mouseleave', () => {mouseClicked=false});

        //Grid Item Listeners
        gridContainer.childNodes.forEach(element => {
            element.addEventListener('mousedown', (e) => handlePaintGridItem(e));
            element.addEventListener('mouseover', (e) => handlePaintGridItem(e));
        });
    };

    // Initialize the display
    function initializeDisplay(){
        addMenuEventListeners();
        
        createGrid(15);
    }
    return {
        initializeDisplay
    }

});


displayController().initializeDisplay();
