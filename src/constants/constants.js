import * as env from "./env";

export const QUESTION_TYPE = [
    {
        value: 0,
        label: "Textbox"
    },
    {
        value: 1,
        label: "Radio"
    },
    {
        value: 2,
        label: "Checkbox"
    }
];

export const MARITAL = [
    {
        id: 0,
        name: ""
    },
    {
        id: 1,
        name: "Chưa kết hôn"
    },
    {
        id: 2,
        name: "Đã kết hôn"
    }
];

export const TYPE_NOTI = [
    {
        label: "Web",
        value: "social"
    },
    {
        label: "Trang quản lý",
        value: "manage"
    },
    {
        label: "App",
        value: "mobile_social"
    },
    {
        label: "App quản lý",
        value: "mobile_manage"
    }
];

export const LITERACY = [
    {
        id: 0,
        name: ""
    },
    {
        id: 1,
        name: "Đại học"
    },
    {
        id: 2,
        name: "Cao đẳng"
    }
];

export const STATUS_IMPORT_GOODS = [
    {
        label: "Lưu tạm",
        value: "uncompleted"
    },
    {
        label: "Hoàn thành",
        value: "completed"
    }
];

export const DAY_OF_WEEK = [
    {
        value: "Thứ hai",
        key: "Thứ hai"
    },
    {
        value: "Thứ ba",
        key: "Thứ ba"
    },
    {
        value: "Thứ tư",
        key: "Thứ tư"
    },
    {
        value: "Thứ năm",
        key: "Thứ năm"
    },
    {
        value: "Thứ sáu",
        key: "Thứ sáu"
    },
    {
        value: "Thứ bảy",
        key: "Thứ bảy"
    },
    {
        value: "Chủ nhật",
        key: "Chủ nhật"
    }
];

// Cặp (name ; id) dùng cho FormInputSelect

export const GENDER = [
    {
        name: "",
        id: ""
    },
    {
        name: "Nam",
        id: "1"
    },
    {
        name: "Nữ",
        id: "2"
    }
];

// Cặp (label ; value) dùng cho ReactSelect
export const CUSTOMTYPE = [
    {
        label: "Tất cả",
        value: 2
    },
    {
        label: "Khách hàng còn nợ",
        value: "debt"
    },
    {
        label: "Khách hàng đã mua",
        value: "paid"
    }
];

export const PAYMENT = [
    {
        label: "Tiền mặt",
        value: "cash"
    },
    {
        label: "Chuyển khoản",
        value: "transfer"
    },
    {
        label: "Thẻ",
        value: "credit"
    }
];

export const ORDER_STATUS = [
    {
        order: 0,
        label: "Đặt hàng",
        value: "place_order"
    },
    {
        order: 1,
        label: "Chưa gọi",
        value: "not_reach"
    },
    {
        order: 2,
        label: "Chờ chuyển khoản",
        value: "transfering"
    },
    {
        order: 3,
        label: "Xác nhận",
        value: "confirm_order"
    },
    {
        order: 4,
        label: "Giao hàng",
        value: "ship_order"
    },
    {
        order: 5,
        label: "Hoàn thành",
        value: "completed_order"
    },
    {
        order: 6,
        label: "Hủy",
        value: "cancel"
    }
];

export const TRANSFER_PURPOSE = [
    {
        purpose: 0,
        label: "Đặt cọc",
        value: "deposit"
    },
    {
        purpose: 1,
        label: "Thanh toán tiền hàng đặt",
        value: "pay_order"
    },
    {
        purpose: 2,
        label: "Mua hàng sẵn",
        value: "pay_good"
    }
];

export const TRANSFER_PURPOSE_COLOR = {
    deposit: "#a52a2a",
    pay_order: "#8B008B",
    pay_good: "#F08080"
};

