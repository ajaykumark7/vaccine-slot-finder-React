import districtList from './districtList.js';
import { useEffect, useState } from "react";

function getFormattedDateHelper(inputDay) {
    let todayTime = new Date();
    todayTime.setDate(todayTime.getDate() + inputDay);
    let month = (todayTime.getMonth() + 1);
    let day = (todayTime.getDate());
    let year = (todayTime.getFullYear());
    return day + '-' + month + '-' + year;
}

// 1. populate districts select box using districtList data
function populateDistricts() {
    let districts = '';
    districtList.forEach(district => {
        districts += '<option value=' + district.district_id + '>' + district.district_name + '</option>';
    });
    document.querySelector('#district-select').innerHTML = districts;
}


// 2. validate weeks input for -ve values
function validateWeeks() {
    const weeks = document.querySelector('#weeks');
    weeks.addEventListener('blur', function () {
        if (this.value < 1) {
            alert('Please provide positive value for weeks');
            this.value = 1;
        }
    })
}

function filterResponse(response) {

    let filteredResponse = {};

    // filteredResponse['centers'] = response['centers'].filter(center => {
    //     for (let sessionIndex = 0; sessionIndex < center['sessions'].length; sessionIndex++) {
    //         //filter centers by vaccine availability(in any session)
    //         if (center['sessions'][sessionIndex].available_capacity > 0) {
    //             //filter centers by age group allowed(YES or NO)
    //             if (center['sessions'][sessionIndex].min_age_limit <= document.querySelector('#age').value) {
    //                 return center;
    //             }
    //         }
    //     }
    // });

    // //filter only those sessions which have vaccine availability(A center could have multiple sessions, but only one with vaccines available)
    // for (let centerCount = 0; centerCount < filteredResponse['centers'].length; centerCount++) {
    //     filteredResponse['centers'][centerCount] = filteredResponse['centers'][centerCount].filter(sessions => {
    //         sessions.forEach(function (session) {
    //             if (session['available_capacity'] > 0)
    //                 return session;
    //         })
    //     })
    // }

    // return filteredResponse;
    return response;
}




function Input(props) {
    // const [vaccineSlotAPIResponse, setVaccineSlotAPIResponse] = useState(null);

    // 4. fetch availability details and send OTP if vaccine stock available
    function fetchAvailabilityDetailsAndAlertUser(districtId, numberOfWeeks, phone) {

        //check vaccine availability for each week
        for (let week = 0; week < numberOfWeeks; week++) {
            let startDate = getFormattedDateHelper(week * 7);
            const endpoint = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=' + districtId + '&date=' + startDate;
            fetch(endpoint)
                .then(response => response.json())
                .then(function (response) {
                    function notifyViaOTP(phone) {
                        let OTPRequestBody = {
                            mobile: phone
                        }
                        const endpoint = 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP';
                        fetch(endpoint, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            mode: 'cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            redirect: 'follow', // manual, *follow, error
                            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                            body: JSON.stringify(OTPRequestBody)
                        })
                            .then(function (response) {
                                if (!response.ok) {
                                    alert(response.statusText + ': OTP already sent');
                                }
                            })

                    }

                    //filter response according to age, availability of vaccine etc
                    let filteredResponse = filterResponse(response);

                    //No need to write custom logic to prevent multiple calls of this function(which will happen once per each week's data fetched), since API endpoint is configured to return status 400 for multiple calls in less than 3 minutes
                    if (phone != 0)
                        notifyViaOTP(phone);
                    props.setVaccineSlotAPIResponse(filteredResponse);
                });
        }
    }

    // 3. When 'check availability' Button is clicked, call API to fetch vaccine availability
    function handleCheckAvlBtnClick() {
        const checkAvlBtn = document.querySelector('#check-avl');
        checkAvlBtn.addEventListener('click', function () {
            let districtId = document.querySelector('#district-select').value;
            let numberOfWeeks = document.querySelector('#weeks').value;
            let phone = document.querySelector('#phone').value;
            fetchAvailabilityDetailsAndAlertUser(districtId, numberOfWeeks, phone);
        });
    }

    useEffect(function () {
        populateDistricts();
        validateWeeks();
        handleCheckAvlBtnClick();
    }, []);

    return (
        <section id='input-section'>
            <h2>Enter details</h2>
            <p>REMARK: Provide secondary phone number, since you will have to wait for 3 mins after OTP notification, to receive the next OTP for login</p>
            <label for="district-select">Select your district</label>
            <select id="district-select"></select>
            <label for="weeks">Enter number of weeks(starting from today) to search for</label>
            <input type="number" id="weeks" min="1" defaultValue="1"></input>
            <label for="phone">Enter phone number for notification(Use '0' if not required)</label>
            <input type="number" id="phone" value="0"></input>
            <label for="age">Enter age group</label>
            <select id="age">
                <option value="18">18-45</option>
                <option value="45" selected>45+</option>
            </select>
            <button id="check-avl">Check Availability</button>
        </section>
    );
}

export default Input;