import daysky from '../images/day-sky.jpg';
import nightsky from '../images/night-sky.jpg';

const themes = {
	light: {
		image: `url(${daysky}) no-repeat center / cover`,
		background: 'rgb(255, 234, 200)',
		primaryColor: '#222333',
		secondaryColor: '#555',
		shadow: '0 0 5px #999',
		positive: 'green',
		negative: 'rgb(228, 79, 79)',
		mixBlendMode: 'color-burn',
	},
	dark: {
		image: `url(${nightsky}) no-repeat center / cover`,
		background: '#222333',
		primaryColor: '#fff',
		secondaryColor: 'rgba(255, 255, 255, 0.7)',
		color: '#fff',
		shadow: '0 0 5px #222333',
		positive: 'lightgreen',
		negative: 'rgb(228, 79, 79)',
		mixBlendMode: 'difference',
	},
};

export default themes;