export const REGISTER_STATUS = [
    {
        register: 0,
        label: "Đăng ký mới",
        value: "new-register"
    },
    {
        register: 1,
        label: "Đã gọi",
        value: "called"
    },
    {
        register: 2,
        label: "Đã trả",
        value: "paid"
    },
    {
        register: 3,
        label: "Đã trả đủ",
        value: "fully-paid"
    },
    {
        register: 4,
        label: "Hoàn thành",
        value: "completed"
    },
    {
        register: 5,
        label: "Kết thúc",
        value: "end"
    }
];

export const ORDERED_STATUS = [
    {
        order: 0,
        label: "Đơn mới",
        value: "place_order"
    },
    {
        order: 1,
        label: "Đã báo giá",
        value: "sent_price"
    },
    {
        order: 2,
        label: "Xác nhận",
        value: "confirm_order"
    },
    {
        order: 3,
        label: "Đặt hàng",
        value: "ordered"
    },
    {
        order: 4,
        label: "Dự kiến ngày về",
        value: "arrive_date"
    },
    {
        order: 5,
        label: "Đã về VN",
        value: "arrived"
    },
    {
        order: 6,
        label: "Giao hàng",
        value: "ship"
    },
    {
        order: 7,
        label: "Hoàn thành",
        value: "completed"
    },
    {
        order: 8,
        label: "Hủy",
        value: "cancel"
    }
];

export const ORDERED_STATUS_TRANSFER = [
    {
        value: "Trạng thái ban đầu",
        key: "origin"
    },
    {
        order: 0,
        value: "Chuyển sang Đã báo giá",
        key: "sent_price"
    },
    {
        order: 1,
        value: "Chuyển sang Xác nhận",
        key: "confirm_order"
    },
    {
        order: 2,
        value: "Chuyển sang Đặt hàng",
        key: "ordered"
    },
    {
        order: 3,
        value: "Chuyển sang Dự kiến ngày về",
        key: "arrive_date"
    },
    {
        order: 4,
        value: "Chuyển sang Đã về VN",
        key: "arrived"
    },
    {
        order: 5,
        value: "Chuyển sang Giao hàng",
        key: "ship"
    },
    {
        order: 6,
        value: "Chuyển sang Hoàn thành",
        key: "completed"
    },
    {
        order: 7,
        value: "Chuyển sang Hủy",
        key: "cancel"
    }
];

export const TYPE_CLASSES = [
    {
        label: "Hoạt động",
        value: "active"
    },
    {
        label: "Chờ",
        value: "waiting"
    }
];
export const STATUS_WORK = [
    {
        //0
        label: "Đợi chấp nhận",
        action: "Chấp nhận",
        value: "pending"
    },
    {
        //1
        label: "Đang thực hiện",
        action: "Xin gia hạn",
        value: "doing"
    },
    {
        //2
        label: "Hoàn thành",
        action: "",
        value: "done"
    },
    {
        //3
        label: "Hủy",
        action: "",
        value: "cancel"
    },
    {
        //4
        label: "Chi tiền",
        action: "",
        value: "pay"
    },
    {
        //5
        label: "Lưu trữ",
        action: "",
        value: "archive"
    }
];

export const STATUS_MONEY_TRANSFER = [
    {
        label: "Tất cả",
        value: ""
    },
    {
        label: "Đang giao dịch",
        value: "0"
    },
    {
        label: "Thành công",
        value: "1"
    },
    {
        label: "Hủy",
        value: "-1"
    }
];

export const TYPE_TRANSACTION = [
    {
        label: "Tất cả",
        value: ""
    },
    {
        label: "Chuyển tiền",
        value: "0"
    },
    {
        label: "Thu",
        value: "1"
    },
    {
        label: "Chi",
        value: "2"
    }
];

export const TYPE_MONEY_TRANSFER = [
    {
        label: "Tất cả",
        value: ""
    },
    {
        label: "Nhận",
        value: "receive"
    },
    {
        label: "Gửi",
        value: "send"
    }
];

