// Remove the jQuery event handler and use vanilla JavaScript
document.querySelectorAll(".checkbox").forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    this.classList.add("checkbox--checked");
    this.innerHTML = `
      <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <polygon id="icon" fill="white" points="7.13636364 11.9104478 4.03409091 8.7761194 3 9.82089552 7.13636364 14 16 5.04477612 14.9659091 4"></polygon>
        </g>
      </svg>`;

    // Get the task ID from the adjacent element's inner text
    const taskId = this.nextElementSibling.innerText;

    // Make an HTTP request using fetch (similar to $.ajax in jQuery)
    fetch(`/api/tasks/${taskId}/done`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        // Remove the parent element (the entire task item) on success
        this.parentElement.remove();
      })
      .catch((error) => {
        alert("Unexpected error happened! Please implement endpoints!");
        console.error(error);
      });
  });
});

async function getTasks() {
  try {
    const response = await fetch("http://localhost:3001/api/todo");
    console.log(response);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const tasks = await response.json();
    // Assuming you have a function to display tasks in your UI
    displayTasks(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

getTasks();
