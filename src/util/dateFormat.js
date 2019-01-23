export const dateFormat = (date, language) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  let postDate = new Date(date).toLocaleDateString('en-US', options).split(',');
  // console.log(postDate[0]);

  const dayEN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const daySP = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

  const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const monthsSP = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


  if (language === "es/") {
    let indx = dayEN.indexOf(postDate[0]);
    postDate[0] = daySP[indx]


    let month = postDate[1].replace(/\d/g, "").trim();
    indx = monthsEN.indexOf(month)

    let dayNumb = postDate[1].replace(/\D/g, "")
    postDate[1] = ` ${monthsSP[indx]} ${dayNumb}`
  }

  console.log(postDate);


  return postDate
}
