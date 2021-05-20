import React from 'react'; 

class Input extends React.Component {
    render() {
        return (
            <section id='input-section'>
                <h2>Enter details</h2>
                <p>REMARK: Provide secondary phone number, since you will have to wait for 3 mins after OTP notification, to receive the next OTP for login</p>
                <label for="district-select">Select your district</label>
                <select id="district-select"></select>
                <label for="weeks">Enter number of weeks(starting from today) to search for</label>
                <input type="number" id="weeks" min="1" value="1"></input>
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
}

export default Input;