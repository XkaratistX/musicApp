window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const handleClick = () => {
    const mobileMusicArrow = document.querySelector('.mobile__music-arrow');
    const mobileMusicContainer = document.querySelector('.mobile__music-container');
    const mobileControlsVolume = document.querySelector('.mobile__controls-volume');
    const mobileControlsPause = document.querySelector('.mobile__controls-pause');

    mobileMusicArrow.addEventListener('click', () => {
      mobileMusicArrow.classList.toggle('active');
      mobileMusicContainer.classList.toggle('active');
    });

    mobileControlsVolume.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
    });
  };
  handleClick();

  const carousel = () => {

    const carousel = [...document.querySelectorAll('.mobile__carousel img')]
    let carouselImageIndex = 0;
    const changeCarousel = () => {
      carousel[carouselImageIndex].classList.toggle('active');
      if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
      } else {
        carouselImageIndex++;
      }

      carousel[carouselImageIndex].classList.toggle('active');
    };

    setInterval(() => {
      changeCarousel();
    }, 3000);
  };
  carousel();

  const showPlaylist = () => {

    const mobileMusicContainer = document.querySelector('.mobile__playlist-group');
    let clickCount = 1;

    mobileMusicContainer.addEventListener('click', () => {
      if (clickCount >= 2) {
        mobileMusicContainer.classList.add('active');
        clickCount = 1;
        return;
      }
      clickCount++;
      setTimeout(() => {
        clickCount = 1;
      }, 250);
    });
  };
  showPlaylist();

  const navigation = () => {
    const mobileMusicPlaylist = document.querySelector('.mobile__music-playlist');
    const navBtn = document.querySelector('.mobile__music-container .mobile__music-playlist');
    const mobilePlaylistShow = document.querySelector('.mobile__playlist-show');

    navBtn.addEventListener('click', () => {
      mobileMusicPlaylist.classList.toggle('active');
      mobilePlaylistShow.classList.toggle('active');
    });
  };
  navigation();

  const getDate = () => {
    const datePhone = document.querySelector('.mobile__border-date');

    let hours = new Date().getHours();
    let minutes = new Date().getMinutes()

    if (minutes < 10) {
      datePhone.innerHTML += `${hours} : 0${minutes}`;
    } else {
      datePhone.innerHTML += `${hours} : ${minutes}`;
    }
  };
  getDate()

  const musicOptions = () => {
    let currentMusic;

    const audioSource = document.getElementById('audio-source');
    const mobileSeekBar = document.querySelector('.mobile__seek-bar');
    const mobileMusicName = document.querySelector('.mobile__music-name');
    const mobileMusicArtist = document.querySelector('.mobile__music-artist')
    const mobileMusicImg = document.querySelector('.mobile__music-img');
    const mobileCurrentTime = document.querySelector('.mobile__current-time');
    const mobileCurrentDuration = document.querySelector('.mobile__current-duration');

    // select all btns

    const mobileControlsRepeat = document.querySelector('.mobile__controls-repeat');
    const mobileControlsBackward = document.querySelector('.mobile__controls-backward');
    const iconPlay = document.getElementById('icon');
    const mobileControlsStepward = document.querySelector('.mobile__controls-stepward');
    const mobileControlsForward = document.querySelector('.mobile__controls-forward');
    const mobileControlsSlider = document.querySelector('.mobile__controls-slider');
    const mobilePlaylistCover = [...document.querySelectorAll('.mobile__playlist-cover')];
    const mobilePlaylistCard = [...document.querySelectorAll('.mobile__playlist-card')];




    // click play

    iconPlay.addEventListener('click', () => {
      if (audioSource.paused) {
        audioSource.play();
        iconPlay.src = 'img/icons/pause.svg';
      } else {
        audioSource.pause();
        iconPlay.src = 'img/icons/play.svg';
      }
    });

    // seting up music

    const setMusic = (i) => {
      mobileSeekBar.value = 0;
      let song = songs[i];
      currentMusic = i;

      audioSource.src = song.path;

      mobileMusicName.innerHTML = song.name;
      mobileMusicArtist.innerHTML = song.artist;
      mobileMusicImg.src = song.cover;

      setTimeout(() => {
        mobileSeekBar.max = audioSource.duration;
        mobileCurrentDuration.innerHTML = formatTime(audioSource.duration)
      }, 300);
      mobileCurrentTime.innerHTML = `00 : 00`;
      mobilePlaylistCover.forEach(item => item.classList.remove('active'));
      mobilePlaylistCover[currentMusic].classList.add('active');
      mobilePlaylistCard.forEach(item => item.classList.remove('active'));
      mobilePlaylistCard[currentMusic].classList.add('active');
    }

    setMusic(0);

    // duration

    const formatTime = (time) => {
      let min = Math.floor(time / 60);
      if (min < 10) {
        min = `0 ${min}`;
      }

      let sec = Math.floor(time % 60);
      if (sec < 10) {
        sec = `0 ${sec}`;
      }

      return `${min} : ${sec}`;
    }

    setInterval(() => {
      mobileSeekBar.value = audioSource.currentTime;
      mobileCurrentTime.innerHTML = formatTime(audioSource.currentTime)
      if (Math.floor(audioSource.currentTime) === Math.floor(mobileSeekBar.max)) {
        if (mobileControlsRepeat.className.includes('active')) {
          setMusic(currentMusic);
          iconPlay.click();
        } else {
          mobileControlsForward.click();
        }
      }
    }, 500);

    mobileSeekBar.addEventListener('change', () => {
      audioSource.currentTime = mobileSeekBar.value;
    });

    mobileControlsStepward.addEventListener('click', () => {
      if (audioSource.currentTime >= songs.length - 1) {
        currentMusic = 0;
      } else {
        currentMusic++
      }
      setMusic(currentMusic);
      iconPlay.click();
    });

    mobileControlsBackward.addEventListener('click', () => {

      if (currentMusic <= 0) {
        audioSource.currentTime = songs.length - 1;
      } else {
        currentMusic--;
      }
      setMusic(currentMusic);
      iconPlay.click();
    });

    mobileControlsRepeat.addEventListener('click', () => {
      mobileControlsRepeat.classList.toggle('active');
    });

    mobileControlsSlider.addEventListener('input', () => {
      audioSource.volume = mobileControlsSlider.value;
    });

    mobilePlaylistCover.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        setMusic(i);
        iconPlay.click();

      });
    });

    mobilePlaylistCard.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        setMusic(i);
        iconPlay.click();

      });
    });

  };
  musicOptions();

  const greenSock = () => {
    let tl = gsap.timeline();

    tl.from('.mobile', {
      opacity: 0,
      duration: 5
    });
  };
  greenSock();
});