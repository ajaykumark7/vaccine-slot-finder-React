import VaccineSession from './VaccineSession'

function VaccineSlotsFound(props) {
    if (props['vaccineSlotAPIResponse'] == undefined || props['vaccineSlotAPIResponse'] == null || props['vaccineSlotAPIResponse']['centers'].length == 0) {
        return " ";
    }
    else {
        return (
            <section id='output-section'>
                <h2>Vaccine availability details</h2>
                {(props['vaccineSlotAPIResponse']['centers'].forEach((center) => {
                    center['sessions'].forEach((session) => {
                        <VaccineSession centerDetails={center} sessionDetails={session} />
                        //CODE BELOW WORKS, BUT INSIDE VACCINESESSION IT DOESNT DISPLAY!
                        console.log(center);
                        console.log(session);
                    })

                }))}
            </section>
        );
    }
}
export default VaccineSlotsFound;