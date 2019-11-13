import React from "react";
import "./Modal.css";
import API from "../../utils/api";
import { connect } from "react-redux";
import { getImageUrl } from "../../redux/reducers/myReducer";

class UploadModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			imagePreviewUrl: '',
		};
	}

	reduxImage = (image) => {
		console.log("STATE", this.state);
		this.props.getImageUrl(image);
		console.log("SAVED TO PROPS IMAGE", this.props.user.image);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('handle uploading-', this.state);
		let data = new FormData();
		data.append("image", this.state.image);
		console.log("Data", data);
		API.uploadImage(data)
			.then(res => {
				console.log("UPLOAD IMAGE: ", res.data.imageUrl);
				this.reduxImage(res.data.imageUrl);
			})
			.catch(error => {
				console.log("UPLOAD ERROR: ");
				console.log(error);
			})
	}

	handleImageChange = (e) => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				image: file,
				imagePreviewUrl: reader.result,
			});
		}

		reader.readAsDataURL(file)
	}


	render() {

		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (<img id="imgPreview" src={imagePreviewUrl} alt="Preview Upload"/>);
		} else {
			$imagePreview = (<h6>Image Preview...</h6>);
		}

		return (
			<div className={`${this.props.show ? "modal display-block" : "modal display-none"} modal`}>
				<form >
					<div className="modal-content">
						<button onClick={(e) => this.props.handleClose(e)} className='modal-close right green-text'><i className='material-icons small'>X</i></button>
						<h4 className="center">Please Upload Image</h4>
						<div className="modal-content">
							<div className="file-field input-field">
								<div className="btn blue darken-4">
									<span>Browse</span>
									<input type="file"
										onChange={(e) => this.handleImageChange(e)} />
								</div>
								<div className="file-path-wrapper">
									<input className="file-path validate" type="text"
										placeholder="Browse" />
								</div>
							</div>
						</div>

						<div className="modal-content preview grey lighten-3">
							{$imagePreview}

						</div>

						<div className="modal-content">
							<button className="btn waves-effect waves-light blue darken-4" type="submit" name="action" onClick={(e) => {
								this.handleSubmit(e);
								this.props.handleClose(e);
							}}
							>Upload Image{" "}<i className="large material-icons">file_upload</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state,
	}
}
function mapDispatchToProps(dispatch) {
	return {
		getImageUrl: (image) => { dispatch(getImageUrl(image)) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);