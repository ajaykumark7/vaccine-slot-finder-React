function VaccineSession(props) {
    console.log("INSIDE VACCINE SESSION COMPONENT")
    return (
        <div className='vaccination-session'>{props['centerDetails']['name']} {props['sessionDetails']['date']} {props['sessionDetails']['min_age_limit']} {props['sessionDetails']['available_capacity']}</div>
    );
}

export default VaccineSession;