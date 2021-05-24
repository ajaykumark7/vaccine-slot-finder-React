
import { useEffect, useState } from "react";

function displayHeading(props) {
    let heading;
    if (props['vaccineSlotAPIResponse'] == null) {
        heading = 'No vaccine slots currently available';
    }
    else {
        heading = 'Vaccine availability details';
    }
    return heading;
};

function Output(props) {
    if (props['vaccineSlotAPIResponse'] != null)
        console.log(props['vaccineSlotAPIResponse']['centers']);
    return (
        <section id='output-section'>
            <h2>{displayHeading(props)}</h2>
            <div id='vaccination-centers'>
                {(props['vaccineSlotAPIResponse'] == null || props['vaccineSlotAPIResponse']['centers'].length == 0) ?
                    null
                    :
                    (props['vaccineSlotAPIResponse']['centers'].forEach((center) => {
                        center['sessions'].forEach((session) => {
                            <div className="vaccination-session">{center['name']} {session['date']} {session['min_age_limit']} {session['available_capacity']}</div>
                        })

                    }))
                }
            </div>
        </section>
    );
}

export default Output;