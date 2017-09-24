import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Courses extends Component {
    state ={
        coursesList : []
    }
    componentWillMount(){
        this.props.fetchCourses();
        console.log("fetching courses")
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps is: ", nextProps)
        if (typeof this.props.coursesList === 'undefined'){
            this.setState({
                coursesList:nextProps.coursesList
            })
        } else {
          return
        }
    }
    render() {

        return (
            <div>

                <ul>
                {this.state.coursesList.map( (item) =>
                    <li key={item.id}>{item.title}</li>
                )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { coursesList: state.auth.coursesList}
}
export default connect(mapStateToProps, actions)(Courses);