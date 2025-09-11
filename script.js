console.log("JavaScript is working!");

let currentCar = null; 
let correctCount = 0;
let totalCount = 0;
let remainingCars = [];

function getPerformanceRating() {
    const accuracy = (correctCount / totalCount) * 100;
    if (accuracy === 100) return "Perfect Score 🌟🌟🌟";
    if (accuracy >= 80) return "Excellent! 🌟🌟";
    if (accuracy >= 60) return "Good Job! 🌟";
    return "Keep Practicing! 💪";
}


function hideAllSections() {
    document.querySelector(".menubuttons").style.display = "none";
    document.getElementById("aboutSection").style.display = "none";
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("flagSection").style.display = "none";
    document.getElementById("gameBoard").style.display = "none";
    document.getElementById("finalScorePage").style.display = "none";
    document.querySelector(".titleScreen").style.display = "none";
    document.getElementById("gameCompleteTitle").style.display = "none";


}
function showFinalScore() {
    hideAllSections();
    document.getElementById('gameCompleteTitle').style.display = "block";
    document.getElementById('finalScorePage').style.display = "block";

    document.getElementById('finalscoretext').textContent = `Your Score: ${correctCount}/${totalCount}`;
    document.getElementById('accuracyText').textContent = `Accuracy: ${Math.round((correctCount/totalCount)*100)}%`;
    document.getElementById('ratingText').textContent = getPerformanceRating();
}
function playagain() {
    hideAllSections();
    document.getElementById('flagSection').style.display = "block";
}
function gotoMainMenu() {
    hideAllSections();
    document.querySelector('.titleScreen').style.display = "block";
    document.querySelector('.menubuttons').style.display = "block";
}
function showAbout () 
{
    hideAllSections();
    document.getElementById("aboutSection").style.display = "block";
}


function startGame(mode) {

    document.querySelector(".menubuttons").style.display = "none";
    document.getElementById("gameSection").style.display = "block";

    //mode to set up game logic
    if (mode === 'country') {
        document.querySelector('.countryRandomContainer').style.display = 'none';
        document.getElementById('flagSection').style.display = 'block';
        document.getElementById('countryTitle').style.display = 'block'; 

    } else  //random mode
    {
        
        document.querySelector('.countryRandomContainer').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        document.getElementById('countryTitle').style.display = 'none';

        correctCount = 0;
        totalCount = 0;
        remainingCars = [...allCars()];
        startRound();

        document.getElementById('goBackCountryBtn').onclick = selectaModeScreen;

    }
}
function shuffle(array)
{
    for (let i=array.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function selectCountry(country) 
{
    document.getElementById('flagSection').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    
    correctCount = 0;
    totalCount = 0;
    
    remainingCars = [...carData[country]];
    document.getElementById('countryTitle').textContent = countrytitleCars[country]; //where we set the content of countryTitle
    document.getElementById('goBackCountryBtn').onclick = function() {
        hideAllSections();
        document.getElementById('flagSection').style.display = 'block';
    };

    startRound();
    function backtoCountry() {
        hideAllSections();
        document.getElementById('flagSection').style.display = 'block';
        document.getElementById('gameBoard').style.display = 'none';
    }
}

function startRound () 
{ 
    if (remainingCars.length === 0) {
        showFinalScore();
        return;
    }
    const randomIndex = Math.floor(Math.random() * remainingCars.length);
    currentCar = remainingCars[randomIndex];


    document.getElementById('carPrompt').innerText = `Select: ${currentCar.name}`;
    showCars(remainingCars);
}



function showCars(carArray) {
    const board = document.querySelector('.carGrid');
    board.innerHTML = ''; //removes any existing content inside gameBoard
    const shuffledCars = shuffle([...carArray]); //...carArray is a spread operator, creating copy of the carArray
   
    shuffledCars.forEach(car => { 
    const btn = document.createElement('button');
        btn.className = 'car-card';
        btn.innerHTML = `<img src="${car.img}" alt =$"{car.name}" ><p></p>`;
        btn.addEventListener('click', function () {
            totalCount++;
            console.log('Image clicked:', car.name, 'Current car:', currentCar?.name);
                if (car.name === currentCar.name) {
                    Swal.fire({
                        icon: "success",
                        confirmButtonColor: '#4CAF50'
                    });
          
                    correctCount++;
                    remainingCars = remainingCars.filter(c => c.name !== car.name);
                    startRound();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... try again!",
                        confirmButtonColor: '#f44336'
                    })
                }
            

            console.log("correct count:", correctCount);
            console.log("total count:", totalCount);

        });
        board.appendChild(btn);
    });
}
function allCars () {
    const allCars = [];
    Object.values(carData).forEach(countryCars => {
        allCars.push(...countryCars);
    });
    return allCars
}
function Previous() 
{
    
    document.querySelector(".menubuttons").style.display = "flex";
    document.getElementById("aboutSection").style.display = "none";
    document.getElementById("gameSection").style.display = "none";
    document.querySelector(".titleScreen").style.display = "flex";  



}

