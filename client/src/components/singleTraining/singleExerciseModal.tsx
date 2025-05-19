import { useEffect, useState } from "react"
import { useTrainingCtx } from "./trainingProvider"
import HeroExercise from "./exerciseDetailed/heroExercise"
import ParametarsExercise from "./exerciseDetailed/parametarsExercise"
import ExerciseDescription from "./exerciseDetailed/exerciseDescription"


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

     const [isOpening, setIsOpening] = useState(false)
      const [isClosing, setIsClosing] = useState(false)

  
      const handleCloseModal = () => {
          setIsClosing(true)
          setTimeout(() => {
              closeSingleExerciseModal()
          }, 500)
      }
  
      useEffect(() => {
          setIsOpening(true)
      }, [])
  
      useEffect(() => {
          if (isClosing) {
              setTimeout(() => {
                  setIsOpening(false)
              }, 500)
          }
      }, [isClosing])
  
      const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target === e.currentTarget) {
              handleCloseModal()
          }
      }
  return(
    <div
    onClick={handleBackdropClick}
    className="font-Poppins fixed inset-0 z-40 flex items-end justify-center bg-[#00000035] backdrop-blur-xs md:items-center"
>
    <div
        className={`relative z-50  flex w-full max-w-[1000px] max-h-[90vh] flex-col gap-[32px] overflow-y-scroll rounded-b-none rounded-t-xl md:rounded-xl bg-white px-[32px] py-[24px] transition-all duration-500 md:h-[80vh] md:w-[80vw] scrollbar-thin-mobile ${
            isClosing
            ? "translate-y-full opacity-0"
            : isOpening
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
        }`}
    >        <div className="flex w-full flex-col items-center justify-center gap-6">
    <HeroExercise exercise={exercise} />
    <ParametarsExercise exercise={exercise} />
    <ExerciseDescription exercise={exercise} />
</div></div></div>
  )
}