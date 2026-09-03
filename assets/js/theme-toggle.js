(function () {

  const root =
    document.documentElement;

  const KEY =
    "theme";


  function currentTheme() {

    const saved =
      localStorage.getItem(KEY);

    if (saved) {
      return saved;
    }


    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";

  }


  function applyTheme(theme) {

    root.setAttribute(
      "data-theme",
      theme
    );


    const button =
      document.getElementById(
        "theme-toggle"
      );


    if (button) {

      const nextTheme =
        theme === "dark"
          ? "light"
          : "dark";

      button.setAttribute(
        "aria-label",
        `Use ${nextTheme} theme`
      );

      button.setAttribute(
        "title",
        `Use ${nextTheme} theme`
      );

    }

  }


  applyTheme(
    currentTheme()
  );


  document.addEventListener(
    "DOMContentLoaded",
    function () {

      const button =
        document.getElementById(
          "theme-toggle"
        );


      if (!button) {
        return;
      }


      applyTheme(
        currentTheme()
      );


      button.addEventListener(
        "click",
        function () {

          const current =
            root.getAttribute(
              "data-theme"
            );


          const next =
            current === "dark"
              ? "light"
              : "dark";


          localStorage.setItem(
            KEY,
            next
          );


          applyTheme(
            next
          );

        }
      );

    }
  );

})();
