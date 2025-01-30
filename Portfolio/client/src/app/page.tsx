'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import '../styles/global.scss';
import Navigation from '@/components/Navigation/Navigation';

const Index = () => {
    const [speakerState, setSpeakerState] = useState('muted');

    const handleSpeaker = () => {
        const audio = document.querySelector('#audioPlayer') as HTMLVideoElement;

        if (speakerState === 'muted') {
            setSpeakerState('unmuted');
            audio.pause();
        } else {
            setSpeakerState('muted');
            audio.play();
        }
    };

    return (
        <div id="menu-target">
            <audio loop id="audioPlayer" autoPlay style={{ display: 'none' }}>
                <source src="sound/preloader.mp3" type="audio/mp3" />
            </audio>

            {/* Hero Section */}
            <div className="header-wrapper">
                <header className="header">
                    <div className="header__hero">
                        <div className="header__hero--heading">
                            <span>👋 frontend developer with</span>
                            <span className="header__hero--heading-gradient">14+ years</span>
                            <span>experience.👌</span>
                            <a className="header__hero--cta" href="#">
                                View Projects
                            </a>
                        </div>
                    </div>
                </header>

                <div className="header__footer">
                    <div className="header__footer--left">
                        <div className="speaker">
                            <div
                                onClick={handleSpeaker}
                                className={`${'speaker__toggle'} ${
                                    speakerState === 'unmuted' ? `${'speaker__toggle--anim'}` : ``
                                }`}
                            >
                                &nbsp;
                            </div>
                            {/* Close Icon */}
                            <div className="speaker__muted">
                                <img src="svg/muted.svg" alt="muted icon" />
                            </div>
                            {/* Music Equalizer */}
                            <div className="speaker__unmuted">
                                <svg
                                    width={'14'}
                                    height={'11'}
                                    viewBox="0 0 15 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.599976"
                                        y1="1.06665"
                                        width="1.4"
                                        height="10"
                                        fill="#f2f2f2"
                                        className="rect1-anim"
                                    />
                                    <rect
                                        x="9.8"
                                        y1="1.06665"
                                        width="1.4"
                                        height="10"
                                        fill="#f2f2f2"
                                        className="rect2-anim"
                                    />
                                    <rect
                                        x="3.899994"
                                        y1="1.06665"
                                        width="1.4"
                                        height="10"
                                        fill="#f2f2f2"
                                        className="rect3-anim"
                                    />
                                    <rect
                                        x="6.899994"
                                        y1="1.06665"
                                        width="1.4"
                                        height="10"
                                        fill="#f2f2f2"
                                        className="rect4-anim"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="header__footer--right">
                        <a href="#" rel="noopener" target="_blank">
                            GHIHUB
                        </a>
                        <a href="#" rel="noopener" target="_blank">
                            TWITTER
                        </a>
                        <a href="#" rel="noopener" target="_blank">
                            LINKEDIN
                        </a>
                        <a href="#" rel="noopener" target="_blank">
                            INSTA
                        </a>
                    </div>
                </div>
            </div>

            {/* About */}
            <main className="container">
                <div className="about-text">
                    <h1 className="heading-1">
                        <span>Amelia Miller ! 👋,</span>
                    </h1>
                    <br />
                    Sometimes
                </div>
                {/* Projects */}
                <section id="sectionProjects" className="section-projects">
                    <h1 className="heading-1">
                        <span>Meet our Team</span>
                        <small>😍</small>
                    </h1>
                    <p className="paragraph">We delivering exceptional results</p>
                </section>
            </main>
        </div>
    );
};

export default Index;
