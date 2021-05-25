import VaccineSession from './VaccineSession'

function VaccineSlotsFound(props) {
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
export default VaccineSlotsFound;