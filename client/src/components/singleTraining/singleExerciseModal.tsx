import { useTrainingCtx } from "./trainingProvider"
import HeroExercise from "./exerciseDetailed/heroExercise"
import ParametarsExercise from "./exerciseDetailed/parametarsExercise"
import ExerciseDescription from "./exerciseDetailed/exerciseDescription"
import GeneralModalComponent from "../util/GeneralModalComponent"


const exercise = {
  name: "Plank",
  sets: 3,
  reps: "30 seconds",
  id: 1,
  description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim.....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim.Lorem ipsum dolor si",
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


export default function SingleExerciseModal() {

      const { closeSingleExerciseModal } =
          useTrainingCtx()

 
    
  
  
  return(
    <GeneralModalComponent closeGeneralModal={closeSingleExerciseModal}>
   
            <div className="flex w-full flex-col items-center justify-center gap-6">
    <HeroExercise exercise={exercise} />
    <ParametarsExercise exercise={exercise} />
    <ExerciseDescription exercise={exercise} />
</div>
</GeneralModalComponent>
  )
}