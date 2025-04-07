import Header from "@/components/util/AppHeader"
import HeroExercise from "@/components/exerciseDetailed/heroExercise"
import AppContainer from "@/components/util/AppContainer"
import SideMenu from "@/components/util/SideMenu"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ParametarsExercise from "@/components/exerciseDetailed/parametarsExercise"
import ExerciseDescription from "@/components/exerciseDetailed/exerciseDescription"

interface Params {
    trainingId: string | number
    exerciseId: string | number
}

const exercise = {
    name: "Plank",
    sets: 3,
    reps: "30 seconds",
    id: 1,
    description:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...",
    pause: 60,
    imageHero: null,
    musslceGroupTargetImage: null,
    movment: null,
    videoLink: null,
    musscleGroupTarget: [
        {
            name: "Chest",
            description:
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...",
        },
        {
            name: "Shoulders",
            description:
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...",
        },
    ],
}

const SingleExercisePage = async ({ params }: { params: Params }) => {
    //const { trainingId, exerciseId } = await params // ako ne stavim await dobijamo error

    const { userId } = await auth()

    if (!userId) {
        redirect("/login")
    }

    //const exercise = await getSingleExercise(trainingId, exerciseId)
    //console.log(trainingId, exerciseId, "exerciseIds")

    //if (!exercise) {
    //redirect("/404")
    //}

    return (
        <div className="font-Poppins h-screen w-full bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            <div className="bg-[#FAF9F6] pt-[100px] pb-10">
                <AppContainer>
                    <div className="flex w-full flex-col items-center justify-center gap-6">
                        <HeroExercise exercise={exercise} />
                        <ParametarsExercise exercise={exercise} />
                        <ExerciseDescription exercise={exercise} />
                    </div>
                </AppContainer>
            </div>
        </div>
    )
}

export default SingleExercisePage
