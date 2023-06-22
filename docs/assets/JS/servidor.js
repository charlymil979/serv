let datos = {};
const url = "https://api.npoint.io/cdcfd4c1d992f9552064";

const $container = document.querySelector(".container");
const $modal = document.querySelector(".guardar");
const $guardarModal = document.querySelector(".json");
const copiar = document.querySelector(".copiar");

let $seccion = "",
  $info = "",
  $tipos,
  $precio,
  $uno,
  clase = "A",
  datosGuardados,
  $dos;
const objeto = {};

function llamarDb(url) {
  fetch(url)
    .then((resp) => resp.text())
    .then((dato) => {
      let data = JSON.parse(dato);
      console.log(data);
      // console.log(dato.record.menu);

      // Empezando a armar la estructura de datos
      let a = 1;
      for (const key in data) {
        // console.log(key);
        if (key != "id") {
          for (const articulo in data[key]) {
            datos = data[key][articulo];
            $tipos = "";
            $precio = "";
            datos[2].forEach((element) => {
              // console.log(element);
              $tipos += `
            <textarea>${element[0]}</textarea></br>
            `;
              $precio += `
            <textarea>${element[1]}</textarea></br>`;
            });
            let clase = datos[0].replaceAll(/[ *]/g, "");
            // console.log($tipos);
            // console.log(datos[0]);
            // console.log(datos[1]);
            // console.log(datos[2][0][0]);
            // console.log(datos[2][0][1]);

            $info += `
            <tr>
            <td class="${clase}"><textarea>${key}</textarea></td>
            <td class="${clase}"><textarea>${datos[0]}</textarea></td>
            <td class="${clase}"><textarea>${datos[1]}</textarea></td>
            <td class="${clase} ${clase}_tipo">${$tipos}</td>
            <td class="${clase} ${clase}_precio">${$precio}</td>
            <td><button onclick=agregarTipo(".${clase}")>nuevo tipo</button></td>
            </tr>
            `;
          }
        }
        // console.log(data[key]);
      }
      $container.innerHTML = $info;
    });
}

const nuevo = function () {
  let $nuevo = document.createElement("tr");
  $nuevo.innerHTML = `
            <td class="${clase}"><textarea></textarea></td>
            <td class="${clase}"><textarea></textarea></td>
            <td class="${clase}"><textarea></textarea></td>
            <td class="${clase} ${clase}_tipo"><textarea></textarea></td>
            <td class="${clase} ${clase}_precio"><textarea></textarea></td>
            <td><button onclick=agregarTipo(".${clase}")>nuevo tipo</button></td>
            `;
  // console.log($nuevo)
  $container.appendChild($nuevo);
  clase = clase + "A";
  // console.log("clase", clase);
  window.scrollTo(0, visualViewport.height);
};

const agregarTipo = function (clase) {
  let tipo = document.querySelector(clase + "_tipo");
  let precio = document.querySelector(clase + "_precio");
  let area = document.createElement("textarea");
  let area2 = document.createElement("textarea");
  let br = document.createElement("br");
  let br2 = document.createElement("br");

  tipo.appendChild(area);
  precio.appendChild(area2);
  tipo.appendChild(br);
  precio.appendChild(br2);
};

const previsualizar = function () {
  let datosFinales = [];
  let $rows = document.querySelector("table");
  let filas = $rows.querySelectorAll("tr");
  filas.forEach((fila) => {
    let celdas2 = [];
    const celdas = fila.querySelectorAll("textarea");
    celdas.forEach((celda) => {
      celdas2.push(celda.value);
    });
    console.log(celdas2[0])
    console.log(typeof(celdas2[0]), celdas2[1], celdas2[2]);

      if (
        celdas2[0] === "" ||
        celdas2[1] === "" ||
        celdas2[2] === ""
      ) {
        console.log("vacio");
      } else {
        console.log("fila", celdas2);
        datosFinales.push(celdas2);
      }

   
  
  });

  for (const key in datosFinales) {
    if(datosFinales[key].length > 0){
    console.log(datosFinales[key].length);
      let seccion = datosFinales[key][0];
      let long = datosFinales[key].length;
      let tipos = (long - 3) / 2;

      let arreglo = [];
      for (let index = 1; index < 3; index++) {
        arreglo.push(datosFinales[key][index]);
      }
      let arreglo2 = [];
      for (let index = 3; index < long - tipos; index++) {
        if (datosFinales[key][index] != "") {
          arreglo2.push([
            datosFinales[key][index],
            datosFinales[key][index + tipos],
          ]);
        }
      }
      arreglo.push(arreglo2);
      // console.log(arreglo);
      // console.log(seccion);
      let vacio = false;
      if (!objeto[seccion]) {
        objeto[seccion] = [];
      }
      arreglo.forEach((e) => {
        if (e === "") return (vacio = true);
      });
      if (!vacio) {

          objeto[seccion].push(arreglo);

      }
  }}
  console.log(objeto);
};

const guardar = function () {
  previsualizar();

  $guardarModal.innerHTML = JSON.stringify(objeto);
  $modal.classList.add("block");
  // console.log(datosGuardados)
  // fetch(url, {
  //   method: "PUT",
  //   body: JSON.stringify(datosGuardados),
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // })
  // .then(
  //   setTimeout(() => {
  //     location.reload()
  //   }, 1000)
  // );
};

const copiarDatos = function () {
  console.log("copiar");
  var content = document.querySelector(".json").innerHTML;
  navigator.clipboard
    .writeText(content)
    .then(() => {
      alert("¡copiado!");
    })
    .catch((error) => {
      console.error("Error al copiar al portapapeles:", error);
    });
};

llamarDb(url);