export const TYPE_MONEY = [
    {
        value: "Thu",
        key: "1"
    },
    {
        value: "Chi",
        key: "2"
    }
];

export const STATUS_REGISTER_ROOM = [
    {
        label: "Đăng kí",
        value: "seed"
    },
    {
        label: "Đang xem",
        value: "view"
    },
    {
        label: "Hủy",
        value: "cancel"
    },
    {
        label: "Hoàn thành",
        value: "done"
    }
];

export const KIND_REGISTER_ROOM = [
    {
        label: "Tiệc cưới",
        value: "Tiệc cưới",
    },
    {
        label: "Hội nghị - Hội thảo",
        value: "Hội nghị - Hội thảo",
    },
    {
        label: "Tiệc tri ân khách hàng",
        value: "Tiệc tri ân khách hàng",
    },
    {
        label: "Tiệc sinh nhật",
        value: "Tiệc sinh nhật",
    }, {
        label: "Sự kiện ca nhạc, thời trang",
        value: "Sự kiện ca nhạc, thời trang",
    }, {
        label: "Tiệc ngoài trời",
        value: "Tiệc ngoài trời",
    }
];

export const CRM_TYPE_CLIENT = [
    {
        key: -1,
        value: 'Tất cả'
    },
    {
        key: 0,
        value: 'Nhận biết'
    },
    {
        key: 1,
        value: 'Dùng thử'
    },
    {
        key: 2,
        value: 'Thân thiết'
    },
    {
        key: 3,
        value: 'Trung thành'
    },
];

export const STATUS_ISSUE = {
    pending: {
        label: "Đang xác nhận",
        color: "#bcbcbc"
    },
    accepted: {
        label: "Xác nhận",
        color: "#ffe400"
    },
    processing: {
        label: "Đang xử lý",
        color: "#00b4ff"
    },
    completed: {
        label: "Hoàn thành",
        color: "#00ff06"
    }
};

export const LEAD_COLORS = [
    '#dff0d8', '#daedf7', '#f2dede', '#fcf8e3'
];

export const ORDER_STATUS_COLORS = {
    place_order: "#f9f9f9",
    confirm_order: "#b5d0fc",
    ship_order: "#b8ffad",
    completed_order: "#e2e2e2",
    cancel: "#fcb7ab"
};

export const ORDERED_STATUS_COLORS = {
    place_order: "#dddddd",
    sent_price: "#b5d0fc",
    confirm_order: "#b8ffad",
    ordered: "#e2e2e2",
    arrive_date: "#006400",
    arrived: "#fcb7ab",
    ship: "#00ff00",
    completed: "#ccff66",
    cancel: "#ffcc33"
};

export const MAX_TIME_SHIFT_REIGSTER = "15:00:00";
export const MAX_TIME_WORK_SHIFT_REIGSTER = "20:00:00";
export const DATE = 60 * 60 * 24;
const LINK_UPLOAD_IMAGE_EDITOR = env.MANAGE_API_URL + "/upload-image-editor";

export function linkUploadImageEditor() {
    let token = localStorage.getItem("token");
    return LINK_UPLOAD_IMAGE_EDITOR + "?token=" + token;
}

export const DATE_FORMAT = "DD-MM-YYYY";
export const DATETIME_FILE_NAME_FORMAT = "DD_MM_YYYY";
export const DATETIME_FORMAT = "HH:mm DD-MM-YYYY";
export const DATETIME_VN_FORMAT = "DD/MM/YYYY HH:mm:ss";
export const DATE_VN_FORMAT = "DD/MM/YYYY";
export const DATETIME_SEAT_FORMAT = "DD/MM/YYYY HH:mm";
export const DATETIME_FORMAT_SQL = "YYYY-MM-DD HH:mm:ss";
export const FULLTIME_FORMAT = "HH:mm:ss";
export const TIME_FORMAT_H_M = "HH:mm";

export const MAX_USER_SHOW_WORK_SHIFT = 5;

