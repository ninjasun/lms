import React, {Component} from 'react';

import {reduxForm} from 'redux-form';
import * as actions from '../actions';

class AddCourse extends Component {
    handleFormSubmit(formProps) {
        //call action creator
        this.props.addCourse(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Opps!</strong>{this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const {handleSubmit, fields: {title, description, categories, imgPath}} = this.props;

        return (

            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                <label> Title:</label>
                <input className="form-control" {...title} />
                {title.touched && title.error && <div className="error">{title.error}</div>}
            </fieldset>

                <fieldset className="form-group">
                    <label> Description:</label>
                    <input className="form-control" {...description} />
                    {description.touched && description.error && <div className="error">{description.error}</div>}
                </fieldset>

                <fieldset className="form-group">
                    <label> ImgPath:</label>
                    <input className="form-control" {...imgPath} />
                    {imgPath.touched && imgPath.error && <div className="error">{imgPath.error}</div>}
                </fieldset>

                <fieldset className="form-group">
                    <label> Categories:</label>
                    <input className="form-control" {...categories} />
                    {categories.touched && categories.error && <div className="error">{categories.error}</div>}
                </fieldset>

                {this.renderAlert()}

                <button action="submit" className="btn-primary btn">Create</button>
            </form>
        )
    }
}


function validate(formProps) {
    const errors = {};
    if (!formProps.title) {
        errors.title = "Please enter a title";
    }

    if (!formProps.description) {
        errors.description = 'Please enter a description';
    }

    if (!formProps.categories) {
        errors.categories = "Please enter some category"
    }
    return errors;

}

export default reduxForm({
    form: 'addCourse',
    fields: ['title', 'description', 'imgPath', "categories"],
    validate
}, null, actions)(AddCourse);