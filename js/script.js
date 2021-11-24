let list_songs = document.getElementById("list-song-container");
let cover_image = document.getElementById("cover-image");
let title_song = document.getElementById("title-song");
let artist_song = document.getElementById("artist-song");
let audio = document.getElementById("audio-playing");
let progress_bar = document.getElementById("progress-bar");
let volumen = document.getElementById('volume-control');

volumen.value  = 1
let song_selected = {};
let is_playing = false;
let canciones = [
  {
    id: 1,
    caratula: "imagenes/finneas.jpg",
    cancion: "MÚSICA/FINNEAS - Let's Fall in Love for the Night (Official Video) (BUENTEMA.CC).mp3",
    artista: "𝕱𝖎𝖓𝖓𝖊𝖆𝖘  𝕺' 𝕮𝖔𝖓𝖓𝖊𝖑𝖑l",
    titulo: "𝕃𝕖𝕥'𝕤 𝔽𝕒𝕝𝕝 𝕚𝕟 𝕃𝕠𝕧𝕖 𝕗𝕠𝕣 𝕥𝕙𝕖 ℕ𝕚𝕘𝕙𝕥",
  },
  {
    id: 2,
    caratula: "imagenes/alec.jpg",
    cancion: "MÚSICA/Alec Benjamin _ Water Fountain (Lyrics) (NUEVOEXITO.ORG).mp3",
    artista: "𝕬𝖑𝖊𝖈  𝕭𝖊𝖓𝖏𝖆𝖒𝖎𝖓",
    titulo: "𝕎𝕒𝕥𝕖𝕣 𝔽𝕠𝕦𝕟𝕥𝕒𝕚𝕟",
  },
  {
    id: 3,
    caratula: "imagenes/post malone.jpg",
    cancion: "MÚSICA/Post Malone - Circles (Lyrics) (CALETAMP3.ORG).mp3",
    artista: "𝕻𝖔𝖘𝖙  𝕸𝖆𝖑𝖔𝖓𝖊",
    titulo: "ℂ𝕚𝕣𝕔𝕝𝕖𝕤",
  },
  {
    id: 4,
    caratula: "imagenes/conan-gray.jpg",
    cancion: "MÚSICA/Conan Gray - Astronomy (Official Video)_160k.mp3",
    artista: "𝕮𝖔𝖓𝖆𝖓 𝕲𝖗𝖆𝖞",
    titulo: "𝔸𝕤𝕥𝕣𝕠𝕟𝕠𝕞𝕪",
  },
  {
    id: 5,
    caratula: "imagenes/strokes.jpg",
    cancion: "MÚSICA/The Strokes.mp3",
    artista: "𝕿𝖍𝖊 𝕾𝖙𝖗𝖔𝖐𝖊𝖘",
    titulo: "𝕊𝕠𝕞𝕖𝕕𝕒𝕪",
  },
];

const BuildList = (canciones) => {
  list_songs.innerHTML = "";
  canciones.forEach((e) => {
    list_songs.insertAdjacentHTML(
      "beforeend",
      `
       <article class="list-item" id="item-${e.id}">
          <img src="${e.caratula}" alt="" />
          <div class="data-song-container">
            <h2>${e.titulo}</h2>
            <div class="artist-name">${e.artista}</div>
          </div>
        </article>
    `
    );
  });
};

const select_song = (id) => {
  let res = canciones.find((e) => e.id == id);
  if (res) {
    cover_image.src = res.caratula;
    title_song.innerHTML = res.titulo;
    artist_song.innerHTML = res.artista;
    audio.src = res.cancion;
    play_song();
  }
};

const pause_effects = () => {
  play_btn.innerHTML = "▶";
  cover_image.style.animationPlayState = "paused";
};

const play_effects = () => {
  play_btn.innerHTML = "||";
  cover_image.style.animationPlayState = "running";
};

const play_song = () => {
  progress_bar.value = audio.currentTime;
  window.setTimeout(() => {
    progress_bar.max = audio.duration;
  }, 500);
  audio.play();
  play_effects();
};

let id_aux = 1;

const next_song = () => {
  if (id_aux < canciones.length) {
    select_song(++id_aux);
  }
};
const prev_song = () => {
  if (id_aux > 0) {
    select_song(--id_aux);
  }
};
const first_song = () => {
  cover_image.src = canciones[0].caratula;
  title_song.innerHTML = canciones[0].titulo;
  artist_song.innerHTML = canciones[0].artista;
  audio.src = canciones[0].cancion;
};
volumen.addEventListener('change',()=>{
  audio.volume = volumen.value;
})
let vol = 1;
addEventListener('keydown',(event)=>{
  
  if(event.key === 'ArrowUp'&&vol<1)
  {
      try{
          vol = vol + 0.01;
          audio.volume = vol
          volumen.value = audio.volume;
      }catch(error)
      {
          console.log(error)
      }
  }
  if(event.key === 'ArrowDown'&&vol>0)
  {
      try {
          vol = vol - 0.01;
          audio.volume = vol
          volumen.value = audio.volume;
          
      } catch (error) {
          console.log(error)
      }
      
  }
})

/*EVENTOS */
let play_btn = document.getElementById("play-btn");
let next_btn = document.getElementById("next-btn");
let prev_btn = document.getElementById("prev-btn");

play_btn.addEventListener("click", () => {
  if (is_playing) {
    audio.pause();
    pause_effects();
    is_playing = false;
  } else {
    audio.play();
    play_effects();
    is_playing = true;
  }
});

window.addEventListener("load", () => {
  first_song();
  progress_bar.value = 0;
  window.setTimeout(() => {
    progress_bar.max = audio.duration;
  }, 500);
  

  window.setInterval(() => {
    progress_bar.value = audio.currentTime;
  }, 1000);
  progress_bar.addEventListener("change", () => {
    audio.currentTime = progress_bar.value;
  });

  next_btn.addEventListener("click", () => {
    next_song();
  });
  prev_btn.addEventListener("click", () => {
    prev_song();
  });
  list_songs.addEventListener("click", (event) => {
    if (event.target.matches("img")) {
      select_song(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".data-song-container")) {
      console.log(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".artist-name")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches("h2")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".list-item")) {
      select_song(event.target.id.slice(5, 6));
    }
  });
  audio.addEventListener("ended", () => {
    next_song();
  });
  
});

BuildList(canciones);

/* */

let buscar = document.getElementById("buscar");

buscar.addEventListener("keyup", () => {
  let res = canciones.filter((e) =>
    e.titulo.toLowerCase().includes(buscar.value.toLowerCase())
  );
  if (res) {
    BuildList(res);
  }
});