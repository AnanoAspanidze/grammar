import React, { Component } from 'react'

import Modal from '../modal/Modal'
import VideoModal from '../modal/VideoModal'

export default class VideoBackgroundModal extends Component {
	state = {
		visible: false,
	};

	show() {
		this.setState({ visible: true });
	}

	hide() {
		this.setState({ visible: false });
	}

	render() {
		if (this.state.visible) {
			return (
				<>
					<Modal layerId='popup7' onCloseModal={this.hide.bind(this)}>
                        <VideoModal />
                    </Modal>
				</>
			);
		} else {
			return null;
		}
	}
}
