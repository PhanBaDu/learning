/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Navigation() {
    return (
        <div className="navigation-wrapper">
            <div className="menu-top">
                <Link href="/" className="brand-logo">
                    <img className="brand-logo__icon" src="svg/front.svg" alt="logo" />
                    <span className="brand-logo__text-wrapper">
                        <img
                            className="brand-logo__text"
                            src="svg/frontend-logo-right.svg"
                            alt="logo text"
                        />
                    </span>
                </Link>
            </div>
        </div>
    );
}
