import React, { Component } from 'react'

import Modal from '../modal/Modal'
import SignInModal from '../modal/SignInModal'

export default class SignInModalContainer extends Component {
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
                        <SignInModal />
                    </Modal>
				</>
			);
		} else {
			return null;
		}
	}
}
