import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as blogActions from '../actions/blogActions';


class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        $('.selectpicker').selectpicker();
    }



    componentDidUpdate() {
        $('.selectpicker').selectpicker();
    }
    render(){
        return(
            <div style={{marginBottom: -15}}>

                <select
                    value={this.props.category_id}
                    onChange={(event) => this.props.loadByCategory(event.target.value)}
                    className="selectpicker"
                    data-style="btn btn-rose btn-round">
                    <option selected disabled value={-1}>{"Chọn theo nhóm"}
                    </option>
                    <option
                        style={{display :"flex"}}
                        value={0}>{"Tất cả "}
                    </option>
                    {
                        this.props.categories &&
                        this.props.categories.map((item, key) => {
                            return (
                                <option
                                    style={{display :"flex"}}
                                    key={key}
                                    value={item.id}
                                >
                                    { item.name + " "}
                                </option>);
                        })}

                </select>
            </div>
        );
    }
}
Select.propTypes = {
    loadByCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    category_id: PropTypes.number.isRequired,
    blogActions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return{
        // categoriesList : state.blog.categoriesList,
        categories : state.blog.categories,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        blogActions : bindActionCreators(blogActions,dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Select);
