
//актуальная погода 
//таймер моментального вывода
let timer = setTimeout(() => fetch('https://api.openweathermap.org/data/2.5/weather?id=501175&cnt=3&lang=ru&units=metric&appid=390723c3de973e3a8d8fd246899a11db')
.then (function(resp) {
   return resp.json()
})
.then(function (value) {
   console.log(value);
   document.querySelector('.card-title').textContent = value.name;
   document.querySelector('.card-temperature').innerHTML = Math.round(value.main.temp)+'&deg';
   document.querySelector('.card-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${value.weather[0]['icon']}@2x.png" class="card-icon__img" alt="...">`;
   document.querySelector('.card-type').textContent = value.weather[0]['description'];
   
}));
//таймер обновления информации 
let timerId = setInterval(() => fetch('https://api.openweathermap.org/data/2.5/weather?id=501175&cnt=3&lang=ru&units=metric&appid=390723c3de973e3a8d8fd246899a11db')
.then (function(resp) {
   return resp.json()
})
.then(function (value) {
   console.log(value);
   document.querySelector('.card-title').textContent = value.name;
   document.querySelector('.card-temperature').innerHTML = Math.round(value.main.temp)+'&deg';
   document.querySelector('.card-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${value.weather[0]['icon']}@2x.png" class="card-icon__img" alt="...">`;
   document.querySelector('.card-type').textContent = value.weather[0]['description'];
   
}), 60000);



// погода для 3 дней
fetch("https://api.openweathermap.org/data/2.5/forecast?id=501175&units=metric&lang=ru&cnt=33&appid=390723c3de973e3a8d8fd246899a11db")
.then (function(r) {
   return r.json()
})
.then(function (d) {
   // погода на сегодня
     console.log( d.list)
   //   document.querySelector('.card-title').textContent = d.city.name;
   //   document.querySelector('.card-temperature').innerHTML = Math.round(d.list[0].main.temp)+'&deg';
   //   document.querySelector('.card-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${d.list[0].weather[0]['icon']}@2x.png" class="card-icon__img" alt="...">`;
   //   document.querySelector('.card-type').textContent = d.list[0].weather[0]['description'];
     document.querySelector('.card-middle').innerHTML ='cредняя температура: '+ Math.round((d.list[0].main.temp+d.list[4].main.temp)/2)+'&deg';
     
     
     //погода на завтра

     const dateTomorrow = new Date(d.list[8].dt*1000);
     const dateAfterTomorrow = new Date(d.list[16].dt*1000);
     const date = new Date(d.list[23].dt*1000);
     const week = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ];
      const weekdayTomorrow = dateTomorrow.getDay();
      const weekdayAfterTomorrow = dateAfterTomorrow.getDay();
      const weekday = date.getDay();
      
      
     
     document.querySelector('.card-weekday__tomorrow').innerHTML = week[weekdayTomorrow];
     document.querySelector('.card-title__tomorrow').innerHTML = 'Завтра';
     document.querySelector('.card-temperature__tomorrow').innerHTML = Math.round(d.list[8].main.temp)+'&deg';
     document.querySelector('.card-icon__tomorrow').innerHTML = `<img src="https://openweathermap.org/img/wn/${d.list[8].weather[0]['icon']}@2x.png" class="card-icon__img" alt="...">`;
     document.querySelector('.card-type__tomorrow').textContent =d.list[8].weather[0]['description'];
     document.querySelector('.card-middle__tomorrow').innerHTML ='cредняя температура: '+ Math.round((d.list[8].main.temp+d.list[12].main.temp)/2)+'&deg';
     
     
     //погода на послезавтра
     document.querySelector('.card-weekday__aftertomorrow').innerHTML = week[weekdayAfterTomorrow];
     document.querySelector('.card-title__aftertomorrow').innerHTML = 'Послезавтра';
     document.querySelector('.card-temperature__aftertomorrow').innerHTML = Math.round(d.list[16].main.temp)+'&deg';
     document.querySelector('.card-icon__aftertomorrow').innerHTML = `<img src="https://openweathermap.org/img/wn/${d.list[16].weather[0]['icon']}@2x.png" class="card-icon__img" alt="...">`;
     document.querySelector('.card-type__aftertomorrow').textContent =d.list[16].weather[0]['description'];
     document.querySelector('.card-middle__aftertomorrow').innerHTML ='cредняя температура: '+ Math.round((d.list[16].main.temp+d.list[20].main.temp)/2)+'&deg';


     //погода на послепослезавтра
     const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
     "Июля", "Августа", "Сентрября", "Октября", "Ноября", "Декабря"];
     
     const day = date.getDate();
     const month = date.getMonth();
     document.querySelector('.card-weekday').innerHTML = week[weekday];
     document.querySelector('.card-title__afteraftertomorrow').innerHTML = day+' '+monthNames[month];
     document.querySelector('.card-temperature__afteraftertomorrow').innerHTML = Math.round(d.list[23].main.temp)+'&deg';
     document.querySelector('.card-icon__afteraftertomorrow').innerHTML = `<img src="https://openweathermap.org/img/wn/${d.list[23].weather[0]['icon']}@2x.png" class="card-icon__img" alt="...">`;
     document.querySelector('.card-type__afteraftertomorrow').textContent =d.list[23].weather[0]['description'];
     document.querySelector('.card-middle__afteraftertomorrow').innerHTML ='cредняя температура: '+ Math.round((d.list[24].main.temp+d.list[28].main.temp)/2)+'&deg';
   
   
   //   график--------------------------------------
     const ctx = document.getElementById('myChart');
     const myChart = new Chart(ctx, {
         type: 'bar',
         data: {
            labels: [new Date(d.list[0].dt*1000).toLocaleString(), new Date(d.list[3].dt*1000).toLocaleString(), new Date(d.list[6].dt*1000).toLocaleString(), new Date(d.list[9].dt*1000).toLocaleString(), new Date(d.list[12].dt*1000).toLocaleString(), new Date(d.list[15].dt*1000).toLocaleString()],
            datasets: [{
               label: 'График температуры в Рпше остове на дону',
               data: [d.list[0].main.temp, d.list[3].main.temp, d.list[6].main.temp, d.list[9].main.temp, d.list[12].main.temp, d.list[15].main.temp],
               backgroundColor: ['skyblue'],
               borderColor: ['rgba(255, 99, 132, 1)'],

            }]
         },
         
      });

  })
   



