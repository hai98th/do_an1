// /**
//  * Created by Kiyoshitaro on 15/04/2018.
//  */
// import React from "react";
// import PropTypes from "prop-types";
//
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
// // import Search from "../../../components/common/Search";
// // import Loading from "../../../components/common/Loading";
// // import Pagination from "../../../components/common/Pagination";
// import {OverlayTrigger, Tooltip} from "react-bootstrap";
// // // import KeetoolEditor from "../../../components/common/KeetoolEditor";
// // import MinEditor from '../../../js/keetool-editor';
//
// import {Link} from 'react-router';
//
//
// class PromotionManageContainer extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//
//         this.state = {
//             page: 1,
//             query: "",
//             category_id: 0,
//             kind: 'blog',
//             isOpenModal: false,
//             postId: 0,
//             isEdit: false,
//         };
//         this.timeOut = null;
//         this.loadPosts = this.loadPosts.bind(this);
//         this.loadByText = this.loadByText.bind(this);
//         this.loadPosts = this.loadPosts.bind(this);
//         this.loadByCategories = this.loadByCategories.bind(this);
//         this.loadByKinds = this.loadByKinds.bind(this);
//         // this.test = this.test.bind(this);
//
//     }
//
//
//     componentWillMount() {
//         this.props.blogActions.loadCategories();
//         this.props.blogActions.loadLanguages();
//         this.loadPosts(1);
//     }
//
//     // componentDidMount() {
//     //
//     //     // $("mini-editor").init();
//     //     window.addEventListener('load', function () {
//     //         MinEditor.init('mini-editor');
//     //     });
//     // }
//     // test(){
//     //     let data = {...this.props.post};
//     //     data["content"] = MinEditor.getContent();
//     //     console.log(MinEditor.getContent(), data.content, "test");
//     //     this.props.blogActions.updateFormPost(data);
//     // }
//
//     loadPosts(page) {
//         this.setState({page});
//         this.props.blogActions.loadPosts(
//             page,
//             this.state.query,
//             this.state.category_id,
//             this.state.kind,
//         );
//     }
//
//     loadByText(value) {
//         this.setState({
//             page: 1,
//             query: value,
//         });
//         if (this.timeOut !== null) {
//             clearTimeout(this.timeOut);
//         }
//         this.timeOut = setTimeout(
//             function () {
//                 this.props.blogActions.loadPosts(
//                     this.state.page,
//                     value,
//                     this.state.category_id,
//                     this.state.kind,
//                 );
//             }.bind(this),
//             500,
//         );
//     }
//
//     loadByCategories(category_id) {
//         this.setState({category_id});
//         if (this.timeOut !== null) {
//             clearTimeout(this.timeOut);
//         }
//         this.timeOut = setTimeout(
//             function () {
//                 this.props.blogActions.loadPosts(
//                     1,
//                     this.state.query,
//                     category_id,
//                     this.state.kind,
//                 );
//             }.bind(this),
//             500,
//         );
//     }
//
//     loadByKinds(kind) {
//         this.setState({kind});
//         if (this.timeOut !== null) {
//             clearTimeout(this.timeOut);
//         }
//         this.timeOut = setTimeout(
//             function () {
//                 this.props.blogActions.loadPosts(
//                     1,
//                     this.state.query,
//                     this.state.category_id,
//                     kind,
//                 );
//             }.bind(this),
//             500,
//         );
//     }
//
//     render() {
//         const Add = <Tooltip id="tooltip">Thêm bài viết</Tooltip>;
//
//         // let first = this.props.totalPages
//         //     ? (this.state.page - 1) * this.state.limit + 1
//         //     : 0;
//         // let end =
//         //     this.state.page < this.props.totalPages
//         //         ? this.state.page * this.state.limit
//         //         : this.props.totalPages;
//         return (
//             <div className="container-fluid">
//                 {this.props.isLoadingCategories || this.props.isLoadingPosts || this.props.isLoadingLanguages ? (
//                     <Loading/>
//                 ) : (
//                     <div>
//                         <div className="row">
//                             <div className="col-md-2">
//
//                                 <Select
//                                     className="btn-round"
//                                     name="board-id"
//                                     value={this.state.category_id}
//                                     options={
//                                         [
//                                             {key: 0, value: "Tất cả"},
//                                             ...this.props.categories ? this.props.categories.map((category) => {
//                                                 return {
//                                                     ...category,
//                                                     key: category.id,
//                                                     value: category.name
//                                                 };
//                                             }) : []]
//                                     }
//                                     onChange={this.loadByCategories}
//                                 />
//                             </div>
//                             <div className="col-md-2">
//
//                                 <Select
//                                     className="btn-round"
//                                     name="board-id"
//                                     value={this.state.kind}
//                                     options={
//                                         this.props.allBlogKinds.map((obj) => {
//                                             return {key: obj.value, value: obj.label};
//                                         })
//                                     }
//                                     onChange={this.loadByKinds}
//                                 />
//                             </div>
//                         </div>
//                         <div className="card">
//                             <div className="card-content">
//                                 <div className="tab-content">
//                                     <div className="flex-row flex">
//                                         <h4 className="card-title">
//                                             <strong>Danh sách bài viết</strong>
//                                         </h4>
//                                         <div>
//                                             <OverlayTrigger
//                                                 placement="top"
//                                                 overlay={Add}
//                                             >
//                                                 <Link
//                                                     className="btn btn-primary btn-round btn-xs button-add none-margin "
//                                                     to="/blog/editor"
//                                                     type="button"
//                                                 >
//                                                     <strong>+</strong>
//                                                 </Link>
//                                             </OverlayTrigger>
//                                         </div>
//                                     </div>
//
//                                     {/*<div id="mini-editor">*/}
//                                     {/*</div>*/}
//                                     {/*<button onClick={()=>this.test()}>+</button>*/}
//
//
//                                     <Search
//                                         onChange={this.loadByText}
//                                         value={this.state.query}
//                                         placeholder="Tìm kiếm tiêu đề"
//                                     />
//                                 </div>
//
//                                 <ListPost/>
//                                 <Pagination
//                                     totalPages={this.props.totalPages}
//                                     currentPage={this.state.page}
//                                     loadDataPage={this.loadPosts}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }
//
//
// PromotionManageContainer.propTypes = {
//     user: PropTypes.object.isRequired,
// };
//
// function mapStateToProps(state) {
//     return {
//         user: state.login.user
//     };
// }
//
// export default connect(mapStateToProps)(PromotionManageContainer);