function selectaModeScreen()
{
    hideAllSections();
    document.getElementById('flagSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'flex';
    document.querySelector('.countryRandomContainer').style.display = 'flex';
}

const countrytitleCars = {
    japan: 'JAPANESE CARS'
    ,
    germany: 'GERMAN CARS'
    ,
    unitedkingdom: 'BRITISH CARS'
    ,
    france: 'FRENCH CARS'
    ,
    unitedstates: 'AMERICAN CARS'
};

const carData  = {
    japan: [
    { name: 'Toyota Supra', img: 'assets/cars/supra.png'},
    { name: 'Mazda RX-7', img: 'assets/cars/mazdarx7.png'},
    { name: 'Lexus LC500', img: 'assets/cars/lexuslc500.png'},
    { name: 'Lexus IS350', img: 'assets/cars/lexusis350.png'},
    { name: 'Honda NSX', img: 'assets/cars/hondansx.png'},
    { name: 'Mitsubishi Evo', img: 'assets/cars/mitsubishievo.png'},
    { name: 'Nissan GTR R35', img: 'assets/cars/gtr.png'},
    { name: 'Acura RSX', img: 'assets/cars/rsx.png'},
    { name: 'Subaru WRX STI', img: 'assets/cars/subiesti.png'},
    { name: 'Nissan Skyline GT-R R34', img: 'assets/cars/skyline.png'},
    { name: 'Mazda Miata', img: 'assets/cars/miata.png'},
    { name: 'Toyota Chaser', img: 'assets/cars/chaser.png'},


    ],
    germany: [
    { name: 'BMW M4', img: 'assets/cars/bmwm4.png'},
    { name: 'Porsche Carerra GT', img: 'assets/cars/carrera.png'},
    { name: 'Mercedes Benz AMG GT63', img: 'assets/cars/amg63.png'},
    { name: 'Audi R8', img: 'assets/cars/r8.png'},
    { name: 'BMW E92 M3', img: 'assets/cars/e92.png'},
    { name: 'Porsche 911', img: 'assets/cars/911.png'},
    { name: 'Volkswagen Golf', img: 'assets/cars/golf.png'},
    { name: 'BMW i8', img: 'assets/cars/i8.png'},
    { name: 'BMW M2 G87', img: 'assets/cars/g87.png'},
    { name: 'Mercedes Benz S Class', img: 'assets/cars/sclass.png'},
    { name: 'Mercedes Benz G Wagon', img: 'assets/cars/gwagon.png'},
    { name: 'Porsche Taycan', img: 'assets/cars/taycan.png'},

    ],
    unitedkingdom: [
        { name: 'Mclaren P1', img: 'assets/cars/mclarenp1.png'},
        { name: 'Rolls Royce Phantom', img: 'assets/cars/phantom.png'},
        { name: 'Aston Martin Vantage', img: 'assets/cars/vantage.png'},
        { name: 'Jaguar F-Type', img: 'assets/cars/ftype.png'},
        { name: 'Jensen FF', img: 'assets/cars/jensenff.png'},
        { name: 'Lotus Elise', img: 'assets/cars/lotuselise.png'},
        { name: 'Rolls Royce Ghost', img: 'assets/cars/ghost.png'},
        { name: 'Rolls Royce Wraith', img: 'assets/cars/wraith.png'},
        { name: 'Mini Cooper S Car', img: 'assets/cars/cooperscar.png'},
        { name: 'Jaguar E-Type', img: 'assets/cars/etype.png'},
        { name: 'Bentley Continental GT', img: 'assets/cars/continental.png'},
        { name: 'Bentley Bentayga', img: 'assets/cars/bentayga.png'},
    ],
    france: [
        { name: 'Bugatti Chiron', img: 'assets/cars/chiron.png'},
        { name: 'Renault Alpine', img: 'assets/cars/alpine.png'},
        { name: 'Renault 5 Turbo', img: 'assets/cars/r5.png'},
        { name: 'Dacia Duster', img: 'assets/cars/duster.png'},
        { name: 'Citroen DS3', img: 'assets/cars/ds3.png'},
        { name: 'Citroen DS', img: 'assets/cars/DS.png'},
    ],
    unitedstates: [
        { name: 'Corvette Stingray', img: 'assets/cars/stingray.jpg'},
        { name: 'Dodge Challenger SRT Hellcat', img: 'assets/cars/hellcat.png'},
        { name: '67 Ford Shelby', img: 'assets/cars/shelby.png'},
        { name: 'Ford GT', img: 'assets/cars/GT.png'},
        { name: 'Chevrolet Chevelle', img: 'assets/cars/chevelle.png'},
        { name: 'Dodge Viper', img: 'assets/cars/viper.png'},
        { name: 'Chevrolet Belair', img: 'assets/cars/belair.png'},
        { name: 'Dodge Ram', img: 'assets/cars/ram.png'},
        { name: 'Tesla Model S', img: 'assets/cars/models.png'},
        { name: 'Tesla Cybertruck', img: 'assets/cars/cybertruck.png'},
        { name: 'Cadillac CT5', img: 'assets/cars/cadillacct5.png'},
        { name: 'Jeep Wrangler', img: 'assets/cars/wrangler.png'},

    ],
};