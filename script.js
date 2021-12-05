console.log('hello');

const handleOpen = () => {
  document.getElementById('nav').style.width = '80%';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('overlay').addEventListener('click', handleClose);
  document.getElementById('openIcon').style.opacity = '0%';
};

const handleClose = () => {
  document.getElementById('nav').style.width = '0%';
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('openIcon').style.opacity = '100%';
};

let scroll = 0;
const onClickScroll = (direction) => {
  if (direction === 'right') {
    scroll = scroll + 100;
    document.getElementById('popularNft').scrollTo(scroll, 0);
    console.log('t', scroll);
  }

  if (direction === 'left') {
    scroll = scroll - 100;
    document.getElementById('popularNft').scrollTo(scroll, 0);
    console.log('t', scroll);
  }
};
