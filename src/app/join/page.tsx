"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { FC, useState } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';


const JoinPage = async () => {
    const [sessionName, setSessionName] = useState<string>('');
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/join')
        }
    })

    const handleJoinSession = () => {
        // Logic to handle joining a quiz session
        console.log('Joining quiz session with name:', sessionName);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Join Quiz Session</h1>
            <br />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleJoinSession();
                }}
            >
                <Input
                    type="text"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    placeholder="Enter session name to join"
                    className="border rounded p-2 mr-2"
                />
                <br />
                <Button type="submit" className="bg-green-500 text-white p-2 rounded">
                    Join
                </Button>
            </form>
        </div>
    );
};

export default JoinPage;
