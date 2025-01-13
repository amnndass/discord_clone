import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    const profile = await initialProfile();

    if(!profile){
        redirect("/sign-up/")
    }

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(server){
        redirect(`/server/${server.id}`);
    }

    return <div>create a server</div>
}

export default SetupPage;