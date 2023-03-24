function procesarDefinicion(archivo) {
  var lector = new FileReader();
  lector.onload = function (evento) {
    var contenido = evento.target.result;
    var variables = contenido.match(/[A-Z]/g);
    var variablesRepetidas = contenido.match(/[A-Z]/g);
    var terminales = contenido.match(/'[a-z]+'/g);
    if (variables) {
      variables = variables.filter(function (item, pos) {
        return variables.indexOf(item) == pos;
      });
      var contenidoHTML = "<pre>" + contenido.replace(/\n/g, "<br>") + "</pre>";
      document.getElementById("area-contenido").innerHTML =
        "Contenido del archivo" + contenidoHTML;

      // Mostramos solo las variables únicas en la tablaVariables
      var tablaVariables = "<table><thead><tr><th>V</th></tr></thead><tbody>";
      var variablesUnicas = Array.from(new Set(variables));
      for (var i = 0; i < variablesUnicas.length; i++) {
        tablaVariables += "<tr><td>" + variablesUnicas[i] + "</td></tr>";
      }
      tablaVariables += "</tbody></table>";
      document.getElementById("area-variables").innerHTML = tablaVariables;

      // Creamos una tabla para mostrar las terminales
      var tablaTerminales =
        "<table><thead><tr><th class='terminales-th'>T</th></tr></thead><tbody>";
      var terminalesUnicos = new Set(
        terminales.map(function (terminal) {
          return terminal.replace(/'/g, "");
        })
      );
      var terminalesUnicosArray = Array.from(terminalesUnicos);
      for (var i = 0; i < terminalesUnicosArray.length; i++) {
        tablaTerminales +=
          "<tr><td>" +
          terminalesUnicosArray[i].replace(/'/g, "") +
          "</td></tr>";
      }
      tablaTerminales += "</tbody></table>";
      document.getElementById("area-terminales").innerHTML = tablaTerminales;
    } else {
      alert("El archivo no contiene variables en mayúsculas.");
    }
    var matrizProducciones =
      "<table><thead><tr><th>Var</th><th>Produc</th></tr></thead><tbody>";
    for (var i = 0; i < variablesRepetidas.length; i++) {
      matrizProducciones += "<tr><td>" + variablesRepetidas[i] + "</td></tr>";
    }
    matrizProducciones += "</tbody></table>";
    document.getElementById("matriz-producciones").innerHTML =
      matrizProducciones;
  };

  lector.readAsText(archivo);
}

var areaDragDrop = document.getElementById("area-dragdrop");

areaDragDrop.addEventListener("dragover", function (evento) {
  evento.preventDefault();
});

areaDragDrop.addEventListener("drop", function (evento) {
  evento.preventDefault();
  var archivo = evento.dataTransfer.files[0];
  var extension = archivo.name.split(".").pop();
  if (extension == "txt") {
    procesarDefinicion(archivo);
  } else {
    alert("Por favor, seleccione un archivo TXT.");
  }
});

// function procesarDefinicion(archivo) {
//   var lector = new FileReader();
//   lector.onload = function (evento) {
//     var contenido = evento.target.result;
//     var variables = contenido.match(/[A-Z]/g);
//     var terminales = contenido.match(/'[a-z]+'/g);
//     if (variables) {
//       variables = variables.filter(function (item, pos) {
//         return variables.indexOf(item) == pos;
//       });
//       var contenidoHTML = "<pre>" + contenido.replace(/\n/g, "<br>") + "</pre>";
//       document.getElementById("area-contenido").innerHTML =
//         "Contenido del archivo" + contenidoHTML;

//       //       // Creamos una tabla para mostrar las variables
//       var tablaVariables = "<table><thead><tr><th>V</th></tr></thead><tbody>";
//       for (var i = 0; i < variables.length; i++) {
//         tablaVariables += "<tr><td>" + variables[i] + "</td></tr>";
//       }
//       tablaVariables += "</tbody></table>";
//       document.getElementById("area-variables").innerHTML = tablaVariables;

//       //       // Creamos una tabla para mostrar las terminales
//       var tablaTerminales =
//         "<table><thead><tr><th class='terminales-th'>T</th></tr></thead><tbody>";
//       var terminalesUnicos = new Set(
//         terminales.map(function (terminal) {
//           return terminal.replace(/'/g, "");
//         })
//       );
//       var terminalesUnicosArray = Array.from(terminalesUnicos);
//       for (var i = 0; i < terminalesUnicosArray.length; i++) {
//         tablaTerminales +=
//           "<tr><td>" +
//           terminalesUnicosArray[i].replace(/'/g, "") +
//           "</td></tr>";
//       }
//       tablaTerminales += "</tbody></table>";
//       document.getElementById("area-terminales").innerHTML = tablaTerminales;

//       // Creamos una matriz para mostrar las variables y producciones
//       var matrizProducciones =
//         "<table><thead><tr><th>Var</th><th>Produc</th></tr></thead><tbody>";
//       var producciones = {};
//       for (var i = 0; i < variables.length; i++) {
//         matrizProducciones += "<tr><td>" + variables[i] + "</td>";
//         producciones[variables[i]] = [];
//         var regExp = new RegExp(variables[i] + "\\s*=\\s*([^|]*)(\\||$)", "g");
//         var match = regExp.exec(contenido);
//         while (match != null) {
//           producciones[variables[i]].push(match[1].trim());
//           match = regExp.exec(contenido);
//         }
//         matrizProducciones +=
//           "<td>" + producciones[variables[i]].join(" | ") + "</td></tr>";
//       }
//       matrizProducciones += "</tbody></table>";
//       document.getElementById("matriz-producciones").innerHTML =
//         matrizProducciones;
//     } else {
//       alert("El archivo no contiene variables en mayúsculas.");
//     }
//   };

//   lector.readAsText(archivo);
// }

// var areaDragDrop = document.getElementById("area-dragdrop");

// areaDragDrop.addEventListener("dragover", function (evento) {
//   evento.preventDefault();
// });

// areaDragDrop.addEventListener("drop", function (evento) {
//   evento.preventDefault();
//   var archivo = evento.dataTransfer.files[0];
//   var extension = archivo.name.split(".").pop();
//   if (extension == "txt") {
//     procesarDefinicion(archivo);
//   } else {
//     alert("Por favor, seleccione un archivo TXT.");
//   }
// });
