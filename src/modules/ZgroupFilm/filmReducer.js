import * as types from './filmActionTypes';
import initialState from "../../reducers/initialState";


export default function filmReducer(state = initialState.film, action) {
    switch (action.type) {
        case types.HANDLE_FILM_SEARCH:
            return {
                ...state,
                filmSearch: action.search
            };
        case types.DISPLAY_GLOBAL_LOADING:
            return {
                ...state,
                isSaving: true
            };
        case types.HIDE_GLOBAL_LOADING:
            return {
                ...state,
                isSaving: false
            };

        //Film Reducer
        case types.BEGIN_LOAD_ALL_CUSTOMER:
            return {
                ...state,
                isLoadingCustomer: true
            };
        case types.LOAD_ALL_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoadingCustomer: false,
                customer: action.customer,
                totalCountCustomer: action.paginator.total_count,
                totalPagesCustomer: action.paginator.total_pages,
                currentPageCustomer: action.paginator.current_page,
            };
        case types.BEGIN_EXPORT_CUSTOMER:
            return {
                ...state,
                isExportCustomer: true
            };
        case types.EXPORT_CUSTOMER_SUCCESS:
            return {
                ...state,
                isExportCustomer: false,
                exportCustomer: action.exportCustomer,
            };


        case types.BEGIN_LOAD_ALL_FILMS:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_SHOWN_FILMS_SUCCESS:
            return {
                ...state,
                shownFilms: action.films.sort(function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                }),
                isLoading: false,
                currentPageShown: action.currentPage,
                limitShown: action.limit,
                totalCountShown: action.totalCount,
                totalPagesShown: action.totalPages
            };
        case types.LOAD_ALL_FILMS_SUCCESS:
            return {
                ...state,
                allFilms: action.allFilms.sort(function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                }),
                isLoading: false,
            };
        case types.LOAD_ALL_FILMS_HAVE_PAGINATION_SUCCESS:
            return {
                ...state,
                allFilmsHavePagination: action.allFilms.sort(function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                }),
                isLoading: false,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount,
                totalPages: action.totalPages
            };
        case types.SHOW_ADD_EDIT_FILM_MODAL:
            return {
                ...state,
                addEditFilmModal: !state.addEditFilmModal
            };
        case types.DELETE_FILM_SUCCESS:
            return {
                ...state,
                allFilms: state.allFilms.filter(film => film.id !== action.film.id),
                allFilmsHavePagination: state.allFilmsHavePagination.filter(film => film.id !== action.film.id),
            };
        case types.BEGIN_SAVE_FILM:
            return {
                ...state,
                isSavingFilm: true,
                isSaving: true,
            };
        case types.SAVE_FILM_SUCCESS:
            return {
                ...state,
                isSaving: false,
                isSavingFilm: false,
                addEditFilmModal: false,
                allFilms: [action.film, ...state.allFilms]
            };
        case types.EDIT_FILM_ERROR:
            return {
                ...state,
                isSavingFilm: false,
            };
        case types.HANDLE_AVATAR_WEBSITE_TAB_FILM:
            return {
                ...state,
                filmModal: {
                    ...state.filmModal,
                    avatar_url: action.image
                },
            };
        case types.HANDLE_AVATAR_WEBSITE_TAB_FILM2:
            return {
                ...state,
                filmModal: {
                    ...state.filmModal,
                    cover_url: action.image
                },
            };
        case types.HANDLE_FILM_MODAL:
            return {
                ...state,
                filmModal: action.film,
            };
        case types.EDIT_FILM_SUCCESS: {
            let film = state.allFilms.map((film) => {
                if (film.id === action.film.id) {
                    return {
                        ...film,
                        name: action.film.name,
                        avatar_url: action.film.avatar_url,
                        trailer_url: action.film.trailer_url,
                        director: action.film.director,
                        cast: action.film.cast,
                        running_time: action.film.running_time,
                        release_date: action.film.release_date,
                        country: action.film.country,
                        language: action.film.language,
                        film_genre: action.film.film_genre,
                        rate: action.film.rate,
                        summary: action.film.summary,
                        film_rated: action.film.film_rated,
                    };
                }
                return film;
            });
            let film2 = state.allFilmsHavePagination.map((film) => {
                if (film.id === action.film.id) {
                    return {
                        ...film,
                        name: action.film.name,
                        avatar_url: action.film.avatar_url,
                        trailer_url: action.film.trailer_url,
                        director: action.film.director,
                        cast: action.film.cast,
                        running_time: action.film.running_time,
                        release_date: action.film.release_date,
                        country: action.film.country,
                        language: action.film.language,
                        film_genre: action.film.film_genre,
                        rate: action.film.rate,
                        summary: action.film.summary,
                        film_rated: action.film.film_rated,
                    };
                }
                return film;
            });
            let film3 = state.shownFilms.map((film) => {
                if (film.id === action.film.id) {
                    return {
                        ...film,
                        name: action.film.name,
                        avatar_url: action.film.avatar_url,
                        trailer_url: action.film.trailer_url,
                        director: action.film.director,
                        cast: action.film.cast,
                        running_time: action.film.running_time,
                        release_date: action.film.release_date,
                        country: action.film.country,
                        language: action.film.language,
                        film_genre: action.film.film_genre,
                        rate: action.film.rate,
                        summary: action.film.summary,
                        film_rated: action.film.film_rated,
                    };
                }
                return film;
            });
            return {
                ...state,
                isSavingFilm: false,
                addEditFilmModal: false,
                allFilms: film,
                allFilmsHavePagination: film2,
                shownFilms: film3
            };
        }
        case types.EDIT_STATUS_SUCCESS: {
            let film = state.allFilms.map((film) => {
                if (film.id === action.id) {
                    return {
                        ...film,
                        film_status: action.status,
                    };
                }
                return film;
            });
            let film2 = state.allFilmsHavePagination.map((film) => {
                if (film.id === action.id) {
                    return {
                        ...film,
                        film_status: action.status,
                    };
                }
                return film;
            });
            let film3 = state.shownFilms.map((film) => {
                if (film.id === action.id) {
                    return {
                        ...film,
                        film_status: action.status,
                    };
                }
                return film;
            });
            return {
                ...state,
                allFilms: film,
                allFilmsHavePagination: film2,
                shownFilms: film3
            };
        }
        case types.EDIT_FAVORITE_SUCCESS: {
            let film = state.allFilms.map((film) => {
                if (film.id === action.film.id) {
                    return {
                        ...film,
                        is_favorite: 1 - action.film.is_favorite,
                    };
                }
                return film;
            });
            let film2 = state.allFilmsHavePagination.map((film) => {
                if (film.id === action.film.id) {
                    return {
                        ...film,
                        is_favorite: 1 - action.film.is_favorite,
                    };
                }
                return film;
            });
            let film3 = state.shownFilms.map((film) => {
                if (film.id === action.film.id) {
                    return {
                        ...film,
                        is_favorite: 1 - action.film.is_favorite,
                    };
                }
                return film;
            });
            return {
                ...state,
                allFilms: film,
                allFilmsHavePagination: film2,
                shownFilms: film3
            };
        }
        case types.HANDLE_IMAGES_WEBSITE_FILM:
            return {
                ...state,
                filmModal: {
                    ...state.filmModal,
                    images_url: action.images_url
                },
            };
        case types.SHOW_FILM_SESSION:
            return {
                ...state,
                search: action.search
            };
        case types.CLEAR_TO_LOAD_PAGE:
            return {
                ...state,
                search: "",
                openFilmModal: false
            };
        case types.ADD_FILM_SESSION_ON_TAB_FILM:
            return {
                ...state,
                addFilmSession: true,
            };








        //Session Reducer
        case types.BEGIN_LOAD_DATA_EXCEL_SESSIONS:
            return {
                ...state,
                isLoadingExcelSession: true
            };
        case types.LOAD_DATA_EXCEL_CODE_SUCCESS:
            return {
                ...state,
                isLoadingExcelSession: false,
                excelSession: action.excelSession,
            };
        case types.BEGIN_LOAD_ALL_SESSIONS:
            return {
                ...state,
                isLoadingAllSessions: true,
            };
        case types.LOAD_ALL_SESSIONS_SUCCESS: {
            let ar = action.allSessions;
            let length = action.allSessions.length;
            let j = 0;
            let i = 0;
            for (j = 0; j < length - 1; j++) {
                for (i = 0; i < length - 1 - j; i++) {
                    if (ar[i].start_date === ar[i + 1].start_date) {
                        if (ar[i].start_time.slice(0, 2) < ar[i + 1].start_time.slice(0, 2)) {
                            let t = ar[i];
                            ar[i] = ar[i + 1];
                            ar[i + 1] = t;
                        }
                    }
                }
            }
            return {
                ...state,
                allSessions: ar,
                isLoadingAllSessions: false,
                currentPageAll: action.currentPageAll,
                limitAll: action.limitAll,
                totalCountAll: action.totalCountAll,
                totalPagesAll: action.totalPagesAll,
            };
        }

        case types.BEGIN_LOAD_SHOWING_SESSION:
            return {
                ...state,
                isLoadingShowingSession: true,
            };
        case types.BEGIN_LOAD_SHOWN_SESSION:
            return {
                ...state,
                isLoadingShownSession: true,
            };
        case types.LOAD_SHOWING_SESSION_SUCCESS: {
            let ar = action.showingSession;
            let length = action.showingSession.length;
            let j = 0;
            let i = 0;
            for (j = 0; j < length - 1; j++) {
                for (i = 0; i < length - 1; i++) {
                    if (ar[i].start_date === ar[i + 1].start_date) {
                        if (ar[i].start_time.slice(0, 2) > ar[i + 1].start_time.slice(0, 2)) {
                            let t = ar[i];
                            ar[i] = ar[i + 1];
                            ar[i + 1] = t;
                        }
                    }
                }
            }
            return {
                ...state,
                showingSession: ar,
                currentPageShowing: action.currentPageShowing,
                limitShowing: action.limitShowing,
                totalCountShowing: action.totalCountShowing,
                totalPagesShowing: action.totalPagesShowing,
                isLoadingShowingSession: false,
            };
        }
        case types.LOAD_SHOWN_SESSION_SUCCESS: {
            let ar = action.shownSession;
            let length = action.shownSession.length;
            let j = 0;
            let i = 0;
            for (j = 0; j < length - 1; j++) {
                for (i = 0; i < length - 1 - j; i++) {
                    if (ar[i].start_date === ar[i + 1].start_date) {
                        if (ar[i].start_time.slice(0, 2) < ar[i + 1].start_time.slice(0, 2)) {
                            let t = ar[i];
                            ar[i] = ar[i + 1];
                            ar[i + 1] = t;
                        }
                    }
                }
            }
            return {
                ...state,
                shownSession: ar,
                currentPageSSShown: action.currentPageSSShown,
                limitSSShown: action.limitSSShown,
                totalCountSSShown: action.totalCountSSShown,
                totalPagesSSShown: action.totalPagesSSShown,
                isLoadingShownSession: false,
            };
        }

        case types.TOGGLE_ADD_EDIT_SESSION_MODAL:
            return {
                ...state,
                addEditSessionModal: !state.addEditSessionModal
            };
        case types.BEGIN_SAVE_SESSION:
            return {
                ...state,
                isSaving: true,
                isSavingSession: true
            };
        case types.EDIT_SESSION_ERROR:
            return {
                ...state,
                isSavingSession: false
            };
        case types.SAVE_SESSION_SUCCESS:
            return {
                ...state,
                allSessions: [action.session, ...state.allSessions],
                addEditSessionModal: false,
                isSavingSession: false,
                isSaving: false,
                addFilmSession: false,
            };
        case types.HANDLE_SESSION_MODAL:
            return {
                ...state,
                sessionModal: action.session
            };
        case types.EDIT_SESSION_SUCCESS: {
            let session = state.allSessions.map((session) => {
                if (session.id === action.session.id) {
                    return {
                        ...session,
                        film_id: action.session.film_id,
                        film_quality: action.session.film_quality,
                        room_id: action.session.room_id,
                        start_time: action.session.start_time,
                        start_date: action.session.start_date,
                        seats: JSON.parse(action.session.seats),

                    };
                }
                return session;
            });
            let session2 = state.showingSession.map((session2) => {
                if (session2.id === action.session.id) {
                    return {
                        ...session2,
                        film_id: action.session.film_id,
                        film_quality: action.session.film_quality,
                        room_id: action.session.room_id,
                        start_time: action.session.start_time,
                        start_date: action.session.start_date,
                        seats: JSON.parse(action.session.seats),
                    };
                }
                return session2;
            });
            return {
                ...state,
                addEditSessionModal: false,
                isSavingSession: false,
                allSessions: session,
                showingSession: session2,
            };
        }
        case types.DELETE_SESSION_SUCCESS:
            return {
                ...state,
                allSessions: state.allSessions.filter(session => session.id !== action.session.id)
            };
        case types.SHOW_ADD_EDIT_FILM_MODAL_AT_SESSION:
            return {
                ...state,
                addEditFilmModal: !state.addEditFilmModal,
                openFilmModal: true
            };
        case types.LOAD_ALL_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.rooms
            };











        //Booking Reducer
        case types.TOGGLE_ADD_BOOKING_MODAL:
            return {
                ...state,
                addBookingRegisterSessionModal: !state.addBookingRegisterSessionModal,
            };
        case types.BEGIN_LOAD_SEAT_BY_SESSION_ID:
            return {
                ...state,
                isLoadingSeatBySessionId: true,
            };
        case types.LOAD_SEAT_BY_SESSION_ID_SUCCESS:
            return {
                ...state,
                isLoadingSeatBySessionId: false,
                seatForBooking: action.seatForBooking,
                width: action.width,
                height: action.height
            };
        case types.CLEAR_SEAT_BY_SESSION_ID:
            return {
                ...state,
                seatForBooking: [],
                width: 1200,
                height: 10
            };
        case types.CLEAR_ALL_BEGIN_BOOKING:
            return {
                ...state,
                seatForBooking: [],
                allFilms: [],
                allSessions: [],
                width: 1200,
                height: 10,

            };
        case types.HANDLE_BOOKING_MODAL:
            return {
                ...state,
                handleBookingModal: action.handleBookingModal,
            };
        case types.HANDLE_SEAT_TYPES:
            return {
                ...state,
                seats: action.seats
            };
        case types.BEGIN_BOOKING_SEAT:
            return {
                ...state,
                isBookingSeat: true
            };
        case types.BOOKING_SEAT_SUCCESS:
            return {
                ...state,
                isBookingSeat: false,
                addBookingRegisterSessionModal: false
            };
        case types.BOOKING_SEAT_ERROR:
            return {
                ...state,
                isBookingSeat: false,
                addBookingRegisterSessionModal: false
            };
        case types.BEGIN_CHECK_CODE:
            return {
                ...state,
                isCheckingCode: true,
            };
        case types.CHECK_CODE_SUCCESS:
            return {
                ...state,
                isCheckingCode: false,
                codeInfo: action.code
            };
        case types.CHECK_CODE_ERROR:
            return {
                ...state,
                isCheckingCode: false,
                codeInfo: {}
            };
        case types.BEGIN_CHECK_USER:
            return {
                ...state,
                isCheckingUser: true,
            };
        case types.CHECK_USER_SUCCESS:
            return {
                ...state,
                isCheckingUser: false,
                user: action.user
            };
        case types.CHECK_USER_ERROR:
            return {
                ...state,
                isCheckingUser: false,
                user: []
            };
        case types.CLEAR_CODE_BEGIN_BOOKING:
            return {
                ...state,
                user: [],
                codeInfo: {}
            };
        default:
            return state;
    }
}