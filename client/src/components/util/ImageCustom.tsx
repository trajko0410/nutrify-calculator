import Image, { StaticImageData } from "next/image"

/// Needs to be adjusted to work with dynamically fetched images.

interface ImageCustomProps {
    src: string | StaticImageData
    alt: string
    //objectFit?: boolean
    className?: string
    width?: number
    height?: number
}
export const ImageCustom: React.FC<ImageCustomProps> = ({
    src,
    alt,
    className = "",
    width,
    height,
}) => {
    if (!src) return <>No image</>

    return width && height ? (
        <Image
            className={className}
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    ) : (
        <Image className={className} src={src} alt={alt} fill />
    )
}
