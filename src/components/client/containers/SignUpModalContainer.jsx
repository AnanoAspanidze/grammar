import React, { Component } from 'react'

import Modal from '../modal/Modal'
import SignUpModal from '../modal/SignUpModal'

export default class SignUpModalContainer extends Component {
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
                        <SignUpModal />
                    </Modal>
				</>
			);
		} else {
			return null;
		}
	}
}
