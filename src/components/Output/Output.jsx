import NoVaccineSlotsFound from "./NoVaccineSlotsFound";
import VaccineSlotsFound from "./VaccineSlotsFound";

function Output(props) {
    if (props['vaccineSlotAPIResponse'] === undefined || props['vaccineSlotAPIResponse'] === null || props['vaccineSlotAPIResponse']['centers'].length === 0) {
        return <NoVaccineSlotsFound />;
    }
    else {
        return <VaccineSlotsFound vaccineSlotAPIResponse={props['vaccineSlotAPIResponse']} />
    }
}

export default Output;