export const PRINT_ORDER_STATUS = ["Chưa duyệt", "Đã duyệt", "Đã nhận"];


// nhận diện đầu số
export const viettel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASgAAACqCAMAAAAp1iJMAAAApVBMVEX///8AkY3WhTEAioUAjoqLxcPVgSXN5uXmuJAAiIP7/f3U6ulns7BRqabh8fHVgiqm0c/UfRkYlpLeoGXVgSeVyccqnprTexDF3tz1+/v9+fX25tmfzszu9/d3urfA397Yijr68enz3syz2NfpwJ3syKnksoXblVLdm1zv07vakUpEpaLiq3n25dbTeQDrxqdwurfRcQDuzrTjrn/gpW/w1sLZj0LD7emtAAALO0lEQVR4nO2daXeqSBCGg7QoyB6FiwpocImiY0aj//+nTYNG2RdtCjKX55z7YQxC81pdXUvDvL21tLS0tLS0tDQLzhQHtjMddbsWLwiupqmqSuF/mqa5Am9Z3e5UtgeiaNQ90JowTNGRR7yrUhSiMegH6of7J8j/M6VqQnfq9My/RjGz53QFV0Wsrw5VnJtmlCZYsi3WfRtVYgxkyy0vUJJiWDCNH/X+f3KZWCP1OoVI4ctFCaOeWffNkcK0uy6FNSImUVguGmlfjsjVfZcvYtqWRtSOktWiWZWXB3Xf7LMYf7oqW7lIAbEQL/8+p2U6AlXRbMsSC6lW7xfFD4ORi8BVuoul8vav8FgDPOGg5luaVoh3Gm5X4kity5RC4MhBaK5WhuPWa0ohEE1ZvbolSWLAw3vvHBCrTRtmVoassQ1TyQchlm+QWYlWbYtcPojWps3IcmyhuSpdoamv+sN2WWu6TB6IFWqdgca0cQ48DezYndpkGmGj/j1gZ1WLVL9MJo86pOKmDYoti4MnoA2qk9wka0Ih8g6mXTi33tNql+naafBkUa9tLR/+2u+i0K2vk/xVWoApW5l8rSudJxCLNL47tQeiaSRVVAxRHDjTLq/RbGJ5FbEWQGYzqi9X8TRSBcsp3k8we44lqHG1ED2tUqO3Gmcdztood2SbT9TkONHp+moFz0drVQbrRj2zzmu1vNqX4sSpgIKWhWirskKoU0dIgGhW6xL69QcjIWBYiKomVDAF+FnnmZJMNPfn7EDdjOUrcOoOBW5ONHLJqnTFsPmfshB5ozJ4FlglxKrTyuIdwxFuizfNE/VUNrQ5IVR1CckcXYuyiCJ4oS6sd0K0OoIoSt5KjvSI0PlMF1QnL8eH6mAO/HiHFoj49B7otEOsC5rfmxaWisj0m0J6cSwTeMnWtLwE+9WUhuMhpx0NXC264VkVzb90CgPSPSEkE7rz0ogCS7svOCoR0D3h3KvOrq6t0tTTYZsNmNtVm80XgLNY+kn/6MBNO0QslnmBnsY+1XuQ4ZY72m3GnsIu2y3/pRGgTg0wpysDyir7FbisBVEN2m9iuCWVssB0orVmbWGySgVUFti8o0vbetU4JZQCtKfaYsx0BoV/uxGUTgg1yD09EAuufWBxAXo+Fq4Wo5Cdg8WZSG3GlsEEjALJud3qhDFyfYIIld41Widv/0LO31Wop6GoRuuElcgM7ziXpUFgUUP9eEHMPz0gfrdOLS0tLS0tLS0NJDsiLnbE/x6zq3lRO8WnJu/c1HsNDovc2h6VagLmz8MGiE0pCHE/D8EjtnElZECm9woPrSUf0XvUgNBfOwG5qXoXIXnuDabCY++zCz2+hmB2Hw9spYggB9/QgZ7o6cb4Fa8mCcLZQnA/CErqHBvh1lDiMSWwLdf1Xzj49czeY6d7w7Ks1O8Ppt67DB/4/zWV/4ihM5SBj74NQJNjWNEdSOozV/Lxximw14XDe1iNFUrXEDmNfbyrkNWSlh5bpVESeFX3Goc9NvGvOcTrn7FKX8Ixz0EjPOHEUKMJpSwdGZjBSjCitZjUWS0/Fa9DA+h9+yVBNOX9/NFhlhYq0luIedVelg5JQhWoCidZVMymco9JOiBml4i6vQNoEPm9ywsVuVM6vLYYGTIlCqUO8ujZ066lsdGphUahg+SuEJ99dLf3OMByYwfQdvRi9wlCQKhI/zO8W4+P/WzBD5KEKnhR0+FDJoHicTcXfbUJGkQPsNTw2NN9NAmhom4ocLV4D5nm5cfg40KVCXaMLsr74kDLiyGCj4ChjF0pRIQK72VBwv1zM2ZPtBUULy5UUYO6EuhRJ1iUh6EFrp1oL4b7iN0zNhCQEepNCCrC3vf0a1GhWPyjyllCUWwC6de1chOUoE0nh9WBXxMlXZ1lvfCAkFCcG5SEvvmC2GZFf29TtlBxsmKW0eOyKUf9CYwhJSnOuf51AISEioRTqv/bRc9NIT9xzREqHu5l7H4gLVRSuHl9OwQpocLhlO8VucimBHRbdHKEEsJYclZxhLBQyI1cnbdG9tWzERMqfCZvn3okMrjvAcsWqpw3JyxU8fCgfArzIBQKIDOya+qxZydbqHIjqEuo12pbwef0kKtSoTM/9jZlCpUVyiRAWCg1fZpHhHqtrBwMpyLzTnsszZlC0eUevyMrVCACjBER6sXaVjxhuZ03+GRbtlDl6tqlhEqrmRe6fbJCvSU+1YjCjxoEI3MuIlRqzJTiPB7NhbRv/gmcPqWOexc7y5yLTb3CPzM3ipQeE8p54u1FCwj5IXzI6ae6qJTPzVszCp8rpW1nUPerpaSRj9yTzmj9iUXCA+Mr/QRROFnw3+7l7yZkKffLiRWIRV7Do1ddy4+rwnkz4pMQnLSgk5u66uNcSZjW7WoppwgpkHj16xAiTldNOOZrUO5pAUN0ZFl2bHuQ9v+u4Qzj/mKwSIEhqRab3brE58qx+MDV4kMJ5aMlis/xUVbxfpsA+blepe8CI/TwHKLVyh+XH9FZ+4pZ+qvSXdNucsGgJJQAsbOBE7Ooug/OEaHiQba0tLS0tLS0tLTkMh7XPYLfwqThSn30gVhN8kbSaKUmCgOD/p07lnODlZooHRiGnwVGs5xXfsNPMmGAdJJmhaylnzc9a2IvSUBCMQVtZfVR7R0/xx5q3nWUwpayW1Z5x89x1sF0KmEnp1N1d/wcSzB70s9lxrW6NMuln+B0OpYb2eLfTTW3/AzzLdR619FLe53jv6sq7vkZNgzUclfanvzh/TNrxuoHN+06yhM64WxG+acBPv1jBjbtOkopP/5gflGkJ79KivEOLCroSMOnI+3xu6K81xmnHztw5jScvbLQ9/WhsqorTZ6s4bxTh1m/dpsbXWKYA6E7L8V8p4Mtdtg95ddV8sZ7YTqMdIC2qvlKGcLJ1NH7rw95vMMTQOksIKWarxg454TdOEMmul56c4Bh+lBS7b91SJk6DLF87ZpCMPoOYAUcb7aQvgmj7wgOv++vP0NlvanWrCb9jgIrkzQkm9TeAmRJmVVXAB0fPxXQOYdR1qTLJOPTLUZm9O2hghrMePOuwyW/NyR9Qf5O3s4/WZfEKJfFnuSp50ecA0Cr5HnxambH+HS/GazVbEemszX+6K+ZGlTCboRA8JTCfhtIKoaKsu6/Jtb4Y4FNCXzG+SjbStfwZSgSxIb1z6W/mT+h1ny/PF30mkTywsKqGyiB+XcXS+msV8tzQbnG8/1x8T4bKsywJpE8J74D6AnsE5J6acgoemf9jfX6SBZsPtmfj4vd+7aD51pddnRDuQDVbjez5PqHJDHYvHRdkWbb9ef7lc/1diZ5H3oCDcG6velUP+sCHDs5pSIpCIwAxQDMWa8cAIuP5GCYFXjDcrwAzzdehdFPtfR1xwvQqtGrMAq8NT2kyvNVjYGRgH1TVKrlrI70oyzAFdpkzmsdsrxdHkmZPdUBJs/kVEtWWwxG+W7G1gCf8XIL2jUpildobNYGJpzZnGrLcFOQmmVMD8bHT/giZRoSo6+X9TvwNOaHdRPsCqu0XTRtykWZL7b1huySwmwPDd0CHmGymNU1BxlF/z423ZaCzI/vDPQkxBPu0sw98tmMP/pbBipowCtc5725T6fkMt+cOpV3D4b4Cu+HfXOXuILMN6u1Xk2FXMKGpF9Ox9/huguxP+7WDEm1/Krz9nvR5MfmnmW8P+xe7y14fQyFmX32j79/smUxnn8c+u8zr9mABSuuGNbHb1ww291iM/m9Xrs08/35sPr+vDB+f8Z/BHYY6kh4yjCeOFgepXP53PUP5/1fJFCM8Xz/cd4cD4vV7vv9wff3adVfLI+b88ekfXi+paWlpYUA/wETARhrlpEeCwAAAABJRU5ErkJggg==";
export const mobifone = "http://vnreview.vn/image/59/50/595076.jpg";
export const vinaphone = "http://files.vforum.vn/2013/T05/img/diendanbaclieu-36407-my-documentsscrn-vinaphone.jpg";
export const vietnamobile = "http://www.vietnamobile.com.vn/images/logo.png";
export const gmobile = "https://banthe247.com/upload/files/cach-nap-the-gmobile.jpg";

