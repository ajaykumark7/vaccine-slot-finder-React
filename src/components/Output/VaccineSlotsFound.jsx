import SimpleCard from './SimpleCard';
import VaccineSession from './VaccineSession'

function VaccineSlotsFound(props) {
    return (
        <section id='output-section'>
            <h4>{props['vaccineSlotAPIResponse']['sessions'].length} sessions found</h4>
            {(props['vaccineSlotAPIResponse']['sessions'].map((session) => (
                    // <VaccineSession centerDetails={center} sessionDetails={session} />
                    <SimpleCard sessionDetails={session} />

            )))}
        </section>
    );
}
export default VaccineSlotsFound;