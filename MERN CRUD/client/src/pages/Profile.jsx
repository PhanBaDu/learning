import Header from '../components/Header';
import ProfileUser from '../components/ProfileUser';

export default function Profile() {
    return (
        <div className="w-full h-full dark:bg-slate-950 py-10 bg-slate-200 py-3xl pb-96">
            <div
                className="
                container 
                m-auto 
                xl:max-w-7xl 
                md:max-w-4xl 
                sm:max-w-xl
                max-w-sm
            "
            >
                <Header />
                <ProfileUser />
            </div>
        </div>
    );
}
