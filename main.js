function procesarDefinicion(archivo) {
  let lector = new FileReader();
  lector.onload = function (evento) {
    let contenido = evento.target.result;
    let variables = contenido.match(/[A-Z]/g);
    let variablesRepetidas = contenido.match(/[A-Z]+(?=[\s=])/g);
    let producciones = contenido.match(/(['"]?[a-zA-Z]+['"]?\s*(\||$))/g);
    let terminales = contenido.match(/'[a-z]+'/g);

    let contenidoHTML = "<pre>" + contenido.replace(/\n/g, "<br>") + "</pre>";
    document.getElementById("area-contenido").innerHTML =
      "Contenido del archivo" + contenidoHTML;
    if (variables) {
      variables = variables.filter(function (item, pos) {
        return variables.indexOf(item) == pos;
      });
      // Vector para variables
      let tablaVariables = "<table><thead><tr><th>V</th></tr></thead><tbody>";
      let variablesUnicas = Array.from(new Set(variables));
      for (let i = 0; i < variablesUnicas.length; i++) {
        tablaVariables += "<tr><td>" + variablesUnicas[i] + "</td></tr>";
      }
      tablaVariables += "</tbody></table>";
      document.getElementById("area-variables").innerHTML = tablaVariables;
    } else {
      alert("El archivo no contiene variables en mayúsculas.");
    }
    // Vector para terminales
    let tablaTerminales =
      "<table><thead><tr><th class='terminales-th'>T</th></tr></thead><tbody>";
    let terminalesUnicos = new Set(
      terminales.map(function (terminal) {
        return terminal.replace(/'/g, "");
      })
    );
    let terminalesUnicosArray = Array.from(terminalesUnicos);
    for (let i = 0; i < terminalesUnicosArray.length; i++) {
      tablaTerminales +=
        "<tr><td>" + terminalesUnicosArray[i].replace(/'/g, "") + "</td></tr>";
    }
    tablaTerminales += "</tbody></table>";
    document.getElementById("area-terminales").innerHTML = tablaTerminales;
    // Matriz de producciones
    let matrizProducciones =
      "<table><thead><tr><th>Var</th><th>Produc</th></tr></thead><tbody>";
    for (let i = 0; i < variablesRepetidas.length; i++) {
      matrizProducciones +=
        "<tr><td>" + variablesRepetidas[i] + "</td><td></td></tr>";
    }
    for (let i = 0; i < producciones.length; i++) {
      let variable = producciones[i].match(/^[A-Z]/);
      if (variable && variablesRepetidas.includes(variable[0])) {
        let index = variablesRepetidas.indexOf(variable[0]);
        matrizProducciones =
          matrizProducciones.slice(0, -14) +
          "<tr><td>" +
          variablesRepetidas[index] +
          "</td><td>" +
          producciones[i] +
          "</td></tr></tbody></table>";
      }
    }
    document.getElementById("matriz-producciones").innerHTML =
      matrizProducciones;
  };

  lector.readAsText(archivo);
}

let areaDragDrop = document.getElementById("area-dragdrop");

areaDragDrop.addEventListener("dragover", function (evento) {
  evento.preventDefault();
});

areaDragDrop.addEventListener("drop", function (evento) {
  evento.preventDefault();
  let archivo = evento.dataTransfer.files[0];
  let extension = archivo.name.split(".").pop();
  if (extension == "txt") {
    procesarDefinicion(archivo);
  } else {
    alert("Por favor, seleccione un archivo TXT.");
  }
});
