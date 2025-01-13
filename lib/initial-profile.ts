import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";

export const initialProfile = async () => {
    const user = await currentUser();

    if(!user){
        redirect("/sign-in/");
    }

    const profile = db.profile.findUnique({
        where: {
            userId : user.id   
        }
    })

    if(profile){
        return profile
    }

    if (!profile) {
        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageURL: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });
        return newProfile;
    }
};