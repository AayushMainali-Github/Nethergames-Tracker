bar = () => {
  document.getElementById("bar").style.display = "block";
  document.getElementById("bar").style.animationName = "bar";
  document.getElementById("bar").style.animationDuration = "0.35s";
};
document.addEventListener("click", (x) => {
  if (x.target.id == "menu" || x.target.id == "bar") {
    return;
  } else if (["home", "leaderboards", "about"].includes(x.target.id)) {
    if (window.location.pathname != `/${x.target.id}`) {
      window.location.pathname = `/${x.target.id}`;
    }
  } else {
    document.getElementById("bar").style.animationName = "barC";
    document.getElementById("bar").style.animationDuration = "0.35s";
    setTimeout(() => {
      document.getElementById("bar").style.display = "none";
    }, 350);
  }
});
