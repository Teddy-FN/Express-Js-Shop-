exports.errorPage = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404 Error page",
    formCSS: false,
    productCSS: false,
    path: null,
  });
};
