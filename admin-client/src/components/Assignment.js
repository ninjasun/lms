import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Assignment extends Component {
    state ={
        assignmentList : []
    }
    componentWillMount(){
        this.props.fetchAssignment();
        console.log("fetching assignment")
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps is: ", nextProps)
        if (typeof this.props.assignmentList === 'undefined'){
            this.setState({
                assignmentList:nextProps.assignmentList
            })
        } else {
            return
        }
    }
    render() {

        return (
            <div>
                <ul>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create-assignment">Create new Assignment</Link>
                    </li>,
                </ul>
                <ul>
                    {this.state.assignmentList.map( (item) =>
                        <li key={item.id}>{item.title}</li>
                    )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { assignmentList: state.auth.assignmentList}
}
export default connect(mapStateToProps, actions)(Assignment);