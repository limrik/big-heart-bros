"use client"
import React from 'react';
import Navbar from '../../../components/navbar';
import { useSession } from 'next-auth/react';

const About: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <div>
                    <Navbar></Navbar>
                    <h1>Profile</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                        mauris eu nisl ultrices, vitae tincidunt nunc tincidunt. Nulla facilisi.
                        Nullam auctor, nunc id aliquam tincidunt, nunc elit aliquet nunc, nec
                        luctus nunc nunc id nunc. Sed in semper nunc. Sed auctor, nunc id
                        aliquam tincidunt, nunc elit aliquet nunc, nec luctus nunc nunc id nunc.
                        Sed in semper nunc.
                    </p>
                    <p>
                        Sed auctor, nunc id aliquam tincidunt, nunc elit aliquet nunc, nec
                        luctus nunc nunc id nunc. Sed in semper nunc. Sed auctor, nunc id
                        aliquam tincidunt, nunc elit aliquet nunc, nec luctus nunc nunc id nunc.
                        Sed in semper nunc.
                    </p>
                </div>
            ) : (
                <div>
                    <p>test</p>
                </div>
            )}
        </div>
    );
};

export default About;

