import AuthorsSection from "../components/AuthorsSection";
import BookLists from "../components/BookLists";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import Subscription from "../components/Subscription";
import WhyUs from "../components/WhyUs";


function Home() {
    return (
        <Layout>
            <HeroSection />
            <WhyUs />
            <BookLists />
            <AuthorsSection />
            <Subscription />
        </Layout>
    )
}

export default Home