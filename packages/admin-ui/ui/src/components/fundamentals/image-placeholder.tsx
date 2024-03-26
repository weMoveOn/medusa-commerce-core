import ImagePlaceholderIcon from "./icons/image-placeholder-icon"

type ImagePlaceholderProps = {
  size?: number
}

const ImagePlaceholder:React.FC<ImagePlaceholderProps> = ({size=12}) => {
  return (
    <div className="rounded-soft bg-grey-5 flex h-full w-full items-center justify-center">
      <ImagePlaceholderIcon size={size} />
    </div>
  )
}

export default ImagePlaceholder
