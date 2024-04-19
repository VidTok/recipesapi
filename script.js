gsap.from (".headingINP", {opacity: 0, duration: 2, delay: 1});

const input = document.querySelector ('#input');
const inputBox = document.querySelector ('.inputBox');
const submitBTN = document.querySelector ('.submitBTN');
const btnTry = document.querySelector ('.btnTry');
let mealsBox = document.querySelector ('.mealsBox');
let mealsBoxMob = document.querySelector ('.mealsBoxMob');

let mealsList = [];

input.addEventListener ('keypress', enter);
submitBTN.addEventListener ('click', btnPress);

function enter (e) {

  if (e.keyCode === 13) {

    let valueINP = input.value;
    let language = /а|б|в|г|д|е|ё|ж|з|и|й|к|л|м|н|о|п|р|с|т|у|ф|х|ц|ч|ш|щ|э|ю|я|ь|ъ/gi;
    if (language.test (valueINP)) {
      Swal.fire({
        title: 'Smth went rong!',
        text: 'Pls, check the spelling: only latin letters!',
        imageUrl: 'fail.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
    
    else {
      getList (input.value);
    }
        
  }
  
}

function btnPress (e) {

  let valueINP = input.value;
  let language = /а|б|в|г|д|е|ё|ж|з|и|й|к|л|м|н|о|п|р|с|т|у|ф|х|ц|ч|ш|щ|э|ю|я|ь|ъ/gi;
  if (language.test (valueINP)) {
    Swal.fire({
      title: 'Smth went rong!',
      text: 'Pls, check the spelling: only latin letters!',
      imageUrl: 'fail.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  
  else {
    getList (input.value);
  }
        
}

async function getList (data) {

  const resList = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`);
  const resultList = await resList.json();
  console.log (resultList);

  let resTest = `${resultList.meals}`;
  console.log (resTest);


  if (resTest.includes('null')) {

    Swal.fire({
      title: 'Smth went rong!',
      text: 'Pls, check the spelling, or try another ingredient.',
      imageUrl: 'fail.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })

  }

  else {

    displayRec(resultList);

  }
  
}

function displayRec (resultList) {

  inputBox.style.display = 'none';
  btnTry.style.display = 'block';

  resultList.meals.forEach(element => {
    mealsList.push (element.strMeal)
  });

  console.log (mealsList);

  mealsList.forEach (async function getRec (item) { 

    const resRec  = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
    const resultRec = await resRec.json();
    console.log (resultRec);

    displayResult(resultRec);
    displayResultMob(resultRec);

    btnTry.addEventListener ('click', function () {
      location.reload();
    })

  });

  function displayResult (resultRec) {

    let block = document.createElement ('div');
    block.classList.add ('block');
    mealsBox.appendChild(block);

    let mealBox = document.createElement ('div');
    mealBox.classList.add ('mealBoxDis');
    block.appendChild(mealBox);

    let mealName = document.createElement ('h3');
    mealName.classList.add ('mealNameDis');
    mealName.innerText = resultRec.meals[0].strMeal;
    mealBox.appendChild(mealName);

    let mealCuisine = document.createElement ('p');
    mealCuisine.classList.add ('mealCuisineDis');
    mealCuisine.innerText = `Cuisine — ${resultRec.meals[0].strArea}`;
    mealBox.appendChild(mealCuisine);


    let mealIngredientsBox = document.createElement ('div');
    mealIngredientsBox.classList.add ('mealIngredientsBoxDis');
    mealBox.appendChild(mealIngredientsBox);

    let mealIngredient1 = document.createElement ('p');
    mealIngredient1.classList.add ('mealIngredienteDis');
    mealIngredient1.innerText = `✔️ ${resultRec.meals[0].strIngredient1} — ${resultRec.meals[0].strMeasure1}`;
    mealIngredientsBox.appendChild(mealIngredient1);
    if (mealIngredient1.innerText.includes('null') || resultRec.meals[0].strIngredient1.length < 1) {mealIngredient1.style.display = 'none'};

    let mealIngredient2 = document.createElement ('p');
    mealIngredient2.classList.add ('mealIngredienteDis');
    mealIngredient2.innerText = `✔️ ${resultRec.meals[0].strIngredient2} — ${resultRec.meals[0].strMeasure2}`;
    mealIngredientsBox.appendChild(mealIngredient2);
    if (mealIngredient2.innerText.includes('null') || resultRec.meals[0].strIngredient2.length < 1) {mealIngredient2.style.display = 'none'};

    let mealIngredient3 = document.createElement ('p');
    mealIngredient3.classList.add ('mealIngredienteDis');
    mealIngredient3.innerText = `✔️ ${resultRec.meals[0].strIngredient3} — ${resultRec.meals[0].strMeasure3}`;
    mealIngredientsBox.appendChild(mealIngredient3);
    if (mealIngredient3.innerText.includes('null') || resultRec.meals[0].strIngredient3.length < 1) {mealIngredient3.style.display = 'none'};

    let mealIngredient4 = document.createElement ('p');
    mealIngredient4.classList.add ('mealIngredienteDis');
    mealIngredient4.innerText = `✔️ ${resultRec.meals[0].strIngredient4} — ${resultRec.meals[0].strMeasure4}`;
    mealIngredientsBox.appendChild(mealIngredient4);
    if (mealIngredient4.innerText.includes('null') || resultRec.meals[0].strIngredient4.length < 1) {mealIngredient4.style.display = 'none'};

    let mealIngredient5 = document.createElement ('p');
    mealIngredient5.classList.add ('mealIngredienteDis');
    mealIngredient5.innerText = `✔️ ${resultRec.meals[0].strIngredient5} — ${resultRec.meals[0].strMeasure5}`;
    mealIngredientsBox.appendChild(mealIngredient5);
    if (mealIngredient5.innerText.includes('null') || resultRec.meals[0].strIngredient5.length < 1) {mealIngredient5.style.display = 'none'};

    let mealIngredient6 = document.createElement ('p');
    mealIngredient6.classList.add ('mealIngredienteDis');
    mealIngredient6.innerText = `✔️ ${resultRec.meals[0].strIngredient6} — ${resultRec.meals[0].strMeasure6}`;
    mealIngredientsBox.appendChild(mealIngredient6);
    if (mealIngredient6.innerText.includes('null') || resultRec.meals[0].strIngredient6.length < 1) {mealIngredient6.style.display = 'none'};

    let mealIngredient7 = document.createElement ('p');
    mealIngredient7.classList.add ('mealIngredienteDis');
    mealIngredient7.innerText = `✔️ ${resultRec.meals[0].strIngredient7} — ${resultRec.meals[0].strMeasure7}`;
    mealIngredientsBox.appendChild(mealIngredient7);
    if (mealIngredient7.innerText.includes('null') || resultRec.meals[0].strIngredient7.length < 1) {mealIngredient7.style.display = 'none'};

    let mealIngredient8 = document.createElement ('p');
    mealIngredient8.classList.add ('mealIngredienteDis');
    mealIngredient8.innerText = `✔️ ${resultRec.meals[0].strIngredient8} — ${resultRec.meals[0].strMeasure8}`;
    mealIngredientsBox.appendChild(mealIngredient8);
    if (mealIngredient8.innerText.includes('null') || resultRec.meals[0].strIngredient8.length < 1) {mealIngredient8.style.display = 'none'};

    let mealIngredient9 = document.createElement ('p');
    mealIngredient9.classList.add ('mealIngredienteDis');
    mealIngredient9.innerText = `✔️ ${resultRec.meals[0].strIngredient9} — ${resultRec.meals[0].strMeasure9}`;
    mealIngredientsBox.appendChild(mealIngredient9);
    if (mealIngredient9.innerText.includes('null') || resultRec.meals[0].strIngredient9.length < 1) {mealIngredient9.style.display = 'none'};

    let mealIngredient10 = document.createElement ('p');
    mealIngredient10.classList.add ('mealIngredienteDis');
    mealIngredient10.innerText = `✔️ ${resultRec.meals[0].strIngredient10} — ${resultRec.meals[0].strMeasure10}`;
    mealIngredientsBox.appendChild(mealIngredient10);
    if (mealIngredient10.innerText.includes('null') || resultRec.meals[0].strIngredient10.length < 1) {mealIngredient10.style.display = 'none'};

    let mealIngredient11 = document.createElement ('p');
    mealIngredient11.classList.add ('mealIngredienteDis');
    mealIngredient11.innerText = `✔️ ${resultRec.meals[0].strIngredient11} — ${resultRec.meals[0].strMeasure11}`;
    mealIngredientsBox.appendChild(mealIngredient11);
    if (mealIngredient11.innerText.includes('null') || resultRec.meals[0].strIngredient11.length < 1) {mealIngredient11.style.display = 'none'};

    let mealIngredient12 = document.createElement ('p');
    mealIngredient12.classList.add ('mealIngredienteDis');
    mealIngredient12.innerText = `✔️ ${resultRec.meals[0].strIngredient12} — ${resultRec.meals[0].strMeasure12}`;
    mealIngredientsBox.appendChild(mealIngredient12);
    if (mealIngredient12.innerText.includes('null') || resultRec.meals[0].strIngredient12.length < 1) {mealIngredient12.style.display = 'none'};

    let mealIngredient13 = document.createElement ('p');
    mealIngredient13.classList.add ('mealIngredienteDis');
    mealIngredient13.innerText = `✔️ ${resultRec.meals[0].strIngredient13} — ${resultRec.meals[0].strMeasure13}`;
    mealIngredientsBox.appendChild(mealIngredient13);
    if (mealIngredient13.innerText.includes('null') || resultRec.meals[0].strIngredient13.length < 1) {mealIngredient13.style.display = 'none'};

    let mealIngredient14 = document.createElement ('p');
    mealIngredient14.classList.add ('mealIngredienteDis');
    mealIngredient14.innerText = `✔️ ${resultRec.meals[0].strIngredient14} — ${resultRec.meals[0].strMeasure14}`;
    mealIngredientsBox.appendChild(mealIngredient14);
    if (mealIngredient14.innerText.includes('null') || resultRec.meals[0].strIngredient14.length < 1) {mealIngredient14.style.display = 'none'};

    let mealIngredient15 = document.createElement ('p');
    mealIngredient15.classList.add ('mealIngredienteDis');
    mealIngredient15.innerText = `✔️ ${resultRec.meals[0].strIngredient15} — ${resultRec.meals[0].strMeasure15}`;
    mealIngredientsBox.appendChild(mealIngredient15);
    if (mealIngredient15.innerText.includes('null') || resultRec.meals[0].strIngredient15.length < 1) {mealIngredient15.style.display = 'none'};

    let mealIngredient16 = document.createElement ('p');
    mealIngredient16.classList.add ('mealIngredienteDis');
    mealIngredient16.innerText = `✔️ ${resultRec.meals[0].strIngredient16} — ${resultRec.meals[0].strMeasure16}`;
    mealIngredientsBox.appendChild(mealIngredient16);
    if (mealIngredient16.innerText.includes('null') || resultRec.meals[0].strIngredient16.length < 1) {mealIngredient16.style.display = 'none'};

    let mealIngredient17 = document.createElement ('p');
    mealIngredient17.classList.add ('mealIngredienteDis');
    mealIngredient17.innerText = `✔️ ${resultRec.meals[0].strIngredient17} — ${resultRec.meals[0].strMeasure17}`;
    mealIngredientsBox.appendChild(mealIngredient17);
    if (mealIngredient17.innerText.includes('null') || resultRec.meals[0].strIngredient17.length < 1) {mealIngredient17.style.display = 'none'};

    let mealIngredient18 = document.createElement ('p');
    mealIngredient18.classList.add ('mealIngredienteDis');
    mealIngredient18.innerText = `✔️ ${resultRec.meals[0].strIngredient18} — ${resultRec.meals[0].strMeasure18}`;
    mealIngredientsBox.appendChild(mealIngredient18);
    if (mealIngredient18.innerText.includes('null') || resultRec.meals[0].strIngredient18.length < 1) {mealIngredient18.style.display = 'none'};

    let mealIngredient19 = document.createElement ('p');
    mealIngredient19.classList.add ('mealIngredienteDis');
    mealIngredient19.innerText = `✔️ ${resultRec.meals[0].strIngredient19} — ${resultRec.meals[0].strMeasure19}`;
    mealIngredientsBox.appendChild(mealIngredient19);
    if (mealIngredient19.innerText.includes('null') || resultRec.meals[0].strIngredient19.length < 1) {mealIngredient19.style.display = 'none'};

    let mealIngredient20 = document.createElement ('p');
    mealIngredient20.classList.add ('mealIngredienteDis');
    mealIngredient20.innerText = `✔️ ${resultRec.meals[0].strIngredient20} — ${resultRec.meals[0].strMeasure20}`;
    mealIngredientsBox.appendChild(mealIngredient20);
    if (mealIngredient20.innerText.includes('null') || resultRec.meals[0].strIngredient20.length < 1) {mealIngredient20.style.display = 'none'};


    let mealRecipeBox = document.createElement ('div');
    mealRecipeBox.classList.add ('mealRecipeBox');
    mealBox.appendChild(mealRecipeBox);

    let mealRecipe = document.createElement ('p');
    mealRecipe.classList.add ('mealRecipeDis');
    mealRecipe.innerText = resultRec.meals[0].strInstructions;
    mealRecipeBox.appendChild(mealRecipe);

    let mealLinksBox = document.createElement ('div');
    mealLinksBox.classList.add ('mealLinksBox');
    mealBox.appendChild(mealLinksBox);

    let mealLinkSource = document.createElement ('p');
    mealLinkSource.classList.add ('mealLinkSourceDis');
    mealLinkSource.innerText = `📄 Source`;
    mealLinksBox.appendChild(mealLinkSource);
    let mealLinkSourceInn = `${resultRec.meals[0].strSource}`
    if (mealLinkSourceInn.includes('null') || resultRec.meals[0].strSource.length < 1) {mealLinkSource.style.display = 'none'};
    mealLinkSource.addEventListener ('click', function () {
      window.open (resultRec.meals[0].strSource, "_blank");
    })
    
    let mealLinkYouTube = document.createElement ('p');
    mealLinkYouTube.classList.add ('mealLinkYouTubeDis');
    mealLinkYouTube.innerText = `🎥 Video`;
    mealLinksBox.appendChild(mealLinkYouTube);
    let mealLinkYouTubeInn = `${resultRec.meals[0].strYoutube}`
    if (mealLinkYouTubeInn.includes('null') || resultRec.meals[0].strYoutube.length < 1) {mealLinkYouTube.style.display = 'none'};
    mealLinkYouTube.addEventListener ('click', function () {
      window.open (resultRec.meals[0].strYoutube, "_blank");
    })

  }

  function displayResultMob (resultRec) {

    let block = document.createElement ('div');
    block.classList.add ('block');
    mealsBoxMob.appendChild(block);

    let mealBox = document.createElement ('div');
    mealBox.classList.add ('mealBoxDis');
    block.appendChild(mealBox);

    let mealName = document.createElement ('h3');
    mealName.classList.add ('mealNameDis');
    mealName.innerText = resultRec.meals[0].strMeal;
    mealBox.appendChild(mealName);

    let mealCuisine = document.createElement ('p');
    mealCuisine.classList.add ('mealCuisineDis');
    mealCuisine.innerText = `Cuisine — ${resultRec.meals[0].strArea}`;
    mealBox.appendChild(mealCuisine);


    let mealIngredientsBox = document.createElement ('div');
    mealIngredientsBox.classList.add ('mealIngredientsBoxDis');
    mealBox.appendChild(mealIngredientsBox);

    let mealIngredient1 = document.createElement ('p');
    mealIngredient1.classList.add ('mealIngredienteDis');
    mealIngredient1.innerText = `✔️ ${resultRec.meals[0].strIngredient1} — ${resultRec.meals[0].strMeasure1}`;
    mealIngredientsBox.appendChild(mealIngredient1);
    if (mealIngredient1.innerText.includes('null') || resultRec.meals[0].strIngredient1.length < 1) {mealIngredient1.style.display = 'none'};

    let mealIngredient2 = document.createElement ('p');
    mealIngredient2.classList.add ('mealIngredienteDis');
    mealIngredient2.innerText = `✔️ ${resultRec.meals[0].strIngredient2} — ${resultRec.meals[0].strMeasure2}`;
    mealIngredientsBox.appendChild(mealIngredient2);
    if (mealIngredient2.innerText.includes('null') || resultRec.meals[0].strIngredient2.length < 1) {mealIngredient2.style.display = 'none'};

    let mealIngredient3 = document.createElement ('p');
    mealIngredient3.classList.add ('mealIngredienteDis');
    mealIngredient3.innerText = `✔️ ${resultRec.meals[0].strIngredient3} — ${resultRec.meals[0].strMeasure3}`;
    mealIngredientsBox.appendChild(mealIngredient3);
    if (mealIngredient3.innerText.includes('null') || resultRec.meals[0].strIngredient3.length < 1) {mealIngredient3.style.display = 'none'};

    let mealIngredient4 = document.createElement ('p');
    mealIngredient4.classList.add ('mealIngredienteDis');
    mealIngredient4.innerText = `✔️ ${resultRec.meals[0].strIngredient4} — ${resultRec.meals[0].strMeasure4}`;
    mealIngredientsBox.appendChild(mealIngredient4);
    if (mealIngredient4.innerText.includes('null') || resultRec.meals[0].strIngredient4.length < 1) {mealIngredient4.style.display = 'none'};

    let mealIngredient5 = document.createElement ('p');
    mealIngredient5.classList.add ('mealIngredienteDis');
    mealIngredient5.innerText = `✔️ ${resultRec.meals[0].strIngredient5} — ${resultRec.meals[0].strMeasure5}`;
    mealIngredientsBox.appendChild(mealIngredient5);
    if (mealIngredient5.innerText.includes('null') || resultRec.meals[0].strIngredient5.length < 1) {mealIngredient5.style.display = 'none'};

    let mealIngredient6 = document.createElement ('p');
    mealIngredient6.classList.add ('mealIngredienteDis');
    mealIngredient6.innerText = `✔️ ${resultRec.meals[0].strIngredient6} — ${resultRec.meals[0].strMeasure6}`;
    mealIngredientsBox.appendChild(mealIngredient6);
    if (mealIngredient6.innerText.includes('null') || resultRec.meals[0].strIngredient6.length < 1) {mealIngredient6.style.display = 'none'};

    let mealIngredient7 = document.createElement ('p');
    mealIngredient7.classList.add ('mealIngredienteDis');
    mealIngredient7.innerText = `✔️ ${resultRec.meals[0].strIngredient7} — ${resultRec.meals[0].strMeasure7}`;
    mealIngredientsBox.appendChild(mealIngredient7);
    if (mealIngredient7.innerText.includes('null') || resultRec.meals[0].strIngredient7.length < 1) {mealIngredient7.style.display = 'none'};

    let mealIngredient8 = document.createElement ('p');
    mealIngredient8.classList.add ('mealIngredienteDis');
    mealIngredient8.innerText = `✔️ ${resultRec.meals[0].strIngredient8} — ${resultRec.meals[0].strMeasure8}`;
    mealIngredientsBox.appendChild(mealIngredient8);
    if (mealIngredient8.innerText.includes('null') || resultRec.meals[0].strIngredient8.length < 1) {mealIngredient8.style.display = 'none'};

    let mealIngredient9 = document.createElement ('p');
    mealIngredient9.classList.add ('mealIngredienteDis');
    mealIngredient9.innerText = `✔️ ${resultRec.meals[0].strIngredient9} — ${resultRec.meals[0].strMeasure9}`;
    mealIngredientsBox.appendChild(mealIngredient9);
    if (mealIngredient9.innerText.includes('null') || resultRec.meals[0].strIngredient9.length < 1) {mealIngredient9.style.display = 'none'};

    let mealIngredient10 = document.createElement ('p');
    mealIngredient10.classList.add ('mealIngredienteDis');
    mealIngredient10.innerText = `✔️ ${resultRec.meals[0].strIngredient10} — ${resultRec.meals[0].strMeasure10}`;
    mealIngredientsBox.appendChild(mealIngredient10);
    if (mealIngredient10.innerText.includes('null') || resultRec.meals[0].strIngredient10.length < 1) {mealIngredient10.style.display = 'none'};

    let mealIngredient11 = document.createElement ('p');
    mealIngredient11.classList.add ('mealIngredienteDis');
    mealIngredient11.innerText = `✔️ ${resultRec.meals[0].strIngredient11} — ${resultRec.meals[0].strMeasure11}`;
    mealIngredientsBox.appendChild(mealIngredient11);
    if (mealIngredient11.innerText.includes('null') || resultRec.meals[0].strIngredient11.length < 1) {mealIngredient11.style.display = 'none'};

    let mealIngredient12 = document.createElement ('p');
    mealIngredient12.classList.add ('mealIngredienteDis');
    mealIngredient12.innerText = `✔️ ${resultRec.meals[0].strIngredient12} — ${resultRec.meals[0].strMeasure12}`;
    mealIngredientsBox.appendChild(mealIngredient12);
    if (mealIngredient12.innerText.includes('null') || resultRec.meals[0].strIngredient12.length < 1) {mealIngredient12.style.display = 'none'};

    let mealIngredient13 = document.createElement ('p');
    mealIngredient13.classList.add ('mealIngredienteDis');
    mealIngredient13.innerText = `✔️ ${resultRec.meals[0].strIngredient13} — ${resultRec.meals[0].strMeasure13}`;
    mealIngredientsBox.appendChild(mealIngredient13);
    if (mealIngredient13.innerText.includes('null') || resultRec.meals[0].strIngredient13.length < 1) {mealIngredient13.style.display = 'none'};

    let mealIngredient14 = document.createElement ('p');
    mealIngredient14.classList.add ('mealIngredienteDis');
    mealIngredient14.innerText = `✔️ ${resultRec.meals[0].strIngredient14} — ${resultRec.meals[0].strMeasure14}`;
    mealIngredientsBox.appendChild(mealIngredient14);
    if (mealIngredient14.innerText.includes('null') || resultRec.meals[0].strIngredient14.length < 1) {mealIngredient14.style.display = 'none'};

    let mealIngredient15 = document.createElement ('p');
    mealIngredient15.classList.add ('mealIngredienteDis');
    mealIngredient15.innerText = `✔️ ${resultRec.meals[0].strIngredient15} — ${resultRec.meals[0].strMeasure15}`;
    mealIngredientsBox.appendChild(mealIngredient15);
    if (mealIngredient15.innerText.includes('null') || resultRec.meals[0].strIngredient15.length < 1) {mealIngredient15.style.display = 'none'};

    let mealIngredient16 = document.createElement ('p');
    mealIngredient16.classList.add ('mealIngredienteDis');
    mealIngredient16.innerText = `✔️ ${resultRec.meals[0].strIngredient16} — ${resultRec.meals[0].strMeasure16}`;
    mealIngredientsBox.appendChild(mealIngredient16);
    if (mealIngredient16.innerText.includes('null') || resultRec.meals[0].strIngredient16.length < 1) {mealIngredient16.style.display = 'none'};

    let mealIngredient17 = document.createElement ('p');
    mealIngredient17.classList.add ('mealIngredienteDis');
    mealIngredient17.innerText = `✔️ ${resultRec.meals[0].strIngredient17} — ${resultRec.meals[0].strMeasure17}`;
    mealIngredientsBox.appendChild(mealIngredient17);
    if (mealIngredient17.innerText.includes('null') || resultRec.meals[0].strIngredient17.length < 1) {mealIngredient17.style.display = 'none'};

    let mealIngredient18 = document.createElement ('p');
    mealIngredient18.classList.add ('mealIngredienteDis');
    mealIngredient18.innerText = `✔️ ${resultRec.meals[0].strIngredient18} — ${resultRec.meals[0].strMeasure18}`;
    mealIngredientsBox.appendChild(mealIngredient18);
    if (mealIngredient18.innerText.includes('null') || resultRec.meals[0].strIngredient18.length < 1) {mealIngredient18.style.display = 'none'};

    let mealIngredient19 = document.createElement ('p');
    mealIngredient19.classList.add ('mealIngredienteDis');
    mealIngredient19.innerText = `✔️ ${resultRec.meals[0].strIngredient19} — ${resultRec.meals[0].strMeasure19}`;
    mealIngredientsBox.appendChild(mealIngredient19);
    if (mealIngredient19.innerText.includes('null') || resultRec.meals[0].strIngredient19.length < 1) {mealIngredient19.style.display = 'none'};

    let mealIngredient20 = document.createElement ('p');
    mealIngredient20.classList.add ('mealIngredienteDis');
    mealIngredient20.innerText = `✔️ ${resultRec.meals[0].strIngredient20} — ${resultRec.meals[0].strMeasure20}`;
    mealIngredientsBox.appendChild(mealIngredient20);
    if (mealIngredient20.innerText.includes('null') || resultRec.meals[0].strIngredient20.length < 1) {mealIngredient20.style.display = 'none'};


    let mealRecipeBox = document.createElement ('div');
    mealRecipeBox.classList.add ('mealRecipeBox');
    mealBox.appendChild(mealRecipeBox);

    let mealRecipe = document.createElement ('p');
    mealRecipe.classList.add ('mealRecipeDis');
    mealRecipe.innerText = resultRec.meals[0].strInstructions;
    mealRecipeBox.appendChild(mealRecipe);

    let mealLinksBox = document.createElement ('div');
    mealLinksBox.classList.add ('mealLinksBox');
    mealBox.appendChild(mealLinksBox);

    let mealLinkSource = document.createElement ('p');
    mealLinkSource.classList.add ('mealLinkSourceDis');
    mealLinkSource.innerText = `📄 Source`;
    mealLinksBox.appendChild(mealLinkSource);
    let mealLinkSourceInn = `${resultRec.meals[0].strSource}`
    if (mealLinkSourceInn.includes('null') || resultRec.meals[0].strSource.length < 1) {mealLinkSource.style.display = 'none'};
    mealLinkSource.addEventListener ('click', function () {
      window.open (resultRec.meals[0].strSource, "_blank");
    })

    let mealLinkYouTube = document.createElement ('p');
    mealLinkYouTube.classList.add ('mealLinkYouTubeDis');
    mealLinkYouTube.innerText = `🎥 Video`;
    mealLinksBox.appendChild(mealLinkYouTube);
    let mealLinkYouTubeInn = `${resultRec.meals[0].strYoutube}`
    if (mealLinkYouTubeInn.includes('null') || resultRec.meals[0].strYoutube.length < 1) {mealLinkYouTube.style.display = 'none'};
    mealLinkYouTube.addEventListener ('click', function () {
      window.open (resultRec.meals[0].strYoutube, "_blank");
    })

  }

}

mealsBox.onmousedown = () => {

  let pageX = 0;

  document.onmousemove = e => {
    if (pageX !== 0) {
      mealsBox.scrollLeft = mealsBox.scrollLeft + (pageX - e.pageX);
    }
    pageX = e.pageX;
  };

  mealsBox.onmouseup = () => {
    document.onmousemove = null;
    mealsBox.onmouseup = null;
  };

  mealsBox.ondragstart = () => {
    return false;
  };

};


(function () {

  let speed = 2;
  
  let left = 0;
  let drag = false;
  let coorX = 0;
  
  mealsBoxMob.addEventListener('mousedown', function(e) {
    drag = true;
    coorX = e.pageX - this.offsetLeft;
  });

  document.addEventListener('mouseup', function() {
    drag = false;
    left = mealsBoxMob.scrollLeft;
  });

  mealsBoxMob.addEventListener('mousemove', function(e) {
    if (drag) {
      this.scrollLeft = left + (e.pageX - this.offsetLeft - coorX)*speed;
    }
  });
  
}) ();