export const PHONE_HEAD_3 = {
    "086": viettel,
    "096": viettel,
    "097": viettel,
    "098": viettel,
    "090": mobifone,
    "093": mobifone,
    "091": vinaphone,
    "094": vinaphone,
    "092": vietnamobile,
    "099": gmobile
};

export const PHONE_HEAD_4 = {
    "0162": viettel,
    "0163": viettel,
    "0164": viettel,
    "0165": viettel,
    "0166": viettel,
    "0167": viettel,
    "0168": viettel,
    "0169": viettel,
    "0120": mobifone,
    "0121": mobifone,
    "0122": mobifone,
    "0126": mobifone,
    "0128": mobifone,
    "0123": vinaphone,
    "0124": vinaphone,
    "0125": vinaphone,
    "0127": vinaphone,
    "0129": vinaphone,
    "0188": vietnamobile,
    "0186": vietnamobile,
    "0199": gmobile
};

///// 
export const CONTRACT_TYPES = [
    "Bản quyền trong nước",
    "Bản quyền nước ngoài",
    "Dịch giả",
    "Biên tập",
    "Minh hoạ",
    "Nguyên tắc",
    "Mua bán",
    "Tăng chiết khấu",
    "Liên kết xuất bản",
    "In ấn ba bên",
    "Truyền thông",
    "Lao động",
    "Thuê khoán",
    "Sử dụng dịch vụ",
    "Khác",
];
