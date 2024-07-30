"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { FC, useState } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CreatePage = async () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/create')
        }
    })
    const [sessionName, setSessionName] = useState<string>('');

    const handleCreateSession = () => {
        // Logic to handle creating a quiz session
        console.log('Creating quiz session with name:', sessionName);
    };

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2">Create Quiz Session</h1>
            <br />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateSession();
                }}
            >
                <Input
                    type="text"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    placeholder="Enter session name"
                    className="border rounded p-2 mr-2"
                />
                <br />
                <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Create
                </Button>
            </form>
        </div>
    );
};

export default CreatePage;
