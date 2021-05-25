import NoVaccineSlotsFound from "./NoVaccineSlotsFound";
import VaccineSlotsFound from "./VaccineSlotsFound";
import { connect } from 'react-redux';

function Output(props) {
    if (props['vaccineSlotAPIResponse'] === undefined || props['vaccineSlotAPIResponse'] === null || props['vaccineSlotAPIResponse']['centers'].length === 0) {
        return <NoVaccineSlotsFound />;
    }
    else {
        return <VaccineSlotsFound vaccineSlotAPIResponse={props['vaccineSlotAPIResponse']} />
    }
}

const mapStateToProps = (state) => ({
    vaccineSlotAPIResponse: state.vaccineSlotAPIResponse
});

export default connect(mapStateToProps)(Output);