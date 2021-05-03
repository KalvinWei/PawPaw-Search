import * as React from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const mapAccess = {
    mapboxApiAccessToken:
        "pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg"
};

const queryParams = {
    country: "nz",
    types: "address"
};

function parseReverseGeo(geoData) {
    // debugger;
    let locality, region, country, postcode, returnStr;
    if (geoData.context) {
        geoData.context.forEach((v, i) => {
            if (v.id.indexOf("locality") >= 0) {
                locality = v.text;
            }
            if (v.id.indexOf("postcode") >= 0) {
                postcode = v.text;
            }
            if (v.id.indexOf("region") >= 0) {
                region = v.text;
            }
            if (v.id.indexOf("country") >= 0) {
                country = v.text;
            }
        });
    }
    if (postcode && region && country) {
        returnStr = `${geoData.address} ${
            geoData.text
        }, ${locality} ${region} ${postcode}, ${country}`;
    } else {
        returnStr = geoData.place_name;
    }
    return {
        number: geoData.address,
        address: geoData.text,
        locality,
        region,
        postcode,
        country,
        concat: returnStr,
        complete: geoData.place_name
    };
}

export default function AutoComplete() {
    const [suggestion, setSuggestion] = React.useState({});
    const [parsed, setParsed] = React.useState({});

    const onSelected = (_, item) => {
        const data = parseReverseGeo(item);
        setParsed(data);
        setSuggestion(item);
    };

    return (
        <div className="AutoComplete">
            <Geocoder
                {...mapAccess}
                onSelected={onSelected}
                hideOnSelect={true}
                viewport={{}}
                initialInputValue={"Search"}
                queryParams={queryParams}
            />
            <pre>
        <h3>Extract</h3>
                {JSON.stringify(parsed, null, 2)}
      </pre>
            <pre>
        <h3>Complete response</h3>
                {JSON.stringify(suggestion, null, 2)}
      </pre>
        </div>
    );
}

