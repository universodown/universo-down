export default function checkProperties(obj) {
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key] !== undefined && obj[key] !== null && obj[key] !== "");
  }
  return arr.includes(false);
}

// export function getFormElelemets(form) {
//   var data = [];
//   for (var i = 0; i < form.elements.length; i++) {
//     data[i] = form.elements[i].name + ": " + "'" + form.elements[i].value + "'";
//     // data.push(
//     //   form.elements[i].name + ": " + "'" + form.elements[i].value + "'"
//     // )
//   }
//   
// }


