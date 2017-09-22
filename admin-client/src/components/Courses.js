import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Courses extends Component {
    state ={
        coursesList : []
    }
    componentWillMount(){
        this.props.fetchMessage();
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps.coursesList is: ", nextProps.coursesList)
        this.setState(
            {
                list: nextProps.coursesList
            }
        )
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