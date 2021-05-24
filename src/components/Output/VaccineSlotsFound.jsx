import VaccineSession from './VaccineSession'

function VaccineSlotsFound(props) {
    if (props['vaccineSlotAPIResponse'] == undefined || props['vaccineSlotAPIResponse'] == null || props['vaccineSlotAPIResponse']['centers'].length == 0) {
        return " ";
    }
    else {
        return (
            <section id='output-section'>
                <h2>Vaccine availability details</h2>
                {(props['vaccineSlotAPIResponse']['centers'].map((center) => (
                    center['sessions'].map((session) => (
                        <VaccineSession centerDetails={center} sessionDetails={session} />
                    ))

                )))}
            </section>
        );
    }
}
export default VaccineSlotsFound;