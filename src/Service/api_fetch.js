import {
    APP_USER,APP_USER_LOGIN,CITY,HOTEL,ROOM,TOUR,TOUR_BOOKING,TOUR_COMPANY, SEARCH_ROOM, AD_HOTEL, AD_TOUR, SEARCH_TOUR, AVAILABLE_ROOM
} from './api_name';
const uuid = "abc";

export const GetCity = () => {
    return new Promise((resolve) => {
        fetch(CITY + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetCity") })
    });
}

export const GetHotel = () => {
    return new Promise((resolve) => {
        fetch(HOTEL + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetHotel") })
    });
}

export const GetRoom = () => {
    return new Promise((resolve) => {
        fetch(ROOM + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetRoom") })
    });
}

export const GetTour = () => {
    return new Promise((resolve) => {
        fetch(TOUR + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetTour") })
    });
}

export const GetTourBooking = () => {
    return new Promise((resolve) => {
        fetch(TOUR_BOOKING + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetTourBooking") })
    });
}

export const GetTourCompany = () => {
    return new Promise((resolve) => {
        fetch(TOUR_COMPANY + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetTourCompany") })
    });
}

export const GetHotelById = (id) => {
    return new Promise((resolve) => {
        fetch(HOTEL+"/"+id).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetHotelById") })
    });
}

export const GetRoomById = (id) => {
    return new Promise((resolve) => {
        fetch(ROOM+"/"+id+"/"+uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetRoomById") })
    });
}

export const Login = ({ userId, password }) => {
    return new Promise((resolve) => {
    fetch(APP_USER_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ uId: userId, pwd: password }),
    }).then(response => response.json()).then(data => {
            resolve(data);
        })
        .catch(error => resolve(error))
    });
}

export const Register = ({ userId, password, username }) => {
    return new Promise((resolve) => {
    fetch(APP_USER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ uId: userId, name: username, pwd: password ,userLevel: "",lang: "",hotelId: null,companyId: null,hotel: null,company: null})
    }).then(data => {
            resolve(data);
        }).catch(error => resolve(error));
    });
}


export const SearchRoom = (cityId, startDate, endDate, guestQty, roomQty) => {
    return new Promise((resolve) => {
    fetch(SEARCH_ROOM, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ cityId, startDate, endDate, guestQty, roomQty }),
    }).then(response => response.json()).then(data => {
            resolve(data);
        })
        .catch(error => resolve(error))
    });
}


export const AvailableRoom = (hotelId, startDate, endDate) => {
    return new Promise((resolve) => {
    fetch(AVAILABLE_ROOM, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ hotelId, startDate, endDate }),
    }).then(response => response.json()).then(data => {
            resolve(data);
        })
        .catch(error => resolve(error))
    });
}

export const SearchTour = (cityId, startDate, endDate) => {
    return new Promise((resolve) => {
    fetch(SEARCH_TOUR, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ cityId, startDate, endDate }),
    }).then(response => response.json()).then(data => {
            resolve(data);
        })
        .catch(error => resolve(error))
    });
}

export const GetAdHotel = () => {
    return new Promise((resolve) => {
        fetch(AD_HOTEL + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetTourCompany") })
    });
}

export const GetAdTour = () => {
    return new Promise((resolve) => {
        fetch(AD_TOUR + "/" + uuid).then(response => response.json())
            .then(data => {
                if (data.success) resolve(data);
                else resolve(data);
            })
            .catch(error => { console.log("err in GetTourCompany") })
    });
}