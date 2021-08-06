import districtList from './districtList.js';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Input(props) {
    const [district, setDistrict] = useState(null);
    const [age, setAge] = useState("45");

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
        //set default value for state variable 'district'
        setDistrict(districtList[0].district_id);
    }

    function filterResponse(response) {
        let filteredResponse = {};
        filteredResponse['sessions'] = response['centers'].map(center => {
            for (let sessionIndex = 0; sessionIndex < center['sessions'].length; sessionIndex++) {
                //filter centers by vaccine availability(in any session)
                if (center['sessions'][sessionIndex].available_capacity > 0) {
                    //filter centers by age group allowed(YES or NO)
                    if (center['sessions'][sessionIndex].min_age_limit <= age) {
                        return {
                            address: center['address'],
                            min_age_limit: center['sessions'][sessionIndex].min_age_limit,
                            available_capacity: center['sessions'][sessionIndex].available_capacity,
                            available_capacity_dose1: center['sessions'][sessionIndex].available_capacity_dose1,
                            available_capacity_dose2: center['sessions'][sessionIndex].available_capacity_dose2,
                            name: center['name'],
                            vaccine: center['sessions'][sessionIndex].vaccine,
                            date: center['sessions'][sessionIndex].date
                        }
                    }
                }
            }
        });
        filteredResponse['sessions'] = filteredResponse['sessions'].filter(element => element != undefined)
        return filteredResponse;
    }

    // 3. fetch availability details and send OTP if vaccine stock available
    function fetchAvailabilityDetailsAndAlertUser(districtId) {
        //check vaccine availability for each week
        let startDate = getFormattedDateHelper(0);
        const endpoint = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=' + districtId + '&date=' + startDate;
        fetch(endpoint)
            .then(response => response.json())
            .then(function (response) {
                //filter response according to age, availability of vaccine etc
                let filteredResponse = filterResponse(response);
                props.dispatch({
                    type: "UPDATEVACCINESLOTAPIRESPONSE",
                    vaccineSlotAPIResponse: filteredResponse
                });
            });
    }

    // 2. When 'check availability' Button is clicked, call API to fetch vaccine availability
    function handleCheckAvlBtnClick() {
        fetchAvailabilityDetailsAndAlertUser(district);
    }

    useEffect(function () {
        populateDistricts();
    }, []);

    const styles = {
        button: {
            width: "100%"
        }
    }

    const handleDistrictSelectChange = event => setDistrict(event.target.value);
    const handleAgeChange = event => setAge(event.target.value);
    return (
        <Form>
            <Form.Group controlId="district-select">
                <Form.Label>Select your district</Form.Label>
                <Form.Control as="select" custom onChange={handleDistrictSelectChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="age">
                <Form.Label>Enter age</Form.Label>
                <Form.Control type="text" placeholder="age" min="18" defaultValue="45" onChange={handleAgeChange} />
            </Form.Group>
            <Button id="check-avl" onClick={handleCheckAvlBtnClick} variant="primary" style={styles.button}>
                Find Vaccine Slots
            </Button>
        </Form>
    );
}

export default connect()(Input);