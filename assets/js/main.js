const listMenu = document.querySelectorAll(".time-list li");
listMenu.forEach((list) => {
  list.addEventListener("click", function () {
    if (list.innerHTML === "Daily") {
      list.classList.add("active");
      list.nextElementSibling.classList.remove("active");
      list.nextElementSibling.nextElementSibling.classList.remove("active");
      main();
    } else if (list.innerHTML === "Weekly") {
      list.classList.add("active");
      list.previousElementSibling.classList.remove("active");
      list.nextElementSibling.classList.remove("active");
      main("weekly", "Last Week");
    } else {
      list.classList.add("active");
      list.previousElementSibling.classList.remove("active");
      list.previousElementSibling.previousElementSibling.classList.remove(
        "active"
      );
      main("monthly", "Last Month");
    }
  });
});

const getTimeTrackingData = () => {
  return fetch(`${__dirname}/data.json`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const main = async (times = "daily", desc = "Yesterday") => {
  const headersTitle = document.querySelectorAll(".card-header h3");
  const totalHoursCurrently = document.querySelectorAll(".total-hours-today");
  const totalHoursePreviously = document.querySelectorAll(
    ".total-hours-last-week"
  );

  const payloads = await getTimeTrackingData();

  headersTitle.forEach((headerTitle, index) => {
    headerTitle.innerHTML = payloads[index].title;

    totalHoursCurrently[
      index
    ].innerHTML = `${payloads[index].timeframes[times].current}hrs`;
    totalHoursePreviously[
      index
    ].innerHTML = `${desc} - ${payloads[index].timeframes[times].previous}hrs`;
  });
};

main();
