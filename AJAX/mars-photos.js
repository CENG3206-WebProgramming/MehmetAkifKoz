
"use strict";
(function () {
  const URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
  //get api key here: https://api.nasa.gov
  const API_KEY = "4ZdJHZ0VXn2y8RbLatUuqer07EfIc2JzG3ucTIF4";

  window.addEventListener("load", init);

  /**
   * Initialize the ajax button to call the correct function when pressed.
   */
  function init() {
    id("mars-photos-btn").addEventListener("click", fetchMarsPhotos);
    id("cameras").addEventListener("change", fetchMarsPhotos);
  }

  /**
   * Function to start the ajax fetch call to mars-photos API once the button is hit.
   * Upon success, shows the Astronomy Photo of the Day on the page.
   */
  async function fetchMarsPhotos() {
    // display loading text and disable button while ajax call is loading
    id("response-message").textContent = "Response Loading ...";
    id("response").innerHTML = "";
    id("mars-photos-btn").disabled = true;

    let url = URL + "?api_key=" + API_KEY;

    // The mars-photos API supports an optional date parameter
    // A valid date is 10 characters (YYYY-MM-DD)
    let dayInput = id("day-input");
    if (dayInput.value && dayInput.value.length === 10) {
      url += "&earth_date=" + dayInput.value;
    }

    let camera = id("cameras").value;
    url += "&camera=" + camera;
    
    fetch(url)
      .then(statusCheck)           // 1
      .then((resp) => resp.json()) // 2
      .then(processMarsPhotosJson)       // 3
      .catch(handleRequestError);      // 4

    // TODO so fetching
  }

  /*
  Sample JSON Response from url: https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY
  // get your own key from: https://api.nasa.gov
  { id: 102685, 
    sol: 1004, 
    camera: {…}, 
    img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG", 
    earth_date: "2015-06-03",
    rover:	{…}
  }
  */
  function processMarsPhotosJson(MarsPhotosJson) {

    let photo = MarsPhotosJson.photos[0]
    //clear response box
    id("response-message").textContent = "Response";

    let title = gen("h2");
    title.textContent = photo.camera.full_name;

    let image = gen("img");
    image.src = photo.img_src;
    image.alt = photo.camera.full_name;

    id("response").appendChild(title);
    id("response").appendChild(image);

    //re-enable button
    id("mars-photos-btn").disabled = false;
  }

  /**
   * This function is called when an error occurs in the fetch call chain (e.g. the request
   * returns a non-200 error code, such as when the mars-photos service is down). Displays a user-friendly
   * error message on the page and re-enables teh mars-photos button.
   * @param {Error} err - the err details of the request.
   */
  function handleRequestError(err) {
    // ajax call failed! show error, place text, and re-enable the button
    let response = gen("p");
    response.textContent = err;
    id("response").appendChild(response);
    id("response-message").textContent = "Response";
    id("mars-photos-btn").disabled = false;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }

  function statusCheck(response) {
    if (response.ok) {
      return response;
    }
    throw Error('Error in request: ' + response.statusText);
  }

})();