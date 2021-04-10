import React from "react";
import PetImages from "./PetImages/PetImages";

function PostCard(post) {
    return (
        <div>
            <h3>`${post.petName}`</h3>
            <ul>
                <li>`${post.id}`</li>
                <PetImages urls={post.images}/>
                <li>`${post.type}`</li>
                <li>`${post.petName}`</li>
                <li>`${post.petType}`</li>
                <li>`${post.petBreed}`</li>
                <li>`${post.color}`</li>
                <li>`${post.microship}`</li>
                <li>`${post.petGender}`</li>
                <li>`${post.petDesexed}`</li>
                <li>`${post.petSize}`</li>
                <li>`${post.monthAge}`</li>
                <li>`${post.ownerContact}`</li>
                <li>`${post.description}`</li>
                <li>`${post.vaccinated}`</li>

            </ul>
        </div>
    )
}

export default PostCard;