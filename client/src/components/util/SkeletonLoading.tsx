

type skeletonBoxProp = {
  className?: string
}


const SkeletonBox:React.FC<skeletonBoxProp> = ({ className = "" }) => {
  return (
    <div className={`shimmer ${className} rounded-sm`} />

  )
}


export default SkeletonBox