import Marquee from "react-fast-marquee"

type InfiniteScrollProps = {
    text: string
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ text }) => {
    return (
        <Marquee
            speed={50}
            gradient={false}
            autoFill={true}
            style={{
                backgroundColor: "#00473C",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "stretch",
            }}
        >
            <p className="px-10">{text}</p>
        </Marquee>
    )
}

export default InfiniteScroll
