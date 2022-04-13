"use strict";
(function() {
  // Part 1: Setting up the window load event listener to call init when page is loaded
  // 1.1. Write the event listener (one statement)
  window.addEventListener("load", init);
  // Part 2: Finish assigning event listeners for main interactive page elements (two buttons for now)
  function init() {
    // (Given) When [#answer-btn] is clicked, call [showAnswer]
    id("answer-btn").addEventListener("click", showAnswer);
    // 2.1. When #start-btn is clicked, fillJar should be called.
    id("start-btn").addEventListener("click", fillJar);
  }

  // Part 3: Show the number of green in the hidden paragraph under the jar!
  // Hint: Use querySelectorAll, textContent, and classList.add with the provided .hidden class (implemented in CSS)
  function showAnswer() {
    // 3.1. Write the statement to get all green skittles
    let greenSkittles = qsa(".skittle.green");
    // 3.2. Update textContent of #count to include length of green skittles collection from 1.
    id("count").textContent = greenSkittles.length;
    // 3.3. Show p tag.
    qs("#game-play > p").style.display="block";
  }

  // Part 4: Planning out the populating of skittles in the jar (we'd eventually like
  //         to fill the jar automatically when the page is loaded!).
  function fillJar() {
    // Create and add one "test" skittle (a div element with the classes ".skittle" and ".green")
    // 4.1. (no code) What function do we use to create a new DOM element?
    let div = document.createElement("div");
    // 4.2. (no code) What function do we use to add two classes?
    div.classList.add("skittle", getRandomColor());
    // 4.3. (no code) What function do we use to append one DOM element as a "child" to a parent DOM element?
    id("jar").appendChild(div);
  }

  // Part 5: Get a random color for a skittle (we'll add more colors soon!)
  function getRandomColor() {
    let COLORS = ["red", "green", "blue"];
    // 5.1. Get a random integer number using length of
    // COLORS. Hint: Use Math.random() to get a number between [0, 1).
    let index = Math.floor(Math.random() * COLORS.length); 
    
    // 5.2 Return a string at the random index of COLORS
    return COLORS[index];
  }

  /* ----- Provided Shorthand Functions ------- */
  // Note: These are the three provided helper
  // functions shown in lecture/section. You may
  // use these in your own JS, but these are the
  // only functions you are allowed to use in
  // your own work as an exception to the course
  // Academic Conduct policy. These are also useful
  // examples of JSDoc comments!
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();