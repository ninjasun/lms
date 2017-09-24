import React, {Component} from 'react';

import {reduxForm} from 'redux-form';
import * as actions from '../actions';

class AddAssignment extends Component {
    handleFormSubmit(formProps) {
        //call action creator
        this.props.addAssignment(formProps);
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
        const {handleSubmit, fields: {title, description, users, courses }} = this.props;

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
                    <label> users separated by comma:</label>
                    <input className="form-control" {...users} />
                    {users.touched && users.error && <div className="error">{users.error}</div>}
                </fieldset>

                <fieldset className="form-group">
                    <label> courses separated by comma:</label>
                    <input className="form-control" {...courses} />
                    {courses.touched && courses.error && <div className="error">{courses.error}</div>}
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

    return errors;

}

export default reduxForm({
    form: 'addCourse',
    fields: ['title', 'description', 'users', "courses"],
    validate
}, null, actions)(AddAssignment);