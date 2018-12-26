import React from "react";
import ImageUploader from "../../../components/common/ImageUploader";
import store from "./BlogEditorStore";
import { NO_IMAGE, BLOG_PREVIEW_BASE_URL } from "../../../constants/env";
import { observer } from "mobx-react";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import { BLOG_KINDS } from "../const";
import TooltipButton from "../../../components/common/TooltipButton";
import AddLanguageModal from "../containers/AddLanguageModal";
import AddCategoryModal from "../containers/AddCategoryModal";
import {
    showErrorMessage,
    changeToSlug,
    showNotification,
    showErrorNotification
} from "../../../helpers/helper";
import PlainTextEditor from "../../../components/common/PlainTextEditor";
import TagsInput from "../../../components/common/TagsInput";
import { savePostV2 } from "../apis/blogApi";
import KeetoolSelect from "../../../components/KeetoolSelect";
import EditorFormGroup from "../../../components/EditorFormGroup";
import { PUBLISHED, DRAFT } from "../constants/blogConstant";
import PropTypes from "prop-types";
import { postTextToValue, postValueToText } from "./blogEditorHelper";
import Loading from "../../../components/common/Loading";
import StickyMenu from "./StickyMenu";

const savePost = async (editor, status, publish_status) => {
    editor.setState({
        isSavingPost: true
    });
    const convertedPost = postValueToText(store.post);

    const res = await savePostV2(
        {
            ...convertedPost,
            publish_status
        },
        status
    );
    editor.setState({
        isSavingPost: false
    });
    if (res.data.status) {
        showNotification("Lưu bài viết thành công");
    } else {
        showErrorNotification("Có lỗi xảy ra");
    }

    const { product } = res.data;

    store.post = postTextToValue(product);

    return res.data;
};

const propTypes = {
    params: PropTypes.object.isRequired
};
@observer
class BlogEditor extends React.Component {
    state = {
        value: "",
        isSavingPost: false,
        pristine: {},
        errors: []
    };

    componentDidMount() {
        store.loadLanguages();
        store.loadCategories();
        store.resetPostForm();
        const { postId } = this.props.params;
        if (postId) {
            store.loadPostDetail(postId);
        }
    }

    validateForm() {
        let errors = [];
        this.setState({
            errors
        });
        if (!store.post.title) {
            errors.push("Bạn nhập thiếu tên bài viết");
        }

        if (!store.post.slug) {
            errors.push("Bạn chưa nhập slug");
        }

        if (!store.post.language_id) {
            errors.push("Bạn chưa chọn ngôn ngữ");
        }

        if (!store.post.url) {
            errors.push("Bạn chưa tải lên ảnh đại diện bài viết");
        }

        this.setState({
            errors
        });
        return errors.length == 0;
    }

    // validateForm() {
    //     let errors = [];
    //     this.setState({
    //         errors
    //     });
    //     if (!store.post.title) {
    //         errors.push("Bạn nhập thiếu tên bài viết");
    //     }

    //     if (!store.post.slug) {
    //         errors.push("Bạn chưa nhập slug");
    //     }

    //     if (!store.post.language_id) {
    //         errors.push("Bạn chưa chọn ngôn ngữ");
    //     }

    //     if (store.post.content == "<p></p>") {
    //         errors.push("Bạn nhập thiếu nội dung bài viết");
    //     }

    //     if (!store.post.url) {
    //         errors.push("Bạn chưa tải lên ảnh đại diện bài viết");
    //     }

    //     this.setState({
    //         errors
    //     });
    //     return errors.length == 0;
    // }

    publish = () => {
        if (this.validateForm()) savePost(this, 1, PUBLISHED);
    };

    saveDraft = async () => {
        if (store.post.id) {
            if (this.validateForm())
                savePost(this, store.post.status, store.post.publish_status);
        } else {
            if (this.validateForm()) savePost(this, 0, DRAFT);
        }
    };

    preview = async () => {
        if (this.validateForm()) {
            const data = await savePost(
                this,
                store.post.status,
                store.post.publish_status
            );
            const url = BLOG_PREVIEW_BASE_URL + "/" + data.product.slug;
            const win = window.open(url, "_blank");
            win.focus();
        }
    };

    generateFromTitle = () => {
        if (store.post.title === "") {
            showErrorMessage("Lỗi", "Bài viết này chưa có Tiêu Đề");
        } else {
            const slug = changeToSlug(store.post.title);
            store.post = {
                ...store.post,
                slug
            };
        }
    };

    updatePostCategories = values => {
        const post = {
            ...store.post,
            categories: values
        };
        store.post = post;
    };

    openAddCategoryModal = () => {
        store.toggleAddCategoryModal(true);
    };

    updatePost = (field, value) => {
        const post = { ...store.post };
        post[field] = value;
        store.post = post;
    };

    openAddLanguageModal = () => {
        store.toggleAddLanguageModal(true);
    };

    renderTextFlexField = (field, label) => (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <PlainTextEditor
                value={store.post[field]}
                onChange={value => this.updatePost(field, value)}
            />
        </div>
    );

    fieldNotValid = field => {
        const isNotValid = !store.post[field];
        return isNotValid;
    };

    render() {
        if (store.isLoading) {
            return <Loading />;
        } else
            return (
                <div className="container-fluid">
                    <AddLanguageModal />
                    <AddCategoryModal />
                    <div className="col-sm-6 col-md-8">
                        <div className="card">
                            <div className="card-content">
                                <FormInputText
                                    label="Tên bài viết"
                                    required
                                    isNotValid={this.fieldNotValid("title")}
                                    name="title"
                                    updateFormData={e =>
                                        this.updatePost("title", e.target.value)
                                    }
                                    value={store.post.title}
                                />

                                <FormInputText
                                    height="100%"
                                    label="Slug"
                                    required
                                    name="slug"
                                    isNotValid={this.fieldNotValid("slug")}
                                    updateFormData={e =>
                                        this.updatePost("slug", e.target.value)
                                    }
                                    value={store.post.slug}
                                >
                                    <TooltipButton
                                        placement="top"
                                        text="Tạo từ tiêu đề bài viết"
                                    >
                                        <a
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            style={{
                                                position: "absolute",
                                                right: 0,
                                                top: 0
                                            }}
                                            onClick={this.generateFromTitle}
                                        >
                                            <i className="material-icons">
                                                autorenew
                                            </i>
                                        </a>
                                    </TooltipButton>
                                </FormInputText>

                                {this.renderTextFlexField(
                                    "description",
                                    "Mô tả ngắn"
                                )}

                                <KeetoolSelect
                                    label="Loại bài viết"
                                    value={store.post.kind}
                                    options={BLOG_KINDS}
                                    onChange={e =>
                                        this.updatePost("kind", e.value)
                                    }
                                    placeholder="Chọn loại bài viết"
                                />
                                <KeetoolSelect
                                    onChange={e =>
                                        this.updatePost("language_id", e.value)
                                    }
                                    label="Ngôn ngữ"
                                    value={store.post.language_id}
                                    options={store.getLanguages}
                                    placeholder="Chọn ngôn ngữ"
                                    required={true}
                                >
                                    <TooltipButton
                                        placement="top"
                                        text="Thêm ngôn ngữ"
                                    >
                                        <button
                                            onClick={this.openAddLanguageModal}
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                        >
                                            <strong>+</strong>
                                            <div className="ripple-container" />
                                        </button>
                                    </TooltipButton>
                                </KeetoolSelect>

                                <div className="form-group">
                                    <label
                                        className="control-label"
                                        style={{ marginBottom: "10px" }}
                                    >
                                        Nhóm bài viết
                                        <TooltipButton
                                            placement="top"
                                            text="Thêm nhóm bài viết"
                                        >
                                            <button
                                                onClick={
                                                    this.openAddCategoryModal
                                                }
                                                className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                type="button"
                                            >
                                                <strong>+</strong>
                                                <div className="ripple-container" />
                                            </button>
                                        </TooltipButton>
                                    </label>
                                    <ReactSelect
                                        value={store.post.category_id}
                                        options={store.getCategories}
                                        onChange={e =>
                                            this.updatePost(
                                                "category_id",
                                                e.value
                                            )
                                        }
                                        placeholder="Chọn nhóm bài viết"
                                    />
                                </div>

                                {this.renderTextFlexField(
                                    "meta_title",
                                    "Meta title"
                                )}
                                {this.renderTextFlexField(
                                    "meta_description",
                                    "Meta description"
                                )}
                                {this.renderTextFlexField(
                                    "keyword",
                                    "Keywords"
                                )}

                                <TagsInput
                                    id="blog-editor-tags"
                                    tags={store.post.tags}
                                    onChange={values => {
                                        this.updatePost("tags", values);
                                    }}
                                />
                                <EditorFormGroup
                                    label="Nội dung"
                                    required={true}
                                    value={store.post.content}
                                    onChange={value => {
                                        this.updatePost("content", value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="card blog-editor-avatar">
                            <div className="card-content">
                                <label>Ảnh đại diện</label>
                                <ImageUploader
                                    handleFileUpload={url =>
                                        this.updatePost("url", url)
                                    }
                                    tooltipText="Ảnh đại diện"
                                    image_url={
                                        store.post.url
                                            ? store.post.url
                                            : NO_IMAGE
                                    }
                                />
                            </div>
                        </div>

                        <StickyMenu
                            post={store.post}
                            errors={this.state.errors}
                            isSavingPost={this.state.isSavingPost}
                            publish={this.publish}
                            saveDraft={this.saveDraft}
                            preview={this.preview}
                        />
                    </div>
                </div>
            );
    }
}

BlogEditor.propTypes = propTypes;

export default BlogEditor;