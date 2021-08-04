import SimpleCard from './SimpleCard';

function VaccineSlotsFound(props) {
    return (
        <section id='output-section'>
            <h4>{props['vaccineSlotAPIResponse']['sessions'].length} sessions found</h4>
            {(props['vaccineSlotAPIResponse']['sessions'].map((session) => (
                    <SimpleCard sessionDetails={session} />

            )))}
        </section>
    );
}
export default VaccineSlotsFound;