import React, { Component } from 'react';

import Modal from './Modal';

export default class DefinitionModal extends Component {
	state = {
		visible: false,
		text: '',
	};

	show(text) {
		this.setState({ visible: true, text });
	}

	hide() {
		this.setState({ visible: false });
	}

	render() {
		if (this.state.visible) {
			return (
				<Modal layerId='popup15' onCloseModal={this.hide.bind(this)}>
					<div className='input-popup-bg input-popup-bg15'>
						<div
							className='description-text'
							dangerouslySetInnerHTML={{ __html: this.state.text }}
						/>
					</div>
				</Modal>
			);
		} else {
			return null;
		}
	}
}
