import React, { useState, useEffect} from "react";


interface GeneralModalComponentProps {
    closeGeneralModal: () => void
    children: React.ReactNode
    onReady?: (handleCloseModal: () => void) => void; // callback koji šalješ roditelju
    sideMenu?: boolean
}


//onReady sends handleCloseModal to parent conponent so when user decides to send data to server modal will be closed as well, also in parent component you wiill need to create state to store the function
//GeneralModalComponent accepts children so you will need just to sorund the content of the modal with this component -----> onReady={(action) => setCloseModalFn(() => action)} 
// sideMenu is used to show modal on the right side of the screen, if you want to use it just set sideMenu={true} in parent component
//This function is used just to show modal with its animation

const GeneralModalComponent:React.FC<GeneralModalComponentProps> =({closeGeneralModal, children, onReady, sideMenu})=>{

  const [isOpening, setIsOpening] = useState(false)
  const [isClosing, setIsClosing] = useState(false)


    const handleCloseModal = React.useCallback(() => {
          setIsClosing(true)
          setTimeout(() => {
              closeGeneralModal()
          }, 500)
      }, [closeGeneralModal])

      useEffect(() => {
          if (onReady) {
              onReady(handleCloseModal)
          }
      }, [onReady, handleCloseModal])
  
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

      
  return (
     <div
                onClick={handleBackdropClick}
                className={`font-Poppins fixed inset-0 z-40 flex items-end justify-center bg-[#00000035] backdrop-blur-xs ${
                  sideMenu ? "md:items-end" : "md:items-center"
                }`}
            >
                <div
                    className={
                      sideMenu
                        ? `relative z-50 flex max-h-screen w-full flex-col gap-[32px] overflow-y-scroll bg-white px-[32px] py-[24px] transition-all duration-500 md:fixed md:right-0 md:h-full md:w-[40vw] md:rounded-l-xl md:rounded-r-none ${
                            isClosing
                              ? "translate-y-full opacity-0 md:translate-x-full md:translate-y-0"
                              : isOpening
                                ? "translate-y-0 opacity-100 md:translate-x-0"
                                : "translate-y-full opacity-0 md:translate-x-full md:translate-y-0"
                          }`
                        : `scrollbar-thin-mobile relative z-50 flex max-h-[80vh] w-full max-w-[1000px] flex-col gap-[32px] overflow-y-scroll rounded-t-xl rounded-b-none bg-white px-[32px] py-[24px] transition-all duration-500 ease-in-out md:h-fit md:w-[60vw] md:rounded-xl ${
                            isClosing
                              ? "translate-y-full opacity-0"
                              : isOpening
                                ? "translate-y-0 opacity-100"
                                : "translate-y-full opacity-0"
                          }`
                    }
                >
                   {children}
         
                </div>
            </div>
  )

}

export default GeneralModalComponent