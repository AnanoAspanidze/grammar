import React from 'react';

function VideoModal() {
	return (
		<iframe
			width='100%'
			height='400px'
			style={{ borderRadius: '30px' }}
			id='video'
			src='https://www.youtube.com/embed/yu9GPOwo0nw'
			title='YouTube video player'
			frameBorder={0}
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
		/>
	);
}

export default VideoModal;
