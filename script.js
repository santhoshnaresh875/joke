function fetchdata(url) {
    return new Promise((resolve, reject) => {
      // Use fetch to make the HTTP request
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            // If the response is not ok, reject the promise with an error
            reject(
              new Error(`Failed to fetch data (${response.status} ${response.statusText})`)
            );
          }
          // Parse the response as JSON
          return response.json();
        })
        .then((data) => {
          // Resolve the promise with the data
          resolve(data);
        })
        .catch((error) => {
          // Catch any errors and reject the promise
          reject(error);
        });
    });
  }
  
  const url =
    "https://v2.jokeapi.dev/joke/any?blacklistFlags=nsfw,religious,political,racist,explicit&type=single";
  
  const button_tag = document.getElementById("button");
  
  async function fetchingdata() {
    try {
      const response = await fetchdata(url);
      display_joke(response);
  
      // Use an arrow function to handle the click event and call next_joke with response
      button_tag.addEventListener("click", next_joke);
    } catch (error) {
      console.log("An error occurred while fetching joke data:", error);
    }
  }
  
  function display_joke(response) {
    const joke_tag = document.getElementById("joke");
    
    // Remove the 'show' class to trigger fade-out animation
    joke_tag.classList.remove('show');
    
    // Set the joke text after a short delay
    setTimeout(function () {
      joke_tag.textContent = `${response.joke}`;
      
      // Add the 'show' class to trigger fade-in animation
      joke_tag.classList.add('show');
    }, 500); // Delay for 500 milliseconds for the fade-out to complete
  }
  
  
  async function next_joke() {
    try {
      const newResponse = await fetchdata(url);
      display_joke(newResponse);
    } catch (error) {
      console.log("An error occurred while fetching a new joke:", error);
    }
  }
  
  fetchingdata();
  