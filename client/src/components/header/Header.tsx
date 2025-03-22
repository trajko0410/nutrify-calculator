import MainContainer from "../util/MainContainer"
import InfiniteScroll from "./InfiniteScroll"
import { Navigation } from "./Navigation"

const Header: React.FC = () => {
    return (
        <div className="absolute top-0 z-50 flex w-full flex-col items-center">
            <InfiniteScroll text="30% Sale on all plans" />
            <div className="hidden w-full md:block">
                <MainContainer>
                    <Navigation />
                </MainContainer>
            </div>
            <div className="block w-full md:hidden"></div>
        </div>
    )
}

export default Header
