(function () {
    /**
     * On vérifie et on initialise une variable globale
     * permettant de s'assurer que le script ne fera rien
     * s'il est injecté plusieurs fois sur la page.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    /**
     * Selon une URL fournie, on retire les éventuelles bêtes
     * déjà ajoutées et on crée un élément img
     * qui pointe vers l'image indiquée par l'URL et on insère
     * le nœud dans le document.
     */
    function insertBeast(beastURL) {
      removeExistingBeasts();
      let beastImage = document.createElement("img");
      beastImage.setAttribute("src", beastURL);
      beastImage.style.height = "100vh";
      beastImage.className = "beastify-image";
      document.body.appendChild(beastImage);
    }
  
    /**
     * On retire toute bête présente sur la page.
     */
    function removeExistingBeasts() {
      let existingBeasts = document.querySelectorAll(".beastify-image");
      for (let beast of existingBeasts) {
        beast.remove();
      }
    }
  
    /**
     * On écoute les messages du script d'arrière-plan pour
     * déclencher "insertBeast()" ou "removeExistingBeasts()".
     */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "beastify") {
        insertBeast(message.beastURL);
      } else if (message.command === "reset") {
        removeExistingBeasts();
      }
    });
  })();
  