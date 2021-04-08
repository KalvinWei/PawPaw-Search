import React from "react";

export default function PetImages({urls}){
    return (
        <div>
            {urls.map(src=>
                <img src={src} />
            )}
        </div>
    )
}