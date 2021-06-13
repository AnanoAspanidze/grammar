import React from 'react';

function VideoModal() {
	return (
		<div id='popup1' className='overlay'>
			<div className='popup' id='pop-dessapear'>
				<a className='close' id='pause-button'>
					×
				</a>
				<iframe
					width='100%'
					height='100%'
					style={{ borderRadius: '30px' }}
					id='video'
					src='https://www.youtube.com/embed/yu9GPOwo0nw'
					title='YouTube video player'
					frameBorder={0}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
				/>
			</div>
		</div>
	);
}

export default VideoModal